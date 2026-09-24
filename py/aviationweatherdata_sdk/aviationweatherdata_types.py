# Typed models for the AviationweatherData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
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
    airsigmetType: str
    altitudeHigh: int
    altitudeLow: int
    fir: str
    hazard: str
    issueTime: str
    rawAirSigmet: str
    severity: str
    validTimeFrom: str
    validTimeTo: str


class AirSigmetListMatch(TypedDict, total=False):
    bbox: str
    date: str
    format: str
    hazard: str


class Airport(TypedDict, total=False):
    city: str
    country: str
    elev: float
    iataId: str
    icaoId: str
    lat: float
    lon: float
    name: str
    state: str


class AirportListMatch(TypedDict, total=False):
    bbox: str
    format: str
    ids: str


class Cache(TypedDict):
    pass


class CacheLoadMatch(TypedDict):
    pass


class Cwa(TypedDict, total=False):
    cwsu: str
    issueTime: str
    rawText: str
    sequence: int
    seriesId: str
    validTimeFrom: str
    validTimeTo: str


class CwaListMatch(TypedDict, total=False):
    bbox: str
    date: str
    format: str


class GAirmet(TypedDict, total=False):
    altitudeHigh: int
    altitudeLow: int
    hazard: str
    issueTime: str
    qualifier: str
    severity: str
    validTimeFrom: str
    validTimeTo: str


class GAirmetListMatch(TypedDict, total=False):
    bbox: str
    date: str
    format: str
    hazard: str


class Metar(TypedDict, total=False):
    altim: float
    clouds: list
    dewp: float
    elev: float
    fltCat: str
    icaoId: str
    lat: float
    lon: float
    maxT: float
    maxT24: float
    metarType: str
    minT: float
    minT24: float
    mostRecent: int
    name: str
    obsTime: str
    pcp24hr: float
    pcp3hr: float
    pcp6hr: float
    precip: float
    presTend: float
    prior: int
    qcField: int
    rawOb: str
    rawTaf: str
    reportTime: str
    slp: float
    snow: float
    temp: float
    vertVis: int
    visib: str
    wdir: int
    wgst: int
    wspd: int
    wxString: str


class MetarListMatch(TypedDict, total=False):
    bbox: str
    date: str
    format: str
    ids: str
    taf: bool


class Pirep(TypedDict, total=False):
    aircraftType: str
    altitudeFt: int
    clouds: list
    icing: str
    lat: float
    lon: float
    obsTime: str
    rawOb: str
    reportType: str
    temp: float
    turbulence: str
    visibility: str
    wdir: int
    wspd: int
    wxString: str


class PirepListMatch(TypedDict, total=False):
    age: int
    bbox: str
    date: str
    format: str


class StationInfo(TypedDict, total=False):
    country: str
    elev: float
    iataId: str
    icaoId: str
    lat: float
    lon: float
    name: str
    priority: int
    site: str
    state: str


class StationInfoListMatch(TypedDict, total=False):
    bbox: str
    format: str
    ids: str


class Taf(TypedDict, total=False):
    bulletinTime: str
    elev: float
    fcsts: list
    icaoId: str
    issueTime: str
    lat: float
    lon: float
    name: str
    rawTAF: str
    validTimeFrom: str
    validTimeTo: str


class TafListMatch(TypedDict, total=False):
    bbox: str
    date: str
    format: str
    ids: str


class Tcf(TypedDict):
    pass


class TcfLoadMatch(TypedDict, total=False):
    date: str
    format: str
