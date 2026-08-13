# AviationweatherData Python SDK Reference

Complete API reference for the AviationweatherData Python SDK.


## AviationweatherDataSDK

### Constructor

```python
from aviationweatherdata_sdk import AviationweatherDataSDK

client = AviationweatherDataSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AviationweatherDataSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = AviationweatherDataSDK.test()
```


### Instance Methods

#### `AirSigmet(data=None)`

Create a new `AirSigmetEntity` instance. Pass `None` for no initial data.

#### `Airport(data=None)`

Create a new `AirportEntity` instance. Pass `None` for no initial data.

#### `Cache(data=None)`

Create a new `CacheEntity` instance. Pass `None` for no initial data.

#### `Cwa(data=None)`

Create a new `CwaEntity` instance. Pass `None` for no initial data.

#### `GAirmet(data=None)`

Create a new `GAirmetEntity` instance. Pass `None` for no initial data.

#### `Metar(data=None)`

Create a new `MetarEntity` instance. Pass `None` for no initial data.

#### `Pirep(data=None)`

Create a new `PirepEntity` instance. Pass `None` for no initial data.

#### `StationInfo(data=None)`

Create a new `StationInfoEntity` instance. Pass `None` for no initial data.

#### `Taf(data=None)`

Create a new `TafEntity` instance. Pass `None` for no initial data.

#### `Tcf(data=None)`

Create a new `TcfEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AirSigmetEntity

```python
air_sigmet = client.AirSigmet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `airsigmetType` | `str` | No |  |
| `altitudeHigh` | `int` | No |  |
| `altitudeLow` | `int` | No |  |
| `fir` | `str` | No |  |
| `hazard` | `str` | No |  |
| `issueTime` | `str` | No |  |
| `rawAirSigmet` | `str` | No |  |
| `severity` | `str` | No |  |
| `validTimeFrom` | `str` | No |  |
| `validTimeTo` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AirSigmet().list()
for air_sigmet in results:
    print(air_sigmet)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AirSigmetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AirportEntity

```python
airport = client.Airport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `str` | No |  |
| `country` | `str` | No |  |
| `elev` | `float` | No |  |
| `iataId` | `str` | No |  |
| `icaoId` | `str` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `name` | `str` | No |  |
| `state` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Airport().list()
for airport in results:
    print(airport)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AirportEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CacheEntity

```python
cache = client.Cache()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Cache().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CacheEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CwaEntity

```python
cwa = client.Cwa()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cwsu` | `str` | No |  |
| `issueTime` | `str` | No |  |
| `rawText` | `str` | No |  |
| `sequence` | `int` | No |  |
| `seriesId` | `str` | No |  |
| `validTimeFrom` | `str` | No |  |
| `validTimeTo` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Cwa().list()
for cwa in results:
    print(cwa)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CwaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GAirmetEntity

```python
g_airmet = client.GAirmet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altitudeHigh` | `int` | No |  |
| `altitudeLow` | `int` | No |  |
| `hazard` | `str` | No |  |
| `issueTime` | `str` | No |  |
| `qualifier` | `str` | No |  |
| `severity` | `str` | No |  |
| `validTimeFrom` | `str` | No |  |
| `validTimeTo` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GAirmet().list()
for g_airmet in results:
    print(g_airmet)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GAirmetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MetarEntity

```python
metar = client.Metar()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altim` | `float` | No |  |
| `clouds` | `list` | No |  |
| `dewp` | `float` | No |  |
| `elev` | `float` | No |  |
| `fltCat` | `str` | No |  |
| `icaoId` | `str` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `maxT` | `float` | No |  |
| `maxT24` | `float` | No |  |
| `metarType` | `str` | No |  |
| `minT` | `float` | No |  |
| `minT24` | `float` | No |  |
| `mostRecent` | `int` | No |  |
| `name` | `str` | No |  |
| `obsTime` | `str` | No |  |
| `pcp24hr` | `float` | No |  |
| `pcp3hr` | `float` | No |  |
| `pcp6hr` | `float` | No |  |
| `precip` | `float` | No |  |
| `presTend` | `float` | No |  |
| `prior` | `int` | No |  |
| `qcField` | `int` | No |  |
| `rawOb` | `str` | No |  |
| `rawTaf` | `str` | No |  |
| `reportTime` | `str` | No |  |
| `slp` | `float` | No |  |
| `snow` | `float` | No |  |
| `temp` | `float` | No |  |
| `vertVis` | `int` | No |  |
| `visib` | `str` | No |  |
| `wdir` | `int` | No |  |
| `wgst` | `int` | No |  |
| `wspd` | `int` | No |  |
| `wxString` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Metar().list()
for metar in results:
    print(metar)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetarEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PirepEntity

```python
pirep = client.Pirep()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aircraftType` | `str` | No |  |
| `altitudeFt` | `int` | No |  |
| `clouds` | `list` | No |  |
| `icing` | `str` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `obsTime` | `str` | No |  |
| `rawOb` | `str` | No |  |
| `reportType` | `str` | No |  |
| `temp` | `float` | No |  |
| `turbulence` | `str` | No |  |
| `visibility` | `str` | No |  |
| `wdir` | `int` | No |  |
| `wspd` | `int` | No |  |
| `wxString` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Pirep().list()
for pirep in results:
    print(pirep)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PirepEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StationInfoEntity

```python
station_info = client.StationInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `str` | No |  |
| `elev` | `float` | No |  |
| `iataId` | `str` | No |  |
| `icaoId` | `str` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `name` | `str` | No |  |
| `priority` | `int` | No |  |
| `site` | `str` | No |  |
| `state` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.StationInfo().list()
for station_info in results:
    print(station_info)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StationInfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TafEntity

```python
taf = client.Taf()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bulletinTime` | `str` | No |  |
| `elev` | `float` | No |  |
| `fcsts` | `list` | No |  |
| `icaoId` | `str` | No |  |
| `issueTime` | `str` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `name` | `str` | No |  |
| `rawTAF` | `str` | No |  |
| `validTimeFrom` | `str` | No |  |
| `validTimeTo` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Taf().list()
for taf in results:
    print(taf)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TafEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TcfEntity

```python
tcf = client.Tcf()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Tcf().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TcfEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = AviationweatherDataSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

