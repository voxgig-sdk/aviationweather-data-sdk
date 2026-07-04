# Typed models for the AviationweatherData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AirSigmet(TypedDict, total=False):
    airsigmet_type: str
    altitude_high: int
    altitude_low: int
    fir: str
    hazard: str
    issue_time: str
    raw_air_sigmet: str
    severity: str
    valid_time_from: str
    valid_time_to: str


class AirSigmetListMatch(TypedDict, total=False):
    airsigmet_type: str
    altitude_high: int
    altitude_low: int
    fir: str
    hazard: str
    issue_time: str
    raw_air_sigmet: str
    severity: str
    valid_time_from: str
    valid_time_to: str


class Airport(TypedDict, total=False):
    city: str
    country: str
    elev: float
    iata_id: str
    icao_id: str
    lat: float
    lon: float
    name: str
    state: str


class AirportListMatch(TypedDict, total=False):
    city: str
    country: str
    elev: float
    iata_id: str
    icao_id: str
    lat: float
    lon: float
    name: str
    state: str


class Cache(TypedDict):
    pass


class CacheLoadMatch(TypedDict):
    pass


class Cwa(TypedDict, total=False):
    cwsu: str
    issue_time: str
    raw_text: str
    sequence: int
    series_id: str
    valid_time_from: str
    valid_time_to: str


class CwaListMatch(TypedDict, total=False):
    cwsu: str
    issue_time: str
    raw_text: str
    sequence: int
    series_id: str
    valid_time_from: str
    valid_time_to: str


class GAirmet(TypedDict, total=False):
    altitude_high: int
    altitude_low: int
    hazard: str
    issue_time: str
    qualifier: str
    severity: str
    valid_time_from: str
    valid_time_to: str


class GAirmetListMatch(TypedDict, total=False):
    altitude_high: int
    altitude_low: int
    hazard: str
    issue_time: str
    qualifier: str
    severity: str
    valid_time_from: str
    valid_time_to: str


class Metar(TypedDict, total=False):
    altim: float
    cloud: list
    dewp: float
    elev: float
    flt_cat: str
    icao_id: str
    lat: float
    lon: float
    max_t: float
    max_t24: float
    metar_type: str
    min_t: float
    min_t24: float
    most_recent: int
    name: str
    obs_time: str
    pcp24hr: float
    pcp3hr: float
    pcp6hr: float
    precip: float
    pres_tend: float
    prior: int
    qc_field: int
    raw_ob: str
    raw_taf: str
    report_time: str
    slp: float
    snow: float
    temp: float
    vert_vi: int
    visib: str
    wdir: int
    wgst: int
    wspd: int
    wx_string: str


class MetarListMatch(TypedDict, total=False):
    altim: float
    cloud: list
    dewp: float
    elev: float
    flt_cat: str
    icao_id: str
    lat: float
    lon: float
    max_t: float
    max_t24: float
    metar_type: str
    min_t: float
    min_t24: float
    most_recent: int
    name: str
    obs_time: str
    pcp24hr: float
    pcp3hr: float
    pcp6hr: float
    precip: float
    pres_tend: float
    prior: int
    qc_field: int
    raw_ob: str
    raw_taf: str
    report_time: str
    slp: float
    snow: float
    temp: float
    vert_vi: int
    visib: str
    wdir: int
    wgst: int
    wspd: int
    wx_string: str


class Pirep(TypedDict, total=False):
    aircraft_type: str
    altitude_ft: int
    cloud: list
    icing: str
    lat: float
    lon: float
    obs_time: str
    raw_ob: str
    report_type: str
    temp: float
    turbulence: str
    visibility: str
    wdir: int
    wspd: int
    wx_string: str


class PirepListMatch(TypedDict, total=False):
    aircraft_type: str
    altitude_ft: int
    cloud: list
    icing: str
    lat: float
    lon: float
    obs_time: str
    raw_ob: str
    report_type: str
    temp: float
    turbulence: str
    visibility: str
    wdir: int
    wspd: int
    wx_string: str


class StationInfo(TypedDict, total=False):
    country: str
    elev: float
    iata_id: str
    icao_id: str
    lat: float
    lon: float
    name: str
    priority: int
    site: str
    state: str


class StationInfoListMatch(TypedDict, total=False):
    country: str
    elev: float
    iata_id: str
    icao_id: str
    lat: float
    lon: float
    name: str
    priority: int
    site: str
    state: str


class Taf(TypedDict, total=False):
    bulletin_time: str
    elev: float
    fcst: list
    icao_id: str
    issue_time: str
    lat: float
    lon: float
    name: str
    raw_taf: str
    valid_time_from: str
    valid_time_to: str


class TafListMatch(TypedDict, total=False):
    bulletin_time: str
    elev: float
    fcst: list
    icao_id: str
    issue_time: str
    lat: float
    lon: float
    name: str
    raw_taf: str
    valid_time_from: str
    valid_time_to: str


class Tcf(TypedDict):
    pass


class TcfLoadMatch(TypedDict):
    pass
