

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


describe('PirepEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('AVIATIONWEATHER_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AviationweatherDataSDK.test()
    const ent = testsdk.Pirep()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pirep.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"aircraftType","req":false,"short":"Aircraft type","type":"`$STRING`","index$":0},{"active":true,"name":"altitudeFt","req":false,"short":"Altitude in feet MSL","type":"`$INTEGER`","index$":1},{"active":true,"name":"clouds","req":false,"short":"Cloud reports","type":"`$ARRAY`","index$":2},{"active":true,"name":"icing","req":false,"short":"Icing report","type":"`$STRING`","index$":3},{"active":true,"name":"lat","req":false,"short":"Latitude","type":"`$NUMBER`","index$":4},{"active":true,"name":"lon","req":false,"short":"Longitude","type":"`$NUMBER`","index$":5},{"active":true,"format":"date-time","name":"obsTime","req":false,"short":"Observation time in ISO8601 format","type":"`$STRING`","index$":6},{"active":true,"name":"rawOb","req":false,"short":"Raw PIREP text","type":"`$STRING`","index$":7},{"active":true,"name":"reportType","req":false,"short":"Report type (PIREP or AIREP)","type":"`$STRING`","index$":8},{"active":true,"name":"temp","req":false,"short":"Temperature in Celsius","type":"`$NUMBER`","index$":9},{"active":true,"name":"turbulence","req":false,"short":"Turbulence report","type":"`$STRING`","index$":10},{"active":true,"name":"visibility","req":false,"short":"Visibility","type":"`$STRING`","index$":11},{"active":true,"name":"wdir","req":false,"short":"Wind direction in degrees","type":"`$INTEGER`","index$":12},{"active":true,"name":"wspd","req":false,"short":"Wind speed in knots","type":"`$INTEGER`","index$":13},{"active":true,"name":"wxString","req":false,"short":"Weather phenomena string","type":"`$STRING`","index$":14}],"name":"pirep","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"age","orig":"age","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"bbox","orig":"bbox","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"date","orig":"date","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"raw","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /api/data/pirep","json":"{\"operationId\":\"getPireps\",\"parameters\":[{\"description\":\"Date for historical data (ISO8601 format)\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Bounding box coordinates (minLon,minLat,maxLon,maxLat)\",\"in\":\"query\",\"name\":\"bbox\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"raw\",\"enum\":[\"raw\",\"json\",\"geojson\",\"xml\"],\"type\":\"string\"}},{\"description\":\"Age of reports in hours\",\"in\":\"query\",\"name\":\"age\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/geo+json\":{\"schema\":{\"properties\":{\"features\":{\"items\":{\"properties\":{\"geometry\":{\"properties\":{\"coordinates\":{\"description\":\"Coordinate array structure depends on geometry type\",\"type\":\"array\"},\"type\":{\"enum\":[\"Point\",\"LineString\",\"Polygon\",\"MultiPoint\",\"MultiLineString\",\"MultiPolygon\"],\"type\":\"string\"}},\"type\":\"object\"},\"properties\":{\"description\":\"Feature properties specific to each product type\",\"type\":\"object\"},\"type\":{\"enum\":[\"Feature\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"enum\":[\"FeatureCollection\"],\"type\":\"string\"}},\"type\":\"object\"}},\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"aircraftType\":{\"description\":\"Aircraft type\",\"type\":\"string\"},\"altitudeFt\":{\"description\":\"Altitude in feet MSL\",\"type\":\"integer\"},\"clouds\":{\"description\":\"Cloud reports\",\"items\":{\"properties\":{\"base\":{\"type\":\"integer\"},\"cover\":{\"type\":\"string\"},\"top\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"icing\":{\"description\":\"Icing report\",\"type\":\"string\"},\"lat\":{\"description\":\"Latitude\",\"type\":\"number\"},\"lon\":{\"description\":\"Longitude\",\"type\":\"number\"},\"obsTime\":{\"description\":\"Observation time in ISO8601 format\",\"format\":\"date-time\",\"type\":\"string\"},\"rawOb\":{\"description\":\"Raw PIREP text\",\"type\":\"string\"},\"reportType\":{\"description\":\"Report type (PIREP or AIREP)\",\"type\":\"string\"},\"temp\":{\"description\":\"Temperature in Celsius\",\"type\":\"number\"},\"turbulence\":{\"description\":\"Turbulence report\",\"type\":\"string\"},\"visibility\":{\"description\":\"Visibility\",\"type\":\"string\"},\"wdir\":{\"description\":\"Wind direction in degrees\",\"type\":\"integer\"},\"wspd\":{\"description\":\"Wind speed in knots\",\"type\":\"integer\"},\"wxString\":{\"description\":\"Weather phenomena string\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"application/xml\":{\"schema\":{\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response\"},\"204\":{\"description\":\"No content - valid request but no data available\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Invalid request - invalid or missing parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Rate limit exceeded - maximum 100 requests per minute\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Internal server error - request may be valid but system unable to serve it\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/data/pirep","segments":[{"lit":"api"},{"lit":"data"},{"lit":"pirep"}],"select":{"exist":["age","bbox","date","format"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"pirep","name__orig":"pirep","Name":"Pirep","name_":"pirep","name-":"pirep","NAME":"PIREP","index$":6}, {"active":true,"entity":"pirep","key$":"BasicPirepFlow","kind":"basic","name":"BasicPirepFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"pirep_ref01"}}],"index$":0}]}, 'Pirep')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pirep_ref01_data = Object.values(setup.data.existing.pirep)[0] as any

    // LIST
    const pirep_ref01_ent = client.Pirep()
    const pirep_ref01_match: any = {}

    const pirep_ref01_list = (await pirep_ref01_ent.list(pirep_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pirep/PirepTestData.json')

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
    ['pirep01','pirep02','pirep03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AVIATIONWEATHER_DATA_TEST_PIREP_ENTID': idmap,
    'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
    'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AVIATIONWEATHER_DATA_TEST_PIREP_ENTID']

  const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_PIREP_ENTID']
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
  
