import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "air_sigmet",
    "accessor": "AirSigmet",
    "op": "list",
    "method": "GET",
    "path": "/api/data/airsigmet",
    "args": [],
    "select": {
      "bbox": "v1",
      "date": "v1",
      "format": "v1",
      "hazard": "v1"
    },
    "headers": [],
    "query": [
      "date",
      "bbox",
      "format",
      "hazard"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "rawAirSigmet": "x",
        "hazard": "x",
        "severity": "x",
        "airsigmetType": "x",
        "validTimeFrom": "2026-01-01T00:00:00Z",
        "validTimeTo": "2026-01-01T00:00:00Z",
        "issueTime": "2026-01-01T00:00:00Z",
        "fir": "x",
        "altitudeLow": 1,
        "altitudeHigh": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "airport",
    "accessor": "Airport",
    "op": "list",
    "method": "GET",
    "path": "/api/data/airport",
    "args": [],
    "select": {
      "bbox": "v1",
      "format": "v1",
      "ids": "v1"
    },
    "headers": [],
    "query": [
      "ids",
      "bbox",
      "format"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "icaoId": "x",
        "iataId": "x",
        "name": "x",
        "lat": 1,
        "lon": 1,
        "elev": 1,
        "city": "x",
        "state": "x",
        "country": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "cache",
    "accessor": "Cache",
    "op": "load",
    "method": "GET",
    "path": "/data/cache/aircraftreports.cache.csv.gz",
    "action": "aircraftreportscachecsvgz",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "cache",
    "accessor": "Cache",
    "op": "load",
    "method": "GET",
    "path": "/data/cache/aircraftreports.cache.xml.gz",
    "action": "aircraftreportscachexmlgz",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "cache",
    "accessor": "Cache",
    "op": "load",
    "method": "GET",
    "path": "/data/cache/airsigmets.cache.csv.gz",
    "action": "airsigmetscachecsvgz",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "cache",
    "accessor": "Cache",
    "op": "load",
    "method": "GET",
    "path": "/data/cache/airsigmets.cache.xml.gz",
    "action": "airsigmetscachexmlgz",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "cache",
    "accessor": "Cache",
    "op": "load",
    "method": "GET",
    "path": "/data/cache/gairmets.cache.xml.gz",
    "action": "gairmetscachexmlgz",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "cache",
    "accessor": "Cache",
    "op": "load",
    "method": "GET",
    "path": "/data/cache/metars.cache.csv.gz",
    "action": "metarscachecsvgz",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "cache",
    "accessor": "Cache",
    "op": "load",
    "method": "GET",
    "path": "/data/cache/metars.cache.xml.gz",
    "action": "metarscachexmlgz",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "cache",
    "accessor": "Cache",
    "op": "load",
    "method": "GET",
    "path": "/data/cache/stations.cache.json.gz",
    "action": "stationscachejsongz",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "cache",
    "accessor": "Cache",
    "op": "load",
    "method": "GET",
    "path": "/data/cache/stations.cache.xml.gz",
    "action": "stationscachexmlgz",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "cache",
    "accessor": "Cache",
    "op": "load",
    "method": "GET",
    "path": "/data/cache/tafs.cache.xml.gz",
    "action": "tafscachexmlgz",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "cwa",
    "accessor": "Cwa",
    "op": "list",
    "method": "GET",
    "path": "/api/data/cwa",
    "args": [],
    "select": {
      "bbox": "v1",
      "date": "v1",
      "format": "v1"
    },
    "headers": [],
    "query": [
      "date",
      "bbox",
      "format"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "rawText": "x",
        "cwsu": "x",
        "issueTime": "2026-01-01T00:00:00Z",
        "validTimeFrom": "2026-01-01T00:00:00Z",
        "validTimeTo": "2026-01-01T00:00:00Z",
        "seriesId": "x",
        "sequence": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "g_airmet",
    "accessor": "GAirmet",
    "op": "list",
    "method": "GET",
    "path": "/api/data/gairmet",
    "args": [],
    "select": {
      "bbox": "v1",
      "date": "v1",
      "format": "v1",
      "hazard": "v1"
    },
    "headers": [],
    "query": [
      "date",
      "bbox",
      "format",
      "hazard"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "hazard": "x",
        "severity": "x",
        "validTimeFrom": "2026-01-01T00:00:00Z",
        "validTimeTo": "2026-01-01T00:00:00Z",
        "issueTime": "2026-01-01T00:00:00Z",
        "altitudeLow": 1,
        "altitudeHigh": 1,
        "qualifier": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "metar",
    "accessor": "Metar",
    "op": "list",
    "method": "GET",
    "path": "/api/data/metar",
    "args": [],
    "select": {
      "bbox": "v1",
      "date": "v1",
      "format": "v1",
      "ids": "v1",
      "taf": "v1"
    },
    "headers": [],
    "query": [
      "ids",
      "format",
      "date",
      "bbox",
      "taf"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "rawOb": "x",
        "icaoId": "x",
        "obsTime": "2026-01-01T00:00:00Z",
        "reportTime": "2026-01-01T00:00:00Z",
        "temp": 1,
        "dewp": 1,
        "wdir": 1,
        "wspd": 1,
        "wgst": 1,
        "visib": "x",
        "altim": 1,
        "slp": 1,
        "qcField": 1,
        "wxString": "x",
        "presTend": 1,
        "maxT": 1,
        "minT": 1,
        "maxT24": 1,
        "minT24": 1,
        "precip": 1,
        "pcp3hr": 1,
        "pcp6hr": 1,
        "pcp24hr": 1,
        "snow": 1,
        "vertVis": 1,
        "metarType": "x",
        "rawTaf": "x",
        "mostRecent": 1,
        "lat": 1,
        "lon": 1,
        "elev": 1,
        "prior": 1,
        "name": "x",
        "clouds": [
          {
            "cover": "x",
            "base": 1
          }
        ],
        "fltCat": "VFR"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "pirep",
    "accessor": "Pirep",
    "op": "list",
    "method": "GET",
    "path": "/api/data/pirep",
    "args": [],
    "select": {
      "age": "v1",
      "bbox": "v1",
      "date": "v1",
      "format": "v1"
    },
    "headers": [],
    "query": [
      "date",
      "bbox",
      "format",
      "age"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "rawOb": "x",
        "obsTime": "2026-01-01T00:00:00Z",
        "reportType": "x",
        "lat": 1,
        "lon": 1,
        "altitudeFt": 1,
        "aircraftType": "x",
        "temp": 1,
        "wdir": 1,
        "wspd": 1,
        "turbulence": "x",
        "icing": "x",
        "visibility": "x",
        "wxString": "x",
        "clouds": [
          {
            "cover": "x",
            "base": 1,
            "top": 1
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "station_info",
    "accessor": "StationInfo",
    "op": "list",
    "method": "GET",
    "path": "/api/data/stationinfo",
    "args": [],
    "select": {
      "bbox": "v1",
      "format": "v1",
      "ids": "v1"
    },
    "headers": [],
    "query": [
      "ids",
      "bbox",
      "format"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "icaoId": "x",
        "iataId": "x",
        "name": "x",
        "lat": 1,
        "lon": 1,
        "elev": 1,
        "site": "x",
        "state": "x",
        "country": "x",
        "priority": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "taf",
    "accessor": "Taf",
    "op": "list",
    "method": "GET",
    "path": "/api/data/taf",
    "args": [],
    "select": {
      "bbox": "v1",
      "date": "v1",
      "format": "v1",
      "ids": "v1"
    },
    "headers": [],
    "query": [
      "ids",
      "format",
      "date",
      "bbox"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "rawTAF": "x",
        "icaoId": "x",
        "issueTime": "2026-01-01T00:00:00Z",
        "bulletinTime": "2026-01-01T00:00:00Z",
        "validTimeFrom": "2026-01-01T00:00:00Z",
        "validTimeTo": "2026-01-01T00:00:00Z",
        "lat": 1,
        "lon": 1,
        "elev": 1,
        "name": "x",
        "fcsts": [
          {
            "timeFrom": "2026-01-01T00:00:00Z",
            "timeTo": "2026-01-01T00:00:00Z",
            "wdir": 1,
            "wspd": 1,
            "wgst": 1,
            "visib": "x",
            "altim": 1,
            "wxString": "x",
            "changeIndicator": "x"
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "tcf",
    "accessor": "Tcf",
    "op": "load",
    "method": "GET",
    "path": "/api/data/tcf",
    "args": [],
    "select": {
      "date": "v1",
      "format": "v1"
    },
    "headers": [],
    "query": [
      "date",
      "format"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": []
          },
          "properties": {}
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
