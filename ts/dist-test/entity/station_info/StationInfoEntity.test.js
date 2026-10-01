"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('StationInfoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AVIATIONWEATHER_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AviationweatherDataSDK.test();
        const ent = testsdk.StationInfo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'station_info.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "country": { "a": true, "h": "Country", "n": "country", "r": false, "sh": "Country code", "t": "`$STRING`", "key$": "country", "index$": 0 }, "elev": { "a": true, "h": "Elev", "n": "elev", "r": false, "sh": "Elevation in meters", "t": "`$NUMBER`", "key$": "elev", "index$": 1 }, "iataId": { "a": true, "h": "Iata Id", "n": "iataId", "r": false, "sh": "IATA identifier", "t": "`$STRING`", "key$": "iataId", "index$": 2 }, "icaoId": { "a": true, "h": "Icao Id", "n": "icaoId", "r": false, "sh": "ICAO station identifier", "t": "`$STRING`", "key$": "icaoId", "index$": 3 }, "lat": { "a": true, "h": "Lat", "n": "lat", "r": false, "sh": "Latitude", "t": "`$NUMBER`", "key$": "lat", "index$": 4 }, "lon": { "a": true, "h": "Lon", "n": "lon", "r": false, "sh": "Longitude", "t": "`$NUMBER`", "key$": "lon", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Station name", "t": "`$STRING`", "key$": "name", "index$": 6 }, "priority": { "a": true, "h": "Priority", "n": "priority", "r": false, "sh": "Priority level", "t": "`$INTEGER`", "key$": "priority", "index$": 7 }, "site": { "a": true, "h": "Site", "n": "site", "r": false, "sh": "Site type", "t": "`$STRING`", "key$": "site", "index$": 8 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "sh": "State or province", "t": "`$STRING`", "key$": "state", "index$": 9 } }, "name": "station_info", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/data/stationinfo", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "bbox", "or": "bbox", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "ids", "or": "ids", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/data/stationinfo", "q": { "exist": ["bbox", "format", "ids"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "data" }, { "lit": "stationinfo" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "station_info", "name__orig": "station_info", "Name": "StationInfo", "name_": "station_info", "name-": "station-info", "NAME": "STATION_INFO", "index$": 7 }, { "active": true, "entity": "station_info", "key$": "BasicStationInfoFlow", "kind": "basic", "name": "BasicStationInfoFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "station_info_ref01" } }], "index$": 0 }] }, 'StationInfo', { "GET /api/data/stationinfo": { "protocol": "http", "parameters": [{ "name": "ids", "in": "query", "description": "Comma-separated list of ICAO station identifiers", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "bbox", "in": "query", "description": "Bounding box coordinates (minLon,minLat,maxLon,maxLat)", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "format", "in": "query", "description": "Output format", "required": false, "schema": { "type": "string", "enum": ["json", "geojson", "xml"], "default": "json" }, "index$": 2 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let station_info_ref01_data = Object.values(setup.data.existing.station_info)[0];
        // LIST
        const station_info_ref01_ent = client.StationInfo();
        const station_info_ref01_match = {};
        const station_info_ref01_list = (await station_info_ref01_ent.list(station_info_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/station_info/StationInfoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AviationweatherDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['station_info01', 'station_info02', 'station_info03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AVIATIONWEATHER_DATA_TEST_STATION_INFO_ENTID': idmap,
        'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
        'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AVIATIONWEATHER_DATA_TEST_STATION_INFO_ENTID'];
    const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_STATION_INFO_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AviationweatherDataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=StationInfoEntity.test.js.map