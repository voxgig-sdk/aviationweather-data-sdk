# AviationweatherData Golang SDK Reference

Complete API reference for the AviationweatherData Golang SDK.


## AviationweatherDataSDK

### Constructor

```go
func NewAviationweatherDataSDK(options map[string]any) *AviationweatherDataSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *AviationweatherDataSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *AviationweatherDataSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `AirSigmet(data map[string]any) AviationweatherDataEntity`

Create a new `AirSigmet` entity instance. Pass `nil` for no initial data.

#### `Airport(data map[string]any) AviationweatherDataEntity`

Create a new `Airport` entity instance. Pass `nil` for no initial data.

#### `Cache(data map[string]any) AviationweatherDataEntity`

Create a new `Cache` entity instance. Pass `nil` for no initial data.

#### `Cwa(data map[string]any) AviationweatherDataEntity`

Create a new `Cwa` entity instance. Pass `nil` for no initial data.

#### `GAirmet(data map[string]any) AviationweatherDataEntity`

Create a new `GAirmet` entity instance. Pass `nil` for no initial data.

#### `Metar(data map[string]any) AviationweatherDataEntity`

Create a new `Metar` entity instance. Pass `nil` for no initial data.

#### `Pirep(data map[string]any) AviationweatherDataEntity`

Create a new `Pirep` entity instance. Pass `nil` for no initial data.

#### `StationInfo(data map[string]any) AviationweatherDataEntity`

Create a new `StationInfo` entity instance. Pass `nil` for no initial data.

#### `Taf(data map[string]any) AviationweatherDataEntity`

Create a new `Taf` entity instance. Pass `nil` for no initial data.

#### `Tcf(data map[string]any) AviationweatherDataEntity`

Create a new `Tcf` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AirSigmetEntity

```go
airSigmet := client.AirSigmet(nil)
fmt.Println(airSigmet.GetName()) // "air_sigmet"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AirSigmet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AirSigmetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AirportEntity

```go
airport := client.Airport(nil)
fmt.Println(airport.GetName()) // "airport"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `country` | `string` | No |  |
| `elev` | `float64` | No |  |
| `iata_id` | `string` | No |  |
| `icao_id` | `string` | No |  |
| `lat` | `float64` | No |  |
| `lon` | `float64` | No |  |
| `name` | `string` | No |  |
| `state` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Airport(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AirportEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CacheEntity

```go
cache := client.Cache(nil)
fmt.Println(cache.GetName()) // "cache"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Cache(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CacheEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CwaEntity

```go
cwa := client.Cwa(nil)
fmt.Println(cwa.GetName()) // "cwa"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Cwa(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CwaEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GAirmetEntity

```go
gAirmet := client.GAirmet(nil)
fmt.Println(gAirmet.GetName()) // "g_airmet"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.GAirmet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GAirmetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MetarEntity

```go
metar := client.Metar(nil)
fmt.Println(metar.GetName()) // "metar"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altim` | `float64` | No |  |
| `cloud` | `[]any` | No |  |
| `dewp` | `float64` | No |  |
| `elev` | `float64` | No |  |
| `flt_cat` | `string` | No |  |
| `icao_id` | `string` | No |  |
| `lat` | `float64` | No |  |
| `lon` | `float64` | No |  |
| `max_t` | `float64` | No |  |
| `max_t24` | `float64` | No |  |
| `metar_type` | `string` | No |  |
| `min_t` | `float64` | No |  |
| `min_t24` | `float64` | No |  |
| `most_recent` | `int` | No |  |
| `name` | `string` | No |  |
| `obs_time` | `string` | No |  |
| `pcp24hr` | `float64` | No |  |
| `pcp3hr` | `float64` | No |  |
| `pcp6hr` | `float64` | No |  |
| `precip` | `float64` | No |  |
| `pres_tend` | `float64` | No |  |
| `prior` | `int` | No |  |
| `qc_field` | `int` | No |  |
| `raw_ob` | `string` | No |  |
| `raw_taf` | `string` | No |  |
| `report_time` | `string` | No |  |
| `slp` | `float64` | No |  |
| `snow` | `float64` | No |  |
| `temp` | `float64` | No |  |
| `vert_vi` | `int` | No |  |
| `visib` | `string` | No |  |
| `wdir` | `int` | No |  |
| `wgst` | `int` | No |  |
| `wspd` | `int` | No |  |
| `wx_string` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Metar(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MetarEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PirepEntity

```go
pirep := client.Pirep(nil)
fmt.Println(pirep.GetName()) // "pirep"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aircraft_type` | `string` | No |  |
| `altitude_ft` | `int` | No |  |
| `cloud` | `[]any` | No |  |
| `icing` | `string` | No |  |
| `lat` | `float64` | No |  |
| `lon` | `float64` | No |  |
| `obs_time` | `string` | No |  |
| `raw_ob` | `string` | No |  |
| `report_type` | `string` | No |  |
| `temp` | `float64` | No |  |
| `turbulence` | `string` | No |  |
| `visibility` | `string` | No |  |
| `wdir` | `int` | No |  |
| `wspd` | `int` | No |  |
| `wx_string` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Pirep(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PirepEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StationInfoEntity

```go
stationInfo := client.StationInfo(nil)
fmt.Println(stationInfo.GetName()) // "station_info"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | No |  |
| `elev` | `float64` | No |  |
| `iata_id` | `string` | No |  |
| `icao_id` | `string` | No |  |
| `lat` | `float64` | No |  |
| `lon` | `float64` | No |  |
| `name` | `string` | No |  |
| `priority` | `int` | No |  |
| `site` | `string` | No |  |
| `state` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.StationInfo(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StationInfoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TafEntity

```go
taf := client.Taf(nil)
fmt.Println(taf.GetName()) // "taf"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bulletin_time` | `string` | No |  |
| `elev` | `float64` | No |  |
| `fcst` | `[]any` | No |  |
| `icao_id` | `string` | No |  |
| `issue_time` | `string` | No |  |
| `lat` | `float64` | No |  |
| `lon` | `float64` | No |  |
| `name` | `string` | No |  |
| `raw_taf` | `string` | No |  |
| `valid_time_from` | `string` | No |  |
| `valid_time_to` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Taf(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TafEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TcfEntity

```go
tcf := client.Tcf(nil)
fmt.Println(tcf.GetName()) // "tcf"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Tcf(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TcfEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewAviationweatherDataSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

