# AviationweatherData Golang SDK



The Golang SDK for the AviationweatherData API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.AirSigmet(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/aviationweather-data-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/aviationweather-data-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/aviationweather-data-sdk/go=../aviationweather-data-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/aviationweather-data-sdk/go"
)

func main() {
    client := sdk.New()

    // List airSigmet records — the value is a []any of entities, one per record.
    airSigmets, err := client.AirSigmet(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range airSigmets.([]any) {
        fmt.Println(item.(sdk.Entity).Data())
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
airports, err := client.Airport(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = airports
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

airports, err := client.Airport(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range airports.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewAviationweatherDataSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
AVIATIONWEATHER_DATA_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewAviationweatherDataSDK

```go
func NewAviationweatherDataSDK(options map[string]any) *AviationweatherDataSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *AviationweatherDataSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AviationweatherDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `AirSigmet` | `(data map[string]any) AviationweatherDataEntity` | Create an AirSigmet entity instance. |
| `Airport` | `(data map[string]any) AviationweatherDataEntity` | Create an Airport entity instance. |
| `Cache` | `(data map[string]any) AviationweatherDataEntity` | Create a Cache entity instance. |
| `Cwa` | `(data map[string]any) AviationweatherDataEntity` | Create a Cwa entity instance. |
| `GAirmet` | `(data map[string]any) AviationweatherDataEntity` | Create a GAirmet entity instance. |
| `Metar` | `(data map[string]any) AviationweatherDataEntity` | Create a Metar entity instance. |
| `Pirep` | `(data map[string]any) AviationweatherDataEntity` | Create a Pirep entity instance. |
| `StationInfo` | `(data map[string]any) AviationweatherDataEntity` | Create a StationInfo entity instance. |
| `Taf` | `(data map[string]any) AviationweatherDataEntity` | Create a Taf entity instance. |
| `Tcf` | `(data map[string]any) AviationweatherDataEntity` | Create a Tcf entity instance. |

### Entity interface (AviationweatherDataEntity)

All entities implement the `AviationweatherDataEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    airSigmet, err := client.AirSigmet(nil).List(nil, nil)
    if err != nil { /* handle */ }
    // airSigmet is a []any of entities, one per record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### AirSigmet

| Field | Description |
| --- | --- |
| `"airsigmetType"` | SIGMET type |
| `"altitudeHigh"` | Upper altitude in feet MSL |
| `"altitudeLow"` | Lower altitude in feet MSL |
| `"fir"` | Flight Information Region |
| `"hazard"` | Hazard type |
| `"issueTime"` | Issue time in ISO8601 format |
| `"rawAirSigmet"` | Raw SIGMET text |
| `"severity"` | Severity level |
| `"validTimeFrom"` | Valid time from in ISO8601 format |
| `"validTimeTo"` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/airsigmet`

#### Airport

| Field | Description |
| --- | --- |
| `"city"` | City |
| `"country"` | Country code |
| `"elev"` | Elevation in meters |
| `"iataId"` | IATA identifier |
| `"icaoId"` | ICAO airport identifier |
| `"lat"` | Latitude |
| `"lon"` | Longitude |
| `"name"` | Airport name |
| `"state"` | State or province |

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
| `"cwsu"` | Center Weather Service Unit |
| `"issueTime"` | Issue time in ISO8601 format |
| `"rawText"` | Raw CWA text |
| `"sequence"` | Sequence number |
| `"seriesId"` | Series identifier |
| `"validTimeFrom"` | Valid time from in ISO8601 format |
| `"validTimeTo"` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/cwa`

#### GAirmet

| Field | Description |
| --- | --- |
| `"altitudeHigh"` | Upper altitude in feet MSL |
| `"altitudeLow"` | Lower altitude in feet MSL |
| `"hazard"` | Hazard type |
| `"issueTime"` | Issue time in ISO8601 format |
| `"qualifier"` | Forecast qualifier |
| `"severity"` | Severity level |
| `"validTimeFrom"` | Valid time from in ISO8601 format |
| `"validTimeTo"` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/gairmet`

#### Metar

| Field | Description |
| --- | --- |
| `"altim"` | Altimeter setting in inches of mercury |
| `"clouds"` | Cloud layers |
| `"dewp"` | Dewpoint in Celsius |
| `"elev"` | Elevation in meters |
| `"fltCat"` | Flight category (VFR, MVFR, IFR, LIFR) |
| `"icaoId"` | ICAO station identifier |
| `"lat"` | Latitude |
| `"lon"` | Longitude |
| `"maxT"` | Maximum temperature |
| `"maxT24"` | 24-hour maximum temperature |
| `"metarType"` | METAR type (METAR or SPECI) |
| `"minT"` | Minimum temperature |
| `"minT24"` | 24-hour minimum temperature |
| `"mostRecent"` | Most recent observation flag |
| `"name"` | Station name |
| `"obsTime"` | Observation time in ISO8601 format |
| `"pcp24hr"` | 24-hour precipitation |
| `"pcp3hr"` | 3-hour precipitation |
| `"pcp6hr"` | 6-hour precipitation |
| `"precip"` | Precipitation |
| `"presTend"` | Pressure tendency |
| `"prior"` | Prior observation indicator |
| `"qcField"` | Quality control field |
| `"rawOb"` | Raw METAR observation text |
| `"rawTaf"` | Raw TAF if available |
| `"reportTime"` | Report time in ISO8601 format |
| `"slp"` | Sea level pressure |
| `"snow"` | Snow depth |
| `"temp"` | Temperature in Celsius |
| `"vertVis"` | Vertical visibility |
| `"visib"` | Visibility |
| `"wdir"` | Wind direction in degrees |
| `"wgst"` | Wind gust in knots |
| `"wspd"` | Wind speed in knots |
| `"wxString"` | Weather phenomena string |

Operations: List.

API path: `/api/data/metar`

#### Pirep

| Field | Description |
| --- | --- |
| `"aircraftType"` | Aircraft type |
| `"altitudeFt"` | Altitude in feet MSL |
| `"clouds"` | Cloud reports |
| `"icing"` | Icing report |
| `"lat"` | Latitude |
| `"lon"` | Longitude |
| `"obsTime"` | Observation time in ISO8601 format |
| `"rawOb"` | Raw PIREP text |
| `"reportType"` | Report type (PIREP or AIREP) |
| `"temp"` | Temperature in Celsius |
| `"turbulence"` | Turbulence report |
| `"visibility"` | Visibility |
| `"wdir"` | Wind direction in degrees |
| `"wspd"` | Wind speed in knots |
| `"wxString"` | Weather phenomena string |

Operations: List.

API path: `/api/data/pirep`

#### StationInfo

| Field | Description |
| --- | --- |
| `"country"` | Country code |
| `"elev"` | Elevation in meters |
| `"iataId"` | IATA identifier |
| `"icaoId"` | ICAO station identifier |
| `"lat"` | Latitude |
| `"lon"` | Longitude |
| `"name"` | Station name |
| `"priority"` | Priority level |
| `"site"` | Site type |
| `"state"` | State or province |

Operations: List.

API path: `/api/data/stationinfo`

#### Taf

| Field | Description |
| --- | --- |
| `"bulletinTime"` | Bulletin time in ISO8601 format |
| `"elev"` | Elevation in meters |
| `"fcsts"` | Forecast periods |
| `"icaoId"` | ICAO station identifier |
| `"issueTime"` | TAF issue time in ISO8601 format |
| `"lat"` | Latitude |
| `"lon"` | Longitude |
| `"name"` | Station name |
| `"rawTAF"` | Raw TAF forecast text |
| `"validTimeFrom"` | Valid time from in ISO8601 format |
| `"validTimeTo"` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/taf`

#### Tcf

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/data/tcf`



## Entities


### AirSigmet

Create an instance: `airSigmet := client.AirSigmet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
airSigmets, err := client.AirSigmet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range airSigmets.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Airport

Create an instance: `airport := client.Airport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` | City |
| `country` | `string` | Country code |
| `elev` | `float64` | Elevation in meters |
| `iataId` | `string` | IATA identifier |
| `icaoId` | `string` | ICAO airport identifier |
| `lat` | `float64` | Latitude |
| `lon` | `float64` | Longitude |
| `name` | `string` | Airport name |
| `state` | `string` | State or province |

#### Example: List

```go
airports, err := client.Airport(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range airports.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Cache

Create an instance: `cache := client.Cache(nil)`


### Cwa

Create an instance: `cwa := client.Cwa(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
cwas, err := client.Cwa(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range cwas.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### GAirmet

Create an instance: `gAirmet := client.GAirmet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
gAirmets, err := client.GAirmet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range gAirmets.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Metar

Create an instance: `metar := client.Metar(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altim` | `float64` | Altimeter setting in inches of mercury |
| `clouds` | `[]any` | Cloud layers |
| `dewp` | `float64` | Dewpoint in Celsius |
| `elev` | `float64` | Elevation in meters |
| `fltCat` | `string` | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | `string` | ICAO station identifier |
| `lat` | `float64` | Latitude |
| `lon` | `float64` | Longitude |
| `maxT` | `float64` | Maximum temperature |
| `maxT24` | `float64` | 24-hour maximum temperature |
| `metarType` | `string` | METAR type (METAR or SPECI) |
| `minT` | `float64` | Minimum temperature |
| `minT24` | `float64` | 24-hour minimum temperature |
| `mostRecent` | `int` | Most recent observation flag |
| `name` | `string` | Station name |
| `obsTime` | `string` | Observation time in ISO8601 format |
| `pcp24hr` | `float64` | 24-hour precipitation |
| `pcp3hr` | `float64` | 3-hour precipitation |
| `pcp6hr` | `float64` | 6-hour precipitation |
| `precip` | `float64` | Precipitation |
| `presTend` | `float64` | Pressure tendency |
| `prior` | `int` | Prior observation indicator |
| `qcField` | `int` | Quality control field |
| `rawOb` | `string` | Raw METAR observation text |
| `rawTaf` | `string` | Raw TAF if available |
| `reportTime` | `string` | Report time in ISO8601 format |
| `slp` | `float64` | Sea level pressure |
| `snow` | `float64` | Snow depth |
| `temp` | `float64` | Temperature in Celsius |
| `vertVis` | `int` | Vertical visibility |
| `visib` | `string` | Visibility |
| `wdir` | `int` | Wind direction in degrees |
| `wgst` | `int` | Wind gust in knots |
| `wspd` | `int` | Wind speed in knots |
| `wxString` | `string` | Weather phenomena string |

#### Example: List

```go
metars, err := client.Metar(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range metars.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Pirep

Create an instance: `pirep := client.Pirep(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aircraftType` | `string` | Aircraft type |
| `altitudeFt` | `int` | Altitude in feet MSL |
| `clouds` | `[]any` | Cloud reports |
| `icing` | `string` | Icing report |
| `lat` | `float64` | Latitude |
| `lon` | `float64` | Longitude |
| `obsTime` | `string` | Observation time in ISO8601 format |
| `rawOb` | `string` | Raw PIREP text |
| `reportType` | `string` | Report type (PIREP or AIREP) |
| `temp` | `float64` | Temperature in Celsius |
| `turbulence` | `string` | Turbulence report |
| `visibility` | `string` | Visibility |
| `wdir` | `int` | Wind direction in degrees |
| `wspd` | `int` | Wind speed in knots |
| `wxString` | `string` | Weather phenomena string |

#### Example: List

```go
pireps, err := client.Pirep(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pireps.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### StationInfo

Create an instance: `stationInfo := client.StationInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` | Country code |
| `elev` | `float64` | Elevation in meters |
| `iataId` | `string` | IATA identifier |
| `icaoId` | `string` | ICAO station identifier |
| `lat` | `float64` | Latitude |
| `lon` | `float64` | Longitude |
| `name` | `string` | Station name |
| `priority` | `int` | Priority level |
| `site` | `string` | Site type |
| `state` | `string` | State or province |

#### Example: List

```go
stationInfos, err := client.StationInfo(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range stationInfos.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Taf

Create an instance: `taf := client.Taf(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bulletinTime` | `string` | Bulletin time in ISO8601 format |
| `elev` | `float64` | Elevation in meters |
| `fcsts` | `[]any` | Forecast periods |
| `icaoId` | `string` | ICAO station identifier |
| `issueTime` | `string` | TAF issue time in ISO8601 format |
| `lat` | `float64` | Latitude |
| `lon` | `float64` | Longitude |
| `name` | `string` | Station name |
| `rawTAF` | `string` | Raw TAF forecast text |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```go
tafs, err := client.Taf(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range tafs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Tcf

Create an instance: `tcf := client.Tcf(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
tcf, err := client.Tcf(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(tcf.(sdk.Entity).Data()) // the loaded entity's record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/aviationweather-data-sdk/go/
├── aviationweather-data.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/aviationweather-data-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
airport := client.Airport(nil)
airport.List(nil, nil)

// airport.Data() now returns the airport data from the last list
// airport.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
