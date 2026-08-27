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
| `airsigmetType` | `str` | No | SIGMET type |
| `altitudeHigh` | `int` | No | Upper altitude in feet MSL |
| `altitudeLow` | `int` | No | Lower altitude in feet MSL |
| `fir` | `str` | No | Flight Information Region |
| `hazard` | `str` | No | Hazard type |
| `issueTime` | `str` | No | Issue time in ISO8601 format |
| `rawAirSigmet` | `str` | No | Raw SIGMET text |
| `severity` | `str` | No | Severity level |
| `validTimeFrom` | `str` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `str` | No | Valid time to in ISO8601 format |

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
| `city` | `str` | No | City |
| `country` | `str` | No | Country code |
| `elev` | `float` | No | Elevation in meters |
| `iataId` | `str` | No | IATA identifier |
| `icaoId` | `str` | No | ICAO airport identifier |
| `lat` | `float` | No | Latitude |
| `lon` | `float` | No | Longitude |
| `name` | `str` | No | Airport name |
| `state` | `str` | No | State or province |

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
| `cwsu` | `str` | No | Center Weather Service Unit |
| `issueTime` | `str` | No | Issue time in ISO8601 format |
| `rawText` | `str` | No | Raw CWA text |
| `sequence` | `int` | No | Sequence number |
| `seriesId` | `str` | No | Series identifier |
| `validTimeFrom` | `str` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `str` | No | Valid time to in ISO8601 format |

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
| `altitudeHigh` | `int` | No | Upper altitude in feet MSL |
| `altitudeLow` | `int` | No | Lower altitude in feet MSL |
| `hazard` | `str` | No | Hazard type |
| `issueTime` | `str` | No | Issue time in ISO8601 format |
| `qualifier` | `str` | No | Forecast qualifier |
| `severity` | `str` | No | Severity level |
| `validTimeFrom` | `str` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `str` | No | Valid time to in ISO8601 format |

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
| `altim` | `float` | No | Altimeter setting in inches of mercury |
| `clouds` | `list` | No | Cloud layers |
| `dewp` | `float` | No | Dewpoint in Celsius |
| `elev` | `float` | No | Elevation in meters |
| `fltCat` | `str` | No | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | `str` | No | ICAO station identifier |
| `lat` | `float` | No | Latitude |
| `lon` | `float` | No | Longitude |
| `maxT` | `float` | No | Maximum temperature |
| `maxT24` | `float` | No | 24-hour maximum temperature |
| `metarType` | `str` | No | METAR type (METAR or SPECI) |
| `minT` | `float` | No | Minimum temperature |
| `minT24` | `float` | No | 24-hour minimum temperature |
| `mostRecent` | `int` | No | Most recent observation flag |
| `name` | `str` | No | Station name |
| `obsTime` | `str` | No | Observation time in ISO8601 format |
| `pcp24hr` | `float` | No | 24-hour precipitation |
| `pcp3hr` | `float` | No | 3-hour precipitation |
| `pcp6hr` | `float` | No | 6-hour precipitation |
| `precip` | `float` | No | Precipitation |
| `presTend` | `float` | No | Pressure tendency |
| `prior` | `int` | No | Prior observation indicator |
| `qcField` | `int` | No | Quality control field |
| `rawOb` | `str` | No | Raw METAR observation text |
| `rawTaf` | `str` | No | Raw TAF if available |
| `reportTime` | `str` | No | Report time in ISO8601 format |
| `slp` | `float` | No | Sea level pressure |
| `snow` | `float` | No | Snow depth |
| `temp` | `float` | No | Temperature in Celsius |
| `vertVis` | `int` | No | Vertical visibility |
| `visib` | `str` | No | Visibility |
| `wdir` | `int` | No | Wind direction in degrees |
| `wgst` | `int` | No | Wind gust in knots |
| `wspd` | `int` | No | Wind speed in knots |
| `wxString` | `str` | No | Weather phenomena string |

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
| `aircraftType` | `str` | No | Aircraft type |
| `altitudeFt` | `int` | No | Altitude in feet MSL |
| `clouds` | `list` | No | Cloud reports |
| `icing` | `str` | No | Icing report |
| `lat` | `float` | No | Latitude |
| `lon` | `float` | No | Longitude |
| `obsTime` | `str` | No | Observation time in ISO8601 format |
| `rawOb` | `str` | No | Raw PIREP text |
| `reportType` | `str` | No | Report type (PIREP or AIREP) |
| `temp` | `float` | No | Temperature in Celsius |
| `turbulence` | `str` | No | Turbulence report |
| `visibility` | `str` | No | Visibility |
| `wdir` | `int` | No | Wind direction in degrees |
| `wspd` | `int` | No | Wind speed in knots |
| `wxString` | `str` | No | Weather phenomena string |

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
| `country` | `str` | No | Country code |
| `elev` | `float` | No | Elevation in meters |
| `iataId` | `str` | No | IATA identifier |
| `icaoId` | `str` | No | ICAO station identifier |
| `lat` | `float` | No | Latitude |
| `lon` | `float` | No | Longitude |
| `name` | `str` | No | Station name |
| `priority` | `int` | No | Priority level |
| `site` | `str` | No | Site type |
| `state` | `str` | No | State or province |

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
| `bulletinTime` | `str` | No | Bulletin time in ISO8601 format |
| `elev` | `float` | No | Elevation in meters |
| `fcsts` | `list` | No | Forecast periods |
| `icaoId` | `str` | No | ICAO station identifier |
| `issueTime` | `str` | No | TAF issue time in ISO8601 format |
| `lat` | `float` | No | Latitude |
| `lon` | `float` | No | Longitude |
| `name` | `str` | No | Station name |
| `rawTAF` | `str` | No | Raw TAF forecast text |
| `validTimeFrom` | `str` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `str` | No | Valid time to in ISO8601 format |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

