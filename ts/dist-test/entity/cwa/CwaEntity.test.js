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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CwaEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AVIATIONWEATHER_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AviationweatherDataSDK.test();
        const ent = testsdk.Cwa();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'cwa.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "cwsu", "req": false, "short": "Center Weather Service Unit", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "date-time", "name": "issueTime", "req": false, "short": "Issue time in ISO8601 format", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "rawText", "req": false, "short": "Raw CWA text", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "sequence", "req": false, "short": "Sequence number", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "seriesId", "req": false, "short": "Series identifier", "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "date-time", "name": "validTimeFrom", "req": false, "short": "Valid time from in ISO8601 format", "type": "`$STRING`", "index$": 5 }, { "active": true, "format": "date-time", "name": "validTimeTo", "req": false, "short": "Valid time to in ISO8601 format", "type": "`$STRING`", "index$": 6 }], "name": "cwa", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "bbox", "orig": "bbox", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "date", "orig": "date", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "raw", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /api/data/cwa", "json": "{\"operationId\":\"getCwas\",\"parameters\":[{\"description\":\"Date for historical data (ISO8601 format)\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Bounding box coordinates (minLon,minLat,maxLon,maxLat)\",\"in\":\"query\",\"name\":\"bbox\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"raw\",\"enum\":[\"raw\",\"json\",\"geojson\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/geo+json\":{\"schema\":{\"properties\":{\"features\":{\"items\":{\"properties\":{\"geometry\":{\"properties\":{\"coordinates\":{\"description\":\"Coordinate array structure depends on geometry type\",\"type\":\"array\"},\"type\":{\"enum\":[\"Point\",\"LineString\",\"Polygon\",\"MultiPoint\",\"MultiLineString\",\"MultiPolygon\"],\"type\":\"string\"}},\"type\":\"object\"},\"properties\":{\"description\":\"Feature properties specific to each product type\",\"type\":\"object\"},\"type\":{\"enum\":[\"Feature\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"enum\":[\"FeatureCollection\"],\"type\":\"string\"}},\"type\":\"object\"}},\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"cwsu\":{\"description\":\"Center Weather Service Unit\",\"type\":\"string\"},\"issueTime\":{\"description\":\"Issue time in ISO8601 format\",\"format\":\"date-time\",\"type\":\"string\"},\"rawText\":{\"description\":\"Raw CWA text\",\"type\":\"string\"},\"sequence\":{\"description\":\"Sequence number\",\"type\":\"integer\"},\"seriesId\":{\"description\":\"Series identifier\",\"type\":\"string\"},\"validTimeFrom\":{\"description\":\"Valid time from in ISO8601 format\",\"format\":\"date-time\",\"type\":\"string\"},\"validTimeTo\":{\"description\":\"Valid time to in ISO8601 format\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response\"},\"204\":{\"description\":\"No content - valid request but no data available\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Invalid request - invalid or missing parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Rate limit exceeded - maximum 100 requests per minute\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Internal server error - request may be valid but system unable to serve it\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/data/cwa", "segments": [{ "lit": "api" }, { "lit": "data" }, { "lit": "cwa" }], "select": { "exist": ["bbox", "date", "format"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "cwa", "name__orig": "cwa", "Name": "Cwa", "name_": "cwa", "name-": "cwa", "NAME": "CWA", "index$": 3 }, { "active": true, "entity": "cwa", "key$": "BasicCwaFlow", "kind": "basic", "name": "BasicCwaFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "cwa_ref01" } }], "index$": 0 }] }, 'Cwa');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let cwa_ref01_data = Object.values(setup.data.existing.cwa)[0];
        // LIST
        const cwa_ref01_ent = client.Cwa();
        const cwa_ref01_match = {};
        const cwa_ref01_list = (await cwa_ref01_ent.list(cwa_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/cwa/CwaTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AviationweatherDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['cwa01', 'cwa02', 'cwa03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AVIATIONWEATHER_DATA_TEST_CWA_ENTID': idmap,
        'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
        'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AVIATIONWEATHER_DATA_TEST_CWA_ENTID'];
    const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_CWA_ENTID'];
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
//# sourceMappingURL=CwaEntity.test.js.map