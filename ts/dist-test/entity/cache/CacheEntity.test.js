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
(0, node_test_1.describe)('CacheEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AVIATIONWEATHER_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AviationweatherDataSDK.test();
        const ent = testsdk.Cache();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'cache.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "cache", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /data/cache/aircraftreports.cache.csv.gz", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/data/cache/aircraftreports.cache.csv.gz", "q": { "$action": "aircraftreportscachecsvgz" }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/gzip" }, "s": [{ "lit": "data" }, { "lit": "cache" }, { "lit": "aircraftreports.cache.csv.gz" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /data/cache/aircraftreports.cache.xml.gz", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/data/cache/aircraftreports.cache.xml.gz", "q": { "$action": "aircraftreportscachexmlgz" }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/gzip" }, "s": [{ "lit": "data" }, { "lit": "cache" }, { "lit": "aircraftreports.cache.xml.gz" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /data/cache/airsigmets.cache.csv.gz", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/data/cache/airsigmets.cache.csv.gz", "q": { "$action": "airsigmetscachecsvgz" }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/gzip" }, "s": [{ "lit": "data" }, { "lit": "cache" }, { "lit": "airsigmets.cache.csv.gz" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /data/cache/airsigmets.cache.xml.gz", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/data/cache/airsigmets.cache.xml.gz", "q": { "$action": "airsigmetscachexmlgz" }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/gzip" }, "s": [{ "lit": "data" }, { "lit": "cache" }, { "lit": "airsigmets.cache.xml.gz" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "co": { "id": "GET /data/cache/gairmets.cache.xml.gz", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/data/cache/gairmets.cache.xml.gz", "q": { "$action": "gairmetscachexmlgz" }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/gzip" }, "s": [{ "lit": "data" }, { "lit": "cache" }, { "lit": "gairmets.cache.xml.gz" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "co": { "id": "GET /data/cache/metars.cache.csv.gz", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/data/cache/metars.cache.csv.gz", "q": { "$action": "metarscachecsvgz" }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/gzip" }, "s": [{ "lit": "data" }, { "lit": "cache" }, { "lit": "metars.cache.csv.gz" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 5 }, { "a": true, "co": { "id": "GET /data/cache/metars.cache.xml.gz", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/data/cache/metars.cache.xml.gz", "q": { "$action": "metarscachexmlgz" }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/gzip" }, "s": [{ "lit": "data" }, { "lit": "cache" }, { "lit": "metars.cache.xml.gz" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 6 }, { "a": true, "co": { "id": "GET /data/cache/stations.cache.json.gz", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/data/cache/stations.cache.json.gz", "q": { "$action": "stationscachejsongz" }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/gzip" }, "s": [{ "lit": "data" }, { "lit": "cache" }, { "lit": "stations.cache.json.gz" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 7 }, { "a": true, "co": { "id": "GET /data/cache/stations.cache.xml.gz", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/data/cache/stations.cache.xml.gz", "q": { "$action": "stationscachexmlgz" }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/gzip" }, "s": [{ "lit": "data" }, { "lit": "cache" }, { "lit": "stations.cache.xml.gz" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 8 }, { "a": true, "co": { "id": "GET /data/cache/tafs.cache.xml.gz", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/data/cache/tafs.cache.xml.gz", "q": { "$action": "tafscachexmlgz" }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/gzip" }, "s": [{ "lit": "data" }, { "lit": "cache" }, { "lit": "tafs.cache.xml.gz" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 9 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "cache", "name__orig": "cache", "Name": "Cache", "name_": "cache", "name-": "cache", "NAME": "CACHE", "index$": 2 }, { "active": true, "entity": "cache", "key$": "BasicCacheFlow", "kind": "basic", "name": "BasicCacheFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "cache_ref01", "srcdatavar": "cache_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-cache_ref01" } }], "unreachable": true }] }, 'Cache', { "GET /data/cache/aircraftreports.cache.csv.gz": { "protocol": "http", "parameters": [] }, "GET /data/cache/aircraftreports.cache.xml.gz": { "protocol": "http", "parameters": [] }, "GET /data/cache/airsigmets.cache.csv.gz": { "protocol": "http", "parameters": [] }, "GET /data/cache/airsigmets.cache.xml.gz": { "protocol": "http", "parameters": [] }, "GET /data/cache/gairmets.cache.xml.gz": { "protocol": "http", "parameters": [] }, "GET /data/cache/metars.cache.csv.gz": { "protocol": "http", "parameters": [] }, "GET /data/cache/metars.cache.xml.gz": { "protocol": "http", "parameters": [] }, "GET /data/cache/stations.cache.json.gz": { "protocol": "http", "parameters": [] }, "GET /data/cache/stations.cache.xml.gz": { "protocol": "http", "parameters": [] }, "GET /data/cache/tafs.cache.xml.gz": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let cache_ref01_data = Object.values(setup.data.existing.cache)[0];
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/cache/CacheTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AviationweatherDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['cache01', 'cache02', 'cache03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AVIATIONWEATHER_DATA_TEST_CACHE_ENTID': idmap,
        'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
        'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AVIATIONWEATHER_DATA_TEST_CACHE_ENTID'];
    const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_CACHE_ENTID'];
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
//# sourceMappingURL=CacheEntity.test.js.map