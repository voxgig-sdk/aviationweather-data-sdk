# AviationweatherData PHP SDK



The PHP SDK for the AviationweatherData API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->AirSigmet()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/aviationweather-data-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/aviationweather-data-sdk
composer config repositories.aviationweather-data-sdk path ./aviationweather-data-sdk/php
composer require voxgig-sdk/aviationweather-data-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'aviationweatherdata_sdk.php';

$client = new AviationweatherDataSDK();
```

### 2. List airsigmet records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $airsigmets = $client->AirSigmet()->list();
    foreach ($airsigmets as $record) {
        $item = $record->data_get();
        echo $item["airsigmetType"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $airports = $client->Airport()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = AviationweatherDataSDK::test();

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$airport = $client->Airport()->list();
print_r(array_map(fn($item) => $item->data_get(), $airport));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new AviationweatherDataSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
AVIATIONWEATHER_DATA_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### AviationweatherDataSDK

```php
require_once 'aviationweatherdata_sdk.php';
$client = new AviationweatherDataSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = AviationweatherDataSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### AviationweatherDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `AirSigmet` | `($data): AirSigmetEntity` | Create an AirSigmet entity instance. |
| `Airport` | `($data): AirportEntity` | Create an Airport entity instance. |
| `Cache` | `($data): CacheEntity` | Create a Cache entity instance. |
| `Cwa` | `($data): CwaEntity` | Create a Cwa entity instance. |
| `GAirmet` | `($data): GAirmetEntity` | Create a GAirmet entity instance. |
| `Metar` | `($data): MetarEntity` | Create a Metar entity instance. |
| `Pirep` | `($data): PirepEntity` | Create a Pirep entity instance. |
| `StationInfo` | `($data): StationInfoEntity` | Create a StationInfo entity instance. |
| `Taf` | `($data): TafEntity` | Create a Taf entity instance. |
| `Tcf` | `($data): TcfEntity` | Create a Tcf entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### AirSigmet

| Field | Description |
| --- | --- |
| `airsigmetType` | SIGMET type |
| `altitudeHigh` | Upper altitude in feet MSL |
| `altitudeLow` | Lower altitude in feet MSL |
| `fir` | Flight Information Region |
| `hazard` | Hazard type |
| `issueTime` | Issue time in ISO8601 format |
| `rawAirSigmet` | Raw SIGMET text |
| `severity` | Severity level |
| `validTimeFrom` | Valid time from in ISO8601 format |
| `validTimeTo` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/airsigmet`

#### Airport

| Field | Description |
| --- | --- |
| `city` | City |
| `country` | Country code |
| `elev` | Elevation in meters |
| `iataId` | IATA identifier |
| `icaoId` | ICAO airport identifier |
| `lat` | Latitude |
| `lon` | Longitude |
| `name` | Airport name |
| `state` | State or province |

Operations: List.

API path: `/api/data/airport`

#### Cache

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/data/cache/aircraftreports.cache.csv.gz`

#### Cwa

| Field | Description |
| --- | --- |
| `cwsu` | Center Weather Service Unit |
| `issueTime` | Issue time in ISO8601 format |
| `rawText` | Raw CWA text |
| `sequence` | Sequence number |
| `seriesId` | Series identifier |
| `validTimeFrom` | Valid time from in ISO8601 format |
| `validTimeTo` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/cwa`

#### GAirmet

| Field | Description |
| --- | --- |
| `altitudeHigh` | Upper altitude in feet MSL |
| `altitudeLow` | Lower altitude in feet MSL |
| `hazard` | Hazard type |
| `issueTime` | Issue time in ISO8601 format |
| `qualifier` | Forecast qualifier |
| `severity` | Severity level |
| `validTimeFrom` | Valid time from in ISO8601 format |
| `validTimeTo` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/gairmet`

#### Metar

| Field | Description |
| --- | --- |
| `altim` | Altimeter setting in inches of mercury |
| `clouds` | Cloud layers |
| `dewp` | Dewpoint in Celsius |
| `elev` | Elevation in meters |
| `fltCat` | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | ICAO station identifier |
| `lat` | Latitude |
| `lon` | Longitude |
| `maxT` | Maximum temperature |
| `maxT24` | 24-hour maximum temperature |
| `metarType` | METAR type (METAR or SPECI) |
| `minT` | Minimum temperature |
| `minT24` | 24-hour minimum temperature |
| `mostRecent` | Most recent observation flag |
| `name` | Station name |
| `obsTime` | Observation time in ISO8601 format |
| `pcp24hr` | 24-hour precipitation |
| `pcp3hr` | 3-hour precipitation |
| `pcp6hr` | 6-hour precipitation |
| `precip` | Precipitation |
| `presTend` | Pressure tendency |
| `prior` | Prior observation indicator |
| `qcField` | Quality control field |
| `rawOb` | Raw METAR observation text |
| `rawTaf` | Raw TAF if available |
| `reportTime` | Report time in ISO8601 format |
| `slp` | Sea level pressure |
| `snow` | Snow depth |
| `temp` | Temperature in Celsius |
| `vertVis` | Vertical visibility |
| `visib` | Visibility |
| `wdir` | Wind direction in degrees |
| `wgst` | Wind gust in knots |
| `wspd` | Wind speed in knots |
| `wxString` | Weather phenomena string |

Operations: List.

API path: `/api/data/metar`

#### Pirep

| Field | Description |
| --- | --- |
| `aircraftType` | Aircraft type |
| `altitudeFt` | Altitude in feet MSL |
| `clouds` | Cloud reports |
| `icing` | Icing report |
| `lat` | Latitude |
| `lon` | Longitude |
| `obsTime` | Observation time in ISO8601 format |
| `rawOb` | Raw PIREP text |
| `reportType` | Report type (PIREP or AIREP) |
| `temp` | Temperature in Celsius |
| `turbulence` | Turbulence report |
| `visibility` | Visibility |
| `wdir` | Wind direction in degrees |
| `wspd` | Wind speed in knots |
| `wxString` | Weather phenomena string |

Operations: List.

API path: `/api/data/pirep`

#### StationInfo

| Field | Description |
| --- | --- |
| `country` | Country code |
| `elev` | Elevation in meters |
| `iataId` | IATA identifier |
| `icaoId` | ICAO station identifier |
| `lat` | Latitude |
| `lon` | Longitude |
| `name` | Station name |
| `priority` | Priority level |
| `site` | Site type |
| `state` | State or province |

Operations: List.

API path: `/api/data/stationinfo`

#### Taf

| Field | Description |
| --- | --- |
| `bulletinTime` | Bulletin time in ISO8601 format |
| `elev` | Elevation in meters |
| `fcsts` | Forecast periods |
| `icaoId` | ICAO station identifier |
| `issueTime` | TAF issue time in ISO8601 format |
| `lat` | Latitude |
| `lon` | Longitude |
| `name` | Station name |
| `rawTAF` | Raw TAF forecast text |
| `validTimeFrom` | Valid time from in ISO8601 format |
| `validTimeTo` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/taf`

#### Tcf

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/data/tcf`



## Entities


### AirSigmet

Create an instance: `$air_sigmet = $client->AirSigmet();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `airsigmetType` | `string` | SIGMET type |
| `altitudeHigh` | `int` | Upper altitude in feet MSL |
| `altitudeLow` | `int` | Lower altitude in feet MSL |
| `fir` | `string` | Flight Information Region |
| `hazard` | `string` | Hazard type |
| `issueTime` | `string` | Issue time in ISO8601 format |
| `rawAirSigmet` | `string` | Raw SIGMET text |
| `severity` | `string` | Severity level |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```php
// list() returns an array of AirSigmet entities, one per record (throws on error).
$air_sigmets = $client->AirSigmet()->list();
```


### Airport

Create an instance: `$airport = $client->Airport();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` | City |
| `country` | `string` | Country code |
| `elev` | `float` | Elevation in meters |
| `iataId` | `string` | IATA identifier |
| `icaoId` | `string` | ICAO airport identifier |
| `lat` | `float` | Latitude |
| `lon` | `float` | Longitude |
| `name` | `string` | Airport name |
| `state` | `string` | State or province |

#### Example: List

```php
// list() returns an array of Airport entities, one per record (throws on error).
$airports = $client->Airport()->list();
```


### Cache

Create an instance: `$cache = $client->Cache();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### Cwa

Create an instance: `$cwa = $client->Cwa();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cwsu` | `string` | Center Weather Service Unit |
| `issueTime` | `string` | Issue time in ISO8601 format |
| `rawText` | `string` | Raw CWA text |
| `sequence` | `int` | Sequence number |
| `seriesId` | `string` | Series identifier |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```php
// list() returns an array of Cwa entities, one per record (throws on error).
$cwas = $client->Cwa()->list();
```


### GAirmet

Create an instance: `$g_airmet = $client->GAirmet();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altitudeHigh` | `int` | Upper altitude in feet MSL |
| `altitudeLow` | `int` | Lower altitude in feet MSL |
| `hazard` | `string` | Hazard type |
| `issueTime` | `string` | Issue time in ISO8601 format |
| `qualifier` | `string` | Forecast qualifier |
| `severity` | `string` | Severity level |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```php
// list() returns an array of GAirmet entities, one per record (throws on error).
$g_airmets = $client->GAirmet()->list();
```


### Metar

Create an instance: `$metar = $client->Metar();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altim` | `float` | Altimeter setting in inches of mercury |
| `clouds` | `array` | Cloud layers |
| `dewp` | `float` | Dewpoint in Celsius |
| `elev` | `float` | Elevation in meters |
| `fltCat` | `string` | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | `string` | ICAO station identifier |
| `lat` | `float` | Latitude |
| `lon` | `float` | Longitude |
| `maxT` | `float` | Maximum temperature |
| `maxT24` | `float` | 24-hour maximum temperature |
| `metarType` | `string` | METAR type (METAR or SPECI) |
| `minT` | `float` | Minimum temperature |
| `minT24` | `float` | 24-hour minimum temperature |
| `mostRecent` | `int` | Most recent observation flag |
| `name` | `string` | Station name |
| `obsTime` | `string` | Observation time in ISO8601 format |
| `pcp24hr` | `float` | 24-hour precipitation |
| `pcp3hr` | `float` | 3-hour precipitation |
| `pcp6hr` | `float` | 6-hour precipitation |
| `precip` | `float` | Precipitation |
| `presTend` | `float` | Pressure tendency |
| `prior` | `int` | Prior observation indicator |
| `qcField` | `int` | Quality control field |
| `rawOb` | `string` | Raw METAR observation text |
| `rawTaf` | `string` | Raw TAF if available |
| `reportTime` | `string` | Report time in ISO8601 format |
| `slp` | `float` | Sea level pressure |
| `snow` | `float` | Snow depth |
| `temp` | `float` | Temperature in Celsius |
| `vertVis` | `int` | Vertical visibility |
| `visib` | `string` | Visibility |
| `wdir` | `int` | Wind direction in degrees |
| `wgst` | `int` | Wind gust in knots |
| `wspd` | `int` | Wind speed in knots |
| `wxString` | `string` | Weather phenomena string |

#### Example: List

```php
// list() returns an array of Metar entities, one per record (throws on error).
$metars = $client->Metar()->list();
```


### Pirep

Create an instance: `$pirep = $client->Pirep();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aircraftType` | `string` | Aircraft type |
| `altitudeFt` | `int` | Altitude in feet MSL |
| `clouds` | `array` | Cloud reports |
| `icing` | `string` | Icing report |
| `lat` | `float` | Latitude |
| `lon` | `float` | Longitude |
| `obsTime` | `string` | Observation time in ISO8601 format |
| `rawOb` | `string` | Raw PIREP text |
| `reportType` | `string` | Report type (PIREP or AIREP) |
| `temp` | `float` | Temperature in Celsius |
| `turbulence` | `string` | Turbulence report |
| `visibility` | `string` | Visibility |
| `wdir` | `int` | Wind direction in degrees |
| `wspd` | `int` | Wind speed in knots |
| `wxString` | `string` | Weather phenomena string |

#### Example: List

```php
// list() returns an array of Pirep entities, one per record (throws on error).
$pireps = $client->Pirep()->list();
```


### StationInfo

Create an instance: `$station_info = $client->StationInfo();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` | Country code |
| `elev` | `float` | Elevation in meters |
| `iataId` | `string` | IATA identifier |
| `icaoId` | `string` | ICAO station identifier |
| `lat` | `float` | Latitude |
| `lon` | `float` | Longitude |
| `name` | `string` | Station name |
| `priority` | `int` | Priority level |
| `site` | `string` | Site type |
| `state` | `string` | State or province |

#### Example: List

```php
// list() returns an array of StationInfo entities, one per record (throws on error).
$station_infos = $client->StationInfo()->list();
```


### Taf

Create an instance: `$taf = $client->Taf();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bulletinTime` | `string` | Bulletin time in ISO8601 format |
| `elev` | `float` | Elevation in meters |
| `fcsts` | `array` | Forecast periods |
| `icaoId` | `string` | ICAO station identifier |
| `issueTime` | `string` | TAF issue time in ISO8601 format |
| `lat` | `float` | Latitude |
| `lon` | `float` | Longitude |
| `name` | `string` | Station name |
| `rawTAF` | `string` | Raw TAF forecast text |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```php
// list() returns an array of Taf entities, one per record (throws on error).
$tafs = $client->Taf()->list();
```


### Tcf

Create an instance: `$tcf = $client->Tcf();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Tcf record (throws on error).
$tcf = $client->Tcf()->load();
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── aviationweatherdata_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`aviationweatherdata_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$airport = $client->Airport();
$airport->list();

// $airport->data_get() now returns the airport data from the last list
// $airport->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
