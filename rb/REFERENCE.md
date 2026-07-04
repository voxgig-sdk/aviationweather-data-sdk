# AviationweatherData Ruby SDK Reference

Complete API reference for the AviationweatherData Ruby SDK.


## AviationweatherDataSDK

### Constructor

```ruby
require_relative 'aviationweather-data_sdk'

client = AviationweatherDataSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AviationweatherDataSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = AviationweatherDataSDK.test
```


### Instance Methods

#### `AirSigmet(data = nil)`

Create a new `AirSigmet` entity instance. Pass `nil` for no initial data.

#### `Airport(data = nil)`

Create a new `Airport` entity instance. Pass `nil` for no initial data.

#### `Cache(data = nil)`

Create a new `Cache` entity instance. Pass `nil` for no initial data.

#### `Cwa(data = nil)`

Create a new `Cwa` entity instance. Pass `nil` for no initial data.

#### `GAirmet(data = nil)`

Create a new `GAirmet` entity instance. Pass `nil` for no initial data.

#### `Metar(data = nil)`

Create a new `Metar` entity instance. Pass `nil` for no initial data.

#### `Pirep(data = nil)`

Create a new `Pirep` entity instance. Pass `nil` for no initial data.

#### `StationInfo(data = nil)`

Create a new `StationInfo` entity instance. Pass `nil` for no initial data.

#### `Taf(data = nil)`

Create a new `Taf` entity instance. Pass `nil` for no initial data.

#### `Tcf(data = nil)`

Create a new `Tcf` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AirSigmetEntity

```ruby
air_sigmet = client.AirSigmet
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.AirSigmet.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AirSigmetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AirportEntity

```ruby
airport = client.Airport
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Airport.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AirportEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CacheEntity

```ruby
cache = client.Cache
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Cache.load({ "id" => "cache_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CacheEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CwaEntity

```ruby
cwa = client.Cwa
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Cwa.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CwaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GAirmetEntity

```ruby
g_airmet = client.GAirmet
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.GAirmet.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GAirmetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MetarEntity

```ruby
metar = client.Metar
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Metar.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MetarEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PirepEntity

```ruby
pirep = client.Pirep
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Pirep.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PirepEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StationInfoEntity

```ruby
station_info = client.StationInfo
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.StationInfo.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StationInfoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TafEntity

```ruby
taf = client.Taf
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Taf.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TafEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TcfEntity

```ruby
tcf = client.Tcf
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Tcf.load({ "id" => "tcf_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TcfEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = AviationweatherDataSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

