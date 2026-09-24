-- AviationweatherData SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "AviationweatherData",
      slug = "aviationweather-data",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://aviationweather.gov",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["air_sigmet"] = {},
        ["airport"] = {},
        ["cache"] = {},
        ["cwa"] = {},
        ["g_airmet"] = {},
        ["metar"] = {},
        ["pirep"] = {},
        ["station_info"] = {},
        ["taf"] = {},
        ["tcf"] = {},
      },
    },
    entity = {
      ["air_sigmet"] = {
        ["fields"] = {
          {
            ["name"] = "airsigmetType",
            ["title"] = "Airsigmet Type",
            ["type"] = "`$STRING`",
            ["short"] = "SIGMET type",
          },
          {
            ["name"] = "altitudeHigh",
            ["title"] = "Altitude High",
            ["type"] = "`$INTEGER`",
            ["short"] = "Upper altitude in feet MSL",
          },
          {
            ["name"] = "altitudeLow",
            ["title"] = "Altitude Low",
            ["type"] = "`$INTEGER`",
            ["short"] = "Lower altitude in feet MSL",
          },
          {
            ["name"] = "fir",
            ["title"] = "Fir",
            ["type"] = "`$STRING`",
            ["short"] = "Flight Information Region",
          },
          {
            ["name"] = "hazard",
            ["title"] = "Hazard",
            ["type"] = "`$STRING`",
            ["short"] = "Hazard type",
          },
          {
            ["name"] = "issueTime",
            ["title"] = "Issue Time",
            ["type"] = "`$STRING`",
            ["short"] = "Issue time in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "rawAirSigmet",
            ["title"] = "Raw Air Sigmet",
            ["type"] = "`$STRING`",
            ["short"] = "Raw SIGMET text",
          },
          {
            ["name"] = "severity",
            ["title"] = "Severity",
            ["type"] = "`$STRING`",
            ["short"] = "Severity level",
          },
          {
            ["name"] = "validTimeFrom",
            ["title"] = "Valid Time From",
            ["type"] = "`$STRING`",
            ["short"] = "Valid time from in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "validTimeTo",
            ["title"] = "Valid Time To",
            ["type"] = "`$STRING`",
            ["short"] = "Valid time to in ISO8601 format",
            ["format"] = "date-time",
          },
        },
        ["name"] = "air_sigmet",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/data/airsigmet",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "airsigmet",
                  },
                },
                ["parts"] = {
                  "api",
                  "data",
                  "airsigmet",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "bbox",
                      ["orig"] = "bbox",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "raw",
                    },
                    {
                      ["name"] = "hazard",
                      ["orig"] = "hazard",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["airport"] = {
        ["fields"] = {
          {
            ["name"] = "city",
            ["title"] = "City",
            ["type"] = "`$STRING`",
            ["short"] = "City",
          },
          {
            ["name"] = "country",
            ["title"] = "Country",
            ["type"] = "`$STRING`",
            ["short"] = "Country code",
          },
          {
            ["name"] = "elev",
            ["title"] = "Elev",
            ["type"] = "`$NUMBER`",
            ["short"] = "Elevation in meters",
          },
          {
            ["name"] = "iataId",
            ["title"] = "Iata Id",
            ["type"] = "`$STRING`",
            ["short"] = "IATA identifier",
          },
          {
            ["name"] = "icaoId",
            ["title"] = "Icao Id",
            ["type"] = "`$STRING`",
            ["short"] = "ICAO airport identifier",
          },
          {
            ["name"] = "lat",
            ["title"] = "Lat",
            ["type"] = "`$NUMBER`",
            ["short"] = "Latitude",
          },
          {
            ["name"] = "lon",
            ["title"] = "Lon",
            ["type"] = "`$NUMBER`",
            ["short"] = "Longitude",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Airport name",
          },
          {
            ["name"] = "state",
            ["title"] = "State",
            ["type"] = "`$STRING`",
            ["short"] = "State or province",
          },
        },
        ["name"] = "airport",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/data/airport",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "airport",
                  },
                },
                ["parts"] = {
                  "api",
                  "data",
                  "airport",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "bbox",
                      ["orig"] = "bbox",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "json",
                    },
                    {
                      ["name"] = "ids",
                      ["orig"] = "ids",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "bbox",
                    "format",
                    "ids",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["cache"] = {
        ["fields"] = {},
        ["name"] = "cache",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/cache/aircraftreports.cache.csv.gz",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "cache",
                  },
                  {
                    ["lit"] = "aircraftreports.cache.csv.gz",
                  },
                },
                ["parts"] = {
                  "data",
                  "cache",
                  "aircraftreports.cache.csv.gz",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {
                  ["$action"] = "aircraftreportscachecsvgz",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/cache/aircraftreports.cache.xml.gz",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "cache",
                  },
                  {
                    ["lit"] = "aircraftreports.cache.xml.gz",
                  },
                },
                ["parts"] = {
                  "data",
                  "cache",
                  "aircraftreports.cache.xml.gz",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {
                  ["$action"] = "aircraftreportscachexmlgz",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/cache/airsigmets.cache.csv.gz",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "cache",
                  },
                  {
                    ["lit"] = "airsigmets.cache.csv.gz",
                  },
                },
                ["parts"] = {
                  "data",
                  "cache",
                  "airsigmets.cache.csv.gz",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {
                  ["$action"] = "airsigmetscachecsvgz",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/cache/airsigmets.cache.xml.gz",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "cache",
                  },
                  {
                    ["lit"] = "airsigmets.cache.xml.gz",
                  },
                },
                ["parts"] = {
                  "data",
                  "cache",
                  "airsigmets.cache.xml.gz",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {
                  ["$action"] = "airsigmetscachexmlgz",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/cache/gairmets.cache.xml.gz",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "cache",
                  },
                  {
                    ["lit"] = "gairmets.cache.xml.gz",
                  },
                },
                ["parts"] = {
                  "data",
                  "cache",
                  "gairmets.cache.xml.gz",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {
                  ["$action"] = "gairmetscachexmlgz",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/cache/metars.cache.csv.gz",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "cache",
                  },
                  {
                    ["lit"] = "metars.cache.csv.gz",
                  },
                },
                ["parts"] = {
                  "data",
                  "cache",
                  "metars.cache.csv.gz",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {
                  ["$action"] = "metarscachecsvgz",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/cache/metars.cache.xml.gz",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "cache",
                  },
                  {
                    ["lit"] = "metars.cache.xml.gz",
                  },
                },
                ["parts"] = {
                  "data",
                  "cache",
                  "metars.cache.xml.gz",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {
                  ["$action"] = "metarscachexmlgz",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/cache/stations.cache.json.gz",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "cache",
                  },
                  {
                    ["lit"] = "stations.cache.json.gz",
                  },
                },
                ["parts"] = {
                  "data",
                  "cache",
                  "stations.cache.json.gz",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {
                  ["$action"] = "stationscachejsongz",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/cache/stations.cache.xml.gz",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "cache",
                  },
                  {
                    ["lit"] = "stations.cache.xml.gz",
                  },
                },
                ["parts"] = {
                  "data",
                  "cache",
                  "stations.cache.xml.gz",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {
                  ["$action"] = "stationscachexmlgz",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/cache/tafs.cache.xml.gz",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "cache",
                  },
                  {
                    ["lit"] = "tafs.cache.xml.gz",
                  },
                },
                ["parts"] = {
                  "data",
                  "cache",
                  "tafs.cache.xml.gz",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {
                  ["$action"] = "tafscachexmlgz",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["cwa"] = {
        ["fields"] = {
          {
            ["name"] = "cwsu",
            ["title"] = "Cwsu",
            ["type"] = "`$STRING`",
            ["short"] = "Center Weather Service Unit",
          },
          {
            ["name"] = "issueTime",
            ["title"] = "Issue Time",
            ["type"] = "`$STRING`",
            ["short"] = "Issue time in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "rawText",
            ["title"] = "Raw Text",
            ["type"] = "`$STRING`",
            ["short"] = "Raw CWA text",
          },
          {
            ["name"] = "sequence",
            ["title"] = "Sequence",
            ["type"] = "`$INTEGER`",
            ["short"] = "Sequence number",
          },
          {
            ["name"] = "seriesId",
            ["title"] = "Series Id",
            ["type"] = "`$STRING`",
            ["short"] = "Series identifier",
          },
          {
            ["name"] = "validTimeFrom",
            ["title"] = "Valid Time From",
            ["type"] = "`$STRING`",
            ["short"] = "Valid time from in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "validTimeTo",
            ["title"] = "Valid Time To",
            ["type"] = "`$STRING`",
            ["short"] = "Valid time to in ISO8601 format",
            ["format"] = "date-time",
          },
        },
        ["name"] = "cwa",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/data/cwa",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "cwa",
                  },
                },
                ["parts"] = {
                  "api",
                  "data",
                  "cwa",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "bbox",
                      ["orig"] = "bbox",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "raw",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "bbox",
                    "date",
                    "format",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["g_airmet"] = {
        ["fields"] = {
          {
            ["name"] = "altitudeHigh",
            ["title"] = "Altitude High",
            ["type"] = "`$INTEGER`",
            ["short"] = "Upper altitude in feet MSL",
          },
          {
            ["name"] = "altitudeLow",
            ["title"] = "Altitude Low",
            ["type"] = "`$INTEGER`",
            ["short"] = "Lower altitude in feet MSL",
          },
          {
            ["name"] = "hazard",
            ["title"] = "Hazard",
            ["type"] = "`$STRING`",
            ["short"] = "Hazard type",
          },
          {
            ["name"] = "issueTime",
            ["title"] = "Issue Time",
            ["type"] = "`$STRING`",
            ["short"] = "Issue time in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "qualifier",
            ["title"] = "Qualifier",
            ["type"] = "`$STRING`",
            ["short"] = "Forecast qualifier",
          },
          {
            ["name"] = "severity",
            ["title"] = "Severity",
            ["type"] = "`$STRING`",
            ["short"] = "Severity level",
          },
          {
            ["name"] = "validTimeFrom",
            ["title"] = "Valid Time From",
            ["type"] = "`$STRING`",
            ["short"] = "Valid time from in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "validTimeTo",
            ["title"] = "Valid Time To",
            ["type"] = "`$STRING`",
            ["short"] = "Valid time to in ISO8601 format",
            ["format"] = "date-time",
          },
        },
        ["name"] = "g_airmet",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/data/gairmet",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "gairmet",
                  },
                },
                ["parts"] = {
                  "api",
                  "data",
                  "gairmet",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "bbox",
                      ["orig"] = "bbox",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "json",
                    },
                    {
                      ["name"] = "hazard",
                      ["orig"] = "hazard",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["metar"] = {
        ["fields"] = {
          {
            ["name"] = "altim",
            ["title"] = "Altim",
            ["type"] = "`$NUMBER`",
            ["short"] = "Altimeter setting in inches of mercury",
          },
          {
            ["name"] = "clouds",
            ["title"] = "Clouds",
            ["type"] = "`$ARRAY`",
            ["short"] = "Cloud layers",
          },
          {
            ["name"] = "dewp",
            ["title"] = "Dewp",
            ["type"] = "`$NUMBER`",
            ["short"] = "Dewpoint in Celsius",
          },
          {
            ["name"] = "elev",
            ["title"] = "Elev",
            ["type"] = "`$NUMBER`",
            ["short"] = "Elevation in meters",
          },
          {
            ["name"] = "fltCat",
            ["title"] = "Flt Cat",
            ["type"] = "`$STRING`",
            ["short"] = "Flight category (VFR, MVFR, IFR, LIFR)",
          },
          {
            ["name"] = "icaoId",
            ["title"] = "Icao Id",
            ["type"] = "`$STRING`",
            ["short"] = "ICAO station identifier",
          },
          {
            ["name"] = "lat",
            ["title"] = "Lat",
            ["type"] = "`$NUMBER`",
            ["short"] = "Latitude",
          },
          {
            ["name"] = "lon",
            ["title"] = "Lon",
            ["type"] = "`$NUMBER`",
            ["short"] = "Longitude",
          },
          {
            ["name"] = "maxT",
            ["title"] = "Max T",
            ["type"] = "`$NUMBER`",
            ["short"] = "Maximum temperature",
          },
          {
            ["name"] = "maxT24",
            ["title"] = "Max T24",
            ["type"] = "`$NUMBER`",
            ["short"] = "24-hour maximum temperature",
          },
          {
            ["name"] = "metarType",
            ["title"] = "Metar Type",
            ["type"] = "`$STRING`",
            ["short"] = "METAR type (METAR or SPECI)",
          },
          {
            ["name"] = "minT",
            ["title"] = "Min T",
            ["type"] = "`$NUMBER`",
            ["short"] = "Minimum temperature",
          },
          {
            ["name"] = "minT24",
            ["title"] = "Min T24",
            ["type"] = "`$NUMBER`",
            ["short"] = "24-hour minimum temperature",
          },
          {
            ["name"] = "mostRecent",
            ["title"] = "Most Recent",
            ["type"] = "`$INTEGER`",
            ["short"] = "Most recent observation flag",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Station name",
          },
          {
            ["name"] = "obsTime",
            ["title"] = "Obs Time",
            ["type"] = "`$STRING`",
            ["short"] = "Observation time in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "pcp24hr",
            ["title"] = "Pcp24hr",
            ["type"] = "`$NUMBER`",
            ["short"] = "24-hour precipitation",
          },
          {
            ["name"] = "pcp3hr",
            ["title"] = "Pcp3hr",
            ["type"] = "`$NUMBER`",
            ["short"] = "3-hour precipitation",
          },
          {
            ["name"] = "pcp6hr",
            ["title"] = "Pcp6hr",
            ["type"] = "`$NUMBER`",
            ["short"] = "6-hour precipitation",
          },
          {
            ["name"] = "precip",
            ["title"] = "Precip",
            ["type"] = "`$NUMBER`",
            ["short"] = "Precipitation",
          },
          {
            ["name"] = "presTend",
            ["title"] = "Pres Tend",
            ["type"] = "`$NUMBER`",
            ["short"] = "Pressure tendency",
          },
          {
            ["name"] = "prior",
            ["title"] = "Prior",
            ["type"] = "`$INTEGER`",
            ["short"] = "Prior observation indicator",
          },
          {
            ["name"] = "qcField",
            ["title"] = "Qc Field",
            ["type"] = "`$INTEGER`",
            ["short"] = "Quality control field",
          },
          {
            ["name"] = "rawOb",
            ["title"] = "Raw Ob",
            ["type"] = "`$STRING`",
            ["short"] = "Raw METAR observation text",
          },
          {
            ["name"] = "rawTaf",
            ["title"] = "Raw Taf",
            ["type"] = "`$STRING`",
            ["short"] = "Raw TAF if available",
          },
          {
            ["name"] = "reportTime",
            ["title"] = "Report Time",
            ["type"] = "`$STRING`",
            ["short"] = "Report time in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "slp",
            ["title"] = "Slp",
            ["type"] = "`$NUMBER`",
            ["short"] = "Sea level pressure",
          },
          {
            ["name"] = "snow",
            ["title"] = "Snow",
            ["type"] = "`$NUMBER`",
            ["short"] = "Snow depth",
          },
          {
            ["name"] = "temp",
            ["title"] = "Temp",
            ["type"] = "`$NUMBER`",
            ["short"] = "Temperature in Celsius",
          },
          {
            ["name"] = "vertVis",
            ["title"] = "Vert Vis",
            ["type"] = "`$INTEGER`",
            ["short"] = "Vertical visibility",
          },
          {
            ["name"] = "visib",
            ["title"] = "Visib",
            ["type"] = "`$STRING`",
            ["short"] = "Visibility",
          },
          {
            ["name"] = "wdir",
            ["title"] = "Wdir",
            ["type"] = "`$INTEGER`",
            ["short"] = "Wind direction in degrees",
          },
          {
            ["name"] = "wgst",
            ["title"] = "Wgst",
            ["type"] = "`$INTEGER`",
            ["short"] = "Wind gust in knots",
          },
          {
            ["name"] = "wspd",
            ["title"] = "Wspd",
            ["type"] = "`$INTEGER`",
            ["short"] = "Wind speed in knots",
          },
          {
            ["name"] = "wxString",
            ["title"] = "Wx String",
            ["type"] = "`$STRING`",
            ["short"] = "Weather phenomena string",
          },
        },
        ["name"] = "metar",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/data/metar",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "metar",
                  },
                },
                ["parts"] = {
                  "api",
                  "data",
                  "metar",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "bbox",
                      ["orig"] = "bbox",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "raw",
                    },
                    {
                      ["name"] = "ids",
                      ["orig"] = "ids",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "taf",
                      ["orig"] = "taf",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["pirep"] = {
        ["fields"] = {
          {
            ["name"] = "aircraftType",
            ["title"] = "Aircraft Type",
            ["type"] = "`$STRING`",
            ["short"] = "Aircraft type",
          },
          {
            ["name"] = "altitudeFt",
            ["title"] = "Altitude Ft",
            ["type"] = "`$INTEGER`",
            ["short"] = "Altitude in feet MSL",
          },
          {
            ["name"] = "clouds",
            ["title"] = "Clouds",
            ["type"] = "`$ARRAY`",
            ["short"] = "Cloud reports",
          },
          {
            ["name"] = "icing",
            ["title"] = "Icing",
            ["type"] = "`$STRING`",
            ["short"] = "Icing report",
          },
          {
            ["name"] = "lat",
            ["title"] = "Lat",
            ["type"] = "`$NUMBER`",
            ["short"] = "Latitude",
          },
          {
            ["name"] = "lon",
            ["title"] = "Lon",
            ["type"] = "`$NUMBER`",
            ["short"] = "Longitude",
          },
          {
            ["name"] = "obsTime",
            ["title"] = "Obs Time",
            ["type"] = "`$STRING`",
            ["short"] = "Observation time in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "rawOb",
            ["title"] = "Raw Ob",
            ["type"] = "`$STRING`",
            ["short"] = "Raw PIREP text",
          },
          {
            ["name"] = "reportType",
            ["title"] = "Report Type",
            ["type"] = "`$STRING`",
            ["short"] = "Report type (PIREP or AIREP)",
          },
          {
            ["name"] = "temp",
            ["title"] = "Temp",
            ["type"] = "`$NUMBER`",
            ["short"] = "Temperature in Celsius",
          },
          {
            ["name"] = "turbulence",
            ["title"] = "Turbulence",
            ["type"] = "`$STRING`",
            ["short"] = "Turbulence report",
          },
          {
            ["name"] = "visibility",
            ["title"] = "Visibility",
            ["type"] = "`$STRING`",
            ["short"] = "Visibility",
          },
          {
            ["name"] = "wdir",
            ["title"] = "Wdir",
            ["type"] = "`$INTEGER`",
            ["short"] = "Wind direction in degrees",
          },
          {
            ["name"] = "wspd",
            ["title"] = "Wspd",
            ["type"] = "`$INTEGER`",
            ["short"] = "Wind speed in knots",
          },
          {
            ["name"] = "wxString",
            ["title"] = "Wx String",
            ["type"] = "`$STRING`",
            ["short"] = "Weather phenomena string",
          },
        },
        ["name"] = "pirep",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/data/pirep",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "pirep",
                  },
                },
                ["parts"] = {
                  "api",
                  "data",
                  "pirep",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "age",
                      ["orig"] = "age",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "bbox",
                      ["orig"] = "bbox",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "raw",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["station_info"] = {
        ["fields"] = {
          {
            ["name"] = "country",
            ["title"] = "Country",
            ["type"] = "`$STRING`",
            ["short"] = "Country code",
          },
          {
            ["name"] = "elev",
            ["title"] = "Elev",
            ["type"] = "`$NUMBER`",
            ["short"] = "Elevation in meters",
          },
          {
            ["name"] = "iataId",
            ["title"] = "Iata Id",
            ["type"] = "`$STRING`",
            ["short"] = "IATA identifier",
          },
          {
            ["name"] = "icaoId",
            ["title"] = "Icao Id",
            ["type"] = "`$STRING`",
            ["short"] = "ICAO station identifier",
          },
          {
            ["name"] = "lat",
            ["title"] = "Lat",
            ["type"] = "`$NUMBER`",
            ["short"] = "Latitude",
          },
          {
            ["name"] = "lon",
            ["title"] = "Lon",
            ["type"] = "`$NUMBER`",
            ["short"] = "Longitude",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Station name",
          },
          {
            ["name"] = "priority",
            ["title"] = "Priority",
            ["type"] = "`$INTEGER`",
            ["short"] = "Priority level",
          },
          {
            ["name"] = "site",
            ["title"] = "Site",
            ["type"] = "`$STRING`",
            ["short"] = "Site type",
          },
          {
            ["name"] = "state",
            ["title"] = "State",
            ["type"] = "`$STRING`",
            ["short"] = "State or province",
          },
        },
        ["name"] = "station_info",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/data/stationinfo",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "stationinfo",
                  },
                },
                ["parts"] = {
                  "api",
                  "data",
                  "stationinfo",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "bbox",
                      ["orig"] = "bbox",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "json",
                    },
                    {
                      ["name"] = "ids",
                      ["orig"] = "ids",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "bbox",
                    "format",
                    "ids",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["taf"] = {
        ["fields"] = {
          {
            ["name"] = "bulletinTime",
            ["title"] = "Bulletin Time",
            ["type"] = "`$STRING`",
            ["short"] = "Bulletin time in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "elev",
            ["title"] = "Elev",
            ["type"] = "`$NUMBER`",
            ["short"] = "Elevation in meters",
          },
          {
            ["name"] = "fcsts",
            ["title"] = "Fcsts",
            ["type"] = "`$ARRAY`",
            ["short"] = "Forecast periods",
          },
          {
            ["name"] = "icaoId",
            ["title"] = "Icao Id",
            ["type"] = "`$STRING`",
            ["short"] = "ICAO station identifier",
          },
          {
            ["name"] = "issueTime",
            ["title"] = "Issue Time",
            ["type"] = "`$STRING`",
            ["short"] = "TAF issue time in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "lat",
            ["title"] = "Lat",
            ["type"] = "`$NUMBER`",
            ["short"] = "Latitude",
          },
          {
            ["name"] = "lon",
            ["title"] = "Lon",
            ["type"] = "`$NUMBER`",
            ["short"] = "Longitude",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Station name",
          },
          {
            ["name"] = "rawTAF",
            ["title"] = "Raw Taf",
            ["type"] = "`$STRING`",
            ["short"] = "Raw TAF forecast text",
          },
          {
            ["name"] = "validTimeFrom",
            ["title"] = "Valid Time From",
            ["type"] = "`$STRING`",
            ["short"] = "Valid time from in ISO8601 format",
            ["format"] = "date-time",
          },
          {
            ["name"] = "validTimeTo",
            ["title"] = "Valid Time To",
            ["type"] = "`$STRING`",
            ["short"] = "Valid time to in ISO8601 format",
            ["format"] = "date-time",
          },
        },
        ["name"] = "taf",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/data/taf",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "taf",
                  },
                },
                ["parts"] = {
                  "api",
                  "data",
                  "taf",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "bbox",
                      ["orig"] = "bbox",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "raw",
                    },
                    {
                      ["name"] = "ids",
                      ["orig"] = "ids",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["tcf"] = {
        ["fields"] = {},
        ["name"] = "tcf",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/data/tcf",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "tcf",
                  },
                },
                ["parts"] = {
                  "api",
                  "data",
                  "tcf",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "raw",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "date",
                    "format",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
