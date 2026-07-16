
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://aviationweather.gov',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      air_sigmet: {
      },

      airport: {
      },

      cache: {
      },

      cwa: {
      },

      g_airmet: {
      },

      metar: {
      },

      pirep: {
      },

      station_info: {
      },

      taf: {
      },

      tcf: {
      },

    }
  }


  entity = {
    "air_sigmet": {
      "fields": [
        {
          "active": true,
          "name": "airsigmet_type",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "altitude_high",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "altitude_low",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "fir",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "hazard",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "issue_time",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "raw_air_sigmet",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "severity",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "valid_time_from",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "valid_time_to",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        }
      ],
      "name": "air_sigmet",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "hazard",
                    "orig": "hazard",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/data/airsigmet",
              "parts": [
                "api",
                "data",
                "airsigmet"
              ],
              "select": {
                "exist": [
                  "bbox",
                  "date",
                  "format",
                  "hazard"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "airport": {
      "fields": [
        {
          "active": true,
          "name": "city",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "country",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "elev",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "iata_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "icao_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "lat",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "lon",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "state",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        }
      ],
      "name": "airport",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "ids",
                    "orig": "ids",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/data/airport",
              "parts": [
                "api",
                "data",
                "airport"
              ],
              "select": {
                "exist": [
                  "bbox",
                  "format",
                  "ids"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "cache": {
      "fields": [],
      "name": "cache",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/data/cache/aircraftreports.cache.csv.gz",
              "parts": [
                "data",
                "cache",
                "aircraftreports.cache.csv.gz"
              ],
              "select": {
                "$action": "aircraftreportscachecsvgz"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/data/cache/aircraftreports.cache.xml.gz",
              "parts": [
                "data",
                "cache",
                "aircraftreports.cache.xml.gz"
              ],
              "select": {
                "$action": "aircraftreportscachexmlgz"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/data/cache/airsigmets.cache.csv.gz",
              "parts": [
                "data",
                "cache",
                "airsigmets.cache.csv.gz"
              ],
              "select": {
                "$action": "airsigmetscachecsvgz"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 2
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/data/cache/airsigmets.cache.xml.gz",
              "parts": [
                "data",
                "cache",
                "airsigmets.cache.xml.gz"
              ],
              "select": {
                "$action": "airsigmetscachexmlgz"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 3
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/data/cache/gairmets.cache.xml.gz",
              "parts": [
                "data",
                "cache",
                "gairmets.cache.xml.gz"
              ],
              "select": {
                "$action": "gairmetscachexmlgz"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 4
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/data/cache/metars.cache.csv.gz",
              "parts": [
                "data",
                "cache",
                "metars.cache.csv.gz"
              ],
              "select": {
                "$action": "metarscachecsvgz"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 5
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/data/cache/metars.cache.xml.gz",
              "parts": [
                "data",
                "cache",
                "metars.cache.xml.gz"
              ],
              "select": {
                "$action": "metarscachexmlgz"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 6
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/data/cache/stations.cache.json.gz",
              "parts": [
                "data",
                "cache",
                "stations.cache.json.gz"
              ],
              "select": {
                "$action": "stationscachejsongz"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 7
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/data/cache/stations.cache.xml.gz",
              "parts": [
                "data",
                "cache",
                "stations.cache.xml.gz"
              ],
              "select": {
                "$action": "stationscachexmlgz"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 8
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/data/cache/tafs.cache.xml.gz",
              "parts": [
                "data",
                "cache",
                "tafs.cache.xml.gz"
              ],
              "select": {
                "$action": "tafscachexmlgz"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 9
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "cwa": {
      "fields": [
        {
          "active": true,
          "name": "cwsu",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "issue_time",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "raw_text",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "sequence",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "series_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "valid_time_from",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "valid_time_to",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        }
      ],
      "name": "cwa",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/data/cwa",
              "parts": [
                "api",
                "data",
                "cwa"
              ],
              "select": {
                "exist": [
                  "bbox",
                  "date",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "g_airmet": {
      "fields": [
        {
          "active": true,
          "name": "altitude_high",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "altitude_low",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "hazard",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "issue_time",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "qualifier",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "severity",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "valid_time_from",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "valid_time_to",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        }
      ],
      "name": "g_airmet",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "hazard",
                    "orig": "hazard",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/data/gairmet",
              "parts": [
                "api",
                "data",
                "gairmet"
              ],
              "select": {
                "exist": [
                  "bbox",
                  "date",
                  "format",
                  "hazard"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "metar": {
      "fields": [
        {
          "active": true,
          "name": "altim",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "cloud",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "dewp",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "elev",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "flt_cat",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "icao_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "lat",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "lon",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 7
        },
        {
          "active": true,
          "name": "max_t",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 8
        },
        {
          "active": true,
          "name": "max_t24",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 9
        },
        {
          "active": true,
          "name": "metar_type",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "min_t",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 11
        },
        {
          "active": true,
          "name": "min_t24",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 12
        },
        {
          "active": true,
          "name": "most_recent",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 13
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 14
        },
        {
          "active": true,
          "name": "obs_time",
          "req": false,
          "type": "`$STRING`",
          "index$": 15
        },
        {
          "active": true,
          "name": "pcp24hr",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 16
        },
        {
          "active": true,
          "name": "pcp3hr",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 17
        },
        {
          "active": true,
          "name": "pcp6hr",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 18
        },
        {
          "active": true,
          "name": "precip",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 19
        },
        {
          "active": true,
          "name": "pres_tend",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 20
        },
        {
          "active": true,
          "name": "prior",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 21
        },
        {
          "active": true,
          "name": "qc_field",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 22
        },
        {
          "active": true,
          "name": "raw_ob",
          "req": false,
          "type": "`$STRING`",
          "index$": 23
        },
        {
          "active": true,
          "name": "raw_taf",
          "req": false,
          "type": "`$STRING`",
          "index$": 24
        },
        {
          "active": true,
          "name": "report_time",
          "req": false,
          "type": "`$STRING`",
          "index$": 25
        },
        {
          "active": true,
          "name": "slp",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 26
        },
        {
          "active": true,
          "name": "snow",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 27
        },
        {
          "active": true,
          "name": "temp",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 28
        },
        {
          "active": true,
          "name": "vert_vi",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 29
        },
        {
          "active": true,
          "name": "visib",
          "req": false,
          "type": "`$STRING`",
          "index$": 30
        },
        {
          "active": true,
          "name": "wdir",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 31
        },
        {
          "active": true,
          "name": "wgst",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 32
        },
        {
          "active": true,
          "name": "wspd",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 33
        },
        {
          "active": true,
          "name": "wx_string",
          "req": false,
          "type": "`$STRING`",
          "index$": 34
        }
      ],
      "name": "metar",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "ids",
                    "orig": "ids",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "taf",
                    "orig": "taf",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/data/metar",
              "parts": [
                "api",
                "data",
                "metar"
              ],
              "select": {
                "exist": [
                  "bbox",
                  "date",
                  "format",
                  "ids",
                  "taf"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "pirep": {
      "fields": [
        {
          "active": true,
          "name": "aircraft_type",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "altitude_ft",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "cloud",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 2
        },
        {
          "active": true,
          "name": "icing",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "lat",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "lon",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "obs_time",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "raw_ob",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "report_type",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "temp",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 9
        },
        {
          "active": true,
          "name": "turbulence",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "visibility",
          "req": false,
          "type": "`$STRING`",
          "index$": 11
        },
        {
          "active": true,
          "name": "wdir",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 12
        },
        {
          "active": true,
          "name": "wspd",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 13
        },
        {
          "active": true,
          "name": "wx_string",
          "req": false,
          "type": "`$STRING`",
          "index$": 14
        }
      ],
      "name": "pirep",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "age",
                    "orig": "age",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/data/pirep",
              "parts": [
                "api",
                "data",
                "pirep"
              ],
              "select": {
                "exist": [
                  "age",
                  "bbox",
                  "date",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "station_info": {
      "fields": [
        {
          "active": true,
          "name": "country",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "elev",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "iata_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "icao_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "lat",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "lon",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "priority",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 7
        },
        {
          "active": true,
          "name": "site",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "state",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        }
      ],
      "name": "station_info",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "ids",
                    "orig": "ids",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/data/stationinfo",
              "parts": [
                "api",
                "data",
                "stationinfo"
              ],
              "select": {
                "exist": [
                  "bbox",
                  "format",
                  "ids"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "taf": {
      "fields": [
        {
          "active": true,
          "name": "bulletin_time",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "elev",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "fcst",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 2
        },
        {
          "active": true,
          "name": "icao_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "issue_time",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "lat",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "lon",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "raw_taf",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "valid_time_from",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "valid_time_to",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        }
      ],
      "name": "taf",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "ids",
                    "orig": "ids",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/data/taf",
              "parts": [
                "api",
                "data",
                "taf"
              ],
              "select": {
                "exist": [
                  "bbox",
                  "date",
                  "format",
                  "ids"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "tcf": {
      "fields": [],
      "name": "tcf",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/data/tcf",
              "parts": [
                "api",
                "data",
                "tcf"
              ],
              "select": {
                "exist": [
                  "date",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

