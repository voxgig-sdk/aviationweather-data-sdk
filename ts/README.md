# AviationweatherData TypeScript SDK



The TypeScript SDK for the AviationweatherData API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.AirSigmet()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/aviationweather-data-sdk/releases](https://github.com/voxgig-sdk/aviationweather-data-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { AviationweatherDataSDK } from '@voxgig-sdk/aviationweather-data-sdk'

const client = new AviationweatherDataSDK()
```

### 2. List airsigmet records

`list()` resolves to an array of AirSigmet ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const airsigmets = await client.AirSigmet().list()

for (const airsigmet of airsigmets) {
  console.log(airsigmet)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const airports = await client.Airport().list()
  console.log(airports)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = AviationweatherDataSDK.test()

const airport = await client.Airport().list()
// airport is the entity, populated with mock response data
// — call airport.data() for the record itself
console.log(airport)
```

You can also use the instance method:

```ts
const client = new AviationweatherDataSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Airport()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new AviationweatherDataSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
AVIATIONWEATHER_DATA_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### AviationweatherDataSDK

#### Constructor

```ts
new AviationweatherDataSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `AirSigmet(data?)` | `AirSigmetEntity` | Create an AirSigmet entity instance. |
| `Airport(data?)` | `AirportEntity` | Create an Airport entity instance. |
| `Cache(data?)` | `CacheEntity` | Create a Cache entity instance. |
| `Cwa(data?)` | `CwaEntity` | Create a Cwa entity instance. |
| `GAirmet(data?)` | `GAirmetEntity` | Create a GAirmet entity instance. |
| `Metar(data?)` | `MetarEntity` | Create a Metar entity instance. |
| `Pirep(data?)` | `PirepEntity` | Create a Pirep entity instance. |
| `StationInfo(data?)` | `StationInfoEntity` | Create a StationInfo entity instance. |
| `Taf(data?)` | `TafEntity` | Create a Taf entity instance. |
| `Tcf(data?)` | `TcfEntity` | Create a Tcf entity instance. |
| `tester(testopts?, sdkopts?)` | `AviationweatherDataSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `AviationweatherDataSDK.test(testopts?, sdkopts?)` | `AviationweatherDataSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): AviationweatherDataSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list.

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

Operations: list.

API path: `/api/data/airport`

#### Cache

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

API path: `/api/data/taf`

#### Tcf

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/data/tcf`



## Entities


### AirSigmet

Create an instance: `const air_sigmet = client.AirSigmet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `airsigmetType` | `string` | SIGMET type |
| `altitudeHigh` | `number` | Upper altitude in feet MSL |
| `altitudeLow` | `number` | Lower altitude in feet MSL |
| `fir` | `string` | Flight Information Region |
| `hazard` | `string` | Hazard type |
| `issueTime` | `string` | Issue time in ISO8601 format |
| `rawAirSigmet` | `string` | Raw SIGMET text |
| `severity` | `string` | Severity level |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```ts
const air_sigmets = await client.AirSigmet().list()
```


### Airport

Create an instance: `const airport = client.Airport()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` | City |
| `country` | `string` | Country code |
| `elev` | `number` | Elevation in meters |
| `iataId` | `string` | IATA identifier |
| `icaoId` | `string` | ICAO airport identifier |
| `lat` | `number` | Latitude |
| `lon` | `number` | Longitude |
| `name` | `string` | Airport name |
| `state` | `string` | State or province |

#### Example: List

```ts
const airports = await client.Airport().list()
```


### Cache

Create an instance: `const cache = client.Cache()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const cache = await client.Cache().load()
```


### Cwa

Create an instance: `const cwa = client.Cwa()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cwsu` | `string` | Center Weather Service Unit |
| `issueTime` | `string` | Issue time in ISO8601 format |
| `rawText` | `string` | Raw CWA text |
| `sequence` | `number` | Sequence number |
| `seriesId` | `string` | Series identifier |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```ts
const cwas = await client.Cwa().list()
```


### GAirmet

Create an instance: `const g_airmet = client.GAirmet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altitudeHigh` | `number` | Upper altitude in feet MSL |
| `altitudeLow` | `number` | Lower altitude in feet MSL |
| `hazard` | `string` | Hazard type |
| `issueTime` | `string` | Issue time in ISO8601 format |
| `qualifier` | `string` | Forecast qualifier |
| `severity` | `string` | Severity level |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```ts
const g_airmets = await client.GAirmet().list()
```


### Metar

Create an instance: `const metar = client.Metar()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altim` | `number` | Altimeter setting in inches of mercury |
| `clouds` | `any[]` | Cloud layers |
| `dewp` | `number` | Dewpoint in Celsius |
| `elev` | `number` | Elevation in meters |
| `fltCat` | `string` | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | `string` | ICAO station identifier |
| `lat` | `number` | Latitude |
| `lon` | `number` | Longitude |
| `maxT` | `number` | Maximum temperature |
| `maxT24` | `number` | 24-hour maximum temperature |
| `metarType` | `string` | METAR type (METAR or SPECI) |
| `minT` | `number` | Minimum temperature |
| `minT24` | `number` | 24-hour minimum temperature |
| `mostRecent` | `number` | Most recent observation flag |
| `name` | `string` | Station name |
| `obsTime` | `string` | Observation time in ISO8601 format |
| `pcp24hr` | `number` | 24-hour precipitation |
| `pcp3hr` | `number` | 3-hour precipitation |
| `pcp6hr` | `number` | 6-hour precipitation |
| `precip` | `number` | Precipitation |
| `presTend` | `number` | Pressure tendency |
| `prior` | `number` | Prior observation indicator |
| `qcField` | `number` | Quality control field |
| `rawOb` | `string` | Raw METAR observation text |
| `rawTaf` | `string` | Raw TAF if available |
| `reportTime` | `string` | Report time in ISO8601 format |
| `slp` | `number` | Sea level pressure |
| `snow` | `number` | Snow depth |
| `temp` | `number` | Temperature in Celsius |
| `vertVis` | `number` | Vertical visibility |
| `visib` | `string` | Visibility |
| `wdir` | `number` | Wind direction in degrees |
| `wgst` | `number` | Wind gust in knots |
| `wspd` | `number` | Wind speed in knots |
| `wxString` | `string` | Weather phenomena string |

#### Example: List

```ts
const metars = await client.Metar().list()
```


### Pirep

Create an instance: `const pirep = client.Pirep()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aircraftType` | `string` | Aircraft type |
| `altitudeFt` | `number` | Altitude in feet MSL |
| `clouds` | `any[]` | Cloud reports |
| `icing` | `string` | Icing report |
| `lat` | `number` | Latitude |
| `lon` | `number` | Longitude |
| `obsTime` | `string` | Observation time in ISO8601 format |
| `rawOb` | `string` | Raw PIREP text |
| `reportType` | `string` | Report type (PIREP or AIREP) |
| `temp` | `number` | Temperature in Celsius |
| `turbulence` | `string` | Turbulence report |
| `visibility` | `string` | Visibility |
| `wdir` | `number` | Wind direction in degrees |
| `wspd` | `number` | Wind speed in knots |
| `wxString` | `string` | Weather phenomena string |

#### Example: List

```ts
const pireps = await client.Pirep().list()
```


### StationInfo

Create an instance: `const station_info = client.StationInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` | Country code |
| `elev` | `number` | Elevation in meters |
| `iataId` | `string` | IATA identifier |
| `icaoId` | `string` | ICAO station identifier |
| `lat` | `number` | Latitude |
| `lon` | `number` | Longitude |
| `name` | `string` | Station name |
| `priority` | `number` | Priority level |
| `site` | `string` | Site type |
| `state` | `string` | State or province |

#### Example: List

```ts
const station_infos = await client.StationInfo().list()
```


### Taf

Create an instance: `const taf = client.Taf()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bulletinTime` | `string` | Bulletin time in ISO8601 format |
| `elev` | `number` | Elevation in meters |
| `fcsts` | `any[]` | Forecast periods |
| `icaoId` | `string` | ICAO station identifier |
| `issueTime` | `string` | TAF issue time in ISO8601 format |
| `lat` | `number` | Latitude |
| `lon` | `number` | Longitude |
| `name` | `string` | Station name |
| `rawTAF` | `string` | Raw TAF forecast text |
| `validTimeFrom` | `string` | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | Valid time to in ISO8601 format |

#### Example: List

```ts
const tafs = await client.Taf().list()
```


### Tcf

Create an instance: `const tcf = client.Tcf()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const tcf = await client.Tcf().load()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
aviationweather-data/
├── src/
│   ├── AviationweatherDataSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { AviationweatherDataSDK } from '@voxgig-sdk/aviationweather-data-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const airport = client.Airport()
await airport.list()

// airport.data() now returns the airport data from the last `list`
// airport.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
