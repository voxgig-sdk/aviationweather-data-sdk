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
(0, node_test_1.describe)('PirepEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AVIATIONWEATHER_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AviationweatherDataSDK.test();
        const ent = testsdk.Pirep();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pirep.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "aircraftType": { "a": true, "h": "Aircraft Type", "n": "aircraftType", "r": false, "sh": "Aircraft type", "t": "`$STRING`", "key$": "aircraftType", "index$": 0 }, "altitudeFt": { "a": true, "h": "Altitude Ft", "n": "altitudeFt", "r": false, "sh": "Altitude in feet MSL", "t": "`$INTEGER`", "key$": "altitudeFt", "index$": 1 }, "clouds": { "a": true, "h": "Clouds", "n": "clouds", "r": false, "sh": "Cloud reports", "t": "`$ARRAY`", "key$": "clouds", "index$": 2 }, "icing": { "a": true, "h": "Icing", "n": "icing", "r": false, "sh": "Icing report", "t": "`$STRING`", "key$": "icing", "index$": 3 }, "lat": { "a": true, "h": "Lat", "n": "lat", "r": false, "sh": "Latitude", "t": "`$NUMBER`", "key$": "lat", "index$": 4 }, "lon": { "a": true, "h": "Lon", "n": "lon", "r": false, "sh": "Longitude", "t": "`$NUMBER`", "key$": "lon", "index$": 5 }, "obsTime": { "a": true, "fo": "date-time", "h": "Obs Time", "n": "obsTime", "r": false, "sh": "Observation time in ISO8601 format", "t": "`$STRING`", "key$": "obsTime", "index$": 6 }, "rawOb": { "a": true, "h": "Raw Ob", "n": "rawOb", "r": false, "sh": "Raw PIREP text", "t": "`$STRING`", "key$": "rawOb", "index$": 7 }, "reportType": { "a": true, "h": "Report Type", "n": "reportType", "r": false, "sh": "Report type (PIREP or AIREP)", "t": "`$STRING`", "key$": "reportType", "index$": 8 }, "temp": { "a": true, "h": "Temp", "n": "temp", "r": false, "sh": "Temperature in Celsius", "t": "`$NUMBER`", "key$": "temp", "index$": 9 }, "turbulence": { "a": true, "h": "Turbulence", "n": "turbulence", "r": false, "sh": "Turbulence report", "t": "`$STRING`", "key$": "turbulence", "index$": 10 }, "visibility": { "a": true, "h": "Visibility", "n": "visibility", "r": false, "sh": "Visibility", "t": "`$STRING`", "key$": "visibility", "index$": 11 }, "wdir": { "a": true, "h": "Wdir", "n": "wdir", "r": false, "sh": "Wind direction in degrees", "t": "`$INTEGER`", "key$": "wdir", "index$": 12 }, "wspd": { "a": true, "h": "Wspd", "n": "wspd", "r": false, "sh": "Wind speed in knots", "t": "`$INTEGER`", "key$": "wspd", "index$": 13 }, "wxString": { "a": true, "h": "Wx String", "n": "wxString", "r": false, "sh": "Weather phenomena string", "t": "`$STRING`", "key$": "wxString", "index$": 14 } }, "name": "pirep", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/data/pirep", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "age", "or": "age", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "bbox", "or": "bbox", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "date", "or": "date", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "raw", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/data/pirep", "q": { "exist": ["age", "bbox", "date", "format"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "data" }, { "lit": "pirep" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "pirep", "name__orig": "pirep", "Name": "Pirep", "name_": "pirep", "name-": "pirep", "NAME": "PIREP", "index$": 6 }, { "active": true, "entity": "pirep", "key$": "BasicPirepFlow", "kind": "basic", "name": "BasicPirepFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "pirep_ref01" } }], "index$": 0 }] }, 'Pirep', { "GET /api/data/pirep": { "protocol": "http", "operationId": "getPireps", "responses": { "200": { "description": "Successful response", "content": { "text/plain": { "schema": { "type": "string" } }, "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "rawOb": { "type": "string", "description": "Raw PIREP text", "key$": "rawOb" }, "obsTime": { "type": "string", "format": "date-time", "description": "Observation time in ISO8601 format", "key$": "obsTime" }, "reportType": { "type": "string", "description": "Report type (PIREP or AIREP)", "key$": "reportType" }, "lat": { "type": "number", "description": "Latitude", "key$": "lat" }, "lon": { "type": "number", "description": "Longitude", "key$": "lon" }, "altitudeFt": { "type": "integer", "description": "Altitude in feet MSL", "key$": "altitudeFt" }, "aircraftType": { "type": "string", "description": "Aircraft type", "key$": "aircraftType" }, "temp": { "type": "number", "description": "Temperature in Celsius", "key$": "temp" }, "wdir": { "type": "integer", "description": "Wind direction in degrees", "key$": "wdir" }, "wspd": { "type": "integer", "description": "Wind speed in knots", "key$": "wspd" }, "turbulence": { "type": "string", "description": "Turbulence report", "key$": "turbulence" }, "icing": { "type": "string", "description": "Icing report", "key$": "icing" }, "visibility": { "type": "string", "description": "Visibility", "key$": "visibility" }, "wxString": { "type": "string", "description": "Weather phenomena string", "key$": "wxString" }, "clouds": { "type": "array", "description": "Cloud reports", "items": { "type": "object", "properties": { "cover": { "type": "string" }, "base": { "type": "integer" }, "top": { "type": "integer" } } }, "key$": "clouds" } }, "x-ref": "#/components/schemas/Pirep", "index$": 0 } } }, "application/geo+json": { "schema": { "type": "object", "properties": { "type": { "type": "string", "enum": ["FeatureCollection"] }, "features": { "type": "array", "items": { "type": "object", "properties": { "type": { "type": "string", "enum": ["Feature"] }, "geometry": { "type": "object", "properties": { "type": { "type": "string", "enum": ["Point", "LineString", "Polygon", "MultiPoint", "MultiLineString", "MultiPolygon"] }, "coordinates": { "type": "array", "description": "Coordinate array structure depends on geometry type" } }, "x-ref": "#/components/schemas/GeoJSONGeometry" }, "properties": { "type": "object", "description": "Feature properties specific to each product type" } }, "x-ref": "#/components/schemas/GeoJSONFeature" } } }, "x-ref": "#/components/schemas/GeoJSONFeatureCollection" } }, "application/xml": { "schema": { "type": "object" } } } }, "204": { "description": "No content - valid request but no data available" }, "400": { "description": "Invalid request - invalid or missing parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } }, "application/xml": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } }, "text/plain": { "schema": { "type": "string" } } }, "x-ref": "#/components/responses/BadRequest" }, "429": { "description": "Rate limit exceeded - maximum 100 requests per minute", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } }, "application/xml": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } }, "text/plain": { "schema": { "type": "string" } } }, "x-ref": "#/components/responses/TooManyRequests" }, "500": { "description": "Internal server error - request may be valid but system unable to serve it", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } }, "application/xml": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } }, "text/plain": { "schema": { "type": "string" } } }, "x-ref": "#/components/responses/InternalServerError" } }, "parameters": [{ "name": "date", "in": "query", "description": "Date for historical data (ISO8601 format)", "required": false, "schema": { "type": "string", "format": "date-time" }, "index$": 0 }, { "name": "bbox", "in": "query", "description": "Bounding box coordinates (minLon,minLat,maxLon,maxLat)", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "format", "in": "query", "description": "Output format", "required": false, "schema": { "type": "string", "enum": ["raw", "json", "geojson", "xml"], "default": "raw" }, "index$": 2 }, { "name": "age", "in": "query", "description": "Age of reports in hours", "required": false, "schema": { "type": "integer" }, "index$": 3 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let pirep_ref01_data = Object.values(setup.data.existing.pirep)[0];
        // LIST
        const pirep_ref01_ent = client.Pirep();
        const pirep_ref01_match = {};
        const pirep_ref01_list = (await pirep_ref01_ent.list(pirep_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pirep/PirepTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AviationweatherDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pirep01', 'pirep02', 'pirep03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AVIATIONWEATHER_DATA_TEST_PIREP_ENTID': idmap,
        'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
        'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AVIATIONWEATHER_DATA_TEST_PIREP_ENTID'];
    const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_PIREP_ENTID'];
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
//# sourceMappingURL=PirepEntity.test.js.map