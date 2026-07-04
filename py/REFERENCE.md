# AviationweatherData Python SDK Reference

Complete API reference for the AviationweatherData Python SDK.


## AviationweatherDataSDK

### Constructor

```python
from aviationweather-data_sdk import AviationweatherDataSDK

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
air_sigmet = client.air_sigmet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `airsigmet_type` | ``$STRING`` | No |  |
| `altitude_high` | ``$INTEGER`` | No |  |
| `altitude_low` | ``$INTEGER`` | No |  |
| `fir` | ``$STRING`` | No |  |
| `hazard` | ``$STRING`` | No |  |
| `issue_time` | ``$STRING`` | No |  |
| `raw_air_sigmet` | ``$STRING`` | No |  |
| `severity` | ``$STRING`` | No |  |
| `valid_time_from` | ``$STRING`` | No |  |
| `valid_time_to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.air_sigmet.list({})
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
airport = client.airport
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$STRING`` | No |  |
| `country` | ``$STRING`` | No |  |
| `elev` | ``$NUMBER`` | No |  |
| `iata_id` | ``$STRING`` | No |  |
| `icao_id` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `state` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.airport.list({})
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
cache = client.cache
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.cache.load({"id": "cache_id"})
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
cwa = client.cwa
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cwsu` | ``$STRING`` | No |  |
| `issue_time` | ``$STRING`` | No |  |
| `raw_text` | ``$STRING`` | No |  |
| `sequence` | ``$INTEGER`` | No |  |
| `series_id` | ``$STRING`` | No |  |
| `valid_time_from` | ``$STRING`` | No |  |
| `valid_time_to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.cwa.list({})
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
g_airmet = client.g_airmet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altitude_high` | ``$INTEGER`` | No |  |
| `altitude_low` | ``$INTEGER`` | No |  |
| `hazard` | ``$STRING`` | No |  |
| `issue_time` | ``$STRING`` | No |  |
| `qualifier` | ``$STRING`` | No |  |
| `severity` | ``$STRING`` | No |  |
| `valid_time_from` | ``$STRING`` | No |  |
| `valid_time_to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.g_airmet.list({})
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
metar = client.metar
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altim` | ``$NUMBER`` | No |  |
| `cloud` | ``$ARRAY`` | No |  |
| `dewp` | ``$NUMBER`` | No |  |
| `elev` | ``$NUMBER`` | No |  |
| `flt_cat` | ``$STRING`` | No |  |
| `icao_id` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `max_t` | ``$NUMBER`` | No |  |
| `max_t24` | ``$NUMBER`` | No |  |
| `metar_type` | ``$STRING`` | No |  |
| `min_t` | ``$NUMBER`` | No |  |
| `min_t24` | ``$NUMBER`` | No |  |
| `most_recent` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `obs_time` | ``$STRING`` | No |  |
| `pcp24hr` | ``$NUMBER`` | No |  |
| `pcp3hr` | ``$NUMBER`` | No |  |
| `pcp6hr` | ``$NUMBER`` | No |  |
| `precip` | ``$NUMBER`` | No |  |
| `pres_tend` | ``$NUMBER`` | No |  |
| `prior` | ``$INTEGER`` | No |  |
| `qc_field` | ``$INTEGER`` | No |  |
| `raw_ob` | ``$STRING`` | No |  |
| `raw_taf` | ``$STRING`` | No |  |
| `report_time` | ``$STRING`` | No |  |
| `slp` | ``$NUMBER`` | No |  |
| `snow` | ``$NUMBER`` | No |  |
| `temp` | ``$NUMBER`` | No |  |
| `vert_vi` | ``$INTEGER`` | No |  |
| `visib` | ``$STRING`` | No |  |
| `wdir` | ``$INTEGER`` | No |  |
| `wgst` | ``$INTEGER`` | No |  |
| `wspd` | ``$INTEGER`` | No |  |
| `wx_string` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.metar.list({})
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
pirep = client.pirep
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aircraft_type` | ``$STRING`` | No |  |
| `altitude_ft` | ``$INTEGER`` | No |  |
| `cloud` | ``$ARRAY`` | No |  |
| `icing` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `obs_time` | ``$STRING`` | No |  |
| `raw_ob` | ``$STRING`` | No |  |
| `report_type` | ``$STRING`` | No |  |
| `temp` | ``$NUMBER`` | No |  |
| `turbulence` | ``$STRING`` | No |  |
| `visibility` | ``$STRING`` | No |  |
| `wdir` | ``$INTEGER`` | No |  |
| `wspd` | ``$INTEGER`` | No |  |
| `wx_string` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.pirep.list({})
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
station_info = client.station_info
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | ``$STRING`` | No |  |
| `elev` | ``$NUMBER`` | No |  |
| `iata_id` | ``$STRING`` | No |  |
| `icao_id` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `priority` | ``$INTEGER`` | No |  |
| `site` | ``$STRING`` | No |  |
| `state` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.station_info.list({})
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
taf = client.taf
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bulletin_time` | ``$STRING`` | No |  |
| `elev` | ``$NUMBER`` | No |  |
| `fcst` | ``$ARRAY`` | No |  |
| `icao_id` | ``$STRING`` | No |  |
| `issue_time` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `raw_taf` | ``$STRING`` | No |  |
| `valid_time_from` | ``$STRING`` | No |  |
| `valid_time_to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.taf.list({})
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
tcf = client.tcf
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.tcf.load({"id": "tcf_id"})
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

