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
| `airsigmetType` | `string` | No | SIGMET type |
| `altitudeHigh` | `number` | No | Upper altitude in feet MSL |
| `altitudeLow` | `number` | No | Lower altitude in feet MSL |
| `fir` | `string` | No | Flight Information Region |
| `hazard` | `string` | No | Hazard type |
| `issueTime` | `string` | No | Issue time in ISO8601 format |
| `rawAirSigmet` | `string` | No | Raw SIGMET text |
| `severity` | `string` | No | Severity level |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

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
| `city` | `string` | No | City |
| `country` | `string` | No | Country code |
| `elev` | `number` | No | Elevation in meters |
| `iataId` | `string` | No | IATA identifier |
| `icaoId` | `string` | No | ICAO airport identifier |
| `lat` | `number` | No | Latitude |
| `lon` | `number` | No | Longitude |
| `name` | `string` | No | Airport name |
| `state` | `string` | No | State or province |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `aircraftreportscachecsvgz` | `/data/cache/aircraftreports.cache.csv.gz` | `client.Cache().load({ $action: 'aircraftreportscachecsvgz', ... })` |
| `aircraftreportscachexmlgz` | `/data/cache/aircraftreports.cache.xml.gz` | `client.Cache().load({ $action: 'aircraftreportscachexmlgz', ... })` |
| `airsigmetscachecsvgz` | `/data/cache/airsigmets.cache.csv.gz` | `client.Cache().load({ $action: 'airsigmetscachecsvgz', ... })` |
| `airsigmetscachexmlgz` | `/data/cache/airsigmets.cache.xml.gz` | `client.Cache().load({ $action: 'airsigmetscachexmlgz', ... })` |
| `gairmetscachexmlgz` | `/data/cache/gairmets.cache.xml.gz` | `client.Cache().load({ $action: 'gairmetscachexmlgz', ... })` |
| `metarscachecsvgz` | `/data/cache/metars.cache.csv.gz` | `client.Cache().load({ $action: 'metarscachecsvgz', ... })` |
| `metarscachexmlgz` | `/data/cache/metars.cache.xml.gz` | `client.Cache().load({ $action: 'metarscachexmlgz', ... })` |
| `stationscachejsongz` | `/data/cache/stations.cache.json.gz` | `client.Cache().load({ $action: 'stationscachejsongz', ... })` |
| `stationscachexmlgz` | `/data/cache/stations.cache.xml.gz` | `client.Cache().load({ $action: 'stationscachexmlgz', ... })` |
| `tafscachexmlgz` | `/data/cache/tafs.cache.xml.gz` | `client.Cache().load({ $action: 'tafscachexmlgz', ... })` |

An action returns that action's OWN response, which is not necessarily a
Cache record — check the API definition for its shape.

```ts
const result = await client.Cache().load({
  $action: 'aircraftreportscachecsvgz',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Cache().load()
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
| `cwsu` | `string` | No | Center Weather Service Unit |
| `issueTime` | `string` | No | Issue time in ISO8601 format |
| `rawText` | `string` | No | Raw CWA text |
| `sequence` | `number` | No | Sequence number |
| `seriesId` | `string` | No | Series identifier |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

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
| `altitudeHigh` | `number` | No | Upper altitude in feet MSL |
| `altitudeLow` | `number` | No | Lower altitude in feet MSL |
| `hazard` | `string` | No | Hazard type |
| `issueTime` | `string` | No | Issue time in ISO8601 format |
| `qualifier` | `string` | No | Forecast qualifier |
| `severity` | `string` | No | Severity level |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

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
| `altim` | `number` | No | Altimeter setting in inches of mercury |
| `clouds` | `any[]` | No | Cloud layers |
| `dewp` | `number` | No | Dewpoint in Celsius |
| `elev` | `number` | No | Elevation in meters |
| `fltCat` | `string` | No | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | `string` | No | ICAO station identifier |
| `lat` | `number` | No | Latitude |
| `lon` | `number` | No | Longitude |
| `maxT` | `number` | No | Maximum temperature |
| `maxT24` | `number` | No | 24-hour maximum temperature |
| `metarType` | `string` | No | METAR type (METAR or SPECI) |
| `minT` | `number` | No | Minimum temperature |
| `minT24` | `number` | No | 24-hour minimum temperature |
| `mostRecent` | `number` | No | Most recent observation flag |
| `name` | `string` | No | Station name |
| `obsTime` | `string` | No | Observation time in ISO8601 format |
| `pcp24hr` | `number` | No | 24-hour precipitation |
| `pcp3hr` | `number` | No | 3-hour precipitation |
| `pcp6hr` | `number` | No | 6-hour precipitation |
| `precip` | `number` | No | Precipitation |
| `presTend` | `number` | No | Pressure tendency |
| `prior` | `number` | No | Prior observation indicator |
| `qcField` | `number` | No | Quality control field |
| `rawOb` | `string` | No | Raw METAR observation text |
| `rawTaf` | `string` | No | Raw TAF if available |
| `reportTime` | `string` | No | Report time in ISO8601 format |
| `slp` | `number` | No | Sea level pressure |
| `snow` | `number` | No | Snow depth |
| `temp` | `number` | No | Temperature in Celsius |
| `vertVis` | `number` | No | Vertical visibility |
| `visib` | `string` | No | Visibility |
| `wdir` | `number` | No | Wind direction in degrees |
| `wgst` | `number` | No | Wind gust in knots |
| `wspd` | `number` | No | Wind speed in knots |
| `wxString` | `string` | No | Weather phenomena string |

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
| `aircraftType` | `string` | No | Aircraft type |
| `altitudeFt` | `number` | No | Altitude in feet MSL |
| `clouds` | `any[]` | No | Cloud reports |
| `icing` | `string` | No | Icing report |
| `lat` | `number` | No | Latitude |
| `lon` | `number` | No | Longitude |
| `obsTime` | `string` | No | Observation time in ISO8601 format |
| `rawOb` | `string` | No | Raw PIREP text |
| `reportType` | `string` | No | Report type (PIREP or AIREP) |
| `temp` | `number` | No | Temperature in Celsius |
| `turbulence` | `string` | No | Turbulence report |
| `visibility` | `string` | No | Visibility |
| `wdir` | `number` | No | Wind direction in degrees |
| `wspd` | `number` | No | Wind speed in knots |
| `wxString` | `string` | No | Weather phenomena string |

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
| `country` | `string` | No | Country code |
| `elev` | `number` | No | Elevation in meters |
| `iataId` | `string` | No | IATA identifier |
| `icaoId` | `string` | No | ICAO station identifier |
| `lat` | `number` | No | Latitude |
| `lon` | `number` | No | Longitude |
| `name` | `string` | No | Station name |
| `priority` | `number` | No | Priority level |
| `site` | `string` | No | Site type |
| `state` | `string` | No | State or province |

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
| `bulletinTime` | `string` | No | Bulletin time in ISO8601 format |
| `elev` | `number` | No | Elevation in meters |
| `fcsts` | `any[]` | No | Forecast periods |
| `icaoId` | `string` | No | ICAO station identifier |
| `issueTime` | `string` | No | TAF issue time in ISO8601 format |
| `lat` | `number` | No | Latitude |
| `lon` | `number` | No | Longitude |
| `name` | `string` | No | Station name |
| `rawTAF` | `string` | No | Raw TAF forecast text |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

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
const result = await client.Tcf().load()
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

