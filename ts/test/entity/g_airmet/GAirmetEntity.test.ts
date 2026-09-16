

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


describe('GAirmetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('AVIATIONWEATHER_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AviationweatherDataSDK.test()
    const ent = testsdk.GAirmet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'g_airmet.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"altitudeHigh","req":false,"short":"Upper altitude in feet MSL","type":"`$INTEGER`","index$":0},{"active":true,"name":"altitudeLow","req":false,"short":"Lower altitude in feet MSL","type":"`$INTEGER`","index$":1},{"active":true,"name":"hazard","req":false,"short":"Hazard type","type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"issueTime","req":false,"short":"Issue time in ISO8601 format","type":"`$STRING`","index$":3},{"active":true,"name":"qualifier","req":false,"short":"Forecast qualifier","type":"`$STRING`","index$":4},{"active":true,"name":"severity","req":false,"short":"Severity level","type":"`$STRING`","index$":5},{"active":true,"format":"date-time","name":"validTimeFrom","req":false,"short":"Valid time from in ISO8601 format","type":"`$STRING`","index$":6},{"active":true,"format":"date-time","name":"validTimeTo","req":false,"short":"Valid time to in ISO8601 format","type":"`$STRING`","index$":7}],"name":"g_airmet","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"bbox","orig":"bbox","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"date","orig":"date","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"hazard","orig":"hazard","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /api/data/gairmet","json":"{\"operationId\":\"getGAirmets\",\"parameters\":[{\"description\":\"Date for historical data (ISO8601 format)\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Bounding box coordinates (minLon,minLat,maxLon,maxLat)\",\"in\":\"query\",\"name\":\"bbox\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"geojson\",\"xml\"],\"type\":\"string\"}},{\"description\":\"Filter by hazard type\",\"in\":\"query\",\"name\":\"hazard\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/geo+json\":{\"schema\":{\"properties\":{\"features\":{\"items\":{\"properties\":{\"geometry\":{\"properties\":{\"coordinates\":{\"description\":\"Coordinate array structure depends on geometry type\",\"type\":\"array\"},\"type\":{\"enum\":[\"Point\",\"LineString\",\"Polygon\",\"MultiPoint\",\"MultiLineString\",\"MultiPolygon\"],\"type\":\"string\"}},\"type\":\"object\"},\"properties\":{\"description\":\"Feature properties specific to each product type\",\"type\":\"object\"},\"type\":{\"enum\":[\"Feature\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"enum\":[\"FeatureCollection\"],\"type\":\"string\"}},\"type\":\"object\"}},\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"altitudeHigh\":{\"description\":\"Upper altitude in feet MSL\",\"type\":\"integer\"},\"altitudeLow\":{\"description\":\"Lower altitude in feet MSL\",\"type\":\"integer\"},\"hazard\":{\"description\":\"Hazard type\",\"type\":\"string\"},\"issueTime\":{\"description\":\"Issue time in ISO8601 format\",\"format\":\"date-time\",\"type\":\"string\"},\"qualifier\":{\"description\":\"Forecast qualifier\",\"type\":\"string\"},\"severity\":{\"description\":\"Severity level\",\"type\":\"string\"},\"validTimeFrom\":{\"description\":\"Valid time from in ISO8601 format\",\"format\":\"date-time\",\"type\":\"string\"},\"validTimeTo\":{\"description\":\"Valid time to in ISO8601 format\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"application/xml\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful response\"},\"204\":{\"description\":\"No content - valid request but no data available\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Invalid request - invalid or missing parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Rate limit exceeded - maximum 100 requests per minute\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Internal server error - request may be valid but system unable to serve it\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/data/gairmet","segments":[{"lit":"api"},{"lit":"data"},{"lit":"gairmet"}],"select":{"exist":["bbox","date","format","hazard"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"g_airmet","name__orig":"g_airmet","Name":"GAirmet","name_":"g_airmet","name-":"g-airmet","NAME":"G_AIRMET","index$":4}, {"active":true,"entity":"g_airmet","key$":"BasicGAirmetFlow","kind":"basic","name":"BasicGAirmetFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"g_airmet_ref01"}}],"index$":0}]}, 'GAirmet')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let g_airmet_ref01_data = Object.values(setup.data.existing.g_airmet)[0] as any

    // LIST
    const g_airmet_ref01_ent = client.GAirmet()
    const g_airmet_ref01_match: any = {}

    const g_airmet_ref01_list = (await g_airmet_ref01_ent.list(g_airmet_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/g_airmet/GAirmetTestData.json')

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
    ['g_airmet01','g_airmet02','g_airmet03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AVIATIONWEATHER_DATA_TEST_G_AIRMET_ENTID': idmap,
    'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
    'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AVIATIONWEATHER_DATA_TEST_G_AIRMET_ENTID']

  const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_G_AIRMET_ENTID']
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
  
