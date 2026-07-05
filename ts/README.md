# AviationweatherData TypeScript SDK



The TypeScript SDK for the AviationweatherData API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.AirSigmet()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
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
import { AviationweatherDataSDK } from '@voxgig-sdk/aviationweather-data'

const client = new AviationweatherDataSDK()
```

### 2. List airsigmet records

`list()` resolves to an array of AirSigmet objects — iterate it directly:

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
  const airsigmets = await client.AirSigmet().list()
  console.log(airsigmets)
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

const airsigmet = await client.AirSigmet().list()
// airsigmet is a bare entity populated with mock response data
console.log(airsigmet)
```

You can also use the instance method:

```ts
const client = new AviationweatherDataSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.AirSigmet()

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

Operations: list.

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
| `cwsu` |  |
| `issue_time` |  |
| `raw_text` |  |
| `sequence` |  |
| `series_id` |  |
| `valid_time_from` |  |
| `valid_time_to` |  |

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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
| `airsigmet_type` | `string` |  |
| `altitude_high` | `number` |  |
| `altitude_low` | `number` |  |
| `fir` | `string` |  |
| `hazard` | `string` |  |
| `issue_time` | `string` |  |
| `raw_air_sigmet` | `string` |  |
| `severity` | `string` |  |
| `valid_time_from` | `string` |  |
| `valid_time_to` | `string` |  |

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
| `city` | `string` |  |
| `country` | `string` |  |
| `elev` | `number` |  |
| `iata_id` | `string` |  |
| `icao_id` | `string` |  |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `name` | `string` |  |
| `state` | `string` |  |

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
| `cwsu` | `string` |  |
| `issue_time` | `string` |  |
| `raw_text` | `string` |  |
| `sequence` | `number` |  |
| `series_id` | `string` |  |
| `valid_time_from` | `string` |  |
| `valid_time_to` | `string` |  |

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
| `altitude_high` | `number` |  |
| `altitude_low` | `number` |  |
| `hazard` | `string` |  |
| `issue_time` | `string` |  |
| `qualifier` | `string` |  |
| `severity` | `string` |  |
| `valid_time_from` | `string` |  |
| `valid_time_to` | `string` |  |

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
| `altim` | `number` |  |
| `cloud` | `any[]` |  |
| `dewp` | `number` |  |
| `elev` | `number` |  |
| `flt_cat` | `string` |  |
| `icao_id` | `string` |  |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `max_t` | `number` |  |
| `max_t24` | `number` |  |
| `metar_type` | `string` |  |
| `min_t` | `number` |  |
| `min_t24` | `number` |  |
| `most_recent` | `number` |  |
| `name` | `string` |  |
| `obs_time` | `string` |  |
| `pcp24hr` | `number` |  |
| `pcp3hr` | `number` |  |
| `pcp6hr` | `number` |  |
| `precip` | `number` |  |
| `pres_tend` | `number` |  |
| `prior` | `number` |  |
| `qc_field` | `number` |  |
| `raw_ob` | `string` |  |
| `raw_taf` | `string` |  |
| `report_time` | `string` |  |
| `slp` | `number` |  |
| `snow` | `number` |  |
| `temp` | `number` |  |
| `vert_vi` | `number` |  |
| `visib` | `string` |  |
| `wdir` | `number` |  |
| `wgst` | `number` |  |
| `wspd` | `number` |  |
| `wx_string` | `string` |  |

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
| `aircraft_type` | `string` |  |
| `altitude_ft` | `number` |  |
| `cloud` | `any[]` |  |
| `icing` | `string` |  |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `obs_time` | `string` |  |
| `raw_ob` | `string` |  |
| `report_type` | `string` |  |
| `temp` | `number` |  |
| `turbulence` | `string` |  |
| `visibility` | `string` |  |
| `wdir` | `number` |  |
| `wspd` | `number` |  |
| `wx_string` | `string` |  |

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
| `country` | `string` |  |
| `elev` | `number` |  |
| `iata_id` | `string` |  |
| `icao_id` | `string` |  |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `name` | `string` |  |
| `priority` | `number` |  |
| `site` | `string` |  |
| `state` | `string` |  |

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
| `bulletin_time` | `string` |  |
| `elev` | `number` |  |
| `fcst` | `any[]` |  |
| `icao_id` | `string` |  |
| `issue_time` | `string` |  |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `name` | `string` |  |
| `raw_taf` | `string` |  |
| `valid_time_from` | `string` |  |
| `valid_time_to` | `string` |  |

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
import { AviationweatherDataSDK } from '@voxgig-sdk/aviationweather-data'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const airsigmet = client.AirSigmet()
await airsigmet.list()

// airsigmet.data() now returns the airsigmet data from the last `list`
// airsigmet.match() returns the last match criteria
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
