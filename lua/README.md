# AviationweatherData Lua SDK



The Lua SDK for the AviationweatherData API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:AirSigmet()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/aviationweather-data-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("aviationweather-data_sdk")

local client = sdk.new()
```

### 2. List airsigmet records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local airsigmets, err = client:AirSigmet():list()
if err then error(err) end

for _, item in ipairs(airsigmets) do
  print(item["airsigmetType"])
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local airports, err = client:Airport():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Airport():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### AviationweatherDataSDK

```lua
local sdk = require("aviationweather-data_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AviationweatherDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `AirSigmet` | `(data) -> AirSigmetEntity` | Create an AirSigmet entity instance. |
| `Airport` | `(data) -> AirportEntity` | Create an Airport entity instance. |
| `Cache` | `(data) -> CacheEntity` | Create a Cache entity instance. |
| `Cwa` | `(data) -> CwaEntity` | Create a Cwa entity instance. |
| `GAirmet` | `(data) -> GAirmetEntity` | Create a GAirmet entity instance. |
| `Metar` | `(data) -> MetarEntity` | Create a Metar entity instance. |
| `Pirep` | `(data) -> PirepEntity` | Create a Pirep entity instance. |
| `StationInfo` | `(data) -> StationInfoEntity` | Create a StationInfo entity instance. |
| `Taf` | `(data) -> TafEntity` | Create a Taf entity instance. |
| `Tcf` | `(data) -> TcfEntity` | Create a Tcf entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local cache, err = client:Cache():load()
    if err then error(err) end
    -- cache is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### AirSigmet

| Field | Description |
| --- | --- |
| `airsigmetType` | SIGMET type |
| `altitudeHigh` | Upper altitude in feet MSL |
| `altitudeLow` | Lower altitude in feet MSL |
| `fir` | Flight Information Region |
| `hazard` | Hazard type |
| `issueTime` | Issue time in ISO8601 format |
| `rawAirSigmet` | Raw SIGMET text |
| `severity` | Severity level |
| `validTimeFrom` | Valid time from in ISO8601 format |
| `validTimeTo` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/airsigmet`

#### Airport

| Field | Description |
| --- | --- |
| `city` | City |
| `country` | Country code |
| `elev` | Elevation in meters |
| `iataId` | IATA identifier |
| `icaoId` | ICAO airport identifier |
| `lat` | Latitude |
| `lon` | Longitude |
| `name` | Airport name |
| `state` | State or province |

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
| `cwsu` | Center Weather Service Unit |
| `issueTime` | Issue time in ISO8601 format |
| `rawText` | Raw CWA text |
| `sequence` | Sequence number |
| `seriesId` | Series identifier |
| `validTimeFrom` | Valid time from in ISO8601 format |
| `validTimeTo` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/cwa`

#### GAirmet

| Field | Description |
| --- | --- |
| `altitudeHigh` | Upper altitude in feet MSL |
| `altitudeLow` | Lower altitude in feet MSL |
| `hazard` | Hazard type |
| `issueTime` | Issue time in ISO8601 format |
| `qualifier` | Forecast qualifier |
| `severity` | Severity level |
| `validTimeFrom` | Valid time from in ISO8601 format |
| `validTimeTo` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/gairmet`

#### Metar

| Field | Description |
| --- | --- |
| `altim` | Altimeter setting in inches of mercury |
| `clouds` | Cloud layers |
| `dewp` | Dewpoint in Celsius |
| `elev` | Elevation in meters |
| `fltCat` | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | ICAO station identifier |
| `lat` | Latitude |
| `lon` | Longitude |
| `maxT` | Maximum temperature |
| `maxT24` | 24-hour maximum temperature |
| `metarType` | METAR type (METAR or SPECI) |
| `minT` | Minimum temperature |
| `minT24` | 24-hour minimum temperature |
| `mostRecent` | Most recent observation flag |
| `name` | Station name |
| `obsTime` | Observation time in ISO8601 format |
| `pcp24hr` | 24-hour precipitation |
| `pcp3hr` | 3-hour precipitation |
| `pcp6hr` | 6-hour precipitation |
| `precip` | Precipitation |
| `presTend` | Pressure tendency |
| `prior` | Prior observation indicator |
| `qcField` | Quality control field |
| `rawOb` | Raw METAR observation text |
| `rawTaf` | Raw TAF if available |
| `reportTime` | Report time in ISO8601 format |
| `slp` | Sea level pressure |
| `snow` | Snow depth |
| `temp` | Temperature in Celsius |
| `vertVis` | Vertical visibility |
| `visib` | Visibility |
| `wdir` | Wind direction in degrees |
| `wgst` | Wind gust in knots |
| `wspd` | Wind speed in knots |
| `wxString` | Weather phenomena string |

Operations: List.

API path: `/api/data/metar`

#### Pirep

| Field | Description |
| --- | --- |
| `aircraftType` | Aircraft type |
| `altitudeFt` | Altitude in feet MSL |
| `clouds` | Cloud reports |
| `icing` | Icing report |
| `lat` | Latitude |
| `lon` | Longitude |
| `obsTime` | Observation time in ISO8601 format |
| `rawOb` | Raw PIREP text |
| `reportType` | Report type (PIREP or AIREP) |
| `temp` | Temperature in Celsius |
| `turbulence` | Turbulence report |
| `visibility` | Visibility |
| `wdir` | Wind direction in degrees |
| `wspd` | Wind speed in knots |
| `wxString` | Weather phenomena string |

Operations: List.

API path: `/api/data/pirep`

#### StationInfo

| Field | Description |
| --- | --- |
| `country` | Country code |
| `elev` | Elevation in meters |
| `iataId` | IATA identifier |
| `icaoId` | ICAO station identifier |
| `lat` | Latitude |
| `lon` | Longitude |
| `name` | Station name |
| `priority` | Priority level |
| `site` | Site type |
| `state` | State or province |

Operations: List.

API path: `/api/data/stationinfo`

#### Taf

| Field | Description |
| --- | --- |
| `bulletinTime` | Bulletin time in ISO8601 format |
| `elev` | Elevation in meters |
| `fcsts` | Forecast periods |
| `icaoId` | ICAO station identifier |
| `issueTime` | TAF issue time in ISO8601 format |
| `lat` | Latitude |
| `lon` | Longitude |
| `name` | Station name |
| `rawTAF` | Raw TAF forecast text |
| `validTimeFrom` | Valid time from in ISO8601 format |
| `validTimeTo` | Valid time to in ISO8601 format |

Operations: List.

API path: `/api/data/taf`

#### Tcf

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/data/tcf`



## Entities


### AirSigmet

Create an instance: `local air_sigmet = client:AirSigmet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `airsigmetType` | `string` | SIGMET type |
| `altitudeHigh` | `number` | Upper altitude in feet MSL |
| `altitudeLow` | `number` | Lower altitude in feet MSL |
| `fir` | `string` | Flight Information Region |
| `hazard` | `string` | Hazard type |
| `issueTime` | `string` | Issue time in ISO8601 format |
| `rawAirSigmet` | `string` | Raw SIGMET text |
| `severity` | `string` | Severity level |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```lua
local air_sigmets, err = client:AirSigmet():list()
```


### Airport

Create an instance: `local airport = client:Airport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` | City |
| `country` | `string` | Country code |
| `elev` | `number` | Elevation in meters |
| `iataId` | `string` | IATA identifier |
| `icaoId` | `string` | ICAO airport identifier |
| `lat` | `number` | Latitude |
| `lon` | `number` | Longitude |
| `name` | `string` | Airport name |
| `state` | `string` | State or province |

#### Example: List

```lua
local airports, err = client:Airport():list()
```


### Cache

Create an instance: `local cache = client:Cache(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local cache, err = client:Cache():load()
```


### Cwa

Create an instance: `local cwa = client:Cwa(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cwsu` | `string` | Center Weather Service Unit |
| `issueTime` | `string` | Issue time in ISO8601 format |
| `rawText` | `string` | Raw CWA text |
| `sequence` | `number` | Sequence number |
| `seriesId` | `string` | Series identifier |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```lua
local cwas, err = client:Cwa():list()
```


### GAirmet

Create an instance: `local g_airmet = client:GAirmet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altitudeHigh` | `number` | Upper altitude in feet MSL |
| `altitudeLow` | `number` | Lower altitude in feet MSL |
| `hazard` | `string` | Hazard type |
| `issueTime` | `string` | Issue time in ISO8601 format |
| `qualifier` | `string` | Forecast qualifier |
| `severity` | `string` | Severity level |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```lua
local g_airmets, err = client:GAirmet():list()
```


### Metar

Create an instance: `local metar = client:Metar(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altim` | `number` | Altimeter setting in inches of mercury |
| `clouds` | `table` | Cloud layers |
| `dewp` | `number` | Dewpoint in Celsius |
| `elev` | `number` | Elevation in meters |
| `fltCat` | `string` | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | `string` | ICAO station identifier |
| `lat` | `number` | Latitude |
| `lon` | `number` | Longitude |
| `maxT` | `number` | Maximum temperature |
| `maxT24` | `number` | 24-hour maximum temperature |
| `metarType` | `string` | METAR type (METAR or SPECI) |
| `minT` | `number` | Minimum temperature |
| `minT24` | `number` | 24-hour minimum temperature |
| `mostRecent` | `number` | Most recent observation flag |
| `name` | `string` | Station name |
| `obsTime` | `string` | Observation time in ISO8601 format |
| `pcp24hr` | `number` | 24-hour precipitation |
| `pcp3hr` | `number` | 3-hour precipitation |
| `pcp6hr` | `number` | 6-hour precipitation |
| `precip` | `number` | Precipitation |
| `presTend` | `number` | Pressure tendency |
| `prior` | `number` | Prior observation indicator |
| `qcField` | `number` | Quality control field |
| `rawOb` | `string` | Raw METAR observation text |
| `rawTaf` | `string` | Raw TAF if available |
| `reportTime` | `string` | Report time in ISO8601 format |
| `slp` | `number` | Sea level pressure |
| `snow` | `number` | Snow depth |
| `temp` | `number` | Temperature in Celsius |
| `vertVis` | `number` | Vertical visibility |
| `visib` | `string` | Visibility |
| `wdir` | `number` | Wind direction in degrees |
| `wgst` | `number` | Wind gust in knots |
| `wspd` | `number` | Wind speed in knots |
| `wxString` | `string` | Weather phenomena string |

#### Example: List

```lua
local metars, err = client:Metar():list()
```


### Pirep

Create an instance: `local pirep = client:Pirep(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aircraftType` | `string` | Aircraft type |
| `altitudeFt` | `number` | Altitude in feet MSL |
| `clouds` | `table` | Cloud reports |
| `icing` | `string` | Icing report |
| `lat` | `number` | Latitude |
| `lon` | `number` | Longitude |
| `obsTime` | `string` | Observation time in ISO8601 format |
| `rawOb` | `string` | Raw PIREP text |
| `reportType` | `string` | Report type (PIREP or AIREP) |
| `temp` | `number` | Temperature in Celsius |
| `turbulence` | `string` | Turbulence report |
| `visibility` | `string` | Visibility |
| `wdir` | `number` | Wind direction in degrees |
| `wspd` | `number` | Wind speed in knots |
| `wxString` | `string` | Weather phenomena string |

#### Example: List

```lua
local pireps, err = client:Pirep():list()
```


### StationInfo

Create an instance: `local station_info = client:StationInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` | Country code |
| `elev` | `number` | Elevation in meters |
| `iataId` | `string` | IATA identifier |
| `icaoId` | `string` | ICAO station identifier |
| `lat` | `number` | Latitude |
| `lon` | `number` | Longitude |
| `name` | `string` | Station name |
| `priority` | `number` | Priority level |
| `site` | `string` | Site type |
| `state` | `string` | State or province |

#### Example: List

```lua
local station_infos, err = client:StationInfo():list()
```


### Taf

Create an instance: `local taf = client:Taf(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bulletinTime` | `string` | Bulletin time in ISO8601 format |
| `elev` | `number` | Elevation in meters |
| `fcsts` | `table` | Forecast periods |
| `icaoId` | `string` | ICAO station identifier |
| `issueTime` | `string` | TAF issue time in ISO8601 format |
| `lat` | `number` | Latitude |
| `lon` | `number` | Longitude |
| `name` | `string` | Station name |
| `rawTAF` | `string` | Raw TAF forecast text |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```lua
local tafs, err = client:Taf():list()
```


### Tcf

Create an instance: `local tcf = client:Tcf(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local tcf, err = client:Tcf():load()
```


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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── aviationweather-data_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`aviationweather-data_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local airport = client:Airport()
airport:list()

-- airport:data_get() now returns the airport data from the last list
-- airport:match_get() returns the last match criteria
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
