# AviationweatherData Ruby SDK



The Ruby SDK for the AviationweatherData API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AirSigmet` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/aviationweather-data-sdk/releases](https://github.com/voxgig-sdk/aviationweather-data-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "AviationweatherData_sdk"

client = AviationweatherDataSDK.new
```

### 2. List airsigmet records

```ruby
begin
  # list returns an Array of AirSigmet records — iterate directly.
  airsigmets = client.AirSigmet.list
  airsigmets.each do |item|
    puts "#{item["airsigmetType"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  airports = client.Airport.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = AviationweatherDataSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
airport = client.Airport.list()
puts airport
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = AviationweatherDataSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### AviationweatherDataSDK

```ruby
require_relative "AviationweatherData_sdk"
client = AviationweatherDataSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = AviationweatherDataSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AviationweatherDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `AviationweatherDataError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `air_sigmet = client.AirSigmet`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `airsigmetType` | `String` | SIGMET type |
| `altitudeHigh` | `Integer` | Upper altitude in feet MSL |
| `altitudeLow` | `Integer` | Lower altitude in feet MSL |
| `fir` | `String` | Flight Information Region |
| `hazard` | `String` | Hazard type |
| `issueTime` | `String` | Issue time in ISO8601 format |
| `rawAirSigmet` | `String` | Raw SIGMET text |
| `severity` | `String` | Severity level |
| `validTimeFrom` | `String` | Valid time from in ISO8601 format |
| `validTimeTo` | `String` | Valid time to in ISO8601 format |

#### Example: List

```ruby
# list returns an Array of AirSigmet records (raises on error).
air_sigmets = client.AirSigmet.list
```


### Airport

Create an instance: `airport = client.Airport`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `String` | City |
| `country` | `String` | Country code |
| `elev` | `Float` | Elevation in meters |
| `iataId` | `String` | IATA identifier |
| `icaoId` | `String` | ICAO airport identifier |
| `lat` | `Float` | Latitude |
| `lon` | `Float` | Longitude |
| `name` | `String` | Airport name |
| `state` | `String` | State or province |

#### Example: List

```ruby
# list returns an Array of Airport records (raises on error).
airports = client.Airport.list
```


### Cache

Create an instance: `cache = client.Cache`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Cache record (raises on error).
cache = client.Cache.load()
```


### Cwa

Create an instance: `cwa = client.Cwa`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cwsu` | `String` | Center Weather Service Unit |
| `issueTime` | `String` | Issue time in ISO8601 format |
| `rawText` | `String` | Raw CWA text |
| `sequence` | `Integer` | Sequence number |
| `seriesId` | `String` | Series identifier |
| `validTimeFrom` | `String` | Valid time from in ISO8601 format |
| `validTimeTo` | `String` | Valid time to in ISO8601 format |

#### Example: List

```ruby
# list returns an Array of Cwa records (raises on error).
cwas = client.Cwa.list
```


### GAirmet

Create an instance: `g_airmet = client.GAirmet`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altitudeHigh` | `Integer` | Upper altitude in feet MSL |
| `altitudeLow` | `Integer` | Lower altitude in feet MSL |
| `hazard` | `String` | Hazard type |
| `issueTime` | `String` | Issue time in ISO8601 format |
| `qualifier` | `String` | Forecast qualifier |
| `severity` | `String` | Severity level |
| `validTimeFrom` | `String` | Valid time from in ISO8601 format |
| `validTimeTo` | `String` | Valid time to in ISO8601 format |

#### Example: List

```ruby
# list returns an Array of GAirmet records (raises on error).
g_airmets = client.GAirmet.list
```


### Metar

Create an instance: `metar = client.Metar`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altim` | `Float` | Altimeter setting in inches of mercury |
| `clouds` | `Array` | Cloud layers |
| `dewp` | `Float` | Dewpoint in Celsius |
| `elev` | `Float` | Elevation in meters |
| `fltCat` | `String` | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | `String` | ICAO station identifier |
| `lat` | `Float` | Latitude |
| `lon` | `Float` | Longitude |
| `maxT` | `Float` | Maximum temperature |
| `maxT24` | `Float` | 24-hour maximum temperature |
| `metarType` | `String` | METAR type (METAR or SPECI) |
| `minT` | `Float` | Minimum temperature |
| `minT24` | `Float` | 24-hour minimum temperature |
| `mostRecent` | `Integer` | Most recent observation flag |
| `name` | `String` | Station name |
| `obsTime` | `String` | Observation time in ISO8601 format |
| `pcp24hr` | `Float` | 24-hour precipitation |
| `pcp3hr` | `Float` | 3-hour precipitation |
| `pcp6hr` | `Float` | 6-hour precipitation |
| `precip` | `Float` | Precipitation |
| `presTend` | `Float` | Pressure tendency |
| `prior` | `Integer` | Prior observation indicator |
| `qcField` | `Integer` | Quality control field |
| `rawOb` | `String` | Raw METAR observation text |
| `rawTaf` | `String` | Raw TAF if available |
| `reportTime` | `String` | Report time in ISO8601 format |
| `slp` | `Float` | Sea level pressure |
| `snow` | `Float` | Snow depth |
| `temp` | `Float` | Temperature in Celsius |
| `vertVis` | `Integer` | Vertical visibility |
| `visib` | `String` | Visibility |
| `wdir` | `Integer` | Wind direction in degrees |
| `wgst` | `Integer` | Wind gust in knots |
| `wspd` | `Integer` | Wind speed in knots |
| `wxString` | `String` | Weather phenomena string |

#### Example: List

```ruby
# list returns an Array of Metar records (raises on error).
metars = client.Metar.list
```


### Pirep

Create an instance: `pirep = client.Pirep`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aircraftType` | `String` | Aircraft type |
| `altitudeFt` | `Integer` | Altitude in feet MSL |
| `clouds` | `Array` | Cloud reports |
| `icing` | `String` | Icing report |
| `lat` | `Float` | Latitude |
| `lon` | `Float` | Longitude |
| `obsTime` | `String` | Observation time in ISO8601 format |
| `rawOb` | `String` | Raw PIREP text |
| `reportType` | `String` | Report type (PIREP or AIREP) |
| `temp` | `Float` | Temperature in Celsius |
| `turbulence` | `String` | Turbulence report |
| `visibility` | `String` | Visibility |
| `wdir` | `Integer` | Wind direction in degrees |
| `wspd` | `Integer` | Wind speed in knots |
| `wxString` | `String` | Weather phenomena string |

#### Example: List

```ruby
# list returns an Array of Pirep records (raises on error).
pireps = client.Pirep.list
```


### StationInfo

Create an instance: `station_info = client.StationInfo`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `String` | Country code |
| `elev` | `Float` | Elevation in meters |
| `iataId` | `String` | IATA identifier |
| `icaoId` | `String` | ICAO station identifier |
| `lat` | `Float` | Latitude |
| `lon` | `Float` | Longitude |
| `name` | `String` | Station name |
| `priority` | `Integer` | Priority level |
| `site` | `String` | Site type |
| `state` | `String` | State or province |

#### Example: List

```ruby
# list returns an Array of StationInfo records (raises on error).
station_infos = client.StationInfo.list
```


### Taf

Create an instance: `taf = client.Taf`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bulletinTime` | `String` | Bulletin time in ISO8601 format |
| `elev` | `Float` | Elevation in meters |
| `fcsts` | `Array` | Forecast periods |
| `icaoId` | `String` | ICAO station identifier |
| `issueTime` | `String` | TAF issue time in ISO8601 format |
| `lat` | `Float` | Latitude |
| `lon` | `Float` | Longitude |
| `name` | `String` | Station name |
| `rawTAF` | `String` | Raw TAF forecast text |
| `validTimeFrom` | `String` | Valid time from in ISO8601 format |
| `validTimeTo` | `String` | Valid time to in ISO8601 format |

#### Example: List

```ruby
# list returns an Array of Taf records (raises on error).
tafs = client.Taf.list
```


### Tcf

Create an instance: `tcf = client.Tcf`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Tcf record (raises on error).
tcf = client.Tcf.load()
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

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

Automatic retry of transient failures with exponential backoff.

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

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── AviationweatherData_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`AviationweatherData_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
airport = client.Airport
airport.list()

# airport.data_get now returns the airport data from the last list
# airport.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
