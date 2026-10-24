

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AviationweatherDataSDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('air_sigmet hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of AviationweatherDataSDK.test(offline).AirSigmet().stream('list')) { }
    }, /offline/)

    for await (const _item of AviationweatherDataSDK.test(offline).AirSigmet()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = AviationweatherDataSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.AirSigmet().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of AviationweatherDataSDK.test().AirSigmet().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new AviationweatherDataSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.AirSigmet().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.AirSigmet().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AviationweatherDataSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AirSigmet().list({"bbox":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'air_sigmet.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"airsigmetType":{"a":true,"h":"Airsigmet Type","n":"airsigmetType","r":false,"sh":"SIGMET type","t":"`$STRING`","key$":"airsigmetType","index$":0},"altitudeHigh":{"a":true,"h":"Altitude High","n":"altitudeHigh","r":false,"sh":"Upper altitude in feet MSL","t":"`$INTEGER`","key$":"altitudeHigh","index$":1},"altitudeLow":{"a":true,"h":"Altitude Low","n":"altitudeLow","r":false,"sh":"Lower altitude in feet MSL","t":"`$INTEGER`","key$":"altitudeLow","index$":2},"fir":{"a":true,"h":"Fir","n":"fir","r":false,"sh":"Flight Information Region","t":"`$STRING`","key$":"fir","index$":3},"hazard":{"a":true,"h":"Hazard","n":"hazard","r":false,"sh":"Hazard type","t":"`$STRING`","key$":"hazard","index$":4},"issueTime":{"a":true,"fo":"date-time","h":"Issue Time","n":"issueTime","r":false,"sh":"Issue time in ISO8601 format","t":"`$STRING`","key$":"issueTime","index$":5},"rawAirSigmet":{"a":true,"h":"Raw Air Sigmet","n":"rawAirSigmet","r":false,"sh":"Raw SIGMET text","t":"`$STRING`","key$":"rawAirSigmet","index$":6},"severity":{"a":true,"h":"Severity","n":"severity","r":false,"sh":"Severity level","t":"`$STRING`","key$":"severity","index$":7},"validTimeFrom":{"a":true,"fo":"date-time","h":"Valid Time From","n":"validTimeFrom","r":false,"sh":"Valid time from in ISO8601 format","t":"`$STRING`","key$":"validTimeFrom","index$":8},"validTimeTo":{"a":true,"fo":"date-time","h":"Valid Time To","n":"validTimeTo","r":false,"sh":"Valid time to in ISO8601 format","t":"`$STRING`","key$":"validTimeTo","index$":9}},"name":"air_sigmet","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/data/airsigmet","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"bbox","or":"bbox","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"raw","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"hazard","or":"hazard","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/data/airsigmet","q":{},"r":{},"rs":{"alternatives":[{"kind":"json","media":"application/geo+json"},{"kind":"raw","media":"application/xml"},{"kind":"raw","media":"text/plain"}],"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"data"},{"lit":"airsigmet"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"air_sigmet","name__orig":"air_sigmet","Name":"AirSigmet","name_":"air_sigmet","name-":"air-sigmet","NAME":"AIR_SIGMET","index$":0}, {"active":true,"entity":"air_sigmet","key$":"BasicAirSigmetFlow","kind":"basic","name":"BasicAirSigmetFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"air_sigmet_ref01"}}],"index$":0}]}, 'AirSigmet', {"GET /api/data/airsigmet":{"protocol":"http","parameters":[{"name":"date","in":"query","description":"Date for historical data (ISO8601 format)","required":false,"schema":{"type":"string","format":"date-time"},"index$":0},{"name":"bbox","in":"query","description":"Bounding box coordinates (minLon,minLat,maxLon,maxLat)","required":false,"schema":{"type":"string"},"index$":1},{"name":"format","in":"query","description":"Output format","required":false,"schema":{"type":"string","enum":["raw","json","geojson","xml"],"default":"raw"},"index$":2},{"name":"hazard","in":"query","description":"Filter by hazard type","required":false,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
