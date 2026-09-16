

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


describe('CacheEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('AVIATIONWEATHER_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AviationweatherDataSDK.test()
    const ent = testsdk.Cache()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cache.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"cache","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /data/cache/aircraftreports.cache.csv.gz","json":"{\"operationId\":\"getAircraftReportsCacheCsv\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/gzip\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cache/aircraftreports.cache.csv.gz","segments":[{"lit":"data"},{"lit":"cache"},{"lit":"aircraftreports.cache.csv.gz"}],"select":{"$action":"aircraftreportscachecsvgz"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /data/cache/aircraftreports.cache.xml.gz","json":"{\"operationId\":\"getAircraftReportsCacheXml\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/gzip\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cache/aircraftreports.cache.xml.gz","segments":[{"lit":"data"},{"lit":"cache"},{"lit":"aircraftreports.cache.xml.gz"}],"select":{"$action":"aircraftreportscachexmlgz"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{},"contract":{"id":"GET /data/cache/airsigmets.cache.csv.gz","json":"{\"operationId\":\"getAirSigmetsCacheCsv\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/gzip\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cache/airsigmets.cache.csv.gz","segments":[{"lit":"data"},{"lit":"cache"},{"lit":"airsigmets.cache.csv.gz"}],"select":{"$action":"airsigmetscachecsvgz"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{},"contract":{"id":"GET /data/cache/airsigmets.cache.xml.gz","json":"{\"operationId\":\"getAirSigmetsCacheXml\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/gzip\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cache/airsigmets.cache.xml.gz","segments":[{"lit":"data"},{"lit":"cache"},{"lit":"airsigmets.cache.xml.gz"}],"select":{"$action":"airsigmetscachexmlgz"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3},{"active":true,"args":{},"contract":{"id":"GET /data/cache/gairmets.cache.xml.gz","json":"{\"operationId\":\"getGAirmetsCacheXml\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/gzip\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cache/gairmets.cache.xml.gz","segments":[{"lit":"data"},{"lit":"cache"},{"lit":"gairmets.cache.xml.gz"}],"select":{"$action":"gairmetscachexmlgz"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":4},{"active":true,"args":{},"contract":{"id":"GET /data/cache/metars.cache.csv.gz","json":"{\"operationId\":\"getMetarsCacheCsv\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/gzip\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cache/metars.cache.csv.gz","segments":[{"lit":"data"},{"lit":"cache"},{"lit":"metars.cache.csv.gz"}],"select":{"$action":"metarscachecsvgz"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":5},{"active":true,"args":{},"contract":{"id":"GET /data/cache/metars.cache.xml.gz","json":"{\"operationId\":\"getMetarsCacheXml\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/gzip\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cache/metars.cache.xml.gz","segments":[{"lit":"data"},{"lit":"cache"},{"lit":"metars.cache.xml.gz"}],"select":{"$action":"metarscachexmlgz"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":6},{"active":true,"args":{},"contract":{"id":"GET /data/cache/stations.cache.json.gz","json":"{\"operationId\":\"getStationsCacheJson\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/gzip\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cache/stations.cache.json.gz","segments":[{"lit":"data"},{"lit":"cache"},{"lit":"stations.cache.json.gz"}],"select":{"$action":"stationscachejsongz"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":7},{"active":true,"args":{},"contract":{"id":"GET /data/cache/stations.cache.xml.gz","json":"{\"operationId\":\"getStationsCacheXml\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/gzip\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cache/stations.cache.xml.gz","segments":[{"lit":"data"},{"lit":"cache"},{"lit":"stations.cache.xml.gz"}],"select":{"$action":"stationscachexmlgz"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":8},{"active":true,"args":{},"contract":{"id":"GET /data/cache/tafs.cache.xml.gz","json":"{\"operationId\":\"getTafsCacheXml\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/gzip\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cache/tafs.cache.xml.gz","segments":[{"lit":"data"},{"lit":"cache"},{"lit":"tafs.cache.xml.gz"}],"select":{"$action":"tafscachexmlgz"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":9}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"cache","name__orig":"cache","Name":"Cache","name_":"cache","name-":"cache","NAME":"CACHE","index$":2}, {"active":true,"entity":"cache","key$":"BasicCacheFlow","kind":"basic","name":"BasicCacheFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"cache_ref01","srcdatavar":"cache_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cache_ref01"}}],"index$":0}]}, 'Cache')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let cache_ref01_data = Object.values(setup.data.existing.cache)[0] as any

    // LOAD
    const cache_ref01_ent = client.Cache()
    const cache_ref01_match_dt0: any = {}
    const cache_ref01_data_dt0 = (await cache_ref01_ent.load(cache_ref01_match_dt0)).data()
    assert(null != cache_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/cache/CacheTestData.json')

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
    ['cache01','cache02','cache03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AVIATIONWEATHER_DATA_TEST_CACHE_ENTID': idmap,
    'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
    'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AVIATIONWEATHER_DATA_TEST_CACHE_ENTID']

  const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_CACHE_ENTID']
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
  
