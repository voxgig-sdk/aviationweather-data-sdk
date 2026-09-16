# AviationWeather Data API

This API provides machine-to-machine access to aviation weather data, including METARs, TAFs, AIRMETs, and SIGMETs. It enables users to fetch up-to-date weather information for flight planning and operations. The service allows queries for the past 15 days of data and provides cache options for efficient data retrieval.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 10 entities and 19 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### AirSigmet

Results: Successful response; No content - valid request but no data available.

SDK operations: `list`.

Key fields to recognise:

- `airsigmetType`: SIGMET type
- `altitudeHigh`: Upper altitude in feet MSL
- `altitudeLow`: Lower altitude in feet MSL
- `fir`: Flight Information Region
- `hazard`: Hazard type

### Airport

Results: Successful response; No content - valid request but no data available.

SDK operations: `list`.

Key fields to recognise:

- `city`: City
- `country`: Country code
- `elev`: Elevation in meters
- `iataId`: IATA identifier
- `icaoId`: ICAO airport identifier

### Cache

Results: Successful response.

SDK operations: `load`.

### Cwa

Results: Successful response; No content - valid request but no data available.

SDK operations: `list`.

Key fields to recognise:

- `cwsu`: Center Weather Service Unit
- `issueTime`: Issue time in ISO8601 format
- `rawText`: Raw CWA text
- `sequence`: Sequence number
- `seriesId`: Series identifier

### GAirmet

Results: Successful response; No content - valid request but no data available.

SDK operations: `list`.

Key fields to recognise:

- `altitudeHigh`: Upper altitude in feet MSL
- `altitudeLow`: Lower altitude in feet MSL
- `hazard`: Hazard type
- `issueTime`: Issue time in ISO8601 format
- `qualifier`: Forecast qualifier

### Metar

Results: Successful response; No content - valid request but no data available.

SDK operations: `list`.

Key fields to recognise:

- `altim`: Altimeter setting in inches of mercury
- `clouds`: Cloud layers
- `dewp`: Dewpoint in Celsius
- `elev`: Elevation in meters
- `fltCat`: Flight category (VFR, MVFR, IFR, LIFR)

### Pirep

Results: Successful response; No content - valid request but no data available.

SDK operations: `list`.

Key fields to recognise:

- `aircraftType`: Aircraft type
- `altitudeFt`: Altitude in feet MSL
- `clouds`: Cloud reports
- `icing`: Icing report
- `lat`: Latitude

### StationInfo

Results: Successful response; No content - valid request but no data available.

SDK operations: `list`.

Key fields to recognise:

- `country`: Country code
- `elev`: Elevation in meters
- `iataId`: IATA identifier
- `icaoId`: ICAO station identifier
- `lat`: Latitude

### Taf

Results: Successful response; No content - valid request but no data available.

SDK operations: `list`.

Key fields to recognise:

- `bulletinTime`: Bulletin time in ISO8601 format
- `elev`: Elevation in meters
- `fcsts`: Forecast periods
- `icaoId`: ICAO station identifier
- `issueTime`: TAF issue time in ISO8601 format

### Tcf

Results: Successful response; No content - valid request but no data available.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| AirSigmet | `list` | `GET /api/data/airsigmet` | See reference |
| Airport | `list` | `GET /api/data/airport` | See reference |
| Cache | `load` | `GET /data/cache/aircraftreports.cache.csv.gz` | See reference |
| Cache | `load` | `GET /data/cache/aircraftreports.cache.xml.gz` | See reference |
| Cache | `load` | `GET /data/cache/airsigmets.cache.csv.gz` | See reference |
| Cache | `load` | `GET /data/cache/airsigmets.cache.xml.gz` | See reference |
| Cache | `load` | `GET /data/cache/gairmets.cache.xml.gz` | See reference |
| Cache | `load` | `GET /data/cache/metars.cache.csv.gz` | See reference |
| Cache | `load` | `GET /data/cache/metars.cache.xml.gz` | See reference |
| Cache | `load` | `GET /data/cache/stations.cache.json.gz` | See reference |
| Cache | `load` | `GET /data/cache/stations.cache.xml.gz` | See reference |
| Cache | `load` | `GET /data/cache/tafs.cache.xml.gz` | See reference |
| Cwa | `list` | `GET /api/data/cwa` | See reference |
| GAirmet | `list` | `GET /api/data/gairmet` | See reference |
| Metar | `list` | `GET /api/data/metar` | See reference |
| Pirep | `list` | `GET /api/data/pirep` | See reference |
| StationInfo | `list` | `GET /api/data/stationinfo` | See reference |
| Taf | `list` | `GET /api/data/taf` | See reference |
| Tcf | `load` | `GET /api/data/tcf` | See reference |

## Connect to the API

- Aviation Weather Center Production Server: `https://aviationweather.gov`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `aviationweather-data_list`: List records for an entity. Supported entities: `air_sigmet`, `airport`, `cwa`, `g_airmet`, `metar`, `pirep`, `station_info`, `taf`.
- `aviationweather-data_load`: Load one record for an entity. Supported entities: `cache`, `tcf`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

