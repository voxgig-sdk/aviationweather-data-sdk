# AviationweatherData Ruby SDK Reference

Complete API reference for the AviationweatherData Ruby SDK.


## AviationweatherDataSDK

### Constructor

```ruby
require_relative 'AviationweatherData_sdk'

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
| `airsigmetType` | `String` | No |  |
| `altitudeHigh` | `Integer` | No |  |
| `altitudeLow` | `Integer` | No |  |
| `fir` | `String` | No |  |
| `hazard` | `String` | No |  |
| `issueTime` | `String` | No |  |
| `rawAirSigmet` | `String` | No |  |
| `severity` | `String` | No |  |
| `validTimeFrom` | `String` | No |  |
| `validTimeTo` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.AirSigmet.list
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
| `city` | `String` | No |  |
| `country` | `String` | No |  |
| `elev` | `Float` | No |  |
| `iataId` | `String` | No |  |
| `icaoId` | `String` | No |  |
| `lat` | `Float` | No |  |
| `lon` | `Float` | No |  |
| `name` | `String` | No |  |
| `state` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Airport.list
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
result = client.Cache.load()
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
| `cwsu` | `String` | No |  |
| `issueTime` | `String` | No |  |
| `rawText` | `String` | No |  |
| `sequence` | `Integer` | No |  |
| `seriesId` | `String` | No |  |
| `validTimeFrom` | `String` | No |  |
| `validTimeTo` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Cwa.list
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
| `altitudeHigh` | `Integer` | No |  |
| `altitudeLow` | `Integer` | No |  |
| `hazard` | `String` | No |  |
| `issueTime` | `String` | No |  |
| `qualifier` | `String` | No |  |
| `severity` | `String` | No |  |
| `validTimeFrom` | `String` | No |  |
| `validTimeTo` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.GAirmet.list
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
| `altim` | `Float` | No |  |
| `clouds` | `Array` | No |  |
| `dewp` | `Float` | No |  |
| `elev` | `Float` | No |  |
| `fltCat` | `String` | No |  |
| `icaoId` | `String` | No |  |
| `lat` | `Float` | No |  |
| `lon` | `Float` | No |  |
| `maxT` | `Float` | No |  |
| `maxT24` | `Float` | No |  |
| `metarType` | `String` | No |  |
| `minT` | `Float` | No |  |
| `minT24` | `Float` | No |  |
| `mostRecent` | `Integer` | No |  |
| `name` | `String` | No |  |
| `obsTime` | `String` | No |  |
| `pcp24hr` | `Float` | No |  |
| `pcp3hr` | `Float` | No |  |
| `pcp6hr` | `Float` | No |  |
| `precip` | `Float` | No |  |
| `presTend` | `Float` | No |  |
| `prior` | `Integer` | No |  |
| `qcField` | `Integer` | No |  |
| `rawOb` | `String` | No |  |
| `rawTaf` | `String` | No |  |
| `reportTime` | `String` | No |  |
| `slp` | `Float` | No |  |
| `snow` | `Float` | No |  |
| `temp` | `Float` | No |  |
| `vertVis` | `Integer` | No |  |
| `visib` | `String` | No |  |
| `wdir` | `Integer` | No |  |
| `wgst` | `Integer` | No |  |
| `wspd` | `Integer` | No |  |
| `wxString` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Metar.list
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
| `aircraftType` | `String` | No |  |
| `altitudeFt` | `Integer` | No |  |
| `clouds` | `Array` | No |  |
| `icing` | `String` | No |  |
| `lat` | `Float` | No |  |
| `lon` | `Float` | No |  |
| `obsTime` | `String` | No |  |
| `rawOb` | `String` | No |  |
| `reportType` | `String` | No |  |
| `temp` | `Float` | No |  |
| `turbulence` | `String` | No |  |
| `visibility` | `String` | No |  |
| `wdir` | `Integer` | No |  |
| `wspd` | `Integer` | No |  |
| `wxString` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Pirep.list
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
| `country` | `String` | No |  |
| `elev` | `Float` | No |  |
| `iataId` | `String` | No |  |
| `icaoId` | `String` | No |  |
| `lat` | `Float` | No |  |
| `lon` | `Float` | No |  |
| `name` | `String` | No |  |
| `priority` | `Integer` | No |  |
| `site` | `String` | No |  |
| `state` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.StationInfo.list
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
| `bulletinTime` | `String` | No |  |
| `elev` | `Float` | No |  |
| `fcsts` | `Array` | No |  |
| `icaoId` | `String` | No |  |
| `issueTime` | `String` | No |  |
| `lat` | `Float` | No |  |
| `lon` | `Float` | No |  |
| `name` | `String` | No |  |
| `rawTAF` | `String` | No |  |
| `validTimeFrom` | `String` | No |  |
| `validTimeTo` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Taf.list
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
result = client.Tcf.load()
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

