"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
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
            "format": "raw",
            "hazard": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/plain",
            "application/json",
            "application/geo+json",
            "application/xml"
        ],
        "query": [
            "date",
            "bbox",
            "format",
            "hazard"
        ],
        "queryArgs": [
            {
                "name": "bbox",
                "wire": "bbox"
            },
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "hazard",
                "wire": "hazard"
            }
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
            "format": "json",
            "ids": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "application/geo+json",
            "application/xml"
        ],
        "query": [
            "ids",
            "bbox",
            "format"
        ],
        "queryArgs": [
            {
                "name": "bbox",
                "wire": "bbox"
            },
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "ids",
                "wire": "ids"
            }
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
        "cookies": [],
        "responseMedia": [
            "application/gzip"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/gzip"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/gzip"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/gzip"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/gzip"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/gzip"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/gzip"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/gzip"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/gzip"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/gzip"
        ],
        "query": [],
        "queryArgs": [],
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
            "format": "raw"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/plain",
            "application/json",
            "application/geo+json"
        ],
        "query": [
            "date",
            "bbox",
            "format"
        ],
        "queryArgs": [
            {
                "name": "bbox",
                "wire": "bbox"
            },
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            }
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
            "format": "json",
            "hazard": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "application/geo+json",
            "application/xml"
        ],
        "query": [
            "date",
            "bbox",
            "format",
            "hazard"
        ],
        "queryArgs": [
            {
                "name": "bbox",
                "wire": "bbox"
            },
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "hazard",
                "wire": "hazard"
            }
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
            "format": "raw",
            "ids": "v1",
            "taf": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/plain",
            "application/json",
            "application/geo+json",
            "text/csv",
            "application/xml"
        ],
        "query": [
            "ids",
            "format",
            "date",
            "bbox",
            "taf"
        ],
        "queryArgs": [
            {
                "name": "bbox",
                "wire": "bbox"
            },
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "ids",
                "wire": "ids"
            },
            {
                "name": "taf",
                "wire": "taf"
            }
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
            "format": "raw"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/plain",
            "application/json",
            "application/geo+json",
            "application/xml"
        ],
        "query": [
            "date",
            "bbox",
            "format",
            "age"
        ],
        "queryArgs": [
            {
                "name": "age",
                "wire": "age"
            },
            {
                "name": "bbox",
                "wire": "bbox"
            },
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            }
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
            "format": "json",
            "ids": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "application/geo+json",
            "application/xml"
        ],
        "query": [
            "ids",
            "bbox",
            "format"
        ],
        "queryArgs": [
            {
                "name": "bbox",
                "wire": "bbox"
            },
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "ids",
                "wire": "ids"
            }
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
            "format": "raw",
            "ids": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/plain",
            "application/json",
            "application/geo+json",
            "application/xml"
        ],
        "query": [
            "ids",
            "format",
            "date",
            "bbox"
        ],
        "queryArgs": [
            {
                "name": "bbox",
                "wire": "bbox"
            },
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "ids",
                "wire": "ids"
            }
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
            "format": "raw"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/plain",
            "application/geo+json"
        ],
        "query": [
            "date",
            "format"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            }
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
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map