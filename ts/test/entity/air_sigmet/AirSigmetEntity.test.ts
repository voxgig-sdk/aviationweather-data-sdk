

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AirSigmetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('AVIATIONWEATHER_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AviationweatherDataSDK.test()
    const ent = testsdk.AirSigmet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'air_sigmet.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"airsigmetType":{"a":true,"h":"Airsigmet Type","n":"airsigmetType","r":false,"sh":"SIGMET type","t":"`$STRING`","key$":"airsigmetType","index$":0},"altitudeHigh":{"a":true,"h":"Altitude High","n":"altitudeHigh","r":false,"sh":"Upper altitude in feet MSL","t":"`$INTEGER`","key$":"altitudeHigh","index$":1},"altitudeLow":{"a":true,"h":"Altitude Low","n":"altitudeLow","r":false,"sh":"Lower altitude in feet MSL","t":"`$INTEGER`","key$":"altitudeLow","index$":2},"fir":{"a":true,"h":"Fir","n":"fir","r":false,"sh":"Flight Information Region","t":"`$STRING`","key$":"fir","index$":3},"hazard":{"a":true,"h":"Hazard","n":"hazard","r":false,"sh":"Hazard type","t":"`$STRING`","key$":"hazard","index$":4},"issueTime":{"a":true,"fo":"date-time","h":"Issue Time","n":"issueTime","r":false,"sh":"Issue time in ISO8601 format","t":"`$STRING`","key$":"issueTime","index$":5},"rawAirSigmet":{"a":true,"h":"Raw Air Sigmet","n":"rawAirSigmet","r":false,"sh":"Raw SIGMET text","t":"`$STRING`","key$":"rawAirSigmet","index$":6},"severity":{"a":true,"h":"Severity","n":"severity","r":false,"sh":"Severity level","t":"`$STRING`","key$":"severity","index$":7},"validTimeFrom":{"a":true,"fo":"date-time","h":"Valid Time From","n":"validTimeFrom","r":false,"sh":"Valid time from in ISO8601 format","t":"`$STRING`","key$":"validTimeFrom","index$":8},"validTimeTo":{"a":true,"fo":"date-time","h":"Valid Time To","n":"validTimeTo","r":false,"sh":"Valid time to in ISO8601 format","t":"`$STRING`","key$":"validTimeTo","index$":9}},"name":"air_sigmet","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/data/airsigmet","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"bbox","or":"bbox","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"raw","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"hazard","or":"hazard","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/data/airsigmet","q":{"exist":["bbox","date","format","hazard"]},"r":{},"s":[{"lit":"api"},{"lit":"data"},{"lit":"airsigmet"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"air_sigmet","name__orig":"air_sigmet","Name":"AirSigmet","name_":"air_sigmet","name-":"air-sigmet","NAME":"AIR_SIGMET","index$":0}, {"active":true,"entity":"air_sigmet","key$":"BasicAirSigmetFlow","kind":"basic","name":"BasicAirSigmetFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"air_sigmet_ref01"}}],"index$":0}]}, 'AirSigmet', {"GET /api/data/airsigmet":{"protocol":"http","operationId":"getAirSigmets","responses":{"200":{"description":"Successful response","content":{"text/plain":{"schema":{"type":"string"}},"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"rawAirSigmet":{"type":"string","description":"Raw SIGMET text","key$":"rawAirSigmet"},"hazard":{"type":"string","description":"Hazard type","key$":"hazard"},"severity":{"type":"string","description":"Severity level","key$":"severity"},"airsigmetType":{"type":"string","description":"SIGMET type","key$":"airsigmetType"},"validTimeFrom":{"type":"string","format":"date-time","description":"Valid time from in ISO8601 format","key$":"validTimeFrom"},"validTimeTo":{"type":"string","format":"date-time","description":"Valid time to in ISO8601 format","key$":"validTimeTo"},"issueTime":{"type":"string","format":"date-time","description":"Issue time in ISO8601 format","key$":"issueTime"},"fir":{"type":"string","description":"Flight Information Region","key$":"fir"},"altitudeLow":{"type":"integer","description":"Lower altitude in feet MSL","key$":"altitudeLow"},"altitudeHigh":{"type":"integer","description":"Upper altitude in feet MSL","key$":"altitudeHigh"}},"x-ref":"#/components/schemas/AirSigmet","index$":0}}},"application/geo+json":{"schema":{"type":"object","properties":{"type":{"type":"string","enum":["FeatureCollection"]},"features":{"type":"array","items":{"type":"object","properties":{"type":{"type":"string","enum":["Feature"]},"geometry":{"type":"object","properties":{"type":{"type":"string","enum":["Point","LineString","Polygon","MultiPoint","MultiLineString","MultiPolygon"]},"coordinates":{"type":"array","description":"Coordinate array structure depends on geometry type"}},"x-ref":"#/components/schemas/GeoJSONGeometry"},"properties":{"type":"object","description":"Feature properties specific to each product type"}},"x-ref":"#/components/schemas/GeoJSONFeature"}}},"x-ref":"#/components/schemas/GeoJSONFeatureCollection"}},"application/xml":{"schema":{"type":"object"}}}},"204":{"description":"No content - valid request but no data available"},"400":{"description":"Invalid request - invalid or missing parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"},"statusCode":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}},"application/xml":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"},"statusCode":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}},"text/plain":{"schema":{"type":"string"}}},"x-ref":"#/components/responses/BadRequest"},"429":{"description":"Rate limit exceeded - maximum 100 requests per minute","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"},"statusCode":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}},"application/xml":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"},"statusCode":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}},"text/plain":{"schema":{"type":"string"}}},"x-ref":"#/components/responses/TooManyRequests"},"500":{"description":"Internal server error - request may be valid but system unable to serve it","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"},"statusCode":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}},"application/xml":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"},"statusCode":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}},"text/plain":{"schema":{"type":"string"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"date","in":"query","description":"Date for historical data (ISO8601 format)","required":false,"schema":{"type":"string","format":"date-time"},"index$":0},{"name":"bbox","in":"query","description":"Bounding box coordinates (minLon,minLat,maxLon,maxLat)","required":false,"schema":{"type":"string"},"index$":1},{"name":"format","in":"query","description":"Output format","required":false,"schema":{"type":"string","enum":["raw","json","geojson","xml"],"default":"raw"},"index$":2},{"name":"hazard","in":"query","description":"Filter by hazard type","required":false,"schema":{"type":"string"},"index$":3}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let air_sigmet_ref01_data = Object.values(setup.data.existing.air_sigmet)[0] as any

    // LIST
    const air_sigmet_ref01_ent = client.AirSigmet()
    const air_sigmet_ref01_match: any = {}

    const air_sigmet_ref01_list = (await air_sigmet_ref01_ent.list(air_sigmet_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/air_sigmet/AirSigmetTestData.json')

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
    ['air_sigmet01','air_sigmet02','air_sigmet03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AVIATIONWEATHER_DATA_TEST_AIR_SIGMET_ENTID': idmap,
    'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
    'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AVIATIONWEATHER_DATA_TEST_AIR_SIGMET_ENTID']

  const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_AIR_SIGMET_ENTID']
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
  
