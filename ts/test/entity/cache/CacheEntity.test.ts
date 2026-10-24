

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
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cache.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"cache","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /data/cache/aircraftreports.cache.csv.gz","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/cache/aircraftreports.cache.csv.gz","q":{"$action":"aircraftreportscachecsvgz"},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/gzip"},"s":[{"lit":"data"},{"lit":"cache"},{"lit":"aircraftreports.cache.csv.gz"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /data/cache/aircraftreports.cache.xml.gz","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/cache/aircraftreports.cache.xml.gz","q":{"$action":"aircraftreportscachexmlgz"},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/gzip"},"s":[{"lit":"data"},{"lit":"cache"},{"lit":"aircraftreports.cache.xml.gz"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /data/cache/airsigmets.cache.csv.gz","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/cache/airsigmets.cache.csv.gz","q":{"$action":"airsigmetscachecsvgz"},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/gzip"},"s":[{"lit":"data"},{"lit":"cache"},{"lit":"airsigmets.cache.csv.gz"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /data/cache/airsigmets.cache.xml.gz","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/cache/airsigmets.cache.xml.gz","q":{"$action":"airsigmetscachexmlgz"},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/gzip"},"s":[{"lit":"data"},{"lit":"cache"},{"lit":"airsigmets.cache.xml.gz"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /data/cache/gairmets.cache.xml.gz","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/cache/gairmets.cache.xml.gz","q":{"$action":"gairmetscachexmlgz"},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/gzip"},"s":[{"lit":"data"},{"lit":"cache"},{"lit":"gairmets.cache.xml.gz"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"GET /data/cache/metars.cache.csv.gz","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/cache/metars.cache.csv.gz","q":{"$action":"metarscachecsvgz"},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/gzip"},"s":[{"lit":"data"},{"lit":"cache"},{"lit":"metars.cache.csv.gz"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5},{"a":true,"co":{"id":"GET /data/cache/metars.cache.xml.gz","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/cache/metars.cache.xml.gz","q":{"$action":"metarscachexmlgz"},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/gzip"},"s":[{"lit":"data"},{"lit":"cache"},{"lit":"metars.cache.xml.gz"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":6},{"a":true,"co":{"id":"GET /data/cache/stations.cache.json.gz","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/cache/stations.cache.json.gz","q":{"$action":"stationscachejsongz"},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/gzip"},"s":[{"lit":"data"},{"lit":"cache"},{"lit":"stations.cache.json.gz"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":7},{"a":true,"co":{"id":"GET /data/cache/stations.cache.xml.gz","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/cache/stations.cache.xml.gz","q":{"$action":"stationscachexmlgz"},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/gzip"},"s":[{"lit":"data"},{"lit":"cache"},{"lit":"stations.cache.xml.gz"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":8},{"a":true,"co":{"id":"GET /data/cache/tafs.cache.xml.gz","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/cache/tafs.cache.xml.gz","q":{"$action":"tafscachexmlgz"},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/gzip"},"s":[{"lit":"data"},{"lit":"cache"},{"lit":"tafs.cache.xml.gz"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":9}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"cache","name__orig":"cache","Name":"Cache","name_":"cache","name-":"cache","NAME":"CACHE","index$":2}, {"active":true,"entity":"cache","key$":"BasicCacheFlow","kind":"basic","name":"BasicCacheFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"cache_ref01","srcdatavar":"cache_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cache_ref01"}}],"unreachable":true}]}, 'Cache', {"GET /data/cache/aircraftreports.cache.csv.gz":{"protocol":"http","parameters":[]},"GET /data/cache/aircraftreports.cache.xml.gz":{"protocol":"http","parameters":[]},"GET /data/cache/airsigmets.cache.csv.gz":{"protocol":"http","parameters":[]},"GET /data/cache/airsigmets.cache.xml.gz":{"protocol":"http","parameters":[]},"GET /data/cache/gairmets.cache.xml.gz":{"protocol":"http","parameters":[]},"GET /data/cache/metars.cache.csv.gz":{"protocol":"http","parameters":[]},"GET /data/cache/metars.cache.xml.gz":{"protocol":"http","parameters":[]},"GET /data/cache/stations.cache.json.gz":{"protocol":"http","parameters":[]},"GET /data/cache/stations.cache.xml.gz":{"protocol":"http","parameters":[]},"GET /data/cache/tafs.cache.xml.gz":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let cache_ref01_data = Object.values(setup.data.existing.cache)[0] as any

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
  
