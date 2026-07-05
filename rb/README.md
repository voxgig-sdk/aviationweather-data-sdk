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
    puts "#{item["airsigmet_type"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  airsigmets = client.AirSigmet.list()
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

# Entity ops return the bare mock record (raises on error).
airsigmet = client.AirSigmet.list()
puts airsigmet
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
| `airsigmet_type` |  |
| `altitude_high` |  |
| `altitude_low` |  |
| `fir` |  |
| `hazard` |  |
| `issue_time` |  |
| `raw_air_sigmet` |  |
| `severity` |  |
| `valid_time_from` |  |
| `valid_time_to` |  |

Operations: List.

API path: `/api/data/airsigmet`

#### Airport

| Field | Description |
| --- | --- |
| `city` |  |
| `country` |  |
| `elev` |  |
| `iata_id` |  |
| `icao_id` |  |
| `lat` |  |
| `lon` |  |
| `name` |  |
| `state` |  |

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
| `cwsu` |  |
| `issue_time` |  |
| `raw_text` |  |
| `sequence` |  |
| `series_id` |  |
| `valid_time_from` |  |
| `valid_time_to` |  |

Operations: List.

API path: `/api/data/cwa`

#### GAirmet

| Field | Description |
| --- | --- |
| `altitude_high` |  |
| `altitude_low` |  |
| `hazard` |  |
| `issue_time` |  |
| `qualifier` |  |
| `severity` |  |
| `valid_time_from` |  |
| `valid_time_to` |  |

Operations: List.

API path: `/api/data/gairmet`

#### Metar

| Field | Description |
| --- | --- |
| `altim` |  |
| `cloud` |  |
| `dewp` |  |
| `elev` |  |
| `flt_cat` |  |
| `icao_id` |  |
| `lat` |  |
| `lon` |  |
| `max_t` |  |
| `max_t24` |  |
| `metar_type` |  |
| `min_t` |  |
| `min_t24` |  |
| `most_recent` |  |
| `name` |  |
| `obs_time` |  |
| `pcp24hr` |  |
| `pcp3hr` |  |
| `pcp6hr` |  |
| `precip` |  |
| `pres_tend` |  |
| `prior` |  |
| `qc_field` |  |
| `raw_ob` |  |
| `raw_taf` |  |
| `report_time` |  |
| `slp` |  |
| `snow` |  |
| `temp` |  |
| `vert_vi` |  |
| `visib` |  |
| `wdir` |  |
| `wgst` |  |
| `wspd` |  |
| `wx_string` |  |

Operations: List.

API path: `/api/data/metar`

#### Pirep

| Field | Description |
| --- | --- |
| `aircraft_type` |  |
| `altitude_ft` |  |
| `cloud` |  |
| `icing` |  |
| `lat` |  |
| `lon` |  |
| `obs_time` |  |
| `raw_ob` |  |
| `report_type` |  |
| `temp` |  |
| `turbulence` |  |
| `visibility` |  |
| `wdir` |  |
| `wspd` |  |
| `wx_string` |  |

Operations: List.

API path: `/api/data/pirep`

#### StationInfo

| Field | Description |
| --- | --- |
| `country` |  |
| `elev` |  |
| `iata_id` |  |
| `icao_id` |  |
| `lat` |  |
| `lon` |  |
| `name` |  |
| `priority` |  |
| `site` |  |
| `state` |  |

Operations: List.

API path: `/api/data/stationinfo`

#### Taf

| Field | Description |
| --- | --- |
| `bulletin_time` |  |
| `elev` |  |
| `fcst` |  |
| `icao_id` |  |
| `issue_time` |  |
| `lat` |  |
| `lon` |  |
| `name` |  |
| `raw_taf` |  |
| `valid_time_from` |  |
| `valid_time_to` |  |

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
| `airsigmet_type` | `String` |  |
| `altitude_high` | `Integer` |  |
| `altitude_low` | `Integer` |  |
| `fir` | `String` |  |
| `hazard` | `String` |  |
| `issue_time` | `String` |  |
| `raw_air_sigmet` | `String` |  |
| `severity` | `String` |  |
| `valid_time_from` | `String` |  |
| `valid_time_to` | `String` |  |

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
| `city` | `String` |  |
| `country` | `String` |  |
| `elev` | `Float` |  |
| `iata_id` | `String` |  |
| `icao_id` | `String` |  |
| `lat` | `Float` |  |
| `lon` | `Float` |  |
| `name` | `String` |  |
| `state` | `String` |  |

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
# load returns the bare Cache record (raises on error).
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
| `cwsu` | `String` |  |
| `issue_time` | `String` |  |
| `raw_text` | `String` |  |
| `sequence` | `Integer` |  |
| `series_id` | `String` |  |
| `valid_time_from` | `String` |  |
| `valid_time_to` | `String` |  |

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
| `altitude_high` | `Integer` |  |
| `altitude_low` | `Integer` |  |
| `hazard` | `String` |  |
| `issue_time` | `String` |  |
| `qualifier` | `String` |  |
| `severity` | `String` |  |
| `valid_time_from` | `String` |  |
| `valid_time_to` | `String` |  |

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
| `altim` | `Float` |  |
| `cloud` | `Array` |  |
| `dewp` | `Float` |  |
| `elev` | `Float` |  |
| `flt_cat` | `String` |  |
| `icao_id` | `String` |  |
| `lat` | `Float` |  |
| `lon` | `Float` |  |
| `max_t` | `Float` |  |
| `max_t24` | `Float` |  |
| `metar_type` | `String` |  |
| `min_t` | `Float` |  |
| `min_t24` | `Float` |  |
| `most_recent` | `Integer` |  |
| `name` | `String` |  |
| `obs_time` | `String` |  |
| `pcp24hr` | `Float` |  |
| `pcp3hr` | `Float` |  |
| `pcp6hr` | `Float` |  |
| `precip` | `Float` |  |
| `pres_tend` | `Float` |  |
| `prior` | `Integer` |  |
| `qc_field` | `Integer` |  |
| `raw_ob` | `String` |  |
| `raw_taf` | `String` |  |
| `report_time` | `String` |  |
| `slp` | `Float` |  |
| `snow` | `Float` |  |
| `temp` | `Float` |  |
| `vert_vi` | `Integer` |  |
| `visib` | `String` |  |
| `wdir` | `Integer` |  |
| `wgst` | `Integer` |  |
| `wspd` | `Integer` |  |
| `wx_string` | `String` |  |

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
| `aircraft_type` | `String` |  |
| `altitude_ft` | `Integer` |  |
| `cloud` | `Array` |  |
| `icing` | `String` |  |
| `lat` | `Float` |  |
| `lon` | `Float` |  |
| `obs_time` | `String` |  |
| `raw_ob` | `String` |  |
| `report_type` | `String` |  |
| `temp` | `Float` |  |
| `turbulence` | `String` |  |
| `visibility` | `String` |  |
| `wdir` | `Integer` |  |
| `wspd` | `Integer` |  |
| `wx_string` | `String` |  |

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
| `country` | `String` |  |
| `elev` | `Float` |  |
| `iata_id` | `String` |  |
| `icao_id` | `String` |  |
| `lat` | `Float` |  |
| `lon` | `Float` |  |
| `name` | `String` |  |
| `priority` | `Integer` |  |
| `site` | `String` |  |
| `state` | `String` |  |

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
| `bulletin_time` | `String` |  |
| `elev` | `Float` |  |
| `fcst` | `Array` |  |
| `icao_id` | `String` |  |
| `issue_time` | `String` |  |
| `lat` | `Float` |  |
| `lon` | `Float` |  |
| `name` | `String` |  |
| `raw_taf` | `String` |  |
| `valid_time_from` | `String` |  |
| `valid_time_to` | `String` |  |

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
# load returns the bare Tcf record (raises on error).
tcf = client.Tcf.load()
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
airsigmet = client.AirSigmet
airsigmet.list()

# airsigmet.data_get now returns the airsigmet data from the last list
# airsigmet.match_get returns the last match criteria
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
