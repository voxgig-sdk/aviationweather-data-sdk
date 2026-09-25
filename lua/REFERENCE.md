# AviationweatherData Lua SDK Reference

Complete API reference for the AviationweatherData Lua SDK.


## AviationweatherDataSDK

### Constructor

```lua
local sdk = require("aviationweather-data_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `AirSigmet(data)`

Create a new `AirSigmet` entity instance. Pass `nil` for no initial data.

#### `Airport(data)`

Create a new `Airport` entity instance. Pass `nil` for no initial data.

#### `Cache(data)`

Create a new `Cache` entity instance. Pass `nil` for no initial data.

#### `Cwa(data)`

Create a new `Cwa` entity instance. Pass `nil` for no initial data.

#### `GAirmet(data)`

Create a new `GAirmet` entity instance. Pass `nil` for no initial data.

#### `Metar(data)`

Create a new `Metar` entity instance. Pass `nil` for no initial data.

#### `Pirep(data)`

Create a new `Pirep` entity instance. Pass `nil` for no initial data.

#### `StationInfo(data)`

Create a new `StationInfo` entity instance. Pass `nil` for no initial data.

#### `Taf(data)`

Create a new `Taf` entity instance. Pass `nil` for no initial data.

#### `Tcf(data)`

Create a new `Tcf` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AirSigmetEntity

```lua
local air_sigmet = client:AirSigmet(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:AirSigmet():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AirSigmetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AirportEntity

```lua
local airport = client:Airport(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Airport():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AirportEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CacheEntity

```lua
local cache = client:Cache(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Cache():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CacheEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CwaEntity

```lua
local cwa = client:Cwa(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Cwa():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CwaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GAirmetEntity

```lua
local g_airmet = client:GAirmet(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:GAirmet():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GAirmetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MetarEntity

```lua
local metar = client:Metar(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altim` | `number` | No | Altimeter setting in inches of mercury |
| `clouds` | `table` | No | Cloud layers |
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Metar():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetarEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PirepEntity

```lua
local pirep = client:Pirep(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aircraftType` | `string` | No | Aircraft type |
| `altitudeFt` | `number` | No | Altitude in feet MSL |
| `clouds` | `table` | No | Cloud reports |
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Pirep():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PirepEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StationInfoEntity

```lua
local station_info = client:StationInfo(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:StationInfo():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StationInfoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TafEntity

```lua
local taf = client:Taf(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bulletinTime` | `string` | No | Bulletin time in ISO8601 format |
| `elev` | `number` | No | Elevation in meters |
| `fcsts` | `table` | No | Forecast periods |
| `icaoId` | `string` | No | ICAO station identifier |
| `issueTime` | `string` | No | TAF issue time in ISO8601 format |
| `lat` | `number` | No | Latitude |
| `lon` | `number` | No | Longitude |
| `name` | `string` | No | Station name |
| `rawTAF` | `string` | No | Raw TAF forecast text |
| `validTimeFrom` | `string` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `string` | No | Valid time to in ISO8601 format |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Taf():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TafEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TcfEntity

```lua
local tcf = client:Tcf(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Tcf():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TcfEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

