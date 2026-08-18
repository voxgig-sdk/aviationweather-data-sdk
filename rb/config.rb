# AviationweatherData SDK configuration

module AviationweatherDataConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "AviationweatherData",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://aviationweather.gov",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "air_sigmet" => {},
          "airport" => {},
          "cache" => {},
          "cwa" => {},
          "g_airmet" => {},
          "metar" => {},
          "pirep" => {},
          "station_info" => {},
          "taf" => {},
          "tcf" => {},
        },
      },
      "entity" => {
        "air_sigmet" => {
          "fields" => [
            {
              "name" => "airsigmetType",
              "type" => "`$STRING`",
            },
            {
              "name" => "altitudeHigh",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "altitudeLow",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "fir",
              "type" => "`$STRING`",
            },
            {
              "name" => "hazard",
              "type" => "`$STRING`",
            },
            {
              "name" => "issueTime",
              "type" => "`$STRING`",
            },
            {
              "name" => "rawAirSigmet",
              "type" => "`$STRING`",
            },
            {
              "name" => "severity",
              "type" => "`$STRING`",
            },
            {
              "name" => "validTimeFrom",
              "type" => "`$STRING`",
            },
            {
              "name" => "validTimeTo",
              "type" => "`$STRING`",
            },
          ],
          "name" => "air_sigmet",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "bbox",
                        "orig" => "bbox",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "raw",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "hazard",
                        "orig" => "hazard",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/data/airsigmet",
                  "parts" => [
                    "api",
                    "data",
                    "airsigmet",
                  ],
                  "select" => {
                    "exist" => [
                      "bbox",
                      "date",
                      "format",
                      "hazard",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "airport" => {
          "fields" => [
            {
              "name" => "city",
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "type" => "`$STRING`",
            },
            {
              "name" => "elev",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "iataId",
              "type" => "`$STRING`",
            },
            {
              "name" => "icaoId",
              "type" => "`$STRING`",
            },
            {
              "name" => "lat",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "lon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "state",
              "type" => "`$STRING`",
            },
          ],
          "name" => "airport",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "bbox",
                        "orig" => "bbox",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "json",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "ids",
                        "orig" => "ids",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/data/airport",
                  "parts" => [
                    "api",
                    "data",
                    "airport",
                  ],
                  "select" => {
                    "exist" => [
                      "bbox",
                      "format",
                      "ids",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "cache" => {
          "fields" => [],
          "name" => "cache",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cache/aircraftreports.cache.csv.gz",
                  "parts" => [
                    "data",
                    "cache",
                    "aircraftreports.cache.csv.gz",
                  ],
                  "select" => {
                    "$action" => "aircraftreportscachecsvgz",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cache/aircraftreports.cache.xml.gz",
                  "parts" => [
                    "data",
                    "cache",
                    "aircraftreports.cache.xml.gz",
                  ],
                  "select" => {
                    "$action" => "aircraftreportscachexmlgz",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cache/airsigmets.cache.csv.gz",
                  "parts" => [
                    "data",
                    "cache",
                    "airsigmets.cache.csv.gz",
                  ],
                  "select" => {
                    "$action" => "airsigmetscachecsvgz",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cache/airsigmets.cache.xml.gz",
                  "parts" => [
                    "data",
                    "cache",
                    "airsigmets.cache.xml.gz",
                  ],
                  "select" => {
                    "$action" => "airsigmetscachexmlgz",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cache/gairmets.cache.xml.gz",
                  "parts" => [
                    "data",
                    "cache",
                    "gairmets.cache.xml.gz",
                  ],
                  "select" => {
                    "$action" => "gairmetscachexmlgz",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cache/metars.cache.csv.gz",
                  "parts" => [
                    "data",
                    "cache",
                    "metars.cache.csv.gz",
                  ],
                  "select" => {
                    "$action" => "metarscachecsvgz",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cache/metars.cache.xml.gz",
                  "parts" => [
                    "data",
                    "cache",
                    "metars.cache.xml.gz",
                  ],
                  "select" => {
                    "$action" => "metarscachexmlgz",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cache/stations.cache.json.gz",
                  "parts" => [
                    "data",
                    "cache",
                    "stations.cache.json.gz",
                  ],
                  "select" => {
                    "$action" => "stationscachejsongz",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cache/stations.cache.xml.gz",
                  "parts" => [
                    "data",
                    "cache",
                    "stations.cache.xml.gz",
                  ],
                  "select" => {
                    "$action" => "stationscachexmlgz",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cache/tafs.cache.xml.gz",
                  "parts" => [
                    "data",
                    "cache",
                    "tafs.cache.xml.gz",
                  ],
                  "select" => {
                    "$action" => "tafscachexmlgz",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "cwa" => {
          "fields" => [
            {
              "name" => "cwsu",
              "type" => "`$STRING`",
            },
            {
              "name" => "issueTime",
              "type" => "`$STRING`",
            },
            {
              "name" => "rawText",
              "type" => "`$STRING`",
            },
            {
              "name" => "sequence",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "seriesId",
              "type" => "`$STRING`",
            },
            {
              "name" => "validTimeFrom",
              "type" => "`$STRING`",
            },
            {
              "name" => "validTimeTo",
              "type" => "`$STRING`",
            },
          ],
          "name" => "cwa",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "bbox",
                        "orig" => "bbox",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "raw",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/data/cwa",
                  "parts" => [
                    "api",
                    "data",
                    "cwa",
                  ],
                  "select" => {
                    "exist" => [
                      "bbox",
                      "date",
                      "format",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "g_airmet" => {
          "fields" => [
            {
              "name" => "altitudeHigh",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "altitudeLow",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "hazard",
              "type" => "`$STRING`",
            },
            {
              "name" => "issueTime",
              "type" => "`$STRING`",
            },
            {
              "name" => "qualifier",
              "type" => "`$STRING`",
            },
            {
              "name" => "severity",
              "type" => "`$STRING`",
            },
            {
              "name" => "validTimeFrom",
              "type" => "`$STRING`",
            },
            {
              "name" => "validTimeTo",
              "type" => "`$STRING`",
            },
          ],
          "name" => "g_airmet",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "bbox",
                        "orig" => "bbox",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "json",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "hazard",
                        "orig" => "hazard",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/data/gairmet",
                  "parts" => [
                    "api",
                    "data",
                    "gairmet",
                  ],
                  "select" => {
                    "exist" => [
                      "bbox",
                      "date",
                      "format",
                      "hazard",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "metar" => {
          "fields" => [
            {
              "name" => "altim",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "clouds",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "dewp",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "elev",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "fltCat",
              "type" => "`$STRING`",
            },
            {
              "name" => "icaoId",
              "type" => "`$STRING`",
            },
            {
              "name" => "lat",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "lon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "maxT",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "maxT24",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "metarType",
              "type" => "`$STRING`",
            },
            {
              "name" => "minT",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "minT24",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "mostRecent",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "obsTime",
              "type" => "`$STRING`",
            },
            {
              "name" => "pcp24hr",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "pcp3hr",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "pcp6hr",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "precip",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "presTend",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "prior",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "qcField",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "rawOb",
              "type" => "`$STRING`",
            },
            {
              "name" => "rawTaf",
              "type" => "`$STRING`",
            },
            {
              "name" => "reportTime",
              "type" => "`$STRING`",
            },
            {
              "name" => "slp",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "snow",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "temp",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "vertVis",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "visib",
              "type" => "`$STRING`",
            },
            {
              "name" => "wdir",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "wgst",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "wspd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "wxString",
              "type" => "`$STRING`",
            },
          ],
          "name" => "metar",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "bbox",
                        "orig" => "bbox",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "raw",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "ids",
                        "orig" => "ids",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "taf",
                        "orig" => "taf",
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/data/metar",
                  "parts" => [
                    "api",
                    "data",
                    "metar",
                  ],
                  "select" => {
                    "exist" => [
                      "bbox",
                      "date",
                      "format",
                      "ids",
                      "taf",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "pirep" => {
          "fields" => [
            {
              "name" => "aircraftType",
              "type" => "`$STRING`",
            },
            {
              "name" => "altitudeFt",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "clouds",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "icing",
              "type" => "`$STRING`",
            },
            {
              "name" => "lat",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "lon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "obsTime",
              "type" => "`$STRING`",
            },
            {
              "name" => "rawOb",
              "type" => "`$STRING`",
            },
            {
              "name" => "reportType",
              "type" => "`$STRING`",
            },
            {
              "name" => "temp",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "turbulence",
              "type" => "`$STRING`",
            },
            {
              "name" => "visibility",
              "type" => "`$STRING`",
            },
            {
              "name" => "wdir",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "wspd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "wxString",
              "type" => "`$STRING`",
            },
          ],
          "name" => "pirep",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "age",
                        "orig" => "age",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "bbox",
                        "orig" => "bbox",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "raw",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/data/pirep",
                  "parts" => [
                    "api",
                    "data",
                    "pirep",
                  ],
                  "select" => {
                    "exist" => [
                      "age",
                      "bbox",
                      "date",
                      "format",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "station_info" => {
          "fields" => [
            {
              "name" => "country",
              "type" => "`$STRING`",
            },
            {
              "name" => "elev",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "iataId",
              "type" => "`$STRING`",
            },
            {
              "name" => "icaoId",
              "type" => "`$STRING`",
            },
            {
              "name" => "lat",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "lon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "priority",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "site",
              "type" => "`$STRING`",
            },
            {
              "name" => "state",
              "type" => "`$STRING`",
            },
          ],
          "name" => "station_info",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "bbox",
                        "orig" => "bbox",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "json",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "ids",
                        "orig" => "ids",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/data/stationinfo",
                  "parts" => [
                    "api",
                    "data",
                    "stationinfo",
                  ],
                  "select" => {
                    "exist" => [
                      "bbox",
                      "format",
                      "ids",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "taf" => {
          "fields" => [
            {
              "name" => "bulletinTime",
              "type" => "`$STRING`",
            },
            {
              "name" => "elev",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "fcsts",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "icaoId",
              "type" => "`$STRING`",
            },
            {
              "name" => "issueTime",
              "type" => "`$STRING`",
            },
            {
              "name" => "lat",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "lon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "rawTAF",
              "type" => "`$STRING`",
            },
            {
              "name" => "validTimeFrom",
              "type" => "`$STRING`",
            },
            {
              "name" => "validTimeTo",
              "type" => "`$STRING`",
            },
          ],
          "name" => "taf",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "bbox",
                        "orig" => "bbox",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "raw",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "ids",
                        "orig" => "ids",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/data/taf",
                  "parts" => [
                    "api",
                    "data",
                    "taf",
                  ],
                  "select" => {
                    "exist" => [
                      "bbox",
                      "date",
                      "format",
                      "ids",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "tcf" => {
          "fields" => [],
          "name" => "tcf",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "raw",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/data/tcf",
                  "parts" => [
                    "api",
                    "data",
                    "tcf",
                  ],
                  "select" => {
                    "exist" => [
                      "date",
                      "format",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AviationweatherDataFeatures.make_feature(name)
  end
end
