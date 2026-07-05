// Typed models for the AviationweatherData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// AirSigmet is the typed data model for the air_sigmet entity.
type AirSigmet struct {
	AirsigmetType *string `json:"airsigmet_type,omitempty"`
	AltitudeHigh *int `json:"altitude_high,omitempty"`
	AltitudeLow *int `json:"altitude_low,omitempty"`
	Fir *string `json:"fir,omitempty"`
	Hazard *string `json:"hazard,omitempty"`
	IssueTime *string `json:"issue_time,omitempty"`
	RawAirSigmet *string `json:"raw_air_sigmet,omitempty"`
	Severity *string `json:"severity,omitempty"`
	ValidTimeFrom *string `json:"valid_time_from,omitempty"`
	ValidTimeTo *string `json:"valid_time_to,omitempty"`
}

// AirSigmetListMatch is the typed request payload for AirSigmet.ListTyped.
type AirSigmetListMatch struct {
	AirsigmetType *string `json:"airsigmet_type,omitempty"`
	AltitudeHigh *int `json:"altitude_high,omitempty"`
	AltitudeLow *int `json:"altitude_low,omitempty"`
	Fir *string `json:"fir,omitempty"`
	Hazard *string `json:"hazard,omitempty"`
	IssueTime *string `json:"issue_time,omitempty"`
	RawAirSigmet *string `json:"raw_air_sigmet,omitempty"`
	Severity *string `json:"severity,omitempty"`
	ValidTimeFrom *string `json:"valid_time_from,omitempty"`
	ValidTimeTo *string `json:"valid_time_to,omitempty"`
}

// Airport is the typed data model for the airport entity.
type Airport struct {
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	IataId *string `json:"iata_id,omitempty"`
	IcaoId *string `json:"icao_id,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Name *string `json:"name,omitempty"`
	State *string `json:"state,omitempty"`
}

// AirportListMatch is the typed request payload for Airport.ListTyped.
type AirportListMatch struct {
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	IataId *string `json:"iata_id,omitempty"`
	IcaoId *string `json:"icao_id,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Name *string `json:"name,omitempty"`
	State *string `json:"state,omitempty"`
}

// Cache is the typed data model for the cache entity.
type Cache struct {
}

// CacheLoadMatch is the typed request payload for Cache.LoadTyped.
type CacheLoadMatch struct {
}

// Cwa is the typed data model for the cwa entity.
type Cwa struct {
	Cwsu *string `json:"cwsu,omitempty"`
	IssueTime *string `json:"issue_time,omitempty"`
	RawText *string `json:"raw_text,omitempty"`
	Sequence *int `json:"sequence,omitempty"`
	SeriesId *string `json:"series_id,omitempty"`
	ValidTimeFrom *string `json:"valid_time_from,omitempty"`
	ValidTimeTo *string `json:"valid_time_to,omitempty"`
}

// CwaListMatch is the typed request payload for Cwa.ListTyped.
type CwaListMatch struct {
	Cwsu *string `json:"cwsu,omitempty"`
	IssueTime *string `json:"issue_time,omitempty"`
	RawText *string `json:"raw_text,omitempty"`
	Sequence *int `json:"sequence,omitempty"`
	SeriesId *string `json:"series_id,omitempty"`
	ValidTimeFrom *string `json:"valid_time_from,omitempty"`
	ValidTimeTo *string `json:"valid_time_to,omitempty"`
}

// GAirmet is the typed data model for the g_airmet entity.
type GAirmet struct {
	AltitudeHigh *int `json:"altitude_high,omitempty"`
	AltitudeLow *int `json:"altitude_low,omitempty"`
	Hazard *string `json:"hazard,omitempty"`
	IssueTime *string `json:"issue_time,omitempty"`
	Qualifier *string `json:"qualifier,omitempty"`
	Severity *string `json:"severity,omitempty"`
	ValidTimeFrom *string `json:"valid_time_from,omitempty"`
	ValidTimeTo *string `json:"valid_time_to,omitempty"`
}

// GAirmetListMatch is the typed request payload for GAirmet.ListTyped.
type GAirmetListMatch struct {
	AltitudeHigh *int `json:"altitude_high,omitempty"`
	AltitudeLow *int `json:"altitude_low,omitempty"`
	Hazard *string `json:"hazard,omitempty"`
	IssueTime *string `json:"issue_time,omitempty"`
	Qualifier *string `json:"qualifier,omitempty"`
	Severity *string `json:"severity,omitempty"`
	ValidTimeFrom *string `json:"valid_time_from,omitempty"`
	ValidTimeTo *string `json:"valid_time_to,omitempty"`
}

// Metar is the typed data model for the metar entity.
type Metar struct {
	Altim *float64 `json:"altim,omitempty"`
	Cloud *[]any `json:"cloud,omitempty"`
	Dewp *float64 `json:"dewp,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	FltCat *string `json:"flt_cat,omitempty"`
	IcaoId *string `json:"icao_id,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	MaxT *float64 `json:"max_t,omitempty"`
	MaxT24 *float64 `json:"max_t24,omitempty"`
	MetarType *string `json:"metar_type,omitempty"`
	MinT *float64 `json:"min_t,omitempty"`
	MinT24 *float64 `json:"min_t24,omitempty"`
	MostRecent *int `json:"most_recent,omitempty"`
	Name *string `json:"name,omitempty"`
	ObsTime *string `json:"obs_time,omitempty"`
	Pcp24hr *float64 `json:"pcp24hr,omitempty"`
	Pcp3hr *float64 `json:"pcp3hr,omitempty"`
	Pcp6hr *float64 `json:"pcp6hr,omitempty"`
	Precip *float64 `json:"precip,omitempty"`
	PresTend *float64 `json:"pres_tend,omitempty"`
	Prior *int `json:"prior,omitempty"`
	QcField *int `json:"qc_field,omitempty"`
	RawOb *string `json:"raw_ob,omitempty"`
	RawTaf *string `json:"raw_taf,omitempty"`
	ReportTime *string `json:"report_time,omitempty"`
	Slp *float64 `json:"slp,omitempty"`
	Snow *float64 `json:"snow,omitempty"`
	Temp *float64 `json:"temp,omitempty"`
	VertVi *int `json:"vert_vi,omitempty"`
	Visib *string `json:"visib,omitempty"`
	Wdir *int `json:"wdir,omitempty"`
	Wgst *int `json:"wgst,omitempty"`
	Wspd *int `json:"wspd,omitempty"`
	WxString *string `json:"wx_string,omitempty"`
}

// MetarListMatch is the typed request payload for Metar.ListTyped.
type MetarListMatch struct {
	Altim *float64 `json:"altim,omitempty"`
	Cloud *[]any `json:"cloud,omitempty"`
	Dewp *float64 `json:"dewp,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	FltCat *string `json:"flt_cat,omitempty"`
	IcaoId *string `json:"icao_id,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	MaxT *float64 `json:"max_t,omitempty"`
	MaxT24 *float64 `json:"max_t24,omitempty"`
	MetarType *string `json:"metar_type,omitempty"`
	MinT *float64 `json:"min_t,omitempty"`
	MinT24 *float64 `json:"min_t24,omitempty"`
	MostRecent *int `json:"most_recent,omitempty"`
	Name *string `json:"name,omitempty"`
	ObsTime *string `json:"obs_time,omitempty"`
	Pcp24hr *float64 `json:"pcp24hr,omitempty"`
	Pcp3hr *float64 `json:"pcp3hr,omitempty"`
	Pcp6hr *float64 `json:"pcp6hr,omitempty"`
	Precip *float64 `json:"precip,omitempty"`
	PresTend *float64 `json:"pres_tend,omitempty"`
	Prior *int `json:"prior,omitempty"`
	QcField *int `json:"qc_field,omitempty"`
	RawOb *string `json:"raw_ob,omitempty"`
	RawTaf *string `json:"raw_taf,omitempty"`
	ReportTime *string `json:"report_time,omitempty"`
	Slp *float64 `json:"slp,omitempty"`
	Snow *float64 `json:"snow,omitempty"`
	Temp *float64 `json:"temp,omitempty"`
	VertVi *int `json:"vert_vi,omitempty"`
	Visib *string `json:"visib,omitempty"`
	Wdir *int `json:"wdir,omitempty"`
	Wgst *int `json:"wgst,omitempty"`
	Wspd *int `json:"wspd,omitempty"`
	WxString *string `json:"wx_string,omitempty"`
}

// Pirep is the typed data model for the pirep entity.
type Pirep struct {
	AircraftType *string `json:"aircraft_type,omitempty"`
	AltitudeFt *int `json:"altitude_ft,omitempty"`
	Cloud *[]any `json:"cloud,omitempty"`
	Icing *string `json:"icing,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	ObsTime *string `json:"obs_time,omitempty"`
	RawOb *string `json:"raw_ob,omitempty"`
	ReportType *string `json:"report_type,omitempty"`
	Temp *float64 `json:"temp,omitempty"`
	Turbulence *string `json:"turbulence,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	Wdir *int `json:"wdir,omitempty"`
	Wspd *int `json:"wspd,omitempty"`
	WxString *string `json:"wx_string,omitempty"`
}

// PirepListMatch is the typed request payload for Pirep.ListTyped.
type PirepListMatch struct {
	AircraftType *string `json:"aircraft_type,omitempty"`
	AltitudeFt *int `json:"altitude_ft,omitempty"`
	Cloud *[]any `json:"cloud,omitempty"`
	Icing *string `json:"icing,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	ObsTime *string `json:"obs_time,omitempty"`
	RawOb *string `json:"raw_ob,omitempty"`
	ReportType *string `json:"report_type,omitempty"`
	Temp *float64 `json:"temp,omitempty"`
	Turbulence *string `json:"turbulence,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	Wdir *int `json:"wdir,omitempty"`
	Wspd *int `json:"wspd,omitempty"`
	WxString *string `json:"wx_string,omitempty"`
}

// StationInfo is the typed data model for the station_info entity.
type StationInfo struct {
	Country *string `json:"country,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	IataId *string `json:"iata_id,omitempty"`
	IcaoId *string `json:"icao_id,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Name *string `json:"name,omitempty"`
	Priority *int `json:"priority,omitempty"`
	Site *string `json:"site,omitempty"`
	State *string `json:"state,omitempty"`
}

// StationInfoListMatch is the typed request payload for StationInfo.ListTyped.
type StationInfoListMatch struct {
	Country *string `json:"country,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	IataId *string `json:"iata_id,omitempty"`
	IcaoId *string `json:"icao_id,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Name *string `json:"name,omitempty"`
	Priority *int `json:"priority,omitempty"`
	Site *string `json:"site,omitempty"`
	State *string `json:"state,omitempty"`
}

// Taf is the typed data model for the taf entity.
type Taf struct {
	BulletinTime *string `json:"bulletin_time,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	Fcst *[]any `json:"fcst,omitempty"`
	IcaoId *string `json:"icao_id,omitempty"`
	IssueTime *string `json:"issue_time,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Name *string `json:"name,omitempty"`
	RawTaf *string `json:"raw_taf,omitempty"`
	ValidTimeFrom *string `json:"valid_time_from,omitempty"`
	ValidTimeTo *string `json:"valid_time_to,omitempty"`
}

// TafListMatch is the typed request payload for Taf.ListTyped.
type TafListMatch struct {
	BulletinTime *string `json:"bulletin_time,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	Fcst *[]any `json:"fcst,omitempty"`
	IcaoId *string `json:"icao_id,omitempty"`
	IssueTime *string `json:"issue_time,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Name *string `json:"name,omitempty"`
	RawTaf *string `json:"raw_taf,omitempty"`
	ValidTimeFrom *string `json:"valid_time_from,omitempty"`
	ValidTimeTo *string `json:"valid_time_to,omitempty"`
}

// Tcf is the typed data model for the tcf entity.
type Tcf struct {
}

// TcfLoadMatch is the typed request payload for Tcf.LoadTyped.
type TcfLoadMatch struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
