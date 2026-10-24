# AviationweatherData PHP SDK Reference

Complete API reference for the AviationweatherData PHP SDK.


## AviationweatherDataSDK

### Constructor

```php
require_once __DIR__ . '/aviationweatherdata_sdk.php';

$client = new AviationweatherDataSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AviationweatherDataSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = AviationweatherDataSDK::test();
```


### Instance Methods

#### `AirSigmet($data = null)`

Create a new `AirSigmetEntity` instance. Pass `null` for no initial data.

#### `Airport($data = null)`

Create a new `AirportEntity` instance. Pass `null` for no initial data.

#### `Cache($data = null)`

Create a new `CacheEntity` instance. Pass `null` for no initial data.

#### `Cwa($data = null)`

Create a new `CwaEntity` instance. Pass `null` for no initial data.

#### `GAirmet($data = null)`

Create a new `GAirmetEntity` instance. Pass `null` for no initial data.

#### `Metar($data = null)`

Create a new `MetarEntity` instance. Pass `null` for no initial data.

#### `Pirep($data = null)`

Create a new `PirepEntity` instance. Pass `null` for no initial data.

#### `StationInfo($data = null)`

Create a new `StationInfoEntity` instance. Pass `null` for no initial data.

#### `Taf($data = null)`

Create a new `TafEntity` instance. Pass `null` for no initial data.

#### `Tcf($data = null)`

Create a new `TcfEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): AviationweatherDataUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AirSigmetEntity

```php
$air_sigmet = $client->AirSigmet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `airsigmetType` | `string` | No | SIGMET type |
| `altitudeHigh` | `int` | No | Upper altitude in feet MSL |
| `altitudeLow` | `int` | No | Lower altitude in feet MSL |
| `fir` | `string` | No | Flight Information Region |
| `hazard` | `string` | No | Hazard type |
| `issueTime` | `string` | No | Issue time in ISO8601 format |
| `rawAirSigmet` | `string` | No | Raw SIGMET text |
| `severity` | `string` | No | Severity level |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AirSigmet()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AirSigmetEntity`

Create a new `AirSigmetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AirportEntity

```php
$airport = $client->Airport();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No | City |
| `country` | `string` | No | Country code |
| `elev` | `float` | No | Elevation in meters |
| `iataId` | `string` | No | IATA identifier |
| `icaoId` | `string` | No | ICAO airport identifier |
| `lat` | `float` | No | Latitude |
| `lon` | `float` | No | Longitude |
| `name` | `string` | No | Airport name |
| `state` | `string` | No | State or province |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Airport()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AirportEntity`

Create a new `AirportEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CacheEntity

```php
$cache = $client->Cache();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CacheEntity`

Create a new `CacheEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CwaEntity

```php
$cwa = $client->Cwa();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cwsu` | `string` | No | Center Weather Service Unit |
| `issueTime` | `string` | No | Issue time in ISO8601 format |
| `rawText` | `string` | No | Raw CWA text |
| `sequence` | `int` | No | Sequence number |
| `seriesId` | `string` | No | Series identifier |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Cwa()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CwaEntity`

Create a new `CwaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GAirmetEntity

```php
$g_airmet = $client->GAirmet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altitudeHigh` | `int` | No | Upper altitude in feet MSL |
| `altitudeLow` | `int` | No | Lower altitude in feet MSL |
| `hazard` | `string` | No | Hazard type |
| `issueTime` | `string` | No | Issue time in ISO8601 format |
| `qualifier` | `string` | No | Forecast qualifier |
| `severity` | `string` | No | Severity level |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->GAirmet()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GAirmetEntity`

Create a new `GAirmetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MetarEntity

```php
$metar = $client->Metar();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altim` | `float` | No | Altimeter setting in inches of mercury |
| `clouds` | `array` | No | Cloud layers |
| `dewp` | `float` | No | Dewpoint in Celsius |
| `elev` | `float` | No | Elevation in meters |
| `fltCat` | `string` | No | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | `string` | No | ICAO station identifier |
| `lat` | `float` | No | Latitude |
| `lon` | `float` | No | Longitude |
| `maxT` | `float` | No | Maximum temperature |
| `maxT24` | `float` | No | 24-hour maximum temperature |
| `metarType` | `string` | No | METAR type (METAR or SPECI) |
| `minT` | `float` | No | Minimum temperature |
| `minT24` | `float` | No | 24-hour minimum temperature |
| `mostRecent` | `int` | No | Most recent observation flag |
| `name` | `string` | No | Station name |
| `obsTime` | `string` | No | Observation time in ISO8601 format |
| `pcp24hr` | `float` | No | 24-hour precipitation |
| `pcp3hr` | `float` | No | 3-hour precipitation |
| `pcp6hr` | `float` | No | 6-hour precipitation |
| `precip` | `float` | No | Precipitation |
| `presTend` | `float` | No | Pressure tendency |
| `prior` | `int` | No | Prior observation indicator |
| `qcField` | `int` | No | Quality control field |
| `rawOb` | `string` | No | Raw METAR observation text |
| `rawTaf` | `string` | No | Raw TAF if available |
| `reportTime` | `string` | No | Report time in ISO8601 format |
| `slp` | `float` | No | Sea level pressure |
| `snow` | `float` | No | Snow depth |
| `temp` | `float` | No | Temperature in Celsius |
| `vertVis` | `int` | No | Vertical visibility |
| `visib` | `string` | No | Visibility |
| `wdir` | `int` | No | Wind direction in degrees |
| `wgst` | `int` | No | Wind gust in knots |
| `wspd` | `int` | No | Wind speed in knots |
| `wxString` | `string` | No | Weather phenomena string |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Metar()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MetarEntity`

Create a new `MetarEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PirepEntity

```php
$pirep = $client->Pirep();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aircraftType` | `string` | No | Aircraft type |
| `altitudeFt` | `int` | No | Altitude in feet MSL |
| `clouds` | `array` | No | Cloud reports |
| `icing` | `string` | No | Icing report |
| `lat` | `float` | No | Latitude |
| `lon` | `float` | No | Longitude |
| `obsTime` | `string` | No | Observation time in ISO8601 format |
| `rawOb` | `string` | No | Raw PIREP text |
| `reportType` | `string` | No | Report type (PIREP or AIREP) |
| `temp` | `float` | No | Temperature in Celsius |
| `turbulence` | `string` | No | Turbulence report |
| `visibility` | `string` | No | Visibility |
| `wdir` | `int` | No | Wind direction in degrees |
| `wspd` | `int` | No | Wind speed in knots |
| `wxString` | `string` | No | Weather phenomena string |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Pirep()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PirepEntity`

Create a new `PirepEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StationInfoEntity

```php
$station_info = $client->StationInfo();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | No | Country code |
| `elev` | `float` | No | Elevation in meters |
| `iataId` | `string` | No | IATA identifier |
| `icaoId` | `string` | No | ICAO station identifier |
| `lat` | `float` | No | Latitude |
| `lon` | `float` | No | Longitude |
| `name` | `string` | No | Station name |
| `priority` | `int` | No | Priority level |
| `site` | `string` | No | Site type |
| `state` | `string` | No | State or province |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->StationInfo()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StationInfoEntity`

Create a new `StationInfoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TafEntity

```php
$taf = $client->Taf();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bulletinTime` | `string` | No | Bulletin time in ISO8601 format |
| `elev` | `float` | No | Elevation in meters |
| `fcsts` | `array` | No | Forecast periods |
| `icaoId` | `string` | No | ICAO station identifier |
| `issueTime` | `string` | No | TAF issue time in ISO8601 format |
| `lat` | `float` | No | Latitude |
| `lon` | `float` | No | Longitude |
| `name` | `string` | No | Station name |
| `rawTAF` | `string` | No | Raw TAF forecast text |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Taf()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TafEntity`

Create a new `TafEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TcfEntity

```php
$tcf = $client->Tcf();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Tcf()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TcfEntity`

Create a new `TcfEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```php
$client = new AviationweatherDataSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

