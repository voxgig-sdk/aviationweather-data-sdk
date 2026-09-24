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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Airsigmet Type",
						"type": "`$STRING`",
						"short": "SIGMET type",
					},
					map[string]any{
						"name": "altitudeHigh",
						"title": "Altitude High",
						"type": "`$INTEGER`",
						"short": "Upper altitude in feet MSL",
					},
					map[string]any{
						"name": "altitudeLow",
						"title": "Altitude Low",
						"type": "`$INTEGER`",
						"short": "Lower altitude in feet MSL",
					},
					map[string]any{
						"name": "fir",
						"title": "Fir",
						"type": "`$STRING`",
						"short": "Flight Information Region",
					},
					map[string]any{
						"name": "hazard",
						"title": "Hazard",
						"type": "`$STRING`",
						"short": "Hazard type",
					},
					map[string]any{
						"name": "issueTime",
						"title": "Issue Time",
						"type": "`$STRING`",
						"short": "Issue time in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "rawAirSigmet",
						"title": "Raw Air Sigmet",
						"type": "`$STRING`",
						"short": "Raw SIGMET text",
					},
					map[string]any{
						"name": "severity",
						"title": "Severity",
						"type": "`$STRING`",
						"short": "Severity level",
					},
					map[string]any{
						"name": "validTimeFrom",
						"title": "Valid Time From",
						"type": "`$STRING`",
						"short": "Valid time from in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "validTimeTo",
						"title": "Valid Time To",
						"type": "`$STRING`",
						"short": "Valid time to in ISO8601 format",
						"format": "date-time",
					},
				},
				"name": "air_sigmet",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/airsigmet",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "airsigmet",
									},
								},
								"parts": []any{
									"api",
									"data",
									"airsigmet",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "raw",
										},
										map[string]any{
											"name": "hazard",
											"orig": "hazard",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"date",
										"format",
										"hazard",
									},
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
						"title": "City",
						"type": "`$STRING`",
						"short": "City",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"short": "Country code",
					},
					map[string]any{
						"name": "elev",
						"title": "Elev",
						"type": "`$NUMBER`",
						"short": "Elevation in meters",
					},
					map[string]any{
						"name": "iataId",
						"title": "Iata Id",
						"type": "`$STRING`",
						"short": "IATA identifier",
					},
					map[string]any{
						"name": "icaoId",
						"title": "Icao Id",
						"type": "`$STRING`",
						"short": "ICAO airport identifier",
					},
					map[string]any{
						"name": "lat",
						"title": "Lat",
						"type": "`$NUMBER`",
						"short": "Latitude",
					},
					map[string]any{
						"name": "lon",
						"title": "Lon",
						"type": "`$NUMBER`",
						"short": "Longitude",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Airport name",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"short": "State or province",
					},
				},
				"name": "airport",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/airport",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "airport",
									},
								},
								"parts": []any{
									"api",
									"data",
									"airport",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "json",
										},
										map[string]any{
											"name": "ids",
											"orig": "ids",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"format",
										"ids",
									},
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
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/aircraftreports.cache.csv.gz",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cache",
									},
									map[string]any{
										"lit": "aircraftreports.cache.csv.gz",
									},
								},
								"parts": []any{
									"data",
									"cache",
									"aircraftreports.cache.csv.gz",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "aircraftreportscachecsvgz",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/aircraftreports.cache.xml.gz",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cache",
									},
									map[string]any{
										"lit": "aircraftreports.cache.xml.gz",
									},
								},
								"parts": []any{
									"data",
									"cache",
									"aircraftreports.cache.xml.gz",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "aircraftreportscachexmlgz",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/airsigmets.cache.csv.gz",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cache",
									},
									map[string]any{
										"lit": "airsigmets.cache.csv.gz",
									},
								},
								"parts": []any{
									"data",
									"cache",
									"airsigmets.cache.csv.gz",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "airsigmetscachecsvgz",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/airsigmets.cache.xml.gz",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cache",
									},
									map[string]any{
										"lit": "airsigmets.cache.xml.gz",
									},
								},
								"parts": []any{
									"data",
									"cache",
									"airsigmets.cache.xml.gz",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "airsigmetscachexmlgz",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/gairmets.cache.xml.gz",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cache",
									},
									map[string]any{
										"lit": "gairmets.cache.xml.gz",
									},
								},
								"parts": []any{
									"data",
									"cache",
									"gairmets.cache.xml.gz",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "gairmetscachexmlgz",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/metars.cache.csv.gz",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cache",
									},
									map[string]any{
										"lit": "metars.cache.csv.gz",
									},
								},
								"parts": []any{
									"data",
									"cache",
									"metars.cache.csv.gz",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "metarscachecsvgz",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/metars.cache.xml.gz",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cache",
									},
									map[string]any{
										"lit": "metars.cache.xml.gz",
									},
								},
								"parts": []any{
									"data",
									"cache",
									"metars.cache.xml.gz",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "metarscachexmlgz",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/stations.cache.json.gz",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cache",
									},
									map[string]any{
										"lit": "stations.cache.json.gz",
									},
								},
								"parts": []any{
									"data",
									"cache",
									"stations.cache.json.gz",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "stationscachejsongz",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/stations.cache.xml.gz",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cache",
									},
									map[string]any{
										"lit": "stations.cache.xml.gz",
									},
								},
								"parts": []any{
									"data",
									"cache",
									"stations.cache.xml.gz",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "stationscachexmlgz",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/cache/tafs.cache.xml.gz",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cache",
									},
									map[string]any{
										"lit": "tafs.cache.xml.gz",
									},
								},
								"parts": []any{
									"data",
									"cache",
									"tafs.cache.xml.gz",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "tafscachexmlgz",
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
						"title": "Cwsu",
						"type": "`$STRING`",
						"short": "Center Weather Service Unit",
					},
					map[string]any{
						"name": "issueTime",
						"title": "Issue Time",
						"type": "`$STRING`",
						"short": "Issue time in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "rawText",
						"title": "Raw Text",
						"type": "`$STRING`",
						"short": "Raw CWA text",
					},
					map[string]any{
						"name": "sequence",
						"title": "Sequence",
						"type": "`$INTEGER`",
						"short": "Sequence number",
					},
					map[string]any{
						"name": "seriesId",
						"title": "Series Id",
						"type": "`$STRING`",
						"short": "Series identifier",
					},
					map[string]any{
						"name": "validTimeFrom",
						"title": "Valid Time From",
						"type": "`$STRING`",
						"short": "Valid time from in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "validTimeTo",
						"title": "Valid Time To",
						"type": "`$STRING`",
						"short": "Valid time to in ISO8601 format",
						"format": "date-time",
					},
				},
				"name": "cwa",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/cwa",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cwa",
									},
								},
								"parts": []any{
									"api",
									"data",
									"cwa",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "raw",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"date",
										"format",
									},
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
						"title": "Altitude High",
						"type": "`$INTEGER`",
						"short": "Upper altitude in feet MSL",
					},
					map[string]any{
						"name": "altitudeLow",
						"title": "Altitude Low",
						"type": "`$INTEGER`",
						"short": "Lower altitude in feet MSL",
					},
					map[string]any{
						"name": "hazard",
						"title": "Hazard",
						"type": "`$STRING`",
						"short": "Hazard type",
					},
					map[string]any{
						"name": "issueTime",
						"title": "Issue Time",
						"type": "`$STRING`",
						"short": "Issue time in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "qualifier",
						"title": "Qualifier",
						"type": "`$STRING`",
						"short": "Forecast qualifier",
					},
					map[string]any{
						"name": "severity",
						"title": "Severity",
						"type": "`$STRING`",
						"short": "Severity level",
					},
					map[string]any{
						"name": "validTimeFrom",
						"title": "Valid Time From",
						"type": "`$STRING`",
						"short": "Valid time from in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "validTimeTo",
						"title": "Valid Time To",
						"type": "`$STRING`",
						"short": "Valid time to in ISO8601 format",
						"format": "date-time",
					},
				},
				"name": "g_airmet",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/gairmet",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "gairmet",
									},
								},
								"parts": []any{
									"api",
									"data",
									"gairmet",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "json",
										},
										map[string]any{
											"name": "hazard",
											"orig": "hazard",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"date",
										"format",
										"hazard",
									},
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
						"title": "Altim",
						"type": "`$NUMBER`",
						"short": "Altimeter setting in inches of mercury",
					},
					map[string]any{
						"name": "clouds",
						"title": "Clouds",
						"type": "`$ARRAY`",
						"short": "Cloud layers",
					},
					map[string]any{
						"name": "dewp",
						"title": "Dewp",
						"type": "`$NUMBER`",
						"short": "Dewpoint in Celsius",
					},
					map[string]any{
						"name": "elev",
						"title": "Elev",
						"type": "`$NUMBER`",
						"short": "Elevation in meters",
					},
					map[string]any{
						"name": "fltCat",
						"title": "Flt Cat",
						"type": "`$STRING`",
						"short": "Flight category (VFR, MVFR, IFR, LIFR)",
					},
					map[string]any{
						"name": "icaoId",
						"title": "Icao Id",
						"type": "`$STRING`",
						"short": "ICAO station identifier",
					},
					map[string]any{
						"name": "lat",
						"title": "Lat",
						"type": "`$NUMBER`",
						"short": "Latitude",
					},
					map[string]any{
						"name": "lon",
						"title": "Lon",
						"type": "`$NUMBER`",
						"short": "Longitude",
					},
					map[string]any{
						"name": "maxT",
						"title": "Max T",
						"type": "`$NUMBER`",
						"short": "Maximum temperature",
					},
					map[string]any{
						"name": "maxT24",
						"title": "Max T24",
						"type": "`$NUMBER`",
						"short": "24-hour maximum temperature",
					},
					map[string]any{
						"name": "metarType",
						"title": "Metar Type",
						"type": "`$STRING`",
						"short": "METAR type (METAR or SPECI)",
					},
					map[string]any{
						"name": "minT",
						"title": "Min T",
						"type": "`$NUMBER`",
						"short": "Minimum temperature",
					},
					map[string]any{
						"name": "minT24",
						"title": "Min T24",
						"type": "`$NUMBER`",
						"short": "24-hour minimum temperature",
					},
					map[string]any{
						"name": "mostRecent",
						"title": "Most Recent",
						"type": "`$INTEGER`",
						"short": "Most recent observation flag",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Station name",
					},
					map[string]any{
						"name": "obsTime",
						"title": "Obs Time",
						"type": "`$STRING`",
						"short": "Observation time in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "pcp24hr",
						"title": "Pcp24hr",
						"type": "`$NUMBER`",
						"short": "24-hour precipitation",
					},
					map[string]any{
						"name": "pcp3hr",
						"title": "Pcp3hr",
						"type": "`$NUMBER`",
						"short": "3-hour precipitation",
					},
					map[string]any{
						"name": "pcp6hr",
						"title": "Pcp6hr",
						"type": "`$NUMBER`",
						"short": "6-hour precipitation",
					},
					map[string]any{
						"name": "precip",
						"title": "Precip",
						"type": "`$NUMBER`",
						"short": "Precipitation",
					},
					map[string]any{
						"name": "presTend",
						"title": "Pres Tend",
						"type": "`$NUMBER`",
						"short": "Pressure tendency",
					},
					map[string]any{
						"name": "prior",
						"title": "Prior",
						"type": "`$INTEGER`",
						"short": "Prior observation indicator",
					},
					map[string]any{
						"name": "qcField",
						"title": "Qc Field",
						"type": "`$INTEGER`",
						"short": "Quality control field",
					},
					map[string]any{
						"name": "rawOb",
						"title": "Raw Ob",
						"type": "`$STRING`",
						"short": "Raw METAR observation text",
					},
					map[string]any{
						"name": "rawTaf",
						"title": "Raw Taf",
						"type": "`$STRING`",
						"short": "Raw TAF if available",
					},
					map[string]any{
						"name": "reportTime",
						"title": "Report Time",
						"type": "`$STRING`",
						"short": "Report time in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "slp",
						"title": "Slp",
						"type": "`$NUMBER`",
						"short": "Sea level pressure",
					},
					map[string]any{
						"name": "snow",
						"title": "Snow",
						"type": "`$NUMBER`",
						"short": "Snow depth",
					},
					map[string]any{
						"name": "temp",
						"title": "Temp",
						"type": "`$NUMBER`",
						"short": "Temperature in Celsius",
					},
					map[string]any{
						"name": "vertVis",
						"title": "Vert Vis",
						"type": "`$INTEGER`",
						"short": "Vertical visibility",
					},
					map[string]any{
						"name": "visib",
						"title": "Visib",
						"type": "`$STRING`",
						"short": "Visibility",
					},
					map[string]any{
						"name": "wdir",
						"title": "Wdir",
						"type": "`$INTEGER`",
						"short": "Wind direction in degrees",
					},
					map[string]any{
						"name": "wgst",
						"title": "Wgst",
						"type": "`$INTEGER`",
						"short": "Wind gust in knots",
					},
					map[string]any{
						"name": "wspd",
						"title": "Wspd",
						"type": "`$INTEGER`",
						"short": "Wind speed in knots",
					},
					map[string]any{
						"name": "wxString",
						"title": "Wx String",
						"type": "`$STRING`",
						"short": "Weather phenomena string",
					},
				},
				"name": "metar",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/metar",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "metar",
									},
								},
								"parts": []any{
									"api",
									"data",
									"metar",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "raw",
										},
										map[string]any{
											"name": "ids",
											"orig": "ids",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "taf",
											"orig": "taf",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
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
						"title": "Aircraft Type",
						"type": "`$STRING`",
						"short": "Aircraft type",
					},
					map[string]any{
						"name": "altitudeFt",
						"title": "Altitude Ft",
						"type": "`$INTEGER`",
						"short": "Altitude in feet MSL",
					},
					map[string]any{
						"name": "clouds",
						"title": "Clouds",
						"type": "`$ARRAY`",
						"short": "Cloud reports",
					},
					map[string]any{
						"name": "icing",
						"title": "Icing",
						"type": "`$STRING`",
						"short": "Icing report",
					},
					map[string]any{
						"name": "lat",
						"title": "Lat",
						"type": "`$NUMBER`",
						"short": "Latitude",
					},
					map[string]any{
						"name": "lon",
						"title": "Lon",
						"type": "`$NUMBER`",
						"short": "Longitude",
					},
					map[string]any{
						"name": "obsTime",
						"title": "Obs Time",
						"type": "`$STRING`",
						"short": "Observation time in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "rawOb",
						"title": "Raw Ob",
						"type": "`$STRING`",
						"short": "Raw PIREP text",
					},
					map[string]any{
						"name": "reportType",
						"title": "Report Type",
						"type": "`$STRING`",
						"short": "Report type (PIREP or AIREP)",
					},
					map[string]any{
						"name": "temp",
						"title": "Temp",
						"type": "`$NUMBER`",
						"short": "Temperature in Celsius",
					},
					map[string]any{
						"name": "turbulence",
						"title": "Turbulence",
						"type": "`$STRING`",
						"short": "Turbulence report",
					},
					map[string]any{
						"name": "visibility",
						"title": "Visibility",
						"type": "`$STRING`",
						"short": "Visibility",
					},
					map[string]any{
						"name": "wdir",
						"title": "Wdir",
						"type": "`$INTEGER`",
						"short": "Wind direction in degrees",
					},
					map[string]any{
						"name": "wspd",
						"title": "Wspd",
						"type": "`$INTEGER`",
						"short": "Wind speed in knots",
					},
					map[string]any{
						"name": "wxString",
						"title": "Wx String",
						"type": "`$STRING`",
						"short": "Weather phenomena string",
					},
				},
				"name": "pirep",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/pirep",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "pirep",
									},
								},
								"parts": []any{
									"api",
									"data",
									"pirep",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "age",
											"orig": "age",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "raw",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"age",
										"bbox",
										"date",
										"format",
									},
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
						"title": "Country",
						"type": "`$STRING`",
						"short": "Country code",
					},
					map[string]any{
						"name": "elev",
						"title": "Elev",
						"type": "`$NUMBER`",
						"short": "Elevation in meters",
					},
					map[string]any{
						"name": "iataId",
						"title": "Iata Id",
						"type": "`$STRING`",
						"short": "IATA identifier",
					},
					map[string]any{
						"name": "icaoId",
						"title": "Icao Id",
						"type": "`$STRING`",
						"short": "ICAO station identifier",
					},
					map[string]any{
						"name": "lat",
						"title": "Lat",
						"type": "`$NUMBER`",
						"short": "Latitude",
					},
					map[string]any{
						"name": "lon",
						"title": "Lon",
						"type": "`$NUMBER`",
						"short": "Longitude",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Station name",
					},
					map[string]any{
						"name": "priority",
						"title": "Priority",
						"type": "`$INTEGER`",
						"short": "Priority level",
					},
					map[string]any{
						"name": "site",
						"title": "Site",
						"type": "`$STRING`",
						"short": "Site type",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"short": "State or province",
					},
				},
				"name": "station_info",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/stationinfo",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "stationinfo",
									},
								},
								"parts": []any{
									"api",
									"data",
									"stationinfo",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "json",
										},
										map[string]any{
											"name": "ids",
											"orig": "ids",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"format",
										"ids",
									},
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
						"title": "Bulletin Time",
						"type": "`$STRING`",
						"short": "Bulletin time in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "elev",
						"title": "Elev",
						"type": "`$NUMBER`",
						"short": "Elevation in meters",
					},
					map[string]any{
						"name": "fcsts",
						"title": "Fcsts",
						"type": "`$ARRAY`",
						"short": "Forecast periods",
					},
					map[string]any{
						"name": "icaoId",
						"title": "Icao Id",
						"type": "`$STRING`",
						"short": "ICAO station identifier",
					},
					map[string]any{
						"name": "issueTime",
						"title": "Issue Time",
						"type": "`$STRING`",
						"short": "TAF issue time in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "lat",
						"title": "Lat",
						"type": "`$NUMBER`",
						"short": "Latitude",
					},
					map[string]any{
						"name": "lon",
						"title": "Lon",
						"type": "`$NUMBER`",
						"short": "Longitude",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Station name",
					},
					map[string]any{
						"name": "rawTAF",
						"title": "Raw Taf",
						"type": "`$STRING`",
						"short": "Raw TAF forecast text",
					},
					map[string]any{
						"name": "validTimeFrom",
						"title": "Valid Time From",
						"type": "`$STRING`",
						"short": "Valid time from in ISO8601 format",
						"format": "date-time",
					},
					map[string]any{
						"name": "validTimeTo",
						"title": "Valid Time To",
						"type": "`$STRING`",
						"short": "Valid time to in ISO8601 format",
						"format": "date-time",
					},
				},
				"name": "taf",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/taf",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "taf",
									},
								},
								"parts": []any{
									"api",
									"data",
									"taf",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "raw",
										},
										map[string]any{
											"name": "ids",
											"orig": "ids",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"date",
										"format",
										"ids",
									},
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
								"kind": "http",
								"method": "GET",
								"orig": "/api/data/tcf",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "tcf",
									},
								},
								"parts": []any{
									"api",
									"data",
									"tcf",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "raw",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"format",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
