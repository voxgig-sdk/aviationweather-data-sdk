# AviationweatherData Ruby SDK



The Ruby SDK for the AviationweatherData API — an entity-oriented client using idiomatic Ruby conventions.

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
    puts "#{item["id"]} #{item["name"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
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
  warn result["err"]
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

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = AviationweatherDataSDK.test({
  "entity" => { "airsigmet" => { "test01" => { "id" => "test01" } } },
})

# load returns the bare mock record (raises on error).
airsigmet = client.AirSigmet.load({ "id" => "test01" })
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
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
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
cache = client.Cache.load({ "id" => "cache_id" })
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
| `cwsu` | ``$STRING`` |  |
| `issue_time` | ``$STRING`` |  |
| `raw_text` | ``$STRING`` |  |
| `sequence` | ``$INTEGER`` |  |
| `series_id` | ``$STRING`` |  |
| `valid_time_from` | ``$STRING`` |  |
| `valid_time_to` | ``$STRING`` |  |

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
| `altitude_high` | ``$INTEGER`` |  |
| `altitude_low` | ``$INTEGER`` |  |
| `hazard` | ``$STRING`` |  |
| `issue_time` | ``$STRING`` |  |
| `qualifier` | ``$STRING`` |  |
| `severity` | ``$STRING`` |  |
| `valid_time_from` | ``$STRING`` |  |
| `valid_time_to` | ``$STRING`` |  |

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
tcf = client.Tcf.load({ "id" => "tcf_id" })
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
error is returned to the caller as a second return value.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
airsigmet = client.AirSigmet
airsigmet.load({ "id" => "example_id" })

# airsigmet.data_get now returns the loaded airsigmet data
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
