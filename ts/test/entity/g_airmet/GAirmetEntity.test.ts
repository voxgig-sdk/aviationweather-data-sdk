

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"altitudeHigh":{"a":true,"h":"Altitude High","n":"altitudeHigh","r":false,"sh":"Upper altitude in feet MSL","t":"`$INTEGER`","key$":"altitudeHigh","index$":0},"altitudeLow":{"a":true,"h":"Altitude Low","n":"altitudeLow","r":false,"sh":"Lower altitude in feet MSL","t":"`$INTEGER`","key$":"altitudeLow","index$":1},"hazard":{"a":true,"h":"Hazard","n":"hazard","r":false,"sh":"Hazard type","t":"`$STRING`","key$":"hazard","index$":2},"issueTime":{"a":true,"fo":"date-time","h":"Issue Time","n":"issueTime","r":false,"sh":"Issue time in ISO8601 format","t":"`$STRING`","key$":"issueTime","index$":3},"qualifier":{"a":true,"h":"Qualifier","n":"qualifier","r":false,"sh":"Forecast qualifier","t":"`$STRING`","key$":"qualifier","index$":4},"severity":{"a":true,"h":"Severity","n":"severity","r":false,"sh":"Severity level","t":"`$STRING`","key$":"severity","index$":5},"validTimeFrom":{"a":true,"fo":"date-time","h":"Valid Time From","n":"validTimeFrom","r":false,"sh":"Valid time from in ISO8601 format","t":"`$STRING`","key$":"validTimeFrom","index$":6},"validTimeTo":{"a":true,"fo":"date-time","h":"Valid Time To","n":"validTimeTo","r":false,"sh":"Valid time to in ISO8601 format","t":"`$STRING`","key$":"validTimeTo","index$":7}},"name":"g_airmet","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/data/gairmet","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"bbox","or":"bbox","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"hazard","or":"hazard","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/data/gairmet","q":{"exist":["bbox","date","format","hazard"]},"r":{},"s":[{"lit":"api"},{"lit":"data"},{"lit":"gairmet"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"g_airmet","name__orig":"g_airmet","Name":"GAirmet","name_":"g_airmet","name-":"g-airmet","NAME":"G_AIRMET","index$":4}, {"active":true,"entity":"g_airmet","key$":"BasicGAirmetFlow","kind":"basic","name":"BasicGAirmetFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"g_airmet_ref01"}}],"index$":0}]}, 'GAirmet', {"GET /api/data/gairmet":{"protocol":"http","parameters":[{"name":"date","in":"query","description":"Date for historical data (ISO8601 format)","required":false,"schema":{"type":"string","format":"date-time"},"index$":0},{"name":"bbox","in":"query","description":"Bounding box coordinates (minLon,minLat,maxLon,maxLat)","required":false,"schema":{"type":"string"},"index$":1},{"name":"format","in":"query","description":"Output format","required":false,"schema":{"type":"string","enum":["json","geojson","xml"],"default":"json"},"index$":2},{"name":"hazard","in":"query","description":"Filter by hazard type","required":false,"schema":{"type":"string"},"index$":3}]}})
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
  
