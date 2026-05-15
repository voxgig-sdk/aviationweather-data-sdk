# AviationweatherData TypeScript SDK Reference

Complete API reference for the AviationweatherData TypeScript SDK.


## AviationweatherDataSDK

### Constructor

```ts
new AviationweatherDataSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AviationweatherDataSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = AviationweatherDataSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `AviationweatherDataSDK` instance in test mode.


### Instance Methods

#### `AirSigmet(data?: object)`

Create a new `AirSigmet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AirSigmetEntity` instance.

#### `Airport(data?: object)`

Create a new `Airport` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AirportEntity` instance.

#### `Cache(data?: object)`

Create a new `Cache` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CacheEntity` instance.

#### `Cwa(data?: object)`

Create a new `Cwa` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CwaEntity` instance.

#### `GAirmet(data?: object)`

Create a new `GAirmet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GAirmetEntity` instance.

#### `Metar(data?: object)`

Create a new `Metar` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MetarEntity` instance.

#### `Pirep(data?: object)`

Create a new `Pirep` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PirepEntity` instance.

#### `StationInfo(data?: object)`

Create a new `StationInfo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StationInfoEntity` instance.

#### `Taf(data?: object)`

Create a new `Taf` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TafEntity` instance.

#### `Tcf(data?: object)`

Create a new `Tcf` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TcfEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `AviationweatherDataSDK.test()`.

**Returns:** `AviationweatherDataSDK` instance in test mode.


---

## AirSigmetEntity

```ts
const air_sigmet = client.AirSigmet()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AirSigmet().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AirSigmetEntity` instance with the same client and
options.

#### `client()`

Return the parent `AviationweatherDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AirportEntity

```ts
const airport = client.Airport()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Airport().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AirportEntity` instance with the same client and
options.

#### `client()`

Return the parent `AviationweatherDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CacheEntity

```ts
const cache = client.Cache()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Cache().load({ id: 'cache_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CacheEntity` instance with the same client and
options.

#### `client()`

Return the parent `AviationweatherDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CwaEntity

```ts
const cwa = client.Cwa()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Cwa().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CwaEntity` instance with the same client and
options.

#### `client()`

Return the parent `AviationweatherDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GAirmetEntity

```ts
const g_airmet = client.GAirmet()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.GAirmet().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GAirmetEntity` instance with the same client and
options.

#### `client()`

Return the parent `AviationweatherDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MetarEntity

```ts
const metar = client.Metar()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Metar().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MetarEntity` instance with the same client and
options.

#### `client()`

Return the parent `AviationweatherDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PirepEntity

```ts
const pirep = client.Pirep()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Pirep().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PirepEntity` instance with the same client and
options.

#### `client()`

Return the parent `AviationweatherDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StationInfoEntity

```ts
const station_info = client.StationInfo()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.StationInfo().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StationInfoEntity` instance with the same client and
options.

#### `client()`

Return the parent `AviationweatherDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TafEntity

```ts
const taf = client.Taf()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Taf().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TafEntity` instance with the same client and
options.

#### `client()`

Return the parent `AviationweatherDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TcfEntity

```ts
const tcf = client.Tcf()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Tcf().load({ id: 'tcf_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TcfEntity` instance with the same client and
options.

#### `client()`

Return the parent `AviationweatherDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new AviationweatherDataSDK({
  feature: {
    test: { active: true },
  }
})
```

