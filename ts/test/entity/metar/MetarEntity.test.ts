

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


describe('MetarEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('AVIATIONWEATHER_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AviationweatherDataSDK.test()
    const ent = testsdk.Metar()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'metar.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"altim":{"a":true,"h":"Altim","n":"altim","r":false,"sh":"Altimeter setting in inches of mercury","t":"`$NUMBER`","key$":"altim","index$":0},"clouds":{"a":true,"h":"Clouds","n":"clouds","r":false,"sh":"Cloud layers","t":"`$ARRAY`","key$":"clouds","index$":1},"dewp":{"a":true,"h":"Dewp","n":"dewp","r":false,"sh":"Dewpoint in Celsius","t":"`$NUMBER`","key$":"dewp","index$":2},"elev":{"a":true,"h":"Elev","n":"elev","r":false,"sh":"Elevation in meters","t":"`$NUMBER`","key$":"elev","index$":3},"fltCat":{"a":true,"h":"Flt Cat","n":"fltCat","r":false,"sh":"Flight category (VFR, MVFR, IFR, LIFR)","t":"`$STRING`","key$":"fltCat","index$":4},"icaoId":{"a":true,"h":"Icao Id","n":"icaoId","r":false,"sh":"ICAO station identifier","t":"`$STRING`","key$":"icaoId","index$":5},"lat":{"a":true,"h":"Lat","n":"lat","r":false,"sh":"Latitude","t":"`$NUMBER`","key$":"lat","index$":6},"lon":{"a":true,"h":"Lon","n":"lon","r":false,"sh":"Longitude","t":"`$NUMBER`","key$":"lon","index$":7},"maxT":{"a":true,"h":"Max T","n":"maxT","r":false,"sh":"Maximum temperature","t":"`$NUMBER`","key$":"maxT","index$":8},"maxT24":{"a":true,"h":"Max T24","n":"maxT24","r":false,"sh":"24-hour maximum temperature","t":"`$NUMBER`","key$":"maxT24","index$":9},"metarType":{"a":true,"h":"Metar Type","n":"metarType","r":false,"sh":"METAR type (METAR or SPECI)","t":"`$STRING`","key$":"metarType","index$":10},"minT":{"a":true,"h":"Min T","n":"minT","r":false,"sh":"Minimum temperature","t":"`$NUMBER`","key$":"minT","index$":11},"minT24":{"a":true,"h":"Min T24","n":"minT24","r":false,"sh":"24-hour minimum temperature","t":"`$NUMBER`","key$":"minT24","index$":12},"mostRecent":{"a":true,"h":"Most Recent","n":"mostRecent","r":false,"sh":"Most recent observation flag","t":"`$INTEGER`","key$":"mostRecent","index$":13},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Station name","t":"`$STRING`","key$":"name","index$":14},"obsTime":{"a":true,"fo":"date-time","h":"Obs Time","n":"obsTime","r":false,"sh":"Observation time in ISO8601 format","t":"`$STRING`","key$":"obsTime","index$":15},"pcp24hr":{"a":true,"h":"Pcp24hr","n":"pcp24hr","r":false,"sh":"24-hour precipitation","t":"`$NUMBER`","key$":"pcp24hr","index$":16},"pcp3hr":{"a":true,"h":"Pcp3hr","n":"pcp3hr","r":false,"sh":"3-hour precipitation","t":"`$NUMBER`","key$":"pcp3hr","index$":17},"pcp6hr":{"a":true,"h":"Pcp6hr","n":"pcp6hr","r":false,"sh":"6-hour precipitation","t":"`$NUMBER`","key$":"pcp6hr","index$":18},"precip":{"a":true,"h":"Precip","n":"precip","r":false,"sh":"Precipitation","t":"`$NUMBER`","key$":"precip","index$":19},"presTend":{"a":true,"h":"Pres Tend","n":"presTend","r":false,"sh":"Pressure tendency","t":"`$NUMBER`","key$":"presTend","index$":20},"prior":{"a":true,"h":"Prior","n":"prior","r":false,"sh":"Prior observation indicator","t":"`$INTEGER`","key$":"prior","index$":21},"qcField":{"a":true,"h":"Qc Field","n":"qcField","r":false,"sh":"Quality control field","t":"`$INTEGER`","key$":"qcField","index$":22},"rawOb":{"a":true,"h":"Raw Ob","n":"rawOb","r":false,"sh":"Raw METAR observation text","t":"`$STRING`","key$":"rawOb","index$":23},"rawTaf":{"a":true,"h":"Raw Taf","n":"rawTaf","r":false,"sh":"Raw TAF if available","t":"`$STRING`","key$":"rawTaf","index$":24},"reportTime":{"a":true,"fo":"date-time","h":"Report Time","n":"reportTime","r":false,"sh":"Report time in ISO8601 format","t":"`$STRING`","key$":"reportTime","index$":25},"slp":{"a":true,"h":"Slp","n":"slp","r":false,"sh":"Sea level pressure","t":"`$NUMBER`","key$":"slp","index$":26},"snow":{"a":true,"h":"Snow","n":"snow","r":false,"sh":"Snow depth","t":"`$NUMBER`","key$":"snow","index$":27},"temp":{"a":true,"h":"Temp","n":"temp","r":false,"sh":"Temperature in Celsius","t":"`$NUMBER`","key$":"temp","index$":28},"vertVis":{"a":true,"h":"Vert Vis","n":"vertVis","r":false,"sh":"Vertical visibility","t":"`$INTEGER`","key$":"vertVis","index$":29},"visib":{"a":true,"h":"Visib","n":"visib","r":false,"sh":"Visibility","t":"`$STRING`","key$":"visib","index$":30},"wdir":{"a":true,"h":"Wdir","n":"wdir","r":false,"sh":"Wind direction in degrees","t":"`$INTEGER`","key$":"wdir","index$":31},"wgst":{"a":true,"h":"Wgst","n":"wgst","r":false,"sh":"Wind gust in knots","t":"`$INTEGER`","key$":"wgst","index$":32},"wspd":{"a":true,"h":"Wspd","n":"wspd","r":false,"sh":"Wind speed in knots","t":"`$INTEGER`","key$":"wspd","index$":33},"wxString":{"a":true,"h":"Wx String","n":"wxString","r":false,"sh":"Weather phenomena string","t":"`$STRING`","key$":"wxString","index$":34}},"name":"metar","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/data/metar","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"bbox","or":"bbox","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"raw","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"ids","or":"ids","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"taf","or":"taf","r":false,"t":"`$BOOLEAN`","index$":4}]},"k":"http","m":"GET","o":"/api/data/metar","q":{"exist":["bbox","date","format","ids","taf"]},"r":{},"s":[{"lit":"api"},{"lit":"data"},{"lit":"metar"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"metar","name__orig":"metar","Name":"Metar","name_":"metar","name-":"metar","NAME":"METAR","index$":5}, {"active":true,"entity":"metar","key$":"BasicMetarFlow","kind":"basic","name":"BasicMetarFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"metar_ref01"}}],"index$":0}]}, 'Metar', {"GET /api/data/metar":{"protocol":"http","parameters":[{"name":"ids","in":"query","description":"Comma-separated list of ICAO station identifiers (e.g., KMCI,KSFO)","required":false,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"Output format","required":false,"schema":{"type":"string","enum":["raw","json","geojson","csv","xml","iwxxm"],"default":"raw"},"index$":1},{"name":"date","in":"query","description":"Date for historical data (ISO8601 format)","required":false,"schema":{"type":"string","format":"date-time"},"index$":2},{"name":"bbox","in":"query","description":"Bounding box coordinates (minLon,minLat,maxLon,maxLat)","required":false,"schema":{"type":"string"},"index$":3},{"name":"taf","in":"query","description":"Include only stations with TAF","required":false,"schema":{"type":"boolean"},"index$":4}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let metar_ref01_data = Object.values(setup.data.existing.metar)[0] as any

    // LIST
    const metar_ref01_ent = client.Metar()
    const metar_ref01_match: any = {}

    const metar_ref01_list = (await metar_ref01_ent.list(metar_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/metar/MetarTestData.json')

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
    ['metar01','metar02','metar03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AVIATIONWEATHER_DATA_TEST_METAR_ENTID': idmap,
    'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
    'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AVIATIONWEATHER_DATA_TEST_METAR_ENTID']

  const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_METAR_ENTID']
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
  
