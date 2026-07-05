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
# @!attribute [rw] airsigmet_type
#   @return [String, nil]
#
# @!attribute [rw] altitude_high
#   @return [Integer, nil]
#
# @!attribute [rw] altitude_low
#   @return [Integer, nil]
#
# @!attribute [rw] fir
#   @return [String, nil]
#
# @!attribute [rw] hazard
#   @return [String, nil]
#
# @!attribute [rw] issue_time
#   @return [String, nil]
#
# @!attribute [rw] raw_air_sigmet
#   @return [String, nil]
#
# @!attribute [rw] severity
#   @return [String, nil]
#
# @!attribute [rw] valid_time_from
#   @return [String, nil]
#
# @!attribute [rw] valid_time_to
#   @return [String, nil]
AirSigmet = Struct.new(
  :airsigmet_type,
  :altitude_high,
  :altitude_low,
  :fir,
  :hazard,
  :issue_time,
  :raw_air_sigmet,
  :severity,
  :valid_time_from,
  :valid_time_to,
  keyword_init: true
)

# Request payload for AirSigmet#list.
#
# @!attribute [rw] airsigmet_type
#   @return [String, nil]
#
# @!attribute [rw] altitude_high
#   @return [Integer, nil]
#
# @!attribute [rw] altitude_low
#   @return [Integer, nil]
#
# @!attribute [rw] fir
#   @return [String, nil]
#
# @!attribute [rw] hazard
#   @return [String, nil]
#
# @!attribute [rw] issue_time
#   @return [String, nil]
#
# @!attribute [rw] raw_air_sigmet
#   @return [String, nil]
#
# @!attribute [rw] severity
#   @return [String, nil]
#
# @!attribute [rw] valid_time_from
#   @return [String, nil]
#
# @!attribute [rw] valid_time_to
#   @return [String, nil]
AirSigmetListMatch = Struct.new(
  :airsigmet_type,
  :altitude_high,
  :altitude_low,
  :fir,
  :hazard,
  :issue_time,
  :raw_air_sigmet,
  :severity,
  :valid_time_from,
  :valid_time_to,
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
# @!attribute [rw] iata_id
#   @return [String, nil]
#
# @!attribute [rw] icao_id
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
  :iata_id,
  :icao_id,
  :lat,
  :lon,
  :name,
  :state,
  keyword_init: true
)

# Request payload for Airport#list.
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
# @!attribute [rw] iata_id
#   @return [String, nil]
#
# @!attribute [rw] icao_id
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
AirportListMatch = Struct.new(
  :city,
  :country,
  :elev,
  :iata_id,
  :icao_id,
  :lat,
  :lon,
  :name,
  :state,
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
# @!attribute [rw] issue_time
#   @return [String, nil]
#
# @!attribute [rw] raw_text
#   @return [String, nil]
#
# @!attribute [rw] sequence
#   @return [Integer, nil]
#
# @!attribute [rw] series_id
#   @return [String, nil]
#
# @!attribute [rw] valid_time_from
#   @return [String, nil]
#
# @!attribute [rw] valid_time_to
#   @return [String, nil]
Cwa = Struct.new(
  :cwsu,
  :issue_time,
  :raw_text,
  :sequence,
  :series_id,
  :valid_time_from,
  :valid_time_to,
  keyword_init: true
)

# Request payload for Cwa#list.
#
# @!attribute [rw] cwsu
#   @return [String, nil]
#
# @!attribute [rw] issue_time
#   @return [String, nil]
#
# @!attribute [rw] raw_text
#   @return [String, nil]
#
# @!attribute [rw] sequence
#   @return [Integer, nil]
#
# @!attribute [rw] series_id
#   @return [String, nil]
#
# @!attribute [rw] valid_time_from
#   @return [String, nil]
#
# @!attribute [rw] valid_time_to
#   @return [String, nil]
CwaListMatch = Struct.new(
  :cwsu,
  :issue_time,
  :raw_text,
  :sequence,
  :series_id,
  :valid_time_from,
  :valid_time_to,
  keyword_init: true
)

# GAirmet entity data model.
#
# @!attribute [rw] altitude_high
#   @return [Integer, nil]
#
# @!attribute [rw] altitude_low
#   @return [Integer, nil]
#
# @!attribute [rw] hazard
#   @return [String, nil]
#
# @!attribute [rw] issue_time
#   @return [String, nil]
#
# @!attribute [rw] qualifier
#   @return [String, nil]
#
# @!attribute [rw] severity
#   @return [String, nil]
#
# @!attribute [rw] valid_time_from
#   @return [String, nil]
#
# @!attribute [rw] valid_time_to
#   @return [String, nil]
GAirmet = Struct.new(
  :altitude_high,
  :altitude_low,
  :hazard,
  :issue_time,
  :qualifier,
  :severity,
  :valid_time_from,
  :valid_time_to,
  keyword_init: true
)

# Request payload for GAirmet#list.
#
# @!attribute [rw] altitude_high
#   @return [Integer, nil]
#
# @!attribute [rw] altitude_low
#   @return [Integer, nil]
#
# @!attribute [rw] hazard
#   @return [String, nil]
#
# @!attribute [rw] issue_time
#   @return [String, nil]
#
# @!attribute [rw] qualifier
#   @return [String, nil]
#
# @!attribute [rw] severity
#   @return [String, nil]
#
# @!attribute [rw] valid_time_from
#   @return [String, nil]
#
# @!attribute [rw] valid_time_to
#   @return [String, nil]
GAirmetListMatch = Struct.new(
  :altitude_high,
  :altitude_low,
  :hazard,
  :issue_time,
  :qualifier,
  :severity,
  :valid_time_from,
  :valid_time_to,
  keyword_init: true
)

# Metar entity data model.
#
# @!attribute [rw] altim
#   @return [Float, nil]
#
# @!attribute [rw] cloud
#   @return [Array, nil]
#
# @!attribute [rw] dewp
#   @return [Float, nil]
#
# @!attribute [rw] elev
#   @return [Float, nil]
#
# @!attribute [rw] flt_cat
#   @return [String, nil]
#
# @!attribute [rw] icao_id
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] max_t
#   @return [Float, nil]
#
# @!attribute [rw] max_t24
#   @return [Float, nil]
#
# @!attribute [rw] metar_type
#   @return [String, nil]
#
# @!attribute [rw] min_t
#   @return [Float, nil]
#
# @!attribute [rw] min_t24
#   @return [Float, nil]
#
# @!attribute [rw] most_recent
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] obs_time
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
# @!attribute [rw] pres_tend
#   @return [Float, nil]
#
# @!attribute [rw] prior
#   @return [Integer, nil]
#
# @!attribute [rw] qc_field
#   @return [Integer, nil]
#
# @!attribute [rw] raw_ob
#   @return [String, nil]
#
# @!attribute [rw] raw_taf
#   @return [String, nil]
#
# @!attribute [rw] report_time
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
# @!attribute [rw] vert_vi
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
# @!attribute [rw] wx_string
#   @return [String, nil]
Metar = Struct.new(
  :altim,
  :cloud,
  :dewp,
  :elev,
  :flt_cat,
  :icao_id,
  :lat,
  :lon,
  :max_t,
  :max_t24,
  :metar_type,
  :min_t,
  :min_t24,
  :most_recent,
  :name,
  :obs_time,
  :pcp24hr,
  :pcp3hr,
  :pcp6hr,
  :precip,
  :pres_tend,
  :prior,
  :qc_field,
  :raw_ob,
  :raw_taf,
  :report_time,
  :slp,
  :snow,
  :temp,
  :vert_vi,
  :visib,
  :wdir,
  :wgst,
  :wspd,
  :wx_string,
  keyword_init: true
)

# Request payload for Metar#list.
#
# @!attribute [rw] altim
#   @return [Float, nil]
#
# @!attribute [rw] cloud
#   @return [Array, nil]
#
# @!attribute [rw] dewp
#   @return [Float, nil]
#
# @!attribute [rw] elev
#   @return [Float, nil]
#
# @!attribute [rw] flt_cat
#   @return [String, nil]
#
# @!attribute [rw] icao_id
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] max_t
#   @return [Float, nil]
#
# @!attribute [rw] max_t24
#   @return [Float, nil]
#
# @!attribute [rw] metar_type
#   @return [String, nil]
#
# @!attribute [rw] min_t
#   @return [Float, nil]
#
# @!attribute [rw] min_t24
#   @return [Float, nil]
#
# @!attribute [rw] most_recent
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] obs_time
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
# @!attribute [rw] pres_tend
#   @return [Float, nil]
#
# @!attribute [rw] prior
#   @return [Integer, nil]
#
# @!attribute [rw] qc_field
#   @return [Integer, nil]
#
# @!attribute [rw] raw_ob
#   @return [String, nil]
#
# @!attribute [rw] raw_taf
#   @return [String, nil]
#
# @!attribute [rw] report_time
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
# @!attribute [rw] vert_vi
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
# @!attribute [rw] wx_string
#   @return [String, nil]
MetarListMatch = Struct.new(
  :altim,
  :cloud,
  :dewp,
  :elev,
  :flt_cat,
  :icao_id,
  :lat,
  :lon,
  :max_t,
  :max_t24,
  :metar_type,
  :min_t,
  :min_t24,
  :most_recent,
  :name,
  :obs_time,
  :pcp24hr,
  :pcp3hr,
  :pcp6hr,
  :precip,
  :pres_tend,
  :prior,
  :qc_field,
  :raw_ob,
  :raw_taf,
  :report_time,
  :slp,
  :snow,
  :temp,
  :vert_vi,
  :visib,
  :wdir,
  :wgst,
  :wspd,
  :wx_string,
  keyword_init: true
)

# Pirep entity data model.
#
# @!attribute [rw] aircraft_type
#   @return [String, nil]
#
# @!attribute [rw] altitude_ft
#   @return [Integer, nil]
#
# @!attribute [rw] cloud
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
# @!attribute [rw] obs_time
#   @return [String, nil]
#
# @!attribute [rw] raw_ob
#   @return [String, nil]
#
# @!attribute [rw] report_type
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
# @!attribute [rw] wx_string
#   @return [String, nil]
Pirep = Struct.new(
  :aircraft_type,
  :altitude_ft,
  :cloud,
  :icing,
  :lat,
  :lon,
  :obs_time,
  :raw_ob,
  :report_type,
  :temp,
  :turbulence,
  :visibility,
  :wdir,
  :wspd,
  :wx_string,
  keyword_init: true
)

# Request payload for Pirep#list.
#
# @!attribute [rw] aircraft_type
#   @return [String, nil]
#
# @!attribute [rw] altitude_ft
#   @return [Integer, nil]
#
# @!attribute [rw] cloud
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
# @!attribute [rw] obs_time
#   @return [String, nil]
#
# @!attribute [rw] raw_ob
#   @return [String, nil]
#
# @!attribute [rw] report_type
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
# @!attribute [rw] wx_string
#   @return [String, nil]
PirepListMatch = Struct.new(
  :aircraft_type,
  :altitude_ft,
  :cloud,
  :icing,
  :lat,
  :lon,
  :obs_time,
  :raw_ob,
  :report_type,
  :temp,
  :turbulence,
  :visibility,
  :wdir,
  :wspd,
  :wx_string,
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
# @!attribute [rw] iata_id
#   @return [String, nil]
#
# @!attribute [rw] icao_id
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
  :iata_id,
  :icao_id,
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
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] elev
#   @return [Float, nil]
#
# @!attribute [rw] iata_id
#   @return [String, nil]
#
# @!attribute [rw] icao_id
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
StationInfoListMatch = Struct.new(
  :country,
  :elev,
  :iata_id,
  :icao_id,
  :lat,
  :lon,
  :name,
  :priority,
  :site,
  :state,
  keyword_init: true
)

# Taf entity data model.
#
# @!attribute [rw] bulletin_time
#   @return [String, nil]
#
# @!attribute [rw] elev
#   @return [Float, nil]
#
# @!attribute [rw] fcst
#   @return [Array, nil]
#
# @!attribute [rw] icao_id
#   @return [String, nil]
#
# @!attribute [rw] issue_time
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
# @!attribute [rw] raw_taf
#   @return [String, nil]
#
# @!attribute [rw] valid_time_from
#   @return [String, nil]
#
# @!attribute [rw] valid_time_to
#   @return [String, nil]
Taf = Struct.new(
  :bulletin_time,
  :elev,
  :fcst,
  :icao_id,
  :issue_time,
  :lat,
  :lon,
  :name,
  :raw_taf,
  :valid_time_from,
  :valid_time_to,
  keyword_init: true
)

# Request payload for Taf#list.
#
# @!attribute [rw] bulletin_time
#   @return [String, nil]
#
# @!attribute [rw] elev
#   @return [Float, nil]
#
# @!attribute [rw] fcst
#   @return [Array, nil]
#
# @!attribute [rw] icao_id
#   @return [String, nil]
#
# @!attribute [rw] issue_time
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
# @!attribute [rw] raw_taf
#   @return [String, nil]
#
# @!attribute [rw] valid_time_from
#   @return [String, nil]
#
# @!attribute [rw] valid_time_to
#   @return [String, nil]
TafListMatch = Struct.new(
  :bulletin_time,
  :elev,
  :fcst,
  :icao_id,
  :issue_time,
  :lat,
  :lon,
  :name,
  :raw_taf,
  :valid_time_from,
  :valid_time_to,
  keyword_init: true
)

# Tcf entity data model.
class Tcf
end

# Request payload for Tcf#load.
class TcfLoadMatch
end

