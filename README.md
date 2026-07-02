# AviationweatherData SDK

AviationWeather Data API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { AviationweatherDataSDK } from 'aviationweather-data'

const client = new AviationweatherDataSDK({
  apikey: process.env.AVIATIONWEATHER-DATA_APIKEY,
})

// List all airsigmets
const airsigmets = await client.AirSigmet().list()
console.log(airsigmets.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **AirSigmet** |  | `/api/data/airsigmet` |
| **Airport** |  | `/api/data/airport` |
| **Cache** |  | `/data/cache/aircraftreports.cache.csv.gz` |
| **Cwa** |  | `/api/data/cwa` |
| **GAirmet** |  | `/api/data/gairmet` |
| **Metar** |  | `/api/data/metar` |
| **Pirep** |  | `/api/data/pirep` |
| **StationInfo** |  | `/api/data/stationinfo` |
| **Taf** |  | `/api/data/taf` |
| **Tcf** |  | `/api/data/tcf` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from aviationweatherdata_sdk import AviationweatherDataSDK

client = AviationweatherDataSDK({
    "apikey": os.environ.get("AVIATIONWEATHER-DATA_APIKEY"),
})

# List all airsigmets
airsigmets, err = client.AirSigmet().list()
print(airsigmets)
```

### PHP

```php
<?php
require_once 'aviationweatherdata_sdk.php';

$client = new AviationweatherDataSDK([
    "apikey" => getenv("AVIATIONWEATHER-DATA_APIKEY"),
]);

// List all airsigmets
[$airsigmets, $err] = $client->AirSigmet()->list();
print_r($airsigmets);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/aviationweather-data-sdk/go"

client := sdk.NewAviationweatherDataSDK(map[string]any{
    "apikey": os.Getenv("AVIATIONWEATHER-DATA_APIKEY"),
})

// List all airsigmets
airsigmets, err := client.AirSigmet(nil).List(nil, nil)
fmt.Println(airsigmets)
```

### Ruby

```ruby
require_relative "AviationweatherData_sdk"

client = AviationweatherDataSDK.new({
  "apikey" => ENV["AVIATIONWEATHER-DATA_APIKEY"],
})

# List all airsigmets
airsigmets, err = client.AirSigmet().list
puts airsigmets
```

### Lua

```lua
local sdk = require("aviationweather-data_sdk")

local client = sdk.new({
  apikey = os.getenv("AVIATIONWEATHER-DATA_APIKEY"),
})

-- List all airsigmets
local airsigmets, err = client:AirSigmet():list()
print(airsigmets)
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
client = AviationweatherDataSDK.test()
result, err = client.AirSigmet().load({"id": "test01"})
```

### PHP

```php
$client = AviationweatherDataSDK::test();
[$result, $err] = $client->AirSigmet()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.AirSigmet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AviationweatherDataSDK.test
result, err = client.AirSigmet().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:AirSigmet():load({ id = "test01" })
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

---

Generated from the AviationWeather Data API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
