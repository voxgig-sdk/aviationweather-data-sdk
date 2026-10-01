

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


describe('TafEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('AVIATIONWEATHER_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AviationweatherDataSDK.test()
    const ent = testsdk.Taf()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'taf.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bulletinTime":{"a":true,"fo":"date-time","h":"Bulletin Time","n":"bulletinTime","r":false,"sh":"Bulletin time in ISO8601 format","t":"`$STRING`","key$":"bulletinTime","index$":0},"elev":{"a":true,"h":"Elev","n":"elev","r":false,"sh":"Elevation in meters","t":"`$NUMBER`","key$":"elev","index$":1},"fcsts":{"a":true,"h":"Fcsts","n":"fcsts","r":false,"sh":"Forecast periods","t":"`$ARRAY`","key$":"fcsts","index$":2},"icaoId":{"a":true,"h":"Icao Id","n":"icaoId","r":false,"sh":"ICAO station identifier","t":"`$STRING`","key$":"icaoId","index$":3},"issueTime":{"a":true,"fo":"date-time","h":"Issue Time","n":"issueTime","r":false,"sh":"TAF issue time in ISO8601 format","t":"`$STRING`","key$":"issueTime","index$":4},"lat":{"a":true,"h":"Lat","n":"lat","r":false,"sh":"Latitude","t":"`$NUMBER`","key$":"lat","index$":5},"lon":{"a":true,"h":"Lon","n":"lon","r":false,"sh":"Longitude","t":"`$NUMBER`","key$":"lon","index$":6},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Station name","t":"`$STRING`","key$":"name","index$":7},"rawTAF":{"a":true,"h":"Raw Taf","n":"rawTAF","r":false,"sh":"Raw TAF forecast text","t":"`$STRING`","key$":"rawTAF","index$":8},"validTimeFrom":{"a":true,"fo":"date-time","h":"Valid Time From","n":"validTimeFrom","r":false,"sh":"Valid time from in ISO8601 format","t":"`$STRING`","key$":"validTimeFrom","index$":9},"validTimeTo":{"a":true,"fo":"date-time","h":"Valid Time To","n":"validTimeTo","r":false,"sh":"Valid time to in ISO8601 format","t":"`$STRING`","key$":"validTimeTo","index$":10}},"name":"taf","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/data/taf","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"bbox","or":"bbox","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"raw","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"ids","or":"ids","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/data/taf","q":{"exist":["bbox","date","format","ids"]},"r":{},"s":[{"lit":"api"},{"lit":"data"},{"lit":"taf"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"taf","name__orig":"taf","Name":"Taf","name_":"taf","name-":"taf","NAME":"TAF","index$":8}, {"active":true,"entity":"taf","key$":"BasicTafFlow","kind":"basic","name":"BasicTafFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"taf_ref01"}}],"index$":0}]}, 'Taf', {"GET /api/data/taf":{"protocol":"http","parameters":[{"name":"ids","in":"query","description":"Comma-separated list of ICAO station identifiers","required":false,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"Output format","required":false,"schema":{"type":"string","enum":["raw","json","geojson","xml","iwxxm"],"default":"raw"},"index$":1},{"name":"date","in":"query","description":"Date for historical data (ISO8601 format)","required":false,"schema":{"type":"string","format":"date-time"},"index$":2},{"name":"bbox","in":"query","description":"Bounding box coordinates (minLon,minLat,maxLon,maxLat)","required":false,"schema":{"type":"string"},"index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let taf_ref01_data = Object.values(setup.data.existing.taf)[0] as any

    // LIST
    const taf_ref01_ent = client.Taf()
    const taf_ref01_match: any = {}

    const taf_ref01_list = (await taf_ref01_ent.list(taf_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/taf/TafTestData.json')

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
    ['taf01','taf02','taf03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AVIATIONWEATHER_DATA_TEST_TAF_ENTID': idmap,
    'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
    'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AVIATIONWEATHER_DATA_TEST_TAF_ENTID']

  const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_TAF_ENTID']
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
  
