# AviationweatherData Ruby SDK Reference

Complete API reference for the AviationweatherData Ruby SDK.


## AviationweatherDataSDK

### Constructor

```ruby
require_relative 'AviationweatherData_sdk'

client = AviationweatherDataSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AviationweatherDataSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = AviationweatherDataSDK.test
```


### Instance Methods

#### `AirSigmet(data = nil)`

Create a new `AirSigmet` entity instance. Pass `nil` for no initial data.

#### `Airport(data = nil)`

Create a new `Airport` entity instance. Pass `nil` for no initial data.

#### `Cache(data = nil)`

Create a new `Cache` entity instance. Pass `nil` for no initial data.

#### `Cwa(data = nil)`

Create a new `Cwa` entity instance. Pass `nil` for no initial data.

#### `GAirmet(data = nil)`

Create a new `GAirmet` entity instance. Pass `nil` for no initial data.

#### `Metar(data = nil)`

Create a new `Metar` entity instance. Pass `nil` for no initial data.

#### `Pirep(data = nil)`

Create a new `Pirep` entity instance. Pass `nil` for no initial data.

#### `StationInfo(data = nil)`

Create a new `StationInfo` entity instance. Pass `nil` for no initial data.

#### `Taf(data = nil)`

Create a new `Taf` entity instance. Pass `nil` for no initial data.

#### `Tcf(data = nil)`

Create a new `Tcf` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AirSigmetEntity

```ruby
air_sigmet = client.AirSigmet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `airsigmetType` | `String` | No | SIGMET type |
| `altitudeHigh` | `Integer` | No | Upper altitude in feet MSL |
| `altitudeLow` | `Integer` | No | Lower altitude in feet MSL |
| `fir` | `String` | No | Flight Information Region |
| `hazard` | `String` | No | Hazard type |
| `issueTime` | `String` | No | Issue time in ISO8601 format |
| `rawAirSigmet` | `String` | No | Raw SIGMET text |
| `severity` | `String` | No | Severity level |
| `validTimeFrom` | `String` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `String` | No | Valid time to in ISO8601 format |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.AirSigmet.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AirSigmetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AirportEntity

```ruby
airport = client.Airport
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `String` | No | City |
| `country` | `String` | No | Country code |
| `elev` | `Float` | No | Elevation in meters |
| `iataId` | `String` | No | IATA identifier |
| `icaoId` | `String` | No | ICAO airport identifier |
| `lat` | `Float` | No | Latitude |
| `lon` | `Float` | No | Longitude |
| `name` | `String` | No | Airport name |
| `state` | `String` | No | State or province |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Airport.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AirportEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CacheEntity

```ruby
cache = client.Cache
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Cache.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CacheEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CwaEntity

```ruby
cwa = client.Cwa
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cwsu` | `String` | No | Center Weather Service Unit |
| `issueTime` | `String` | No | Issue time in ISO8601 format |
| `rawText` | `String` | No | Raw CWA text |
| `sequence` | `Integer` | No | Sequence number |
| `seriesId` | `String` | No | Series identifier |
| `validTimeFrom` | `String` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `String` | No | Valid time to in ISO8601 format |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Cwa.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CwaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GAirmetEntity

```ruby
g_airmet = client.GAirmet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altitudeHigh` | `Integer` | No | Upper altitude in feet MSL |
| `altitudeLow` | `Integer` | No | Lower altitude in feet MSL |
| `hazard` | `String` | No | Hazard type |
| `issueTime` | `String` | No | Issue time in ISO8601 format |
| `qualifier` | `String` | No | Forecast qualifier |
| `severity` | `String` | No | Severity level |
| `validTimeFrom` | `String` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `String` | No | Valid time to in ISO8601 format |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.GAirmet.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GAirmetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MetarEntity

```ruby
metar = client.Metar
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altim` | `Float` | No | Altimeter setting in inches of mercury |
| `clouds` | `Array` | No | Cloud layers |
| `dewp` | `Float` | No | Dewpoint in Celsius |
| `elev` | `Float` | No | Elevation in meters |
| `fltCat` | `String` | No | Flight category (VFR, MVFR, IFR, LIFR) |
| `icaoId` | `String` | No | ICAO station identifier |
| `lat` | `Float` | No | Latitude |
| `lon` | `Float` | No | Longitude |
| `maxT` | `Float` | No | Maximum temperature |
| `maxT24` | `Float` | No | 24-hour maximum temperature |
| `metarType` | `String` | No | METAR type (METAR or SPECI) |
| `minT` | `Float` | No | Minimum temperature |
| `minT24` | `Float` | No | 24-hour minimum temperature |
| `mostRecent` | `Integer` | No | Most recent observation flag |
| `name` | `String` | No | Station name |
| `obsTime` | `String` | No | Observation time in ISO8601 format |
| `pcp24hr` | `Float` | No | 24-hour precipitation |
| `pcp3hr` | `Float` | No | 3-hour precipitation |
| `pcp6hr` | `Float` | No | 6-hour precipitation |
| `precip` | `Float` | No | Precipitation |
| `presTend` | `Float` | No | Pressure tendency |
| `prior` | `Integer` | No | Prior observation indicator |
| `qcField` | `Integer` | No | Quality control field |
| `rawOb` | `String` | No | Raw METAR observation text |
| `rawTaf` | `String` | No | Raw TAF if available |
| `reportTime` | `String` | No | Report time in ISO8601 format |
| `slp` | `Float` | No | Sea level pressure |
| `snow` | `Float` | No | Snow depth |
| `temp` | `Float` | No | Temperature in Celsius |
| `vertVis` | `Integer` | No | Vertical visibility |
| `visib` | `String` | No | Visibility |
| `wdir` | `Integer` | No | Wind direction in degrees |
| `wgst` | `Integer` | No | Wind gust in knots |
| `wspd` | `Integer` | No | Wind speed in knots |
| `wxString` | `String` | No | Weather phenomena string |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Metar.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MetarEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PirepEntity

```ruby
pirep = client.Pirep
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aircraftType` | `String` | No | Aircraft type |
| `altitudeFt` | `Integer` | No | Altitude in feet MSL |
| `clouds` | `Array` | No | Cloud reports |
| `icing` | `String` | No | Icing report |
| `lat` | `Float` | No | Latitude |
| `lon` | `Float` | No | Longitude |
| `obsTime` | `String` | No | Observation time in ISO8601 format |
| `rawOb` | `String` | No | Raw PIREP text |
| `reportType` | `String` | No | Report type (PIREP or AIREP) |
| `temp` | `Float` | No | Temperature in Celsius |
| `turbulence` | `String` | No | Turbulence report |
| `visibility` | `String` | No | Visibility |
| `wdir` | `Integer` | No | Wind direction in degrees |
| `wspd` | `Integer` | No | Wind speed in knots |
| `wxString` | `String` | No | Weather phenomena string |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Pirep.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PirepEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StationInfoEntity

```ruby
station_info = client.StationInfo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `String` | No | Country code |
| `elev` | `Float` | No | Elevation in meters |
| `iataId` | `String` | No | IATA identifier |
| `icaoId` | `String` | No | ICAO station identifier |
| `lat` | `Float` | No | Latitude |
| `lon` | `Float` | No | Longitude |
| `name` | `String` | No | Station name |
| `priority` | `Integer` | No | Priority level |
| `site` | `String` | No | Site type |
| `state` | `String` | No | State or province |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.StationInfo.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StationInfoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TafEntity

```ruby
taf = client.Taf
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bulletinTime` | `String` | No | Bulletin time in ISO8601 format |
| `elev` | `Float` | No | Elevation in meters |
| `fcsts` | `Array` | No | Forecast periods |
| `icaoId` | `String` | No | ICAO station identifier |
| `issueTime` | `String` | No | TAF issue time in ISO8601 format |
| `lat` | `Float` | No | Latitude |
| `lon` | `Float` | No | Longitude |
| `name` | `String` | No | Station name |
| `rawTAF` | `String` | No | Raw TAF forecast text |
| `validTimeFrom` | `String` | No | Valid time from in ISO8601 format |
| `validTimeTo` | `String` | No | Valid time to in ISO8601 format |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Taf.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TafEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TcfEntity

```ruby
tcf = client.Tcf
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Tcf.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TcfEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```ruby
client = AviationweatherDataSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

Client-side rate limiting via a token bucket.

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

Automatic retry of transient failures with exponential backoff.

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

In-memory mock transport for testing without a live server.

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

Per-request timeout with transport abort.

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

