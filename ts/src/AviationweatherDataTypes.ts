// Typed models for the AviationweatherData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AirSigmet {
  airsigmetType?: string
  altitudeHigh?: number
  altitudeLow?: number
  fir?: string
  hazard?: string
  issueTime?: string
  rawAirSigmet?: string
  severity?: string
  validTimeFrom?: string
  validTimeTo?: string
}

export interface AirSigmetListMatch {
  bbox?: string
  date?: string
  format?: string
  hazard?: string
}

export interface Airport {
  city?: string
  country?: string
  elev?: number
  iataId?: string
  icaoId?: string
  lat?: number
  lon?: number
  name?: string
  state?: string
}

export interface AirportListMatch {
  bbox?: string
  format?: string
  ids?: string
}

export interface Cache {
}

export interface CacheLoadMatch {

  // Selects a custom action instead of the plain load:
  //   'aircraftreportscachecsvgz' | 'aircraftreportscachexmlgz' | 'airsigmetscachecsvgz' | 'airsigmetscachexmlgz' | 'gairmetscachexmlgz' | 'metarscachecsvgz' | 'metarscachexmlgz' | 'stationscachejsongz' | 'stationscachexmlgz' | 'tafscachexmlgz'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Cwa {
  cwsu?: string
  issueTime?: string
  rawText?: string
  sequence?: number
  seriesId?: string
  validTimeFrom?: string
  validTimeTo?: string
}

export interface CwaListMatch {
  bbox?: string
  date?: string
  format?: string
}

export interface GAirmet {
  altitudeHigh?: number
  altitudeLow?: number
  hazard?: string
  issueTime?: string
  qualifier?: string
  severity?: string
  validTimeFrom?: string
  validTimeTo?: string
}

export interface GAirmetListMatch {
  bbox?: string
  date?: string
  format?: string
  hazard?: string
}

export interface Metar {
  altim?: number
  clouds?: any[]
  dewp?: number
  elev?: number
  fltCat?: string
  icaoId?: string
  lat?: number
  lon?: number
  maxT?: number
  maxT24?: number
  metarType?: string
  minT?: number
  minT24?: number
  mostRecent?: number
  name?: string
  obsTime?: string
  pcp24hr?: number
  pcp3hr?: number
  pcp6hr?: number
  precip?: number
  presTend?: number
  prior?: number
  qcField?: number
  rawOb?: string
  rawTaf?: string
  reportTime?: string
  slp?: number
  snow?: number
  temp?: number
  vertVis?: number
  visib?: string
  wdir?: number
  wgst?: number
  wspd?: number
  wxString?: string
}

export interface MetarListMatch {
  bbox?: string
  date?: string
  format?: string
  ids?: string
  taf?: boolean
}

export interface Pirep {
  aircraftType?: string
  altitudeFt?: number
  clouds?: any[]
  icing?: string
  lat?: number
  lon?: number
  obsTime?: string
  rawOb?: string
  reportType?: string
  temp?: number
  turbulence?: string
  visibility?: string
  wdir?: number
  wspd?: number
  wxString?: string
}

export interface PirepListMatch {
  age?: number
  bbox?: string
  date?: string
  format?: string
}

export interface StationInfo {
  country?: string
  elev?: number
  iataId?: string
  icaoId?: string
  lat?: number
  lon?: number
  name?: string
  priority?: number
  site?: string
  state?: string
}

export interface StationInfoListMatch {
  bbox?: string
  format?: string
  ids?: string
}

export interface Taf {
  bulletinTime?: string
  elev?: number
  fcsts?: any[]
  icaoId?: string
  issueTime?: string
  lat?: number
  lon?: number
  name?: string
  rawTAF?: string
  validTimeFrom?: string
  validTimeTo?: string
}

export interface TafListMatch {
  bbox?: string
  date?: string
  format?: string
  ids?: string
}

export interface Tcf {
}

export interface TcfLoadMatch {
  date?: string
  format?: string
}

