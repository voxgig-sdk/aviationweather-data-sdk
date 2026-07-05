# AviationweatherData Python SDK



The Python SDK for the AviationweatherData API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AirSigmet()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/aviationweather-data-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from aviationweatherdata_sdk import AviationweatherDataSDK

client = AviationweatherDataSDK()
```

### 2. List airsigmet records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    airsigmets = client.AirSigmet().list()
    for airsigmet in airsigmets:
        print(airsigmet)
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    airsigmets = client.AirSigmet().list()
    print(airsigmets)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = AviationweatherDataSDK.test()

# Entity ops return the bare record and raise on error.
airsigmet = client.AirSigmet().list()
# airsigmet contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = AviationweatherDataSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### AviationweatherDataSDK

```python
from aviationweatherdata_sdk import AviationweatherDataSDK

client = AviationweatherDataSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = AviationweatherDataSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### AviationweatherDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `air_sigmet = client.AirSigmet()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `airsigmet_type` | `str` |  |
| `altitude_high` | `int` |  |
| `altitude_low` | `int` |  |
| `fir` | `str` |  |
| `hazard` | `str` |  |
| `issue_time` | `str` |  |
| `raw_air_sigmet` | `str` |  |
| `severity` | `str` |  |
| `valid_time_from` | `str` |  |
| `valid_time_to` | `str` |  |

#### Example: List

```python
air_sigmets = client.AirSigmet().list()
```


### Airport

Create an instance: `airport = client.Airport()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `str` |  |
| `country` | `str` |  |
| `elev` | `float` |  |
| `iata_id` | `str` |  |
| `icao_id` | `str` |  |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `name` | `str` |  |
| `state` | `str` |  |

#### Example: List

```python
airports = client.Airport().list()
```


### Cache

Create an instance: `cache = client.Cache()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
cache = client.Cache().load()
```


### Cwa

Create an instance: `cwa = client.Cwa()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cwsu` | `str` |  |
| `issue_time` | `str` |  |
| `raw_text` | `str` |  |
| `sequence` | `int` |  |
| `series_id` | `str` |  |
| `valid_time_from` | `str` |  |
| `valid_time_to` | `str` |  |

#### Example: List

```python
cwas = client.Cwa().list()
```


### GAirmet

Create an instance: `g_airmet = client.GAirmet()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altitude_high` | `int` |  |
| `altitude_low` | `int` |  |
| `hazard` | `str` |  |
| `issue_time` | `str` |  |
| `qualifier` | `str` |  |
| `severity` | `str` |  |
| `valid_time_from` | `str` |  |
| `valid_time_to` | `str` |  |

#### Example: List

```python
g_airmets = client.GAirmet().list()
```


### Metar

Create an instance: `metar = client.Metar()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altim` | `float` |  |
| `cloud` | `list` |  |
| `dewp` | `float` |  |
| `elev` | `float` |  |
| `flt_cat` | `str` |  |
| `icao_id` | `str` |  |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `max_t` | `float` |  |
| `max_t24` | `float` |  |
| `metar_type` | `str` |  |
| `min_t` | `float` |  |
| `min_t24` | `float` |  |
| `most_recent` | `int` |  |
| `name` | `str` |  |
| `obs_time` | `str` |  |
| `pcp24hr` | `float` |  |
| `pcp3hr` | `float` |  |
| `pcp6hr` | `float` |  |
| `precip` | `float` |  |
| `pres_tend` | `float` |  |
| `prior` | `int` |  |
| `qc_field` | `int` |  |
| `raw_ob` | `str` |  |
| `raw_taf` | `str` |  |
| `report_time` | `str` |  |
| `slp` | `float` |  |
| `snow` | `float` |  |
| `temp` | `float` |  |
| `vert_vi` | `int` |  |
| `visib` | `str` |  |
| `wdir` | `int` |  |
| `wgst` | `int` |  |
| `wspd` | `int` |  |
| `wx_string` | `str` |  |

#### Example: List

```python
metars = client.Metar().list()
```


### Pirep

Create an instance: `pirep = client.Pirep()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aircraft_type` | `str` |  |
| `altitude_ft` | `int` |  |
| `cloud` | `list` |  |
| `icing` | `str` |  |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `obs_time` | `str` |  |
| `raw_ob` | `str` |  |
| `report_type` | `str` |  |
| `temp` | `float` |  |
| `turbulence` | `str` |  |
| `visibility` | `str` |  |
| `wdir` | `int` |  |
| `wspd` | `int` |  |
| `wx_string` | `str` |  |

#### Example: List

```python
pireps = client.Pirep().list()
```


### StationInfo

Create an instance: `station_info = client.StationInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `str` |  |
| `elev` | `float` |  |
| `iata_id` | `str` |  |
| `icao_id` | `str` |  |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `name` | `str` |  |
| `priority` | `int` |  |
| `site` | `str` |  |
| `state` | `str` |  |

#### Example: List

```python
station_infos = client.StationInfo().list()
```


### Taf

Create an instance: `taf = client.Taf()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bulletin_time` | `str` |  |
| `elev` | `float` |  |
| `fcst` | `list` |  |
| `icao_id` | `str` |  |
| `issue_time` | `str` |  |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `name` | `str` |  |
| `raw_taf` | `str` |  |
| `valid_time_from` | `str` |  |
| `valid_time_to` | `str` |  |

#### Example: List

```python
tafs = client.Taf().list()
```


### Tcf

Create an instance: `tcf = client.Tcf()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
tcf = client.Tcf().load()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── aviationweatherdata_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`aviationweatherdata_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
airsigmet = client.AirSigmet()
airsigmet.list()

# airsigmet.data_get() now returns the airsigmet data from the last list
# airsigmet.match_get() returns the last match criteria
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
