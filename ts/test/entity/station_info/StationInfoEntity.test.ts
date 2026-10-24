

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


describe('StationInfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('AVIATIONWEATHER_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AviationweatherDataSDK.test()
    const ent = testsdk.StationInfo()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('station_info hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of AviationweatherDataSDK.test(offline).StationInfo().stream('list')) { }
    }, /offline/)

    for await (const _item of AviationweatherDataSDK.test(offline).StationInfo()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = AviationweatherDataSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.StationInfo().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of AviationweatherDataSDK.test().StationInfo().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new AviationweatherDataSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.StationInfo().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.StationInfo().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AviationweatherDataSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.StationInfo().list({"bbox":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'station_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Country code","t":"`$STRING`","key$":"country","index$":0},"elev":{"a":true,"h":"Elev","n":"elev","r":false,"sh":"Elevation in meters","t":"`$NUMBER`","key$":"elev","index$":1},"iataId":{"a":true,"h":"Iata Id","n":"iataId","r":false,"sh":"IATA identifier","t":"`$STRING`","key$":"iataId","index$":2},"icaoId":{"a":true,"h":"Icao Id","n":"icaoId","r":false,"sh":"ICAO station identifier","t":"`$STRING`","key$":"icaoId","index$":3},"lat":{"a":true,"h":"Lat","n":"lat","r":false,"sh":"Latitude","t":"`$NUMBER`","key$":"lat","index$":4},"lon":{"a":true,"h":"Lon","n":"lon","r":false,"sh":"Longitude","t":"`$NUMBER`","key$":"lon","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Station name","t":"`$STRING`","key$":"name","index$":6},"priority":{"a":true,"h":"Priority","n":"priority","r":false,"sh":"Priority level","t":"`$INTEGER`","key$":"priority","index$":7},"site":{"a":true,"h":"Site","n":"site","r":false,"sh":"Site type","t":"`$STRING`","key$":"site","index$":8},"state":{"a":true,"h":"State","n":"state","r":false,"sh":"State or province","t":"`$STRING`","key$":"state","index$":9}},"name":"station_info","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/data/stationinfo","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"bbox","or":"bbox","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"ids","or":"ids","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/data/stationinfo","q":{},"r":{},"rs":{"alternatives":[{"kind":"json","media":"application/geo+json"},{"kind":"raw","media":"application/xml"}],"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"data"},{"lit":"stationinfo"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"station_info","name__orig":"station_info","Name":"StationInfo","name_":"station_info","name-":"station-info","NAME":"STATION_INFO","index$":7}, {"active":true,"entity":"station_info","key$":"BasicStationInfoFlow","kind":"basic","name":"BasicStationInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"station_info_ref01"}}],"index$":0}]}, 'StationInfo', {"GET /api/data/stationinfo":{"protocol":"http","parameters":[{"name":"ids","in":"query","description":"Comma-separated list of ICAO station identifiers","required":false,"schema":{"type":"string"},"index$":0},{"name":"bbox","in":"query","description":"Bounding box coordinates (minLon,minLat,maxLon,maxLat)","required":false,"schema":{"type":"string"},"index$":1},{"name":"format","in":"query","description":"Output format","required":false,"schema":{"type":"string","enum":["json","geojson","xml"],"default":"json"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let station_info_ref01_data = Object.values(setup.data.existing.station_info)[0] as any

    // LIST
    const station_info_ref01_ent = client.StationInfo()
    const station_info_ref01_match: any = {}

    const station_info_ref01_list = (await station_info_ref01_ent.list(station_info_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/station_info/StationInfoTestData.json')

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
    ['station_info01','station_info02','station_info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AVIATIONWEATHER_DATA_TEST_STATION_INFO_ENTID': idmap,
    'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
    'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AVIATIONWEATHER_DATA_TEST_STATION_INFO_ENTID']

  const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_STATION_INFO_ENTID']
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
  
