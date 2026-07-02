package voxgigaviationweatherdatasdk

import (
	"github.com/voxgig-sdk/aviationweather-data-sdk/go/core"
	"github.com/voxgig-sdk/aviationweather-data-sdk/go/entity"
	"github.com/voxgig-sdk/aviationweather-data-sdk/go/feature"
	_ "github.com/voxgig-sdk/aviationweather-data-sdk/go/utility"
)

// Type aliases preserve external API.
type AviationweatherDataSDK = core.AviationweatherDataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AviationweatherDataEntity = core.AviationweatherDataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AviationweatherDataError = core.AviationweatherDataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAirSigmetEntityFunc = func(client *core.AviationweatherDataSDK, entopts map[string]any) core.AviationweatherDataEntity {
		return entity.NewAirSigmetEntity(client, entopts)
	}
	core.NewAirportEntityFunc = func(client *core.AviationweatherDataSDK, entopts map[string]any) core.AviationweatherDataEntity {
		return entity.NewAirportEntity(client, entopts)
	}
	core.NewCacheEntityFunc = func(client *core.AviationweatherDataSDK, entopts map[string]any) core.AviationweatherDataEntity {
		return entity.NewCacheEntity(client, entopts)
	}
	core.NewCwaEntityFunc = func(client *core.AviationweatherDataSDK, entopts map[string]any) core.AviationweatherDataEntity {
		return entity.NewCwaEntity(client, entopts)
	}
	core.NewGAirmetEntityFunc = func(client *core.AviationweatherDataSDK, entopts map[string]any) core.AviationweatherDataEntity {
		return entity.NewGAirmetEntity(client, entopts)
	}
	core.NewMetarEntityFunc = func(client *core.AviationweatherDataSDK, entopts map[string]any) core.AviationweatherDataEntity {
		return entity.NewMetarEntity(client, entopts)
	}
	core.NewPirepEntityFunc = func(client *core.AviationweatherDataSDK, entopts map[string]any) core.AviationweatherDataEntity {
		return entity.NewPirepEntity(client, entopts)
	}
	core.NewStationInfoEntityFunc = func(client *core.AviationweatherDataSDK, entopts map[string]any) core.AviationweatherDataEntity {
		return entity.NewStationInfoEntity(client, entopts)
	}
	core.NewTafEntityFunc = func(client *core.AviationweatherDataSDK, entopts map[string]any) core.AviationweatherDataEntity {
		return entity.NewTafEntity(client, entopts)
	}
	core.NewTcfEntityFunc = func(client *core.AviationweatherDataSDK, entopts map[string]any) core.AviationweatherDataEntity {
		return entity.NewTcfEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAviationweatherDataSDK = core.NewAviationweatherDataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewAviationweatherDataSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *AviationweatherDataSDK  { return NewAviationweatherDataSDK(nil) }
func Test() *AviationweatherDataSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
