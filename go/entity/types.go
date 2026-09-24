// Typed models for the AviationweatherData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/aviationweather-data-sdk/go/core"
)

// AirSigmet is the typed data model for the air_sigmet entity.
type AirSigmet struct {
}

// AirSigmetListMatch is the typed request payload for AirSigmet.ListTyped.
type AirSigmetListMatch struct {
	Bbox *string `json:"bbox,omitempty"`
	Date *string `json:"date,omitempty"`
	Format *string `json:"format,omitempty"`
	Hazard *string `json:"hazard,omitempty"`
}

// Airport is the typed data model for the airport entity.
type Airport struct {
}

// AirportListMatch is the typed request payload for Airport.ListTyped.
type AirportListMatch struct {
	Bbox *string `json:"bbox,omitempty"`
	Format *string `json:"format,omitempty"`
	Ids *string `json:"ids,omitempty"`
}

// Cache is the typed data model for the cache entity.
type Cache struct {
}

// CacheLoadMatch is the typed request payload for Cache.LoadTyped.
type CacheLoadMatch struct {
}

// Cwa is the typed data model for the cwa entity.
type Cwa struct {
}

// CwaListMatch is the typed request payload for Cwa.ListTyped.
type CwaListMatch struct {
	Bbox *string `json:"bbox,omitempty"`
	Date *string `json:"date,omitempty"`
	Format *string `json:"format,omitempty"`
}

// GAirmet is the typed data model for the g_airmet entity.
type GAirmet struct {
}

// GAirmetListMatch is the typed request payload for GAirmet.ListTyped.
type GAirmetListMatch struct {
	Bbox *string `json:"bbox,omitempty"`
	Date *string `json:"date,omitempty"`
	Format *string `json:"format,omitempty"`
	Hazard *string `json:"hazard,omitempty"`
}

// Metar is the typed data model for the metar entity.
type Metar struct {
}

// MetarListMatch is the typed request payload for Metar.ListTyped.
type MetarListMatch struct {
	Bbox *string `json:"bbox,omitempty"`
	Date *string `json:"date,omitempty"`
	Format *string `json:"format,omitempty"`
	Ids *string `json:"ids,omitempty"`
	Taf *bool `json:"taf,omitempty"`
}

// Pirep is the typed data model for the pirep entity.
type Pirep struct {
}

// PirepListMatch is the typed request payload for Pirep.ListTyped.
type PirepListMatch struct {
	Age *int `json:"age,omitempty"`
	Bbox *string `json:"bbox,omitempty"`
	Date *string `json:"date,omitempty"`
	Format *string `json:"format,omitempty"`
}

// StationInfo is the typed data model for the station_info entity.
type StationInfo struct {
}

// StationInfoListMatch is the typed request payload for StationInfo.ListTyped.
type StationInfoListMatch struct {
	Bbox *string `json:"bbox,omitempty"`
	Format *string `json:"format,omitempty"`
	Ids *string `json:"ids,omitempty"`
}

// Taf is the typed data model for the taf entity.
type Taf struct {
}

// TafListMatch is the typed request payload for Taf.ListTyped.
type TafListMatch struct {
	Bbox *string `json:"bbox,omitempty"`
	Date *string `json:"date,omitempty"`
	Format *string `json:"format,omitempty"`
	Ids *string `json:"ids,omitempty"`
}

// Tcf is the typed data model for the tcf entity.
type Tcf struct {
}

// TcfLoadMatch is the typed request payload for Tcf.LoadTyped.
type TcfLoadMatch struct {
	Date *string `json:"date,omitempty"`
	Format *string `json:"format,omitempty"`
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
