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
| `city` | `string` | No | City |
| `country` | `string` | No | Country code |
| `elev` | `float64` | No | Elevation in meters |
| `iataId` | `string` | No | IATA identifier |
| `icaoId` | `string` | No | ICAO airport identifier |
| `lat` | `float64` | No | Latitude |
| `lon` | `float64` | No | Longitude |
| `name` | `string` | No | Airport name |
| `state` | `string` | No | State or province |

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
| `cwsu` | `string` | No | Center Weather Service Unit |
| `issueTime` | `string` | No | Issue time in ISO8601 format |
| `rawText` | `string` | No | Raw CWA text |
| `sequence` | `int` | No | Sequence number |
| `seriesId` | `string` | No | Series identifier |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

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
| `altitudeHigh` | `int` | No | Upper altitude in feet MSL |
| `altitudeLow` | `int` | No | Lower altitude in feet MSL |
| `hazard` | `string` | No | Hazard type |
| `issueTime` | `string` | No | Issue time in ISO8601 format |
| `qualifier` | `string` | No | Forecast qualifier |
| `severity` | `string` | No | Severity level |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

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
| `altim` | `float64` | No | Altimeter setting in inches of mercury |
| `clouds` | `[]any` | No | Cloud layers |
| `dewp` | `float64` | No | Dewpoint in Celsius |
| `elev` | `float64` | No | Elevation in meters |
| `fltCat` | `string` | No | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | `string` | No | ICAO station identifier |
| `lat` | `float64` | No | Latitude |
| `lon` | `float64` | No | Longitude |
| `maxT` | `float64` | No | Maximum temperature |
| `maxT24` | `float64` | No | 24-hour maximum temperature |
| `metarType` | `string` | No | METAR type (METAR or SPECI) |
| `minT` | `float64` | No | Minimum temperature |
| `minT24` | `float64` | No | 24-hour minimum temperature |
| `mostRecent` | `int` | No | Most recent observation flag |
| `name` | `string` | No | Station name |
| `obsTime` | `string` | No | Observation time in ISO8601 format |
| `pcp24hr` | `float64` | No | 24-hour precipitation |
| `pcp3hr` | `float64` | No | 3-hour precipitation |
| `pcp6hr` | `float64` | No | 6-hour precipitation |
| `precip` | `float64` | No | Precipitation |
| `presTend` | `float64` | No | Pressure tendency |
| `prior` | `int` | No | Prior observation indicator |
| `qcField` | `int` | No | Quality control field |
| `rawOb` | `string` | No | Raw METAR observation text |
| `rawTaf` | `string` | No | Raw TAF if available |
| `reportTime` | `string` | No | Report time in ISO8601 format |
| `slp` | `float64` | No | Sea level pressure |
| `snow` | `float64` | No | Snow depth |
| `temp` | `float64` | No | Temperature in Celsius |
| `vertVis` | `int` | No | Vertical visibility |
| `visib` | `string` | No | Visibility |
| `wdir` | `int` | No | Wind direction in degrees |
| `wgst` | `int` | No | Wind gust in knots |
| `wspd` | `int` | No | Wind speed in knots |
| `wxString` | `string` | No | Weather phenomena string |

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
| `aircraftType` | `string` | No | Aircraft type |
| `altitudeFt` | `int` | No | Altitude in feet MSL |
| `clouds` | `[]any` | No | Cloud reports |
| `icing` | `string` | No | Icing report |
| `lat` | `float64` | No | Latitude |
| `lon` | `float64` | No | Longitude |
| `obsTime` | `string` | No | Observation time in ISO8601 format |
| `rawOb` | `string` | No | Raw PIREP text |
| `reportType` | `string` | No | Report type (PIREP or AIREP) |
| `temp` | `float64` | No | Temperature in Celsius |
| `turbulence` | `string` | No | Turbulence report |
| `visibility` | `string` | No | Visibility |
| `wdir` | `int` | No | Wind direction in degrees |
| `wspd` | `int` | No | Wind speed in knots |
| `wxString` | `string` | No | Weather phenomena string |

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
| `country` | `string` | No | Country code |
| `elev` | `float64` | No | Elevation in meters |
| `iataId` | `string` | No | IATA identifier |
| `icaoId` | `string` | No | ICAO station identifier |
| `lat` | `float64` | No | Latitude |
| `lon` | `float64` | No | Longitude |
| `name` | `string` | No | Station name |
| `priority` | `int` | No | Priority level |
| `site` | `string` | No | Site type |
| `state` | `string` | No | State or province |

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
| `bulletinTime` | `string` | No | Bulletin time in ISO8601 format |
| `elev` | `float64` | No | Elevation in meters |
| `fcsts` | `[]any` | No | Forecast periods |
| `icaoId` | `string` | No | ICAO station identifier |
| `issueTime` | `string` | No | TAF issue time in ISO8601 format |
| `lat` | `float64` | No | Latitude |
| `lon` | `float64` | No | Longitude |
| `name` | `string` | No | Station name |
| `rawTAF` | `string` | No | Raw TAF forecast text |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

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
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```go
client := sdk.NewAviationweatherDataSDK(map[string]any{
    "feature": map[string]any{
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
    },
})
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

