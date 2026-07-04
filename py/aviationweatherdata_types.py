# Typed models for the AviationweatherData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class AirSigmet:
    airsigmet_type: Optional[str] = None
    altitude_high: Optional[int] = None
    altitude_low: Optional[int] = None
    fir: Optional[str] = None
    hazard: Optional[str] = None
    issue_time: Optional[str] = None
    raw_air_sigmet: Optional[str] = None
    severity: Optional[str] = None
    valid_time_from: Optional[str] = None
    valid_time_to: Optional[str] = None


@dataclass
class AirSigmetListMatch:
    airsigmet_type: Optional[str] = None
    altitude_high: Optional[int] = None
    altitude_low: Optional[int] = None
    fir: Optional[str] = None
    hazard: Optional[str] = None
    issue_time: Optional[str] = None
    raw_air_sigmet: Optional[str] = None
    severity: Optional[str] = None
    valid_time_from: Optional[str] = None
    valid_time_to: Optional[str] = None


@dataclass
class Airport:
    city: Optional[str] = None
    country: Optional[str] = None
    elev: Optional[float] = None
    iata_id: Optional[str] = None
    icao_id: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    name: Optional[str] = None
    state: Optional[str] = None


@dataclass
class AirportListMatch:
    city: Optional[str] = None
    country: Optional[str] = None
    elev: Optional[float] = None
    iata_id: Optional[str] = None
    icao_id: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    name: Optional[str] = None
    state: Optional[str] = None


@dataclass
class Cache:
    pass


@dataclass
class CacheLoadMatch:
    pass


@dataclass
class Cwa:
    cwsu: Optional[str] = None
    issue_time: Optional[str] = None
    raw_text: Optional[str] = None
    sequence: Optional[int] = None
    series_id: Optional[str] = None
    valid_time_from: Optional[str] = None
    valid_time_to: Optional[str] = None


@dataclass
class CwaListMatch:
    cwsu: Optional[str] = None
    issue_time: Optional[str] = None
    raw_text: Optional[str] = None
    sequence: Optional[int] = None
    series_id: Optional[str] = None
    valid_time_from: Optional[str] = None
    valid_time_to: Optional[str] = None


@dataclass
class GAirmet:
    altitude_high: Optional[int] = None
    altitude_low: Optional[int] = None
    hazard: Optional[str] = None
    issue_time: Optional[str] = None
    qualifier: Optional[str] = None
    severity: Optional[str] = None
    valid_time_from: Optional[str] = None
    valid_time_to: Optional[str] = None


@dataclass
class GAirmetListMatch:
    altitude_high: Optional[int] = None
    altitude_low: Optional[int] = None
    hazard: Optional[str] = None
    issue_time: Optional[str] = None
    qualifier: Optional[str] = None
    severity: Optional[str] = None
    valid_time_from: Optional[str] = None
    valid_time_to: Optional[str] = None


@dataclass
class Metar:
    altim: Optional[float] = None
    cloud: Optional[list] = None
    dewp: Optional[float] = None
    elev: Optional[float] = None
    flt_cat: Optional[str] = None
    icao_id: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    max_t: Optional[float] = None
    max_t24: Optional[float] = None
    metar_type: Optional[str] = None
    min_t: Optional[float] = None
    min_t24: Optional[float] = None
    most_recent: Optional[int] = None
    name: Optional[str] = None
    obs_time: Optional[str] = None
    pcp24hr: Optional[float] = None
    pcp3hr: Optional[float] = None
    pcp6hr: Optional[float] = None
    precip: Optional[float] = None
    pres_tend: Optional[float] = None
    prior: Optional[int] = None
    qc_field: Optional[int] = None
    raw_ob: Optional[str] = None
    raw_taf: Optional[str] = None
    report_time: Optional[str] = None
    slp: Optional[float] = None
    snow: Optional[float] = None
    temp: Optional[float] = None
    vert_vi: Optional[int] = None
    visib: Optional[str] = None
    wdir: Optional[int] = None
    wgst: Optional[int] = None
    wspd: Optional[int] = None
    wx_string: Optional[str] = None


@dataclass
class MetarListMatch:
    altim: Optional[float] = None
    cloud: Optional[list] = None
    dewp: Optional[float] = None
    elev: Optional[float] = None
    flt_cat: Optional[str] = None
    icao_id: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    max_t: Optional[float] = None
    max_t24: Optional[float] = None
    metar_type: Optional[str] = None
    min_t: Optional[float] = None
    min_t24: Optional[float] = None
    most_recent: Optional[int] = None
    name: Optional[str] = None
    obs_time: Optional[str] = None
    pcp24hr: Optional[float] = None
    pcp3hr: Optional[float] = None
    pcp6hr: Optional[float] = None
    precip: Optional[float] = None
    pres_tend: Optional[float] = None
    prior: Optional[int] = None
    qc_field: Optional[int] = None
    raw_ob: Optional[str] = None
    raw_taf: Optional[str] = None
    report_time: Optional[str] = None
    slp: Optional[float] = None
    snow: Optional[float] = None
    temp: Optional[float] = None
    vert_vi: Optional[int] = None
    visib: Optional[str] = None
    wdir: Optional[int] = None
    wgst: Optional[int] = None
    wspd: Optional[int] = None
    wx_string: Optional[str] = None


@dataclass
class Pirep:
    aircraft_type: Optional[str] = None
    altitude_ft: Optional[int] = None
    cloud: Optional[list] = None
    icing: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    obs_time: Optional[str] = None
    raw_ob: Optional[str] = None
    report_type: Optional[str] = None
    temp: Optional[float] = None
    turbulence: Optional[str] = None
    visibility: Optional[str] = None
    wdir: Optional[int] = None
    wspd: Optional[int] = None
    wx_string: Optional[str] = None


@dataclass
class PirepListMatch:
    aircraft_type: Optional[str] = None
    altitude_ft: Optional[int] = None
    cloud: Optional[list] = None
    icing: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    obs_time: Optional[str] = None
    raw_ob: Optional[str] = None
    report_type: Optional[str] = None
    temp: Optional[float] = None
    turbulence: Optional[str] = None
    visibility: Optional[str] = None
    wdir: Optional[int] = None
    wspd: Optional[int] = None
    wx_string: Optional[str] = None


@dataclass
class StationInfo:
    country: Optional[str] = None
    elev: Optional[float] = None
    iata_id: Optional[str] = None
    icao_id: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    name: Optional[str] = None
    priority: Optional[int] = None
    site: Optional[str] = None
    state: Optional[str] = None


@dataclass
class StationInfoListMatch:
    country: Optional[str] = None
    elev: Optional[float] = None
    iata_id: Optional[str] = None
    icao_id: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    name: Optional[str] = None
    priority: Optional[int] = None
    site: Optional[str] = None
    state: Optional[str] = None


@dataclass
class Taf:
    bulletin_time: Optional[str] = None
    elev: Optional[float] = None
    fcst: Optional[list] = None
    icao_id: Optional[str] = None
    issue_time: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    name: Optional[str] = None
    raw_taf: Optional[str] = None
    valid_time_from: Optional[str] = None
    valid_time_to: Optional[str] = None


@dataclass
class TafListMatch:
    bulletin_time: Optional[str] = None
    elev: Optional[float] = None
    fcst: Optional[list] = None
    icao_id: Optional[str] = None
    issue_time: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    name: Optional[str] = None
    raw_taf: Optional[str] = None
    valid_time_from: Optional[str] = None
    valid_time_to: Optional[str] = None


@dataclass
class Tcf:
    pass


@dataclass
class TcfLoadMatch:
    pass

