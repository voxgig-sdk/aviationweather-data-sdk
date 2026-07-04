# AviationweatherData PHP SDK



The PHP SDK for the AviationweatherData API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/aviationweather-data-sdk/releases](https://github.com/voxgig-sdk/aviationweather-data-sdk/releases)


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
    // list() returns an array of AirSigmet records — iterate directly.
    $airsigmets = $client->AirSigmet()->list();
    foreach ($airsigmets as $item) {
        echo $item["id"] . " " . $item["name"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
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
    echo "Error: " . $result["err"]->getMessage();
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

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = AviationweatherDataSDK::test([
    "entity" => ["airsigmet" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$airsigmet = $client->AirSigmet()->load(["id" => "test01"]);
print_r($airsigmet);
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
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

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
| `airsigmet_type` |  |
| `altitude_high` |  |
| `altitude_low` |  |
| `fir` |  |
| `hazard` |  |
| `issue_time` |  |
| `raw_air_sigmet` |  |
| `severity` |  |
| `valid_time_from` |  |
| `valid_time_to` |  |

Operations: List.

API path: `/api/data/airsigmet`

#### Airport

| Field | Description |
| --- | --- |
| `city` |  |
| `country` |  |
| `elev` |  |
| `iata_id` |  |
| `icao_id` |  |
| `lat` |  |
| `lon` |  |
| `name` |  |
| `state` |  |

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
| `cwsu` |  |
| `issue_time` |  |
| `raw_text` |  |
| `sequence` |  |
| `series_id` |  |
| `valid_time_from` |  |
| `valid_time_to` |  |

Operations: List.

API path: `/api/data/cwa`

#### GAirmet

| Field | Description |
| --- | --- |
| `altitude_high` |  |
| `altitude_low` |  |
| `hazard` |  |
| `issue_time` |  |
| `qualifier` |  |
| `severity` |  |
| `valid_time_from` |  |
| `valid_time_to` |  |

Operations: List.

API path: `/api/data/gairmet`

#### Metar

| Field | Description |
| --- | --- |
| `altim` |  |
| `cloud` |  |
| `dewp` |  |
| `elev` |  |
| `flt_cat` |  |
| `icao_id` |  |
| `lat` |  |
| `lon` |  |
| `max_t` |  |
| `max_t24` |  |
| `metar_type` |  |
| `min_t` |  |
| `min_t24` |  |
| `most_recent` |  |
| `name` |  |
| `obs_time` |  |
| `pcp24hr` |  |
| `pcp3hr` |  |
| `pcp6hr` |  |
| `precip` |  |
| `pres_tend` |  |
| `prior` |  |
| `qc_field` |  |
| `raw_ob` |  |
| `raw_taf` |  |
| `report_time` |  |
| `slp` |  |
| `snow` |  |
| `temp` |  |
| `vert_vi` |  |
| `visib` |  |
| `wdir` |  |
| `wgst` |  |
| `wspd` |  |
| `wx_string` |  |

Operations: List.

API path: `/api/data/metar`

#### Pirep

| Field | Description |
| --- | --- |
| `aircraft_type` |  |
| `altitude_ft` |  |
| `cloud` |  |
| `icing` |  |
| `lat` |  |
| `lon` |  |
| `obs_time` |  |
| `raw_ob` |  |
| `report_type` |  |
| `temp` |  |
| `turbulence` |  |
| `visibility` |  |
| `wdir` |  |
| `wspd` |  |
| `wx_string` |  |

Operations: List.

API path: `/api/data/pirep`

#### StationInfo

| Field | Description |
| --- | --- |
| `country` |  |
| `elev` |  |
| `iata_id` |  |
| `icao_id` |  |
| `lat` |  |
| `lon` |  |
| `name` |  |
| `priority` |  |
| `site` |  |
| `state` |  |

Operations: List.

API path: `/api/data/stationinfo`

#### Taf

| Field | Description |
| --- | --- |
| `bulletin_time` |  |
| `elev` |  |
| `fcst` |  |
| `icao_id` |  |
| `issue_time` |  |
| `lat` |  |
| `lon` |  |
| `name` |  |
| `raw_taf` |  |
| `valid_time_from` |  |
| `valid_time_to` |  |

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
| `airsigmet_type` | ``$STRING`` |  |
| `altitude_high` | ``$INTEGER`` |  |
| `altitude_low` | ``$INTEGER`` |  |
| `fir` | ``$STRING`` |  |
| `hazard` | ``$STRING`` |  |
| `issue_time` | ``$STRING`` |  |
| `raw_air_sigmet` | ``$STRING`` |  |
| `severity` | ``$STRING`` |  |
| `valid_time_from` | ``$STRING`` |  |
| `valid_time_to` | ``$STRING`` |  |

#### Example: List

```php
// list() returns an array of AirSigmet records (throws on error).
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
| `city` | ``$STRING`` |  |
| `country` | ``$STRING`` |  |
| `elev` | ``$NUMBER`` |  |
| `iata_id` | ``$STRING`` |  |
| `icao_id` | ``$STRING`` |  |
| `lat` | ``$NUMBER`` |  |
| `lon` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `state` | ``$STRING`` |  |

#### Example: List

```php
// list() returns an array of Airport records (throws on error).
$airports = $client->Airport()->list();
```


### Cache

Create an instance: `$cache = $client->Cache();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare Cache record (throws on error).
$cache = $client->Cache()->load(["id" => "cache_id"]);
```


### Cwa

Create an instance: `$cwa = $client->Cwa();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cwsu` | ``$STRING`` |  |
| `issue_time` | ``$STRING`` |  |
| `raw_text` | ``$STRING`` |  |
| `sequence` | ``$INTEGER`` |  |
| `series_id` | ``$STRING`` |  |
| `valid_time_from` | ``$STRING`` |  |
| `valid_time_to` | ``$STRING`` |  |

#### Example: List

```php
// list() returns an array of Cwa records (throws on error).
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
| `altitude_high` | ``$INTEGER`` |  |
| `altitude_low` | ``$INTEGER`` |  |
| `hazard` | ``$STRING`` |  |
| `issue_time` | ``$STRING`` |  |
| `qualifier` | ``$STRING`` |  |
| `severity` | ``$STRING`` |  |
| `valid_time_from` | ``$STRING`` |  |
| `valid_time_to` | ``$STRING`` |  |

#### Example: List

```php
// list() returns an array of GAirmet records (throws on error).
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
| `altim` | ``$NUMBER`` |  |
| `cloud` | ``$ARRAY`` |  |
| `dewp` | ``$NUMBER`` |  |
| `elev` | ``$NUMBER`` |  |
| `flt_cat` | ``$STRING`` |  |
| `icao_id` | ``$STRING`` |  |
| `lat` | ``$NUMBER`` |  |
| `lon` | ``$NUMBER`` |  |
| `max_t` | ``$NUMBER`` |  |
| `max_t24` | ``$NUMBER`` |  |
| `metar_type` | ``$STRING`` |  |
| `min_t` | ``$NUMBER`` |  |
| `min_t24` | ``$NUMBER`` |  |
| `most_recent` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `obs_time` | ``$STRING`` |  |
| `pcp24hr` | ``$NUMBER`` |  |
| `pcp3hr` | ``$NUMBER`` |  |
| `pcp6hr` | ``$NUMBER`` |  |
| `precip` | ``$NUMBER`` |  |
| `pres_tend` | ``$NUMBER`` |  |
| `prior` | ``$INTEGER`` |  |
| `qc_field` | ``$INTEGER`` |  |
| `raw_ob` | ``$STRING`` |  |
| `raw_taf` | ``$STRING`` |  |
| `report_time` | ``$STRING`` |  |
| `slp` | ``$NUMBER`` |  |
| `snow` | ``$NUMBER`` |  |
| `temp` | ``$NUMBER`` |  |
| `vert_vi` | ``$INTEGER`` |  |
| `visib` | ``$STRING`` |  |
| `wdir` | ``$INTEGER`` |  |
| `wgst` | ``$INTEGER`` |  |
| `wspd` | ``$INTEGER`` |  |
| `wx_string` | ``$STRING`` |  |

#### Example: List

```php
// list() returns an array of Metar records (throws on error).
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
| `aircraft_type` | ``$STRING`` |  |
| `altitude_ft` | ``$INTEGER`` |  |
| `cloud` | ``$ARRAY`` |  |
| `icing` | ``$STRING`` |  |
| `lat` | ``$NUMBER`` |  |
| `lon` | ``$NUMBER`` |  |
| `obs_time` | ``$STRING`` |  |
| `raw_ob` | ``$STRING`` |  |
| `report_type` | ``$STRING`` |  |
| `temp` | ``$NUMBER`` |  |
| `turbulence` | ``$STRING`` |  |
| `visibility` | ``$STRING`` |  |
| `wdir` | ``$INTEGER`` |  |
| `wspd` | ``$INTEGER`` |  |
| `wx_string` | ``$STRING`` |  |

#### Example: List

```php
// list() returns an array of Pirep records (throws on error).
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
| `country` | ``$STRING`` |  |
| `elev` | ``$NUMBER`` |  |
| `iata_id` | ``$STRING`` |  |
| `icao_id` | ``$STRING`` |  |
| `lat` | ``$NUMBER`` |  |
| `lon` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `priority` | ``$INTEGER`` |  |
| `site` | ``$STRING`` |  |
| `state` | ``$STRING`` |  |

#### Example: List

```php
// list() returns an array of StationInfo records (throws on error).
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
| `bulletin_time` | ``$STRING`` |  |
| `elev` | ``$NUMBER`` |  |
| `fcst` | ``$ARRAY`` |  |
| `icao_id` | ``$STRING`` |  |
| `issue_time` | ``$STRING`` |  |
| `lat` | ``$NUMBER`` |  |
| `lon` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `raw_taf` | ``$STRING`` |  |
| `valid_time_from` | ``$STRING`` |  |
| `valid_time_to` | ``$STRING`` |  |

#### Example: List

```php
// list() returns an array of Taf records (throws on error).
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
// load() returns the bare Tcf record (throws on error).
$tcf = $client->Tcf()->load(["id" => "tcf_id"]);
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$airsigmet = $client->AirSigmet();
$airsigmet->load(["id" => "example_id"]);

// $airsigmet->dataGet() now returns the loaded airsigmet data
// $airsigmet->matchGet() returns the last match criteria
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
