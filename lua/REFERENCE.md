# AviationweatherData Lua SDK Reference

Complete API reference for the AviationweatherData Lua SDK.


## AviationweatherDataSDK

### Constructor

```lua
local sdk = require("aviationweather-data_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `AirSigmet(data)`

Create a new `AirSigmet` entity instance. Pass `nil` for no initial data.

#### `Airport(data)`

Create a new `Airport` entity instance. Pass `nil` for no initial data.

#### `Cache(data)`

Create a new `Cache` entity instance. Pass `nil` for no initial data.

#### `Cwa(data)`

Create a new `Cwa` entity instance. Pass `nil` for no initial data.

#### `GAirmet(data)`

Create a new `GAirmet` entity instance. Pass `nil` for no initial data.

#### `Metar(data)`

Create a new `Metar` entity instance. Pass `nil` for no initial data.

#### `Pirep(data)`

Create a new `Pirep` entity instance. Pass `nil` for no initial data.

#### `StationInfo(data)`

Create a new `StationInfo` entity instance. Pass `nil` for no initial data.

#### `Taf(data)`

Create a new `Taf` entity instance. Pass `nil` for no initial data.

#### `Tcf(data)`

Create a new `Tcf` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AirSigmetEntity

```lua
local air_sigmet = client:AirSigmet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `airsigmet_type` | ``$STRING`` | No |  |
| `altitude_high` | ``$INTEGER`` | No |  |
| `altitude_low` | ``$INTEGER`` | No |  |
| `fir` | ``$STRING`` | No |  |
| `hazard` | ``$STRING`` | No |  |
| `issue_time` | ``$STRING`` | No |  |
| `raw_air_sigmet` | ``$STRING`` | No |  |
| `severity` | ``$STRING`` | No |  |
| `valid_time_from` | ``$STRING`` | No |  |
| `valid_time_to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:AirSigmet():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AirSigmetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AirportEntity

```lua
local airport = client:Airport(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$STRING`` | No |  |
| `country` | ``$STRING`` | No |  |
| `elev` | ``$NUMBER`` | No |  |
| `iata_id` | ``$STRING`` | No |  |
| `icao_id` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `state` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Airport():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AirportEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CacheEntity

```lua
local cache = client:Cache(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Cache():load({ id = "cache_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CacheEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CwaEntity

```lua
local cwa = client:Cwa(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cwsu` | ``$STRING`` | No |  |
| `issue_time` | ``$STRING`` | No |  |
| `raw_text` | ``$STRING`` | No |  |
| `sequence` | ``$INTEGER`` | No |  |
| `series_id` | ``$STRING`` | No |  |
| `valid_time_from` | ``$STRING`` | No |  |
| `valid_time_to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Cwa():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CwaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GAirmetEntity

```lua
local g_airmet = client:GAirmet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altitude_high` | ``$INTEGER`` | No |  |
| `altitude_low` | ``$INTEGER`` | No |  |
| `hazard` | ``$STRING`` | No |  |
| `issue_time` | ``$STRING`` | No |  |
| `qualifier` | ``$STRING`` | No |  |
| `severity` | ``$STRING`` | No |  |
| `valid_time_from` | ``$STRING`` | No |  |
| `valid_time_to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:GAirmet():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GAirmetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MetarEntity

```lua
local metar = client:Metar(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altim` | ``$NUMBER`` | No |  |
| `cloud` | ``$ARRAY`` | No |  |
| `dewp` | ``$NUMBER`` | No |  |
| `elev` | ``$NUMBER`` | No |  |
| `flt_cat` | ``$STRING`` | No |  |
| `icao_id` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `max_t` | ``$NUMBER`` | No |  |
| `max_t24` | ``$NUMBER`` | No |  |
| `metar_type` | ``$STRING`` | No |  |
| `min_t` | ``$NUMBER`` | No |  |
| `min_t24` | ``$NUMBER`` | No |  |
| `most_recent` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `obs_time` | ``$STRING`` | No |  |
| `pcp24hr` | ``$NUMBER`` | No |  |
| `pcp3hr` | ``$NUMBER`` | No |  |
| `pcp6hr` | ``$NUMBER`` | No |  |
| `precip` | ``$NUMBER`` | No |  |
| `pres_tend` | ``$NUMBER`` | No |  |
| `prior` | ``$INTEGER`` | No |  |
| `qc_field` | ``$INTEGER`` | No |  |
| `raw_ob` | ``$STRING`` | No |  |
| `raw_taf` | ``$STRING`` | No |  |
| `report_time` | ``$STRING`` | No |  |
| `slp` | ``$NUMBER`` | No |  |
| `snow` | ``$NUMBER`` | No |  |
| `temp` | ``$NUMBER`` | No |  |
| `vert_vi` | ``$INTEGER`` | No |  |
| `visib` | ``$STRING`` | No |  |
| `wdir` | ``$INTEGER`` | No |  |
| `wgst` | ``$INTEGER`` | No |  |
| `wspd` | ``$INTEGER`` | No |  |
| `wx_string` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Metar():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetarEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PirepEntity

```lua
local pirep = client:Pirep(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aircraft_type` | ``$STRING`` | No |  |
| `altitude_ft` | ``$INTEGER`` | No |  |
| `cloud` | ``$ARRAY`` | No |  |
| `icing` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `obs_time` | ``$STRING`` | No |  |
| `raw_ob` | ``$STRING`` | No |  |
| `report_type` | ``$STRING`` | No |  |
| `temp` | ``$NUMBER`` | No |  |
| `turbulence` | ``$STRING`` | No |  |
| `visibility` | ``$STRING`` | No |  |
| `wdir` | ``$INTEGER`` | No |  |
| `wspd` | ``$INTEGER`` | No |  |
| `wx_string` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Pirep():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PirepEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StationInfoEntity

```lua
local station_info = client:StationInfo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | ``$STRING`` | No |  |
| `elev` | ``$NUMBER`` | No |  |
| `iata_id` | ``$STRING`` | No |  |
| `icao_id` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `priority` | ``$INTEGER`` | No |  |
| `site` | ``$STRING`` | No |  |
| `state` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:StationInfo():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StationInfoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TafEntity

```lua
local taf = client:Taf(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bulletin_time` | ``$STRING`` | No |  |
| `elev` | ``$NUMBER`` | No |  |
| `fcst` | ``$ARRAY`` | No |  |
| `icao_id` | ``$STRING`` | No |  |
| `issue_time` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `raw_taf` | ``$STRING`` | No |  |
| `valid_time_from` | ``$STRING`` | No |  |
| `valid_time_to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Taf():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TafEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TcfEntity

```lua
local tcf = client:Tcf(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Tcf():load({ id = "tcf_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TcfEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

