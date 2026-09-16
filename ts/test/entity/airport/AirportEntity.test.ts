

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AviationweatherDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('AirportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('AVIATIONWEATHER_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AviationweatherDataSDK.test()
    const ent = testsdk.Airport()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'airport.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"city","req":false,"short":"City","type":"`$STRING`","index$":0},{"active":true,"name":"country","req":false,"short":"Country code","type":"`$STRING`","index$":1},{"active":true,"name":"elev","req":false,"short":"Elevation in meters","type":"`$NUMBER`","index$":2},{"active":true,"name":"iataId","req":false,"short":"IATA identifier","type":"`$STRING`","index$":3},{"active":true,"name":"icaoId","req":false,"short":"ICAO airport identifier","type":"`$STRING`","index$":4},{"active":true,"name":"lat","req":false,"short":"Latitude","type":"`$NUMBER`","index$":5},{"active":true,"name":"lon","req":false,"short":"Longitude","type":"`$NUMBER`","index$":6},{"active":true,"name":"name","req":false,"short":"Airport name","type":"`$STRING`","index$":7},{"active":true,"name":"state","req":false,"short":"State or province","type":"`$STRING`","index$":8}],"name":"airport","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"bbox","orig":"bbox","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"ids","orig":"ids","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /api/data/airport","json":"{\"operationId\":\"getAirportInfo\",\"parameters\":[{\"description\":\"Comma-separated list of ICAO airport identifiers\",\"in\":\"query\",\"name\":\"ids\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Bounding box coordinates (minLon,minLat,maxLon,maxLat)\",\"in\":\"query\",\"name\":\"bbox\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"geojson\",\"xml\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/geo+json\":{\"schema\":{\"properties\":{\"features\":{\"items\":{\"properties\":{\"geometry\":{\"properties\":{\"coordinates\":{\"description\":\"Coordinate array structure depends on geometry type\",\"type\":\"array\"},\"type\":{\"enum\":[\"Point\",\"LineString\",\"Polygon\",\"MultiPoint\",\"MultiLineString\",\"MultiPolygon\"],\"type\":\"string\"}},\"type\":\"object\"},\"properties\":{\"description\":\"Feature properties specific to each product type\",\"type\":\"object\"},\"type\":{\"enum\":[\"Feature\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"enum\":[\"FeatureCollection\"],\"type\":\"string\"}},\"type\":\"object\"}},\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"city\":{\"description\":\"City\",\"type\":\"string\"},\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"elev\":{\"description\":\"Elevation in meters\",\"type\":\"number\"},\"iataId\":{\"description\":\"IATA identifier\",\"type\":\"string\"},\"icaoId\":{\"description\":\"ICAO airport identifier\",\"type\":\"string\"},\"lat\":{\"description\":\"Latitude\",\"type\":\"number\"},\"lon\":{\"description\":\"Longitude\",\"type\":\"number\"},\"name\":{\"description\":\"Airport name\",\"type\":\"string\"},\"state\":{\"description\":\"State or province\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"application/xml\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful response\"},\"204\":{\"description\":\"No content - valid request but no data available\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Invalid request - invalid or missing parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Rate limit exceeded - maximum 100 requests per minute\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Internal server error - request may be valid but system unable to serve it\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/data/airport","segments":[{"lit":"api"},{"lit":"data"},{"lit":"airport"}],"select":{"exist":["bbox","format","ids"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"airport","name__orig":"airport","Name":"Airport","name_":"airport","name-":"airport","NAME":"AIRPORT","index$":1}, {"active":true,"entity":"airport","key$":"BasicAirportFlow","kind":"basic","name":"BasicAirportFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"airport_ref01"}}],"index$":0}]}, 'Airport')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let airport_ref01_data = Object.values(setup.data.existing.airport)[0] as any

    // LIST
    const airport_ref01_ent = client.Airport()
    const airport_ref01_match: any = {}

    const airport_ref01_list = (await airport_ref01_ent.list(airport_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/airport/AirportTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AviationweatherDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['airport01','airport02','airport03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AVIATIONWEATHER_DATA_TEST_AIRPORT_ENTID': idmap,
    'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
    'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AVIATIONWEATHER_DATA_TEST_AIRPORT_ENTID']

  const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_AIRPORT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AviationweatherDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
