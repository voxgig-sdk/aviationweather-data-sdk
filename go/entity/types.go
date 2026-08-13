// Typed models for the AviationweatherData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/aviationweather-data-sdk/go/core"
)

// AirSigmet is the typed data model for the air_sigmet entity.
type AirSigmet struct {
	AirsigmetType *string `json:"airsigmetType,omitempty"`
	AltitudeHigh *int `json:"altitudeHigh,omitempty"`
	AltitudeLow *int `json:"altitudeLow,omitempty"`
	Fir *string `json:"fir,omitempty"`
	Hazard *string `json:"hazard,omitempty"`
	IssueTime *string `json:"issueTime,omitempty"`
	RawAirSigmet *string `json:"rawAirSigmet,omitempty"`
	Severity *string `json:"severity,omitempty"`
	ValidTimeFrom *string `json:"validTimeFrom,omitempty"`
	ValidTimeTo *string `json:"validTimeTo,omitempty"`
}

// AirSigmetListMatch is the typed request payload for AirSigmet.ListTyped.
type AirSigmetListMatch struct {
	AirsigmetType *string `json:"airsigmetType,omitempty"`
	AltitudeHigh *int `json:"altitudeHigh,omitempty"`
	AltitudeLow *int `json:"altitudeLow,omitempty"`
	Fir *string `json:"fir,omitempty"`
	Hazard *string `json:"hazard,omitempty"`
	IssueTime *string `json:"issueTime,omitempty"`
	RawAirSigmet *string `json:"rawAirSigmet,omitempty"`
	Severity *string `json:"severity,omitempty"`
	ValidTimeFrom *string `json:"validTimeFrom,omitempty"`
	ValidTimeTo *string `json:"validTimeTo,omitempty"`
}

// Airport is the typed data model for the airport entity.
type Airport struct {
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	IataId *string `json:"iataId,omitempty"`
	IcaoId *string `json:"icaoId,omitempty"`
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
	IataId *string `json:"iataId,omitempty"`
	IcaoId *string `json:"icaoId,omitempty"`
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
	IssueTime *string `json:"issueTime,omitempty"`
	RawText *string `json:"rawText,omitempty"`
	Sequence *int `json:"sequence,omitempty"`
	SeriesId *string `json:"seriesId,omitempty"`
	ValidTimeFrom *string `json:"validTimeFrom,omitempty"`
	ValidTimeTo *string `json:"validTimeTo,omitempty"`
}

// CwaListMatch is the typed request payload for Cwa.ListTyped.
type CwaListMatch struct {
	Cwsu *string `json:"cwsu,omitempty"`
	IssueTime *string `json:"issueTime,omitempty"`
	RawText *string `json:"rawText,omitempty"`
	Sequence *int `json:"sequence,omitempty"`
	SeriesId *string `json:"seriesId,omitempty"`
	ValidTimeFrom *string `json:"validTimeFrom,omitempty"`
	ValidTimeTo *string `json:"validTimeTo,omitempty"`
}

// GAirmet is the typed data model for the g_airmet entity.
type GAirmet struct {
	AltitudeHigh *int `json:"altitudeHigh,omitempty"`
	AltitudeLow *int `json:"altitudeLow,omitempty"`
	Hazard *string `json:"hazard,omitempty"`
	IssueTime *string `json:"issueTime,omitempty"`
	Qualifier *string `json:"qualifier,omitempty"`
	Severity *string `json:"severity,omitempty"`
	ValidTimeFrom *string `json:"validTimeFrom,omitempty"`
	ValidTimeTo *string `json:"validTimeTo,omitempty"`
}

// GAirmetListMatch is the typed request payload for GAirmet.ListTyped.
type GAirmetListMatch struct {
	AltitudeHigh *int `json:"altitudeHigh,omitempty"`
	AltitudeLow *int `json:"altitudeLow,omitempty"`
	Hazard *string `json:"hazard,omitempty"`
	IssueTime *string `json:"issueTime,omitempty"`
	Qualifier *string `json:"qualifier,omitempty"`
	Severity *string `json:"severity,omitempty"`
	ValidTimeFrom *string `json:"validTimeFrom,omitempty"`
	ValidTimeTo *string `json:"validTimeTo,omitempty"`
}

// Metar is the typed data model for the metar entity.
type Metar struct {
	Altim *float64 `json:"altim,omitempty"`
	Clouds *[]any `json:"clouds,omitempty"`
	Dewp *float64 `json:"dewp,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	FltCat *string `json:"fltCat,omitempty"`
	IcaoId *string `json:"icaoId,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	MaxT *float64 `json:"maxT,omitempty"`
	MaxT24 *float64 `json:"maxT24,omitempty"`
	MetarType *string `json:"metarType,omitempty"`
	MinT *float64 `json:"minT,omitempty"`
	MinT24 *float64 `json:"minT24,omitempty"`
	MostRecent *int `json:"mostRecent,omitempty"`
	Name *string `json:"name,omitempty"`
	ObsTime *string `json:"obsTime,omitempty"`
	Pcp24hr *float64 `json:"pcp24hr,omitempty"`
	Pcp3hr *float64 `json:"pcp3hr,omitempty"`
	Pcp6hr *float64 `json:"pcp6hr,omitempty"`
	Precip *float64 `json:"precip,omitempty"`
	PresTend *float64 `json:"presTend,omitempty"`
	Prior *int `json:"prior,omitempty"`
	QcField *int `json:"qcField,omitempty"`
	RawOb *string `json:"rawOb,omitempty"`
	RawTaf *string `json:"rawTaf,omitempty"`
	ReportTime *string `json:"reportTime,omitempty"`
	Slp *float64 `json:"slp,omitempty"`
	Snow *float64 `json:"snow,omitempty"`
	Temp *float64 `json:"temp,omitempty"`
	VertVis *int `json:"vertVis,omitempty"`
	Visib *string `json:"visib,omitempty"`
	Wdir *int `json:"wdir,omitempty"`
	Wgst *int `json:"wgst,omitempty"`
	Wspd *int `json:"wspd,omitempty"`
	WxString *string `json:"wxString,omitempty"`
}

// MetarListMatch is the typed request payload for Metar.ListTyped.
type MetarListMatch struct {
	Altim *float64 `json:"altim,omitempty"`
	Clouds *[]any `json:"clouds,omitempty"`
	Dewp *float64 `json:"dewp,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	FltCat *string `json:"fltCat,omitempty"`
	IcaoId *string `json:"icaoId,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	MaxT *float64 `json:"maxT,omitempty"`
	MaxT24 *float64 `json:"maxT24,omitempty"`
	MetarType *string `json:"metarType,omitempty"`
	MinT *float64 `json:"minT,omitempty"`
	MinT24 *float64 `json:"minT24,omitempty"`
	MostRecent *int `json:"mostRecent,omitempty"`
	Name *string `json:"name,omitempty"`
	ObsTime *string `json:"obsTime,omitempty"`
	Pcp24hr *float64 `json:"pcp24hr,omitempty"`
	Pcp3hr *float64 `json:"pcp3hr,omitempty"`
	Pcp6hr *float64 `json:"pcp6hr,omitempty"`
	Precip *float64 `json:"precip,omitempty"`
	PresTend *float64 `json:"presTend,omitempty"`
	Prior *int `json:"prior,omitempty"`
	QcField *int `json:"qcField,omitempty"`
	RawOb *string `json:"rawOb,omitempty"`
	RawTaf *string `json:"rawTaf,omitempty"`
	ReportTime *string `json:"reportTime,omitempty"`
	Slp *float64 `json:"slp,omitempty"`
	Snow *float64 `json:"snow,omitempty"`
	Temp *float64 `json:"temp,omitempty"`
	VertVis *int `json:"vertVis,omitempty"`
	Visib *string `json:"visib,omitempty"`
	Wdir *int `json:"wdir,omitempty"`
	Wgst *int `json:"wgst,omitempty"`
	Wspd *int `json:"wspd,omitempty"`
	WxString *string `json:"wxString,omitempty"`
}

// Pirep is the typed data model for the pirep entity.
type Pirep struct {
	AircraftType *string `json:"aircraftType,omitempty"`
	AltitudeFt *int `json:"altitudeFt,omitempty"`
	Clouds *[]any `json:"clouds,omitempty"`
	Icing *string `json:"icing,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	ObsTime *string `json:"obsTime,omitempty"`
	RawOb *string `json:"rawOb,omitempty"`
	ReportType *string `json:"reportType,omitempty"`
	Temp *float64 `json:"temp,omitempty"`
	Turbulence *string `json:"turbulence,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	Wdir *int `json:"wdir,omitempty"`
	Wspd *int `json:"wspd,omitempty"`
	WxString *string `json:"wxString,omitempty"`
}

// PirepListMatch is the typed request payload for Pirep.ListTyped.
type PirepListMatch struct {
	AircraftType *string `json:"aircraftType,omitempty"`
	AltitudeFt *int `json:"altitudeFt,omitempty"`
	Clouds *[]any `json:"clouds,omitempty"`
	Icing *string `json:"icing,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	ObsTime *string `json:"obsTime,omitempty"`
	RawOb *string `json:"rawOb,omitempty"`
	ReportType *string `json:"reportType,omitempty"`
	Temp *float64 `json:"temp,omitempty"`
	Turbulence *string `json:"turbulence,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
	Wdir *int `json:"wdir,omitempty"`
	Wspd *int `json:"wspd,omitempty"`
	WxString *string `json:"wxString,omitempty"`
}

// StationInfo is the typed data model for the station_info entity.
type StationInfo struct {
	Country *string `json:"country,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	IataId *string `json:"iataId,omitempty"`
	IcaoId *string `json:"icaoId,omitempty"`
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
	IataId *string `json:"iataId,omitempty"`
	IcaoId *string `json:"icaoId,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Name *string `json:"name,omitempty"`
	Priority *int `json:"priority,omitempty"`
	Site *string `json:"site,omitempty"`
	State *string `json:"state,omitempty"`
}

// Taf is the typed data model for the taf entity.
type Taf struct {
	BulletinTime *string `json:"bulletinTime,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	Fcsts *[]any `json:"fcsts,omitempty"`
	IcaoId *string `json:"icaoId,omitempty"`
	IssueTime *string `json:"issueTime,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Name *string `json:"name,omitempty"`
	RawTAF *string `json:"rawTAF,omitempty"`
	ValidTimeFrom *string `json:"validTimeFrom,omitempty"`
	ValidTimeTo *string `json:"validTimeTo,omitempty"`
}

// TafListMatch is the typed request payload for Taf.ListTyped.
type TafListMatch struct {
	BulletinTime *string `json:"bulletinTime,omitempty"`
	Elev *float64 `json:"elev,omitempty"`
	Fcsts *[]any `json:"fcsts,omitempty"`
	IcaoId *string `json:"icaoId,omitempty"`
	IssueTime *string `json:"issueTime,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Name *string `json:"name,omitempty"`
	RawTAF *string `json:"rawTAF,omitempty"`
	ValidTimeFrom *string `json:"validTimeFrom,omitempty"`
	ValidTimeTo *string `json:"validTimeTo,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
