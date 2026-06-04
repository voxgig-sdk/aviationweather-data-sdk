# AviationweatherData SDK

Fetch METARs, TAFs, SIGMETs, PIREPs and other aviation weather data from the US NOAA Aviation Weather Center

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About AviationWeather Data API

The [Aviation Weather Data API](https://aviationweather.gov/data/api/) is the public REST interface to the [NOAA Aviation Weather Center](https://aviationweather.gov), part of the US National Weather Service. It is the same data source that powers the AWC website and is intended for flight planning, dispatch, and other aviation operations.

What you can pull from the API:
- Terminal observations (METAR) and forecasts (TAF), worldwide.
- Pilot and aircraft reports (PIREP / AIREP), primarily covering the US and North Atlantic.
- Convective and turbulence/icing advisories: SIGMET (worldwide), G-AIRMET (CONUS), AIRMET (Alaska), CWA (US centers), and the TFM Convective Forecast (TCF).
- Reference data for stations and airports, queryable by ICAO/IATA identifier.
- Up to 15 days of historical data per query, returned as raw text, JSON, GeoJSON, CSV, XML, or IWXXM depending on the endpoint.

Operational notes from the AWC documentation: requests are unauthenticated over HTTPS but are rate-limited to roughly 100 requests/minute, most endpoints return at most 400 records per call, and CORS is not enabled (so calls must come from a server, not a browser). For high-volume needs the AWC publishes pre-compiled cache files that are refreshed between once per minute and once per day.

## Try it

**TypeScript**
```bash
npm install aviationweather-data
```

**Python**
```bash
pip install aviationweather-data-sdk
```

**PHP**
```bash
composer require voxgig/aviationweather-data-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/aviationweather-data-sdk/go
```

**Ruby**
```bash
gem install aviationweather-data-sdk
```

**Lua**
```bash
luarocks install aviationweather-data-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { AviationweatherDataSDK } from 'aviationweather-data'

const client = new AviationweatherDataSDK({})

// List all airsigmets
const airsigmets = await client.AirSigmet().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o aviationweather-data-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "aviationweather-data": {
      "command": "/abs/path/to/aviationweather-data-mcp"
    }
  }
}
```

## Entities

The API exposes 10 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **AirSigmet** | AIRMETs for Alaska — significant meteorological advisories for icing, turbulence and IFR conditions, served from `/api/data/airsigmet`. | `/api/data/airsigmet` |
| **Airport** | Airport reference data (location, runways, identifiers) keyed by ICAO/IATA code, served from `/api/data/airport`. | `/api/data/airport` |
| **Cache** | Pre-compiled bulk data files (METAR, TAF, etc.) refreshed on a schedule, intended as an alternative to repeated live queries. | `/data/cache/aircraftreports.cache.csv.gz` |
| **Cwa** | Center Weather Advisories issued by US Center Weather Service Units, served from `/api/data/cwa`. | `/api/data/cwa` |
| **GAirmet** | Graphical AIRMETs for the contiguous 48 US states covering icing, turbulence and IFR hazards, served from `/api/data/gairmet`. | `/api/data/gairmet` |
| **Metar** | METAR surface observations from reporting stations worldwide, served from `/api/data/metar` and supporting up to 15 days of history. | `/api/data/metar` |
| **Pirep** | Pilot reports (PIREP/AIREP) of in-flight weather conditions, primarily over the US and North Atlantic, served from `/api/data/pirep`. | `/api/data/pirep` |
| **StationInfo** | Metadata for weather reporting stations (location, elevation, identifiers) worldwide, served from `/api/data/stationinfo`. | `/api/data/stationinfo` |
| **Taf** | Terminal Aerodrome Forecasts for airports worldwide, served from `/api/data/taf`. | `/api/data/taf` |
| **Tcf** | Traffic Flow Management Convective Forecast covering the US and parts of Canada, served from `/api/data/tcf`. | `/api/data/tcf` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from aviationweatherdata_sdk import AviationweatherDataSDK

client = AviationweatherDataSDK({})

# List all airsigmets
airsigmets, err = client.AirSigmet(None).list(None, None)
```

### PHP

```php
<?php
require_once 'aviationweatherdata_sdk.php';

$client = new AviationweatherDataSDK([]);

// List all airsigmets
[$airsigmets, $err] = $client->AirSigmet(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/aviationweather-data-sdk/go"

client := sdk.NewAviationweatherDataSDK(map[string]any{})

// List all airsigmets
airsigmets, err := client.AirSigmet(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "AviationweatherData_sdk"

client = AviationweatherDataSDK.new({})

# List all airsigmets
airsigmets, err = client.AirSigmet(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("aviationweather-data_sdk")

local client = sdk.new({})

-- List all airsigmets
local airsigmets, err = client:AirSigmet(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = AviationweatherDataSDK.test()
const result = await client.AirSigmet().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = AviationweatherDataSDK.test(None, None)
result, err = client.AirSigmet(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = AviationweatherDataSDK::test(null, null);
[$result, $err] = $client->AirSigmet(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.AirSigmet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AviationweatherDataSDK.test(nil, nil)
result, err = client.AirSigmet(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:AirSigmet(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the AviationWeather Data API

- Upstream: [https://aviationweather.gov](https://aviationweather.gov)
- API docs: [https://aviationweather.gov/data/api/](https://aviationweather.gov/data/api/)

- Produced by the US National Oceanic and Atmospheric Administration (NOAA) Aviation Weather Center, so the underlying data is generally in the public domain in the United States.
- Credit the NOAA / Aviation Weather Center as the data source when redistributing.
- The service is intended for machine-to-machine use; the docs ask clients to send a descriptive `User-Agent` and avoid abusive request patterns.
- No explicit licence file is published with the API — check [aviationweather.gov](https://aviationweather.gov) for the latest usage policy before relying on it commercially.

---

Generated from the AviationWeather Data API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
