package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAirSigmetEntityFunc func(client *AviationweatherDataSDK, entopts map[string]any) AviationweatherDataEntity

var NewAirportEntityFunc func(client *AviationweatherDataSDK, entopts map[string]any) AviationweatherDataEntity

var NewCacheEntityFunc func(client *AviationweatherDataSDK, entopts map[string]any) AviationweatherDataEntity

var NewCwaEntityFunc func(client *AviationweatherDataSDK, entopts map[string]any) AviationweatherDataEntity

var NewGAirmetEntityFunc func(client *AviationweatherDataSDK, entopts map[string]any) AviationweatherDataEntity

var NewMetarEntityFunc func(client *AviationweatherDataSDK, entopts map[string]any) AviationweatherDataEntity

var NewPirepEntityFunc func(client *AviationweatherDataSDK, entopts map[string]any) AviationweatherDataEntity

var NewStationInfoEntityFunc func(client *AviationweatherDataSDK, entopts map[string]any) AviationweatherDataEntity

var NewTafEntityFunc func(client *AviationweatherDataSDK, entopts map[string]any) AviationweatherDataEntity

var NewTcfEntityFunc func(client *AviationweatherDataSDK, entopts map[string]any) AviationweatherDataEntity

