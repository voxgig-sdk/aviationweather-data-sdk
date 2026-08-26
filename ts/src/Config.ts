
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

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'AviationweatherData',
        slug: "aviationweather-data",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://aviationweather.gov",

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
          "name": "airsigmetType",
          "short": "SIGMET type",
          "type": "`$STRING`"
        },
        {
          "name": "altitudeHigh",
          "short": "Upper altitude in feet MSL",
          "type": "`$INTEGER`"
        },
        {
          "name": "altitudeLow",
          "short": "Lower altitude in feet MSL",
          "type": "`$INTEGER`"
        },
        {
          "name": "fir",
          "short": "Flight Information Region",
          "type": "`$STRING`"
        },
        {
          "name": "hazard",
          "short": "Hazard type",
          "type": "`$STRING`"
        },
        {
          "name": "issueTime",
          "short": "Issue time in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "rawAirSigmet",
          "short": "Raw SIGMET text",
          "type": "`$STRING`"
        },
        {
          "name": "severity",
          "short": "Severity level",
          "type": "`$STRING`"
        },
        {
          "name": "validTimeFrom",
          "short": "Valid time from in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "validTimeTo",
          "short": "Valid time to in ISO8601 format",
          "type": "`$STRING`"
        }
      ],
      "name": "air_sigmet",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "hazard",
                    "orig": "hazard",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "airport": {
      "fields": [
        {
          "name": "city",
          "short": "City",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "short": "Country code",
          "type": "`$STRING`"
        },
        {
          "name": "elev",
          "short": "Elevation in meters",
          "type": "`$NUMBER`"
        },
        {
          "name": "iataId",
          "short": "IATA identifier",
          "type": "`$STRING`"
        },
        {
          "name": "icaoId",
          "short": "ICAO airport identifier",
          "type": "`$STRING`"
        },
        {
          "name": "lat",
          "short": "Latitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "lon",
          "short": "Longitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "short": "Airport name",
          "type": "`$STRING`"
        },
        {
          "name": "state",
          "short": "State or province",
          "type": "`$STRING`"
        }
      ],
      "name": "airport",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "ids",
                    "orig": "ids",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
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
              "args": {},
              "kind": "http",
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
              }
            },
            {
              "args": {},
              "kind": "http",
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
              }
            },
            {
              "args": {},
              "kind": "http",
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
              }
            },
            {
              "args": {},
              "kind": "http",
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
              }
            },
            {
              "args": {},
              "kind": "http",
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
              }
            },
            {
              "args": {},
              "kind": "http",
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
              }
            },
            {
              "args": {},
              "kind": "http",
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
              }
            },
            {
              "args": {},
              "kind": "http",
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
              }
            },
            {
              "args": {},
              "kind": "http",
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
              }
            },
            {
              "args": {},
              "kind": "http",
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
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "cwa": {
      "fields": [
        {
          "name": "cwsu",
          "short": "Center Weather Service Unit",
          "type": "`$STRING`"
        },
        {
          "name": "issueTime",
          "short": "Issue time in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "rawText",
          "short": "Raw CWA text",
          "type": "`$STRING`"
        },
        {
          "name": "sequence",
          "short": "Sequence number",
          "type": "`$INTEGER`"
        },
        {
          "name": "seriesId",
          "short": "Series identifier",
          "type": "`$STRING`"
        },
        {
          "name": "validTimeFrom",
          "short": "Valid time from in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "validTimeTo",
          "short": "Valid time to in ISO8601 format",
          "type": "`$STRING`"
        }
      ],
      "name": "cwa",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "g_airmet": {
      "fields": [
        {
          "name": "altitudeHigh",
          "short": "Upper altitude in feet MSL",
          "type": "`$INTEGER`"
        },
        {
          "name": "altitudeLow",
          "short": "Lower altitude in feet MSL",
          "type": "`$INTEGER`"
        },
        {
          "name": "hazard",
          "short": "Hazard type",
          "type": "`$STRING`"
        },
        {
          "name": "issueTime",
          "short": "Issue time in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "qualifier",
          "short": "Forecast qualifier",
          "type": "`$STRING`"
        },
        {
          "name": "severity",
          "short": "Severity level",
          "type": "`$STRING`"
        },
        {
          "name": "validTimeFrom",
          "short": "Valid time from in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "validTimeTo",
          "short": "Valid time to in ISO8601 format",
          "type": "`$STRING`"
        }
      ],
      "name": "g_airmet",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "hazard",
                    "orig": "hazard",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "metar": {
      "fields": [
        {
          "name": "altim",
          "short": "Altimeter setting in inches of mercury",
          "type": "`$NUMBER`"
        },
        {
          "name": "clouds",
          "short": "Cloud layers",
          "type": "`$ARRAY`"
        },
        {
          "name": "dewp",
          "short": "Dewpoint in Celsius",
          "type": "`$NUMBER`"
        },
        {
          "name": "elev",
          "short": "Elevation in meters",
          "type": "`$NUMBER`"
        },
        {
          "name": "fltCat",
          "short": "Flight category (VFR, MVFR, IFR, LIFR)",
          "type": "`$STRING`"
        },
        {
          "name": "icaoId",
          "short": "ICAO station identifier",
          "type": "`$STRING`"
        },
        {
          "name": "lat",
          "short": "Latitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "lon",
          "short": "Longitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "maxT",
          "short": "Maximum temperature",
          "type": "`$NUMBER`"
        },
        {
          "name": "maxT24",
          "short": "24-hour maximum temperature",
          "type": "`$NUMBER`"
        },
        {
          "name": "metarType",
          "short": "METAR type (METAR or SPECI)",
          "type": "`$STRING`"
        },
        {
          "name": "minT",
          "short": "Minimum temperature",
          "type": "`$NUMBER`"
        },
        {
          "name": "minT24",
          "short": "24-hour minimum temperature",
          "type": "`$NUMBER`"
        },
        {
          "name": "mostRecent",
          "short": "Most recent observation flag",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "Station name",
          "type": "`$STRING`"
        },
        {
          "name": "obsTime",
          "short": "Observation time in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "pcp24hr",
          "short": "24-hour precipitation",
          "type": "`$NUMBER`"
        },
        {
          "name": "pcp3hr",
          "short": "3-hour precipitation",
          "type": "`$NUMBER`"
        },
        {
          "name": "pcp6hr",
          "short": "6-hour precipitation",
          "type": "`$NUMBER`"
        },
        {
          "name": "precip",
          "short": "Precipitation",
          "type": "`$NUMBER`"
        },
        {
          "name": "presTend",
          "short": "Pressure tendency",
          "type": "`$NUMBER`"
        },
        {
          "name": "prior",
          "short": "Prior observation indicator",
          "type": "`$INTEGER`"
        },
        {
          "name": "qcField",
          "short": "Quality control field",
          "type": "`$INTEGER`"
        },
        {
          "name": "rawOb",
          "short": "Raw METAR observation text",
          "type": "`$STRING`"
        },
        {
          "name": "rawTaf",
          "short": "Raw TAF if available",
          "type": "`$STRING`"
        },
        {
          "name": "reportTime",
          "short": "Report time in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "slp",
          "short": "Sea level pressure",
          "type": "`$NUMBER`"
        },
        {
          "name": "snow",
          "short": "Snow depth",
          "type": "`$NUMBER`"
        },
        {
          "name": "temp",
          "short": "Temperature in Celsius",
          "type": "`$NUMBER`"
        },
        {
          "name": "vertVis",
          "short": "Vertical visibility",
          "type": "`$INTEGER`"
        },
        {
          "name": "visib",
          "short": "Visibility",
          "type": "`$STRING`"
        },
        {
          "name": "wdir",
          "short": "Wind direction in degrees",
          "type": "`$INTEGER`"
        },
        {
          "name": "wgst",
          "short": "Wind gust in knots",
          "type": "`$INTEGER`"
        },
        {
          "name": "wspd",
          "short": "Wind speed in knots",
          "type": "`$INTEGER`"
        },
        {
          "name": "wxString",
          "short": "Weather phenomena string",
          "type": "`$STRING`"
        }
      ],
      "name": "metar",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "ids",
                    "orig": "ids",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "taf",
                    "orig": "taf",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "pirep": {
      "fields": [
        {
          "name": "aircraftType",
          "short": "Aircraft type",
          "type": "`$STRING`"
        },
        {
          "name": "altitudeFt",
          "short": "Altitude in feet MSL",
          "type": "`$INTEGER`"
        },
        {
          "name": "clouds",
          "short": "Cloud reports",
          "type": "`$ARRAY`"
        },
        {
          "name": "icing",
          "short": "Icing report",
          "type": "`$STRING`"
        },
        {
          "name": "lat",
          "short": "Latitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "lon",
          "short": "Longitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "obsTime",
          "short": "Observation time in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "rawOb",
          "short": "Raw PIREP text",
          "type": "`$STRING`"
        },
        {
          "name": "reportType",
          "short": "Report type (PIREP or AIREP)",
          "type": "`$STRING`"
        },
        {
          "name": "temp",
          "short": "Temperature in Celsius",
          "type": "`$NUMBER`"
        },
        {
          "name": "turbulence",
          "short": "Turbulence report",
          "type": "`$STRING`"
        },
        {
          "name": "visibility",
          "short": "Visibility",
          "type": "`$STRING`"
        },
        {
          "name": "wdir",
          "short": "Wind direction in degrees",
          "type": "`$INTEGER`"
        },
        {
          "name": "wspd",
          "short": "Wind speed in knots",
          "type": "`$INTEGER`"
        },
        {
          "name": "wxString",
          "short": "Weather phenomena string",
          "type": "`$STRING`"
        }
      ],
      "name": "pirep",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "age",
                    "orig": "age",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "station_info": {
      "fields": [
        {
          "name": "country",
          "short": "Country code",
          "type": "`$STRING`"
        },
        {
          "name": "elev",
          "short": "Elevation in meters",
          "type": "`$NUMBER`"
        },
        {
          "name": "iataId",
          "short": "IATA identifier",
          "type": "`$STRING`"
        },
        {
          "name": "icaoId",
          "short": "ICAO station identifier",
          "type": "`$STRING`"
        },
        {
          "name": "lat",
          "short": "Latitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "lon",
          "short": "Longitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "short": "Station name",
          "type": "`$STRING`"
        },
        {
          "name": "priority",
          "short": "Priority level",
          "type": "`$INTEGER`"
        },
        {
          "name": "site",
          "short": "Site type",
          "type": "`$STRING`"
        },
        {
          "name": "state",
          "short": "State or province",
          "type": "`$STRING`"
        }
      ],
      "name": "station_info",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "ids",
                    "orig": "ids",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "taf": {
      "fields": [
        {
          "name": "bulletinTime",
          "short": "Bulletin time in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "elev",
          "short": "Elevation in meters",
          "type": "`$NUMBER`"
        },
        {
          "name": "fcsts",
          "short": "Forecast periods",
          "type": "`$ARRAY`"
        },
        {
          "name": "icaoId",
          "short": "ICAO station identifier",
          "type": "`$STRING`"
        },
        {
          "name": "issueTime",
          "short": "TAF issue time in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "lat",
          "short": "Latitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "lon",
          "short": "Longitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "short": "Station name",
          "type": "`$STRING`"
        },
        {
          "name": "rawTAF",
          "short": "Raw TAF forecast text",
          "type": "`$STRING`"
        },
        {
          "name": "validTimeFrom",
          "short": "Valid time from in ISO8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "validTimeTo",
          "short": "Valid time to in ISO8601 format",
          "type": "`$STRING`"
        }
      ],
      "name": "taf",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "ids",
                    "orig": "ids",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
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
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "raw",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
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

