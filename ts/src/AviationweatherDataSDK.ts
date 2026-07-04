// AviationweatherData Ts SDK

import { AirSigmetEntity } from './entity/AirSigmetEntity'
import { AirportEntity } from './entity/AirportEntity'
import { CacheEntity } from './entity/CacheEntity'
import { CwaEntity } from './entity/CwaEntity'
import { GAirmetEntity } from './entity/GAirmetEntity'
import { MetarEntity } from './entity/MetarEntity'
import { PirepEntity } from './entity/PirepEntity'
import { StationInfoEntity } from './entity/StationInfoEntity'
import { TafEntity } from './entity/TafEntity'
import { TcfEntity } from './entity/TcfEntity'

export type * from './AviationweatherDataTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { AviationweatherDataEntityBase } from './AviationweatherDataEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class AviationweatherDataSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _air_sigmet?: AirSigmetEntity

  // Idiomatic facade: `client.air_sigmet.list()` / `client.air_sigmet.load({ id })`.
  get air_sigmet(): AirSigmetEntity {
    return (this._air_sigmet ??= new AirSigmetEntity(this, undefined))
  }

  /** @deprecated Use `client.air_sigmet` instead. */
  AirSigmet(data?: any) {
    const self = this
    return new AirSigmetEntity(self,data)
  }


  _airport?: AirportEntity

  // Idiomatic facade: `client.airport.list()` / `client.airport.load({ id })`.
  get airport(): AirportEntity {
    return (this._airport ??= new AirportEntity(this, undefined))
  }

  /** @deprecated Use `client.airport` instead. */
  Airport(data?: any) {
    const self = this
    return new AirportEntity(self,data)
  }


  _cache?: CacheEntity

  // Idiomatic facade: `client.cache.list()` / `client.cache.load({ id })`.
  get cache(): CacheEntity {
    return (this._cache ??= new CacheEntity(this, undefined))
  }

  /** @deprecated Use `client.cache` instead. */
  Cache(data?: any) {
    const self = this
    return new CacheEntity(self,data)
  }


  _cwa?: CwaEntity

  // Idiomatic facade: `client.cwa.list()` / `client.cwa.load({ id })`.
  get cwa(): CwaEntity {
    return (this._cwa ??= new CwaEntity(this, undefined))
  }

  /** @deprecated Use `client.cwa` instead. */
  Cwa(data?: any) {
    const self = this
    return new CwaEntity(self,data)
  }


  _g_airmet?: GAirmetEntity

  // Idiomatic facade: `client.g_airmet.list()` / `client.g_airmet.load({ id })`.
  get g_airmet(): GAirmetEntity {
    return (this._g_airmet ??= new GAirmetEntity(this, undefined))
  }

  /** @deprecated Use `client.g_airmet` instead. */
  GAirmet(data?: any) {
    const self = this
    return new GAirmetEntity(self,data)
  }


  _metar?: MetarEntity

  // Idiomatic facade: `client.metar.list()` / `client.metar.load({ id })`.
  get metar(): MetarEntity {
    return (this._metar ??= new MetarEntity(this, undefined))
  }

  /** @deprecated Use `client.metar` instead. */
  Metar(data?: any) {
    const self = this
    return new MetarEntity(self,data)
  }


  _pirep?: PirepEntity

  // Idiomatic facade: `client.pirep.list()` / `client.pirep.load({ id })`.
  get pirep(): PirepEntity {
    return (this._pirep ??= new PirepEntity(this, undefined))
  }

  /** @deprecated Use `client.pirep` instead. */
  Pirep(data?: any) {
    const self = this
    return new PirepEntity(self,data)
  }


  _station_info?: StationInfoEntity

  // Idiomatic facade: `client.station_info.list()` / `client.station_info.load({ id })`.
  get station_info(): StationInfoEntity {
    return (this._station_info ??= new StationInfoEntity(this, undefined))
  }

  /** @deprecated Use `client.station_info` instead. */
  StationInfo(data?: any) {
    const self = this
    return new StationInfoEntity(self,data)
  }


  _taf?: TafEntity

  // Idiomatic facade: `client.taf.list()` / `client.taf.load({ id })`.
  get taf(): TafEntity {
    return (this._taf ??= new TafEntity(this, undefined))
  }

  /** @deprecated Use `client.taf` instead. */
  Taf(data?: any) {
    const self = this
    return new TafEntity(self,data)
  }


  _tcf?: TcfEntity

  // Idiomatic facade: `client.tcf.list()` / `client.tcf.load({ id })`.
  get tcf(): TcfEntity {
    return (this._tcf ??= new TcfEntity(this, undefined))
  }

  /** @deprecated Use `client.tcf` instead. */
  Tcf(data?: any) {
    const self = this
    return new TcfEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new AviationweatherDataSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return AviationweatherDataSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'AviationweatherData' }
  }

  toString() {
    return 'AviationweatherData ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = AviationweatherDataSDK


export {
  stdutil,

  BaseFeature,
  AviationweatherDataEntityBase,

  AviationweatherDataSDK,
  SDK,
}


