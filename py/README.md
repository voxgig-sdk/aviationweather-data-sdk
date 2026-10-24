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
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/aviationweather-data-sdk/tags)) or
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

`list()` returns a `list` of entities, one per record, and raises on
error; an entity's `data_get()` reads its record (a `dict`).

```python
try:
    airsigmets = client.AirSigmet().list()
    for airsigmet in airsigmets:
        print(airsigmet.data_get())
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    airports = client.Airport().list()
    print([item.data_get() for item in airports])
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

# Entity ops return the entity, and list one per record; they raise on error.
airport = client.Airport().list()
# data_get() on an entity reads its mock response record
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

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

Create an instance: `air_sigmet = client.AirSigmet()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `airsigmetType` | `str` | SIGMET type |
| `altitudeHigh` | `int` | Upper altitude in feet MSL |
| `altitudeLow` | `int` | Lower altitude in feet MSL |
| `fir` | `str` | Flight Information Region |
| `hazard` | `str` | Hazard type |
| `issueTime` | `str` | Issue time in ISO8601 format |
| `rawAirSigmet` | `str` | Raw SIGMET text |
| `severity` | `str` | Severity level |
| `validTimeFrom` | `str` | Valid time from in ISO8601 format |
| `validTimeTo` | `str` | Valid time to in ISO8601 format |

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
| `city` | `str` | City |
| `country` | `str` | Country code |
| `elev` | `float` | Elevation in meters |
| `iataId` | `str` | IATA identifier |
| `icaoId` | `str` | ICAO airport identifier |
| `lat` | `float` | Latitude |
| `lon` | `float` | Longitude |
| `name` | `str` | Airport name |
| `state` | `str` | State or province |

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


### Cwa

Create an instance: `cwa = client.Cwa()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cwsu` | `str` | Center Weather Service Unit |
| `issueTime` | `str` | Issue time in ISO8601 format |
| `rawText` | `str` | Raw CWA text |
| `sequence` | `int` | Sequence number |
| `seriesId` | `str` | Series identifier |
| `validTimeFrom` | `str` | Valid time from in ISO8601 format |
| `validTimeTo` | `str` | Valid time to in ISO8601 format |

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
| `altitudeHigh` | `int` | Upper altitude in feet MSL |
| `altitudeLow` | `int` | Lower altitude in feet MSL |
| `hazard` | `str` | Hazard type |
| `issueTime` | `str` | Issue time in ISO8601 format |
| `qualifier` | `str` | Forecast qualifier |
| `severity` | `str` | Severity level |
| `validTimeFrom` | `str` | Valid time from in ISO8601 format |
| `validTimeTo` | `str` | Valid time to in ISO8601 format |

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
| `altim` | `float` | Altimeter setting in inches of mercury |
| `clouds` | `list` | Cloud layers |
| `dewp` | `float` | Dewpoint in Celsius |
| `elev` | `float` | Elevation in meters |
| `fltCat` | `str` | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | `str` | ICAO station identifier |
| `lat` | `float` | Latitude |
| `lon` | `float` | Longitude |
| `maxT` | `float` | Maximum temperature |
| `maxT24` | `float` | 24-hour maximum temperature |
| `metarType` | `str` | METAR type (METAR or SPECI) |
| `minT` | `float` | Minimum temperature |
| `minT24` | `float` | 24-hour minimum temperature |
| `mostRecent` | `int` | Most recent observation flag |
| `name` | `str` | Station name |
| `obsTime` | `str` | Observation time in ISO8601 format |
| `pcp24hr` | `float` | 24-hour precipitation |
| `pcp3hr` | `float` | 3-hour precipitation |
| `pcp6hr` | `float` | 6-hour precipitation |
| `precip` | `float` | Precipitation |
| `presTend` | `float` | Pressure tendency |
| `prior` | `int` | Prior observation indicator |
| `qcField` | `int` | Quality control field |
| `rawOb` | `str` | Raw METAR observation text |
| `rawTaf` | `str` | Raw TAF if available |
| `reportTime` | `str` | Report time in ISO8601 format |
| `slp` | `float` | Sea level pressure |
| `snow` | `float` | Snow depth |
| `temp` | `float` | Temperature in Celsius |
| `vertVis` | `int` | Vertical visibility |
| `visib` | `str` | Visibility |
| `wdir` | `int` | Wind direction in degrees |
| `wgst` | `int` | Wind gust in knots |
| `wspd` | `int` | Wind speed in knots |
| `wxString` | `str` | Weather phenomena string |

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
| `aircraftType` | `str` | Aircraft type |
| `altitudeFt` | `int` | Altitude in feet MSL |
| `clouds` | `list` | Cloud reports |
| `icing` | `str` | Icing report |
| `lat` | `float` | Latitude |
| `lon` | `float` | Longitude |
| `obsTime` | `str` | Observation time in ISO8601 format |
| `rawOb` | `str` | Raw PIREP text |
| `reportType` | `str` | Report type (PIREP or AIREP) |
| `temp` | `float` | Temperature in Celsius |
| `turbulence` | `str` | Turbulence report |
| `visibility` | `str` | Visibility |
| `wdir` | `int` | Wind direction in degrees |
| `wspd` | `int` | Wind speed in knots |
| `wxString` | `str` | Weather phenomena string |

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
| `country` | `str` | Country code |
| `elev` | `float` | Elevation in meters |
| `iataId` | `str` | IATA identifier |
| `icaoId` | `str` | ICAO station identifier |
| `lat` | `float` | Latitude |
| `lon` | `float` | Longitude |
| `name` | `str` | Station name |
| `priority` | `int` | Priority level |
| `site` | `str` | Site type |
| `state` | `str` | State or province |

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
| `bulletinTime` | `str` | Bulletin time in ISO8601 format |
| `elev` | `float` | Elevation in meters |
| `fcsts` | `list` | Forecast periods |
| `icaoId` | `str` | ICAO station identifier |
| `issueTime` | `str` | TAF issue time in ISO8601 format |
| `lat` | `float` | Latitude |
| `lon` | `float` | Longitude |
| `name` | `str` | Station name |
| `rawTAF` | `str` | Raw TAF forecast text |
| `validTimeFrom` | `str` | Valid time from in ISO8601 format |
| `validTimeTo` | `str` | Valid time to in ISO8601 format |

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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

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
├── schema.py                    -- Generated option + entity specs
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
airport = client.Airport()
airport.list()

# airport.data_get() now returns the airport data from the last list
# airport.match_get() returns the last match criteria
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
