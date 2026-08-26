package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AviationweatherData",
			"slug": "aviationweather-data",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://aviationweather.gov",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"air_sigmet": map[string]any{},
				"airport": map[string]any{},
				"cache": map[string]any{},
				"cwa": map[string]any{},
				"g_airmet": map[string]any{},
				"metar": map[string]any{},
				"pirep": map[string]any{},
				"station_info": map[string]any{},
				"taf": map[string]any{},
				"tcf": map[string]any{},
			},
		},
		"entity": map[string]any{
			"air_sigmet": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "airsigmetType",
						"short": "SIGMET type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "altitudeHigh",
						"short": "Upper altitude in feet MSL",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "altitudeLow",
						"short": "Lower altitude in feet MSL",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "fir",
						"short": "Flight Information Region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hazard",
						"short": "Hazard type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issueTime",
						"short": "Issue time in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawAirSigmet",
						"short": "Raw SIGMET text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "severity",
						"short": "Severity level",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeFrom",
						"short": "Valid time from in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeTo",
						"short": "Valid time to in ISO8601 format",
						"type": "`$STRING`",
					},
				},
				"name": "air_sigmet",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "raw",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "hazard",
											"orig": "hazard",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/airsigmet",
								"parts": []any{
									"api",
									"data",
									"airsigmet",
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"date",
										"format",
										"hazard",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"airport": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"short": "City",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"short": "Country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "elev",
						"short": "Elevation in meters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "iataId",
						"short": "IATA identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icaoId",
						"short": "ICAO airport identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"short": "Latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"short": "Longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Airport name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"short": "State or province",
						"type": "`$STRING`",
					},
				},
				"name": "airport",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "ids",
											"orig": "ids",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/airport",
								"parts": []any{
									"api",
									"data",
									"airport",
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"format",
										"ids",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"cache": map[string]any{
				"fields": []any{},
				"name": "cache",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/aircraftreports.cache.csv.gz",
								"parts": []any{
									"data",
									"cache",
									"aircraftreports.cache.csv.gz",
								},
								"select": map[string]any{
									"$action": "aircraftreportscachecsvgz",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/aircraftreports.cache.xml.gz",
								"parts": []any{
									"data",
									"cache",
									"aircraftreports.cache.xml.gz",
								},
								"select": map[string]any{
									"$action": "aircraftreportscachexmlgz",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/airsigmets.cache.csv.gz",
								"parts": []any{
									"data",
									"cache",
									"airsigmets.cache.csv.gz",
								},
								"select": map[string]any{
									"$action": "airsigmetscachecsvgz",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/airsigmets.cache.xml.gz",
								"parts": []any{
									"data",
									"cache",
									"airsigmets.cache.xml.gz",
								},
								"select": map[string]any{
									"$action": "airsigmetscachexmlgz",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/gairmets.cache.xml.gz",
								"parts": []any{
									"data",
									"cache",
									"gairmets.cache.xml.gz",
								},
								"select": map[string]any{
									"$action": "gairmetscachexmlgz",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/metars.cache.csv.gz",
								"parts": []any{
									"data",
									"cache",
									"metars.cache.csv.gz",
								},
								"select": map[string]any{
									"$action": "metarscachecsvgz",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/metars.cache.xml.gz",
								"parts": []any{
									"data",
									"cache",
									"metars.cache.xml.gz",
								},
								"select": map[string]any{
									"$action": "metarscachexmlgz",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/stations.cache.json.gz",
								"parts": []any{
									"data",
									"cache",
									"stations.cache.json.gz",
								},
								"select": map[string]any{
									"$action": "stationscachejsongz",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/stations.cache.xml.gz",
								"parts": []any{
									"data",
									"cache",
									"stations.cache.xml.gz",
								},
								"select": map[string]any{
									"$action": "stationscachexmlgz",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/tafs.cache.xml.gz",
								"parts": []any{
									"data",
									"cache",
									"tafs.cache.xml.gz",
								},
								"select": map[string]any{
									"$action": "tafscachexmlgz",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"cwa": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cwsu",
						"short": "Center Weather Service Unit",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issueTime",
						"short": "Issue time in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawText",
						"short": "Raw CWA text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sequence",
						"short": "Sequence number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "seriesId",
						"short": "Series identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeFrom",
						"short": "Valid time from in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeTo",
						"short": "Valid time to in ISO8601 format",
						"type": "`$STRING`",
					},
				},
				"name": "cwa",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "raw",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/cwa",
								"parts": []any{
									"api",
									"data",
									"cwa",
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"date",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"g_airmet": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "altitudeHigh",
						"short": "Upper altitude in feet MSL",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "altitudeLow",
						"short": "Lower altitude in feet MSL",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "hazard",
						"short": "Hazard type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issueTime",
						"short": "Issue time in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "qualifier",
						"short": "Forecast qualifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "severity",
						"short": "Severity level",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeFrom",
						"short": "Valid time from in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeTo",
						"short": "Valid time to in ISO8601 format",
						"type": "`$STRING`",
					},
				},
				"name": "g_airmet",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "hazard",
											"orig": "hazard",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/gairmet",
								"parts": []any{
									"api",
									"data",
									"gairmet",
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"date",
										"format",
										"hazard",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"metar": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "altim",
						"short": "Altimeter setting in inches of mercury",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "clouds",
						"short": "Cloud layers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "dewp",
						"short": "Dewpoint in Celsius",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "elev",
						"short": "Elevation in meters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "fltCat",
						"short": "Flight category (VFR, MVFR, IFR, LIFR)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icaoId",
						"short": "ICAO station identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"short": "Latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"short": "Longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "maxT",
						"short": "Maximum temperature",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "maxT24",
						"short": "24-hour maximum temperature",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "metarType",
						"short": "METAR type (METAR or SPECI)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "minT",
						"short": "Minimum temperature",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "minT24",
						"short": "24-hour minimum temperature",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mostRecent",
						"short": "Most recent observation flag",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Station name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "obsTime",
						"short": "Observation time in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pcp24hr",
						"short": "24-hour precipitation",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "pcp3hr",
						"short": "3-hour precipitation",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "pcp6hr",
						"short": "6-hour precipitation",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "precip",
						"short": "Precipitation",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "presTend",
						"short": "Pressure tendency",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "prior",
						"short": "Prior observation indicator",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "qcField",
						"short": "Quality control field",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rawOb",
						"short": "Raw METAR observation text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawTaf",
						"short": "Raw TAF if available",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reportTime",
						"short": "Report time in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slp",
						"short": "Sea level pressure",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "snow",
						"short": "Snow depth",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "temp",
						"short": "Temperature in Celsius",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "vertVis",
						"short": "Vertical visibility",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "visib",
						"short": "Visibility",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wdir",
						"short": "Wind direction in degrees",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wgst",
						"short": "Wind gust in knots",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wspd",
						"short": "Wind speed in knots",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wxString",
						"short": "Weather phenomena string",
						"type": "`$STRING`",
					},
				},
				"name": "metar",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "raw",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "ids",
											"orig": "ids",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "taf",
											"orig": "taf",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/metar",
								"parts": []any{
									"api",
									"data",
									"metar",
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"date",
										"format",
										"ids",
										"taf",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"pirep": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "aircraftType",
						"short": "Aircraft type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "altitudeFt",
						"short": "Altitude in feet MSL",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "clouds",
						"short": "Cloud reports",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "icing",
						"short": "Icing report",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"short": "Latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"short": "Longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "obsTime",
						"short": "Observation time in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawOb",
						"short": "Raw PIREP text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reportType",
						"short": "Report type (PIREP or AIREP)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "temp",
						"short": "Temperature in Celsius",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "turbulence",
						"short": "Turbulence report",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "visibility",
						"short": "Visibility",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wdir",
						"short": "Wind direction in degrees",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wspd",
						"short": "Wind speed in knots",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wxString",
						"short": "Weather phenomena string",
						"type": "`$STRING`",
					},
				},
				"name": "pirep",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "age",
											"orig": "age",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "raw",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/pirep",
								"parts": []any{
									"api",
									"data",
									"pirep",
								},
								"select": map[string]any{
									"exist": []any{
										"age",
										"bbox",
										"date",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"station_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country",
						"short": "Country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "elev",
						"short": "Elevation in meters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "iataId",
						"short": "IATA identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icaoId",
						"short": "ICAO station identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"short": "Latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"short": "Longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Station name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "priority",
						"short": "Priority level",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "site",
						"short": "Site type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"short": "State or province",
						"type": "`$STRING`",
					},
				},
				"name": "station_info",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "ids",
											"orig": "ids",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/stationinfo",
								"parts": []any{
									"api",
									"data",
									"stationinfo",
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"format",
										"ids",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"taf": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bulletinTime",
						"short": "Bulletin time in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "elev",
						"short": "Elevation in meters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "fcsts",
						"short": "Forecast periods",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "icaoId",
						"short": "ICAO station identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issueTime",
						"short": "TAF issue time in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"short": "Latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"short": "Longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Station name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawTAF",
						"short": "Raw TAF forecast text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeFrom",
						"short": "Valid time from in ISO8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeTo",
						"short": "Valid time to in ISO8601 format",
						"type": "`$STRING`",
					},
				},
				"name": "taf",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "raw",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "ids",
											"orig": "ids",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/taf",
								"parts": []any{
									"api",
									"data",
									"taf",
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"date",
										"format",
										"ids",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"tcf": map[string]any{
				"fields": []any{},
				"name": "tcf",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "raw",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/tcf",
								"parts": []any{
									"api",
									"data",
									"tcf",
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
