-- Typed models for the AviationweatherData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AirSigmet
---@field airsigmetType? string
---@field altitudeHigh? number
---@field altitudeLow? number
---@field fir? string
---@field hazard? string
---@field issueTime? string
---@field rawAirSigmet? string
---@field severity? string
---@field validTimeFrom? string
---@field validTimeTo? string

---@class AirSigmetListMatch
---@field bbox? string
---@field date? string
---@field format? string
---@field hazard? string

---@class Airport
---@field city? string
---@field country? string
---@field elev? number
---@field iataId? string
---@field icaoId? string
---@field lat? number
---@field lon? number
---@field name? string
---@field state? string

---@class AirportListMatch
---@field bbox? string
---@field format? string
---@field ids? string

---@class Cache

---@class CacheLoadMatch

---@class Cwa
---@field cwsu? string
---@field issueTime? string
---@field rawText? string
---@field sequence? number
---@field seriesId? string
---@field validTimeFrom? string
---@field validTimeTo? string

---@class CwaListMatch
---@field bbox? string
---@field date? string
---@field format? string

---@class GAirmet
---@field altitudeHigh? number
---@field altitudeLow? number
---@field hazard? string
---@field issueTime? string
---@field qualifier? string
---@field severity? string
---@field validTimeFrom? string
---@field validTimeTo? string

---@class GAirmetListMatch
---@field bbox? string
---@field date? string
---@field format? string
---@field hazard? string

---@class Metar
---@field altim? number
---@field clouds? table
---@field dewp? number
---@field elev? number
---@field fltCat? string
---@field icaoId? string
---@field lat? number
---@field lon? number
---@field maxT? number
---@field maxT24? number
---@field metarType? string
---@field minT? number
---@field minT24? number
---@field mostRecent? number
---@field name? string
---@field obsTime? string
---@field pcp24hr? number
---@field pcp3hr? number
---@field pcp6hr? number
---@field precip? number
---@field presTend? number
---@field prior? number
---@field qcField? number
---@field rawOb? string
---@field rawTaf? string
---@field reportTime? string
---@field slp? number
---@field snow? number
---@field temp? number
---@field vertVis? number
---@field visib? string
---@field wdir? number
---@field wgst? number
---@field wspd? number
---@field wxString? string

---@class MetarListMatch
---@field bbox? string
---@field date? string
---@field format? string
---@field ids? string
---@field taf? boolean

---@class Pirep
---@field aircraftType? string
---@field altitudeFt? number
---@field clouds? table
---@field icing? string
---@field lat? number
---@field lon? number
---@field obsTime? string
---@field rawOb? string
---@field reportType? string
---@field temp? number
---@field turbulence? string
---@field visibility? string
---@field wdir? number
---@field wspd? number
---@field wxString? string

---@class PirepListMatch
---@field age? number
---@field bbox? string
---@field date? string
---@field format? string

---@class StationInfo
---@field country? string
---@field elev? number
---@field iataId? string
---@field icaoId? string
---@field lat? number
---@field lon? number
---@field name? string
---@field priority? number
---@field site? string
---@field state? string

---@class StationInfoListMatch
---@field bbox? string
---@field format? string
---@field ids? string

---@class Taf
---@field bulletinTime? string
---@field elev? number
---@field fcsts? table
---@field icaoId? string
---@field issueTime? string
---@field lat? number
---@field lon? number
---@field name? string
---@field rawTAF? string
---@field validTimeFrom? string
---@field validTimeTo? string

---@class TafListMatch
---@field bbox? string
---@field date? string
---@field format? string
---@field ids? string

---@class Tcf

---@class TcfLoadMatch
---@field date? string
---@field format? string

local M = {}

return M
