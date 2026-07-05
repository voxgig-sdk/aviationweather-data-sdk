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
| `airsigmet_type` | `string` | No |  |
| `altitude_high` | `int` | No |  |
| `altitude_low` | `int` | No |  |
| `fir` | `string` | No |  |
| `hazard` | `string` | No |  |
| `issue_time` | `string` | No |  |
| `raw_air_sigmet` | `string` | No |  |
| `severity` | `string` | No |  |
| `valid_time_from` | `string` | No |  |
| `valid_time_to` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

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
| `city` | `string` | No |  |
| `country` | `string` | No |  |
| `elev` | `float` | No |  |
| `iata_id` | `string` | No |  |
| `icao_id` | `string` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `name` | `string` | No |  |
| `state` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

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

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Cache()->load();
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
| `cwsu` | `string` | No |  |
| `issue_time` | `string` | No |  |
| `raw_text` | `string` | No |  |
| `sequence` | `int` | No |  |
| `series_id` | `string` | No |  |
| `valid_time_from` | `string` | No |  |
| `valid_time_to` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

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
| `altitude_high` | `int` | No |  |
| `altitude_low` | `int` | No |  |
| `hazard` | `string` | No |  |
| `issue_time` | `string` | No |  |
| `qualifier` | `string` | No |  |
| `severity` | `string` | No |  |
| `valid_time_from` | `string` | No |  |
| `valid_time_to` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

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
| `altim` | `float` | No |  |
| `cloud` | `array` | No |  |
| `dewp` | `float` | No |  |
| `elev` | `float` | No |  |
| `flt_cat` | `string` | No |  |
| `icao_id` | `string` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `max_t` | `float` | No |  |
| `max_t24` | `float` | No |  |
| `metar_type` | `string` | No |  |
| `min_t` | `float` | No |  |
| `min_t24` | `float` | No |  |
| `most_recent` | `int` | No |  |
| `name` | `string` | No |  |
| `obs_time` | `string` | No |  |
| `pcp24hr` | `float` | No |  |
| `pcp3hr` | `float` | No |  |
| `pcp6hr` | `float` | No |  |
| `precip` | `float` | No |  |
| `pres_tend` | `float` | No |  |
| `prior` | `int` | No |  |
| `qc_field` | `int` | No |  |
| `raw_ob` | `string` | No |  |
| `raw_taf` | `string` | No |  |
| `report_time` | `string` | No |  |
| `slp` | `float` | No |  |
| `snow` | `float` | No |  |
| `temp` | `float` | No |  |
| `vert_vi` | `int` | No |  |
| `visib` | `string` | No |  |
| `wdir` | `int` | No |  |
| `wgst` | `int` | No |  |
| `wspd` | `int` | No |  |
| `wx_string` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

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
| `aircraft_type` | `string` | No |  |
| `altitude_ft` | `int` | No |  |
| `cloud` | `array` | No |  |
| `icing` | `string` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `obs_time` | `string` | No |  |
| `raw_ob` | `string` | No |  |
| `report_type` | `string` | No |  |
| `temp` | `float` | No |  |
| `turbulence` | `string` | No |  |
| `visibility` | `string` | No |  |
| `wdir` | `int` | No |  |
| `wspd` | `int` | No |  |
| `wx_string` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

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
| `country` | `string` | No |  |
| `elev` | `float` | No |  |
| `iata_id` | `string` | No |  |
| `icao_id` | `string` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `name` | `string` | No |  |
| `priority` | `int` | No |  |
| `site` | `string` | No |  |
| `state` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

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
| `bulletin_time` | `string` | No |  |
| `elev` | `float` | No |  |
| `fcst` | `array` | No |  |
| `icao_id` | `string` | No |  |
| `issue_time` | `string` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `name` | `string` | No |  |
| `raw_taf` | `string` | No |  |
| `valid_time_from` | `string` | No |  |
| `valid_time_to` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

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

Load a single entity matching the given criteria. Throws on error.

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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new AviationweatherDataSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

