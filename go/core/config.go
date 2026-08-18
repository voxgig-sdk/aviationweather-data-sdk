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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "altitudeHigh",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "altitudeLow",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "fir",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hazard",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issueTime",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawAirSigmet",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "severity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeFrom",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeTo",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "elev",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "iataId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icaoId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issueTime",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawText",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sequence",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "seriesId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeFrom",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeTo",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "altitudeLow",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "hazard",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issueTime",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "qualifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "severity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeFrom",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeTo",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "clouds",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "dewp",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "elev",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "fltCat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icaoId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "maxT",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "maxT24",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "metarType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "minT",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "minT24",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mostRecent",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "obsTime",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pcp24hr",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "pcp3hr",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "pcp6hr",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "precip",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "presTend",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "prior",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "qcField",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rawOb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawTaf",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reportTime",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slp",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "snow",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "temp",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "vertVis",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "visib",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wdir",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wgst",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wspd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wxString",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "altitudeFt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "clouds",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "icing",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "obsTime",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawOb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reportType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "temp",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "turbulence",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "visibility",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wdir",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wspd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wxString",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "elev",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "iataId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icaoId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "priority",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "site",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "elev",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "fcsts",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "icaoId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issueTime",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawTAF",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeFrom",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validTimeTo",
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
