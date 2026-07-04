# AviationweatherData Golang SDK



The Golang SDK for the AviationweatherData API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/aviationweather-data-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/aviationweather-data-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/aviationweather-data-sdk/go=../aviationweather-data-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"

    sdk "github.com/voxgig-sdk/aviationweather-data-sdk/go"
    "github.com/voxgig-sdk/aviationweather-data-sdk/go/core"
)

func main() {
    client := sdk.New()
```

### 2. List airsigmets

```go
    result, err := client.AirSigmet(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
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

result, err := client.AirSigmet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
| `AirSigmet` | `(data map[string]any) AviationweatherDataEntity` | Create a AirSigmet entity instance. |
| `Airport` | `(data map[string]any) AviationweatherDataEntity` | Create a Airport entity instance. |
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
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### AirSigmet

| Field | Description |
| --- | --- |
| `"airsigmet_type"` |  |
| `"altitude_high"` |  |
| `"altitude_low"` |  |
| `"fir"` |  |
| `"hazard"` |  |
| `"issue_time"` |  |
| `"raw_air_sigmet"` |  |
| `"severity"` |  |
| `"valid_time_from"` |  |
| `"valid_time_to"` |  |

Operations: List.

API path: `/api/data/airsigmet`

#### Airport

| Field | Description |
| --- | --- |
| `"city"` |  |
| `"country"` |  |
| `"elev"` |  |
| `"iata_id"` |  |
| `"icao_id"` |  |
| `"lat"` |  |
| `"lon"` |  |
| `"name"` |  |
| `"state"` |  |

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
| `"cwsu"` |  |
| `"issue_time"` |  |
| `"raw_text"` |  |
| `"sequence"` |  |
| `"series_id"` |  |
| `"valid_time_from"` |  |
| `"valid_time_to"` |  |

Operations: List.

API path: `/api/data/cwa`

#### GAirmet

| Field | Description |
| --- | --- |
| `"altitude_high"` |  |
| `"altitude_low"` |  |
| `"hazard"` |  |
| `"issue_time"` |  |
| `"qualifier"` |  |
| `"severity"` |  |
| `"valid_time_from"` |  |
| `"valid_time_to"` |  |

Operations: List.

API path: `/api/data/gairmet`

#### Metar

| Field | Description |
| --- | --- |
| `"altim"` |  |
| `"cloud"` |  |
| `"dewp"` |  |
| `"elev"` |  |
| `"flt_cat"` |  |
| `"icao_id"` |  |
| `"lat"` |  |
| `"lon"` |  |
| `"max_t"` |  |
| `"max_t24"` |  |
| `"metar_type"` |  |
| `"min_t"` |  |
| `"min_t24"` |  |
| `"most_recent"` |  |
| `"name"` |  |
| `"obs_time"` |  |
| `"pcp24hr"` |  |
| `"pcp3hr"` |  |
| `"pcp6hr"` |  |
| `"precip"` |  |
| `"pres_tend"` |  |
| `"prior"` |  |
| `"qc_field"` |  |
| `"raw_ob"` |  |
| `"raw_taf"` |  |
| `"report_time"` |  |
| `"slp"` |  |
| `"snow"` |  |
| `"temp"` |  |
| `"vert_vi"` |  |
| `"visib"` |  |
| `"wdir"` |  |
| `"wgst"` |  |
| `"wspd"` |  |
| `"wx_string"` |  |

Operations: List.

API path: `/api/data/metar`

#### Pirep

| Field | Description |
| --- | --- |
| `"aircraft_type"` |  |
| `"altitude_ft"` |  |
| `"cloud"` |  |
| `"icing"` |  |
| `"lat"` |  |
| `"lon"` |  |
| `"obs_time"` |  |
| `"raw_ob"` |  |
| `"report_type"` |  |
| `"temp"` |  |
| `"turbulence"` |  |
| `"visibility"` |  |
| `"wdir"` |  |
| `"wspd"` |  |
| `"wx_string"` |  |

Operations: List.

API path: `/api/data/pirep`

#### StationInfo

| Field | Description |
| --- | --- |
| `"country"` |  |
| `"elev"` |  |
| `"iata_id"` |  |
| `"icao_id"` |  |
| `"lat"` |  |
| `"lon"` |  |
| `"name"` |  |
| `"priority"` |  |
| `"site"` |  |
| `"state"` |  |

Operations: List.

API path: `/api/data/stationinfo`

#### Taf

| Field | Description |
| --- | --- |
| `"bulletin_time"` |  |
| `"elev"` |  |
| `"fcst"` |  |
| `"icao_id"` |  |
| `"issue_time"` |  |
| `"lat"` |  |
| `"lon"` |  |
| `"name"` |  |
| `"raw_taf"` |  |
| `"valid_time_from"` |  |
| `"valid_time_to"` |  |

Operations: List.

API path: `/api/data/taf`

#### Tcf

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/data/tcf`



## Entities


### AirSigmet

Create an instance: `air_sigmet := client.AirSigmet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.AirSigmet(nil).List(nil, nil)
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

```go
results, err := client.Airport(nil).List(nil, nil)
```


### Cache

Create an instance: `cache := client.Cache(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Cache(nil).Load(map[string]any{"id": "cache_id"}, nil)
```


### Cwa

Create an instance: `cwa := client.Cwa(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.Cwa(nil).List(nil, nil)
```


### GAirmet

Create an instance: `g_airmet := client.GAirmet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.GAirmet(nil).List(nil, nil)
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

```go
results, err := client.Metar(nil).List(nil, nil)
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

```go
results, err := client.Pirep(nil).List(nil, nil)
```


### StationInfo

Create an instance: `station_info := client.StationInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.StationInfo(nil).List(nil, nil)
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

```go
results, err := client.Taf(nil).List(nil, nil)
```


### Tcf

Create an instance: `tcf := client.Tcf(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Tcf(nil).Load(map[string]any{"id": "tcf_id"}, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
airsigmet := client.AirSigmet(nil)
airsigmet.Load(map[string]any{"id": "example_id"}, nil)

// airsigmet.Data() now returns the loaded airsigmet data
// airsigmet.Match() returns the last match criteria
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
