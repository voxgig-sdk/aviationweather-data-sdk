// Typed models for the AviationweatherData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AirSigmet {
  airsigmet_type?: string
  altitude_high?: number
  altitude_low?: number
  fir?: string
  hazard?: string
  issue_time?: string
  raw_air_sigmet?: string
  severity?: string
  valid_time_from?: string
  valid_time_to?: string
}

export type AirSigmetListMatch = Partial<AirSigmet>

export interface Airport {
  city?: string
  country?: string
  elev?: number
  iata_id?: string
  icao_id?: string
  lat?: number
  lon?: number
  name?: string
  state?: string
}

export type AirportListMatch = Partial<Airport>

export interface Cache {
}

export type CacheLoadMatch = Partial<Cache>

export interface Cwa {
  cwsu?: string
  issue_time?: string
  raw_text?: string
  sequence?: number
  series_id?: string
  valid_time_from?: string
  valid_time_to?: string
}

export type CwaListMatch = Partial<Cwa>

export interface GAirmet {
  altitude_high?: number
  altitude_low?: number
  hazard?: string
  issue_time?: string
  qualifier?: string
  severity?: string
  valid_time_from?: string
  valid_time_to?: string
}

export type GAirmetListMatch = Partial<GAirmet>

export interface Metar {
  altim?: number
  cloud?: any[]
  dewp?: number
  elev?: number
  flt_cat?: string
  icao_id?: string
  lat?: number
  lon?: number
  max_t?: number
  max_t24?: number
  metar_type?: string
  min_t?: number
  min_t24?: number
  most_recent?: number
  name?: string
  obs_time?: string
  pcp24hr?: number
  pcp3hr?: number
  pcp6hr?: number
  precip?: number
  pres_tend?: number
  prior?: number
  qc_field?: number
  raw_ob?: string
  raw_taf?: string
  report_time?: string
  slp?: number
  snow?: number
  temp?: number
  vert_vi?: number
  visib?: string
  wdir?: number
  wgst?: number
  wspd?: number
  wx_string?: string
}

export type MetarListMatch = Partial<Metar>

export interface Pirep {
  aircraft_type?: string
  altitude_ft?: number
  cloud?: any[]
  icing?: string
  lat?: number
  lon?: number
  obs_time?: string
  raw_ob?: string
  report_type?: string
  temp?: number
  turbulence?: string
  visibility?: string
  wdir?: number
  wspd?: number
  wx_string?: string
}

export type PirepListMatch = Partial<Pirep>

export interface StationInfo {
  country?: string
  elev?: number
  iata_id?: string
  icao_id?: string
  lat?: number
  lon?: number
  name?: string
  priority?: number
  site?: string
  state?: string
}

export type StationInfoListMatch = Partial<StationInfo>

export interface Taf {
  bulletin_time?: string
  elev?: number
  fcst?: any[]
  icao_id?: string
  issue_time?: string
  lat?: number
  lon?: number
  name?: string
  raw_taf?: string
  valid_time_from?: string
  valid_time_to?: string
}

export type TafListMatch = Partial<Taf>

export interface Tcf {
}

export type TcfLoadMatch = Partial<Tcf>

