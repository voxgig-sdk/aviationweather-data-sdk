# frozen_string_literal: true

# Typed models for the AviationweatherData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AirSigmet entity data model.
#
# @!attribute [rw] airsigmetType
#   @return [String, nil]
#
# @!attribute [rw] altitudeHigh
#   @return [Integer, nil]
#
# @!attribute [rw] altitudeLow
#   @return [Integer, nil]
#
# @!attribute [rw] fir
#   @return [String, nil]
#
# @!attribute [rw] hazard
#   @return [String, nil]
#
# @!attribute [rw] issueTime
#   @return [String, nil]
#
# @!attribute [rw] rawAirSigmet
#   @return [String, nil]
#
# @!attribute [rw] severity
#   @return [String, nil]
#
# @!attribute [rw] validTimeFrom
#   @return [String, nil]
#
# @!attribute [rw] validTimeTo
#   @return [String, nil]
AirSigmet = Struct.new(
  :airsigmetType,
  :altitudeHigh,
  :altitudeLow,
  :fir,
  :hazard,
  :issueTime,
  :rawAirSigmet,
  :severity,
  :validTimeFrom,
  :validTimeTo,
  keyword_init: true
)

# Request payload for AirSigmet#list.
#
# @!attribute [rw] bbox
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] hazard
#   @return [String, nil]
AirSigmetListMatch = Struct.new(
  :bbox,
  :date,
  :format,
  :hazard,
  keyword_init: true
)

# Airport entity data model.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] elev
#   @return [Float, nil]
#
# @!attribute [rw] iataId
#   @return [String, nil]
#
# @!attribute [rw] icaoId
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
Airport = Struct.new(
  :city,
  :country,
  :elev,
  :iataId,
  :icaoId,
  :lat,
  :lon,
  :name,
  :state,
  keyword_init: true
)

# Request payload for Airport#list.
#
# @!attribute [rw] bbox
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] ids
#   @return [String, nil]
AirportListMatch = Struct.new(
  :bbox,
  :format,
  :ids,
  keyword_init: true
)

# Cache entity data model.
class Cache
end

# Request payload for Cache#load.
class CacheLoadMatch
end

# Cwa entity data model.
#
# @!attribute [rw] cwsu
#   @return [String, nil]
#
# @!attribute [rw] issueTime
#   @return [String, nil]
#
# @!attribute [rw] rawText
#   @return [String, nil]
#
# @!attribute [rw] sequence
#   @return [Integer, nil]
#
# @!attribute [rw] seriesId
#   @return [String, nil]
#
# @!attribute [rw] validTimeFrom
#   @return [String, nil]
#
# @!attribute [rw] validTimeTo
#   @return [String, nil]
Cwa = Struct.new(
  :cwsu,
  :issueTime,
  :rawText,
  :sequence,
  :seriesId,
  :validTimeFrom,
  :validTimeTo,
  keyword_init: true
)

# Request payload for Cwa#list.
#
# @!attribute [rw] bbox
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
CwaListMatch = Struct.new(
  :bbox,
  :date,
  :format,
  keyword_init: true
)

# GAirmet entity data model.
#
# @!attribute [rw] altitudeHigh
#   @return [Integer, nil]
#
# @!attribute [rw] altitudeLow
#   @return [Integer, nil]
#
# @!attribute [rw] hazard
#   @return [String, nil]
#
# @!attribute [rw] issueTime
#   @return [String, nil]
#
# @!attribute [rw] qualifier
#   @return [String, nil]
#
# @!attribute [rw] severity
#   @return [String, nil]
#
# @!attribute [rw] validTimeFrom
#   @return [String, nil]
#
# @!attribute [rw] validTimeTo
#   @return [String, nil]
GAirmet = Struct.new(
  :altitudeHigh,
  :altitudeLow,
  :hazard,
  :issueTime,
  :qualifier,
  :severity,
  :validTimeFrom,
  :validTimeTo,
  keyword_init: true
)

# Request payload for GAirmet#list.
#
# @!attribute [rw] bbox
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] hazard
#   @return [String, nil]
GAirmetListMatch = Struct.new(
  :bbox,
  :date,
  :format,
  :hazard,
  keyword_init: true
)

# Metar entity data model.
#
# @!attribute [rw] altim
#   @return [Float, nil]
#
# @!attribute [rw] clouds
#   @return [Array, nil]
#
# @!attribute [rw] dewp
#   @return [Float, nil]
#
# @!attribute [rw] elev
#   @return [Float, nil]
#
# @!attribute [rw] fltCat
#   @return [String, nil]
#
# @!attribute [rw] icaoId
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] maxT
#   @return [Float, nil]
#
# @!attribute [rw] maxT24
#   @return [Float, nil]
#
# @!attribute [rw] metarType
#   @return [String, nil]
#
# @!attribute [rw] minT
#   @return [Float, nil]
#
# @!attribute [rw] minT24
#   @return [Float, nil]
#
# @!attribute [rw] mostRecent
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] obsTime
#   @return [String, nil]
#
# @!attribute [rw] pcp24hr
#   @return [Float, nil]
#
# @!attribute [rw] pcp3hr
#   @return [Float, nil]
#
# @!attribute [rw] pcp6hr
#   @return [Float, nil]
#
# @!attribute [rw] precip
#   @return [Float, nil]
#
# @!attribute [rw] presTend
#   @return [Float, nil]
#
# @!attribute [rw] prior
#   @return [Integer, nil]
#
# @!attribute [rw] qcField
#   @return [Integer, nil]
#
# @!attribute [rw] rawOb
#   @return [String, nil]
#
# @!attribute [rw] rawTaf
#   @return [String, nil]
#
# @!attribute [rw] reportTime
#   @return [String, nil]
#
# @!attribute [rw] slp
#   @return [Float, nil]
#
# @!attribute [rw] snow
#   @return [Float, nil]
#
# @!attribute [rw] temp
#   @return [Float, nil]
#
# @!attribute [rw] vertVis
#   @return [Integer, nil]
#
# @!attribute [rw] visib
#   @return [String, nil]
#
# @!attribute [rw] wdir
#   @return [Integer, nil]
#
# @!attribute [rw] wgst
#   @return [Integer, nil]
#
# @!attribute [rw] wspd
#   @return [Integer, nil]
#
# @!attribute [rw] wxString
#   @return [String, nil]
Metar = Struct.new(
  :altim,
  :clouds,
  :dewp,
  :elev,
  :fltCat,
  :icaoId,
  :lat,
  :lon,
  :maxT,
  :maxT24,
  :metarType,
  :minT,
  :minT24,
  :mostRecent,
  :name,
  :obsTime,
  :pcp24hr,
  :pcp3hr,
  :pcp6hr,
  :precip,
  :presTend,
  :prior,
  :qcField,
  :rawOb,
  :rawTaf,
  :reportTime,
  :slp,
  :snow,
  :temp,
  :vertVis,
  :visib,
  :wdir,
  :wgst,
  :wspd,
  :wxString,
  keyword_init: true
)

# Request payload for Metar#list.
#
# @!attribute [rw] bbox
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] ids
#   @return [String, nil]
#
# @!attribute [rw] taf
#   @return [Boolean, nil]
MetarListMatch = Struct.new(
  :bbox,
  :date,
  :format,
  :ids,
  :taf,
  keyword_init: true
)

# Pirep entity data model.
#
# @!attribute [rw] aircraftType
#   @return [String, nil]
#
# @!attribute [rw] altitudeFt
#   @return [Integer, nil]
#
# @!attribute [rw] clouds
#   @return [Array, nil]
#
# @!attribute [rw] icing
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] obsTime
#   @return [String, nil]
#
# @!attribute [rw] rawOb
#   @return [String, nil]
#
# @!attribute [rw] reportType
#   @return [String, nil]
#
# @!attribute [rw] temp
#   @return [Float, nil]
#
# @!attribute [rw] turbulence
#   @return [String, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
#
# @!attribute [rw] wdir
#   @return [Integer, nil]
#
# @!attribute [rw] wspd
#   @return [Integer, nil]
#
# @!attribute [rw] wxString
#   @return [String, nil]
Pirep = Struct.new(
  :aircraftType,
  :altitudeFt,
  :clouds,
  :icing,
  :lat,
  :lon,
  :obsTime,
  :rawOb,
  :reportType,
  :temp,
  :turbulence,
  :visibility,
  :wdir,
  :wspd,
  :wxString,
  keyword_init: true
)

# Request payload for Pirep#list.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] bbox
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
PirepListMatch = Struct.new(
  :age,
  :bbox,
  :date,
  :format,
  keyword_init: true
)

# StationInfo entity data model.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] elev
#   @return [Float, nil]
#
# @!attribute [rw] iataId
#   @return [String, nil]
#
# @!attribute [rw] icaoId
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] priority
#   @return [Integer, nil]
#
# @!attribute [rw] site
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
StationInfo = Struct.new(
  :country,
  :elev,
  :iataId,
  :icaoId,
  :lat,
  :lon,
  :name,
  :priority,
  :site,
  :state,
  keyword_init: true
)

# Request payload for StationInfo#list.
#
# @!attribute [rw] bbox
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] ids
#   @return [String, nil]
StationInfoListMatch = Struct.new(
  :bbox,
  :format,
  :ids,
  keyword_init: true
)

# Taf entity data model.
#
# @!attribute [rw] bulletinTime
#   @return [String, nil]
#
# @!attribute [rw] elev
#   @return [Float, nil]
#
# @!attribute [rw] fcsts
#   @return [Array, nil]
#
# @!attribute [rw] icaoId
#   @return [String, nil]
#
# @!attribute [rw] issueTime
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rawTAF
#   @return [String, nil]
#
# @!attribute [rw] validTimeFrom
#   @return [String, nil]
#
# @!attribute [rw] validTimeTo
#   @return [String, nil]
Taf = Struct.new(
  :bulletinTime,
  :elev,
  :fcsts,
  :icaoId,
  :issueTime,
  :lat,
  :lon,
  :name,
  :rawTAF,
  :validTimeFrom,
  :validTimeTo,
  keyword_init: true
)

# Request payload for Taf#list.
#
# @!attribute [rw] bbox
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] ids
#   @return [String, nil]
TafListMatch = Struct.new(
  :bbox,
  :date,
  :format,
  :ids,
  keyword_init: true
)

# Tcf entity data model.
class Tcf
end

# Request payload for Tcf#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
TcfLoadMatch = Struct.new(
  :date,
  :format,
  keyword_init: true
)

