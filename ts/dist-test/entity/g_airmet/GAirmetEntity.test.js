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
(0, node_test_1.describe)('GAirmetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AVIATIONWEATHER_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AVIATIONWEATHER_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AviationweatherDataSDK.test();
        const ent = testsdk.GAirmet();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('g_airmet hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.AviationweatherDataSDK.test(offline).GAirmet().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.AviationweatherDataSDK.test(offline).GAirmet()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.AviationweatherDataSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.GAirmet().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.AviationweatherDataSDK.test().GAirmet().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.AviationweatherDataSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.GAirmet().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.GAirmet().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.AviationweatherDataSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.GAirmet().list({ "bbox": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AVIATIONWEATHER_DATA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'g_airmet.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "altitudeHigh": { "a": true, "h": "Altitude High", "n": "altitudeHigh", "r": false, "sh": "Upper altitude in feet MSL", "t": "`$INTEGER`", "key$": "altitudeHigh", "index$": 0 }, "altitudeLow": { "a": true, "h": "Altitude Low", "n": "altitudeLow", "r": false, "sh": "Lower altitude in feet MSL", "t": "`$INTEGER`", "key$": "altitudeLow", "index$": 1 }, "hazard": { "a": true, "h": "Hazard", "n": "hazard", "r": false, "sh": "Hazard type", "t": "`$STRING`", "key$": "hazard", "index$": 2 }, "issueTime": { "a": true, "fo": "date-time", "h": "Issue Time", "n": "issueTime", "r": false, "sh": "Issue time in ISO8601 format", "t": "`$STRING`", "key$": "issueTime", "index$": 3 }, "qualifier": { "a": true, "h": "Qualifier", "n": "qualifier", "r": false, "sh": "Forecast qualifier", "t": "`$STRING`", "key$": "qualifier", "index$": 4 }, "severity": { "a": true, "h": "Severity", "n": "severity", "r": false, "sh": "Severity level", "t": "`$STRING`", "key$": "severity", "index$": 5 }, "validTimeFrom": { "a": true, "fo": "date-time", "h": "Valid Time From", "n": "validTimeFrom", "r": false, "sh": "Valid time from in ISO8601 format", "t": "`$STRING`", "key$": "validTimeFrom", "index$": 6 }, "validTimeTo": { "a": true, "fo": "date-time", "h": "Valid Time To", "n": "validTimeTo", "r": false, "sh": "Valid time to in ISO8601 format", "t": "`$STRING`", "key$": "validTimeTo", "index$": 7 } }, "name": "g_airmet", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/data/gairmet", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "bbox", "or": "bbox", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "date", "or": "date", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "hazard", "or": "hazard", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/data/gairmet", "q": {}, "r": {}, "rs": { "alternatives": [{ "kind": "json", "media": "application/geo+json" }, { "kind": "raw", "media": "application/xml" }], "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "data" }, { "lit": "gairmet" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "g_airmet", "name__orig": "g_airmet", "Name": "GAirmet", "name_": "g_airmet", "name-": "g-airmet", "NAME": "G_AIRMET", "index$": 4 }, { "active": true, "entity": "g_airmet", "key$": "BasicGAirmetFlow", "kind": "basic", "name": "BasicGAirmetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "g_airmet_ref01" } }], "index$": 0 }] }, 'GAirmet', { "GET /api/data/gairmet": { "protocol": "http", "parameters": [{ "name": "date", "in": "query", "description": "Date for historical data (ISO8601 format)", "required": false, "schema": { "type": "string", "format": "date-time" }, "index$": 0 }, { "name": "bbox", "in": "query", "description": "Bounding box coordinates (minLon,minLat,maxLon,maxLat)", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "format", "in": "query", "description": "Output format", "required": false, "schema": { "type": "string", "enum": ["json", "geojson", "xml"], "default": "json" }, "index$": 2 }, { "name": "hazard", "in": "query", "description": "Filter by hazard type", "required": false, "schema": { "type": "string" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let g_airmet_ref01_data = Object.values(setup.data.existing.g_airmet)[0];
        // LIST
        const g_airmet_ref01_ent = client.GAirmet();
        const g_airmet_ref01_match = {};
        const g_airmet_ref01_list = (await g_airmet_ref01_ent.list(g_airmet_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/g_airmet/GAirmetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AviationweatherDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['g_airmet01', 'g_airmet02', 'g_airmet03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AVIATIONWEATHER_DATA_TEST_G_AIRMET_ENTID': idmap,
        'AVIATIONWEATHER_DATA_TEST_LIVE': 'FALSE',
        'AVIATIONWEATHER_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AVIATIONWEATHER_DATA_TEST_G_AIRMET_ENTID'];
    const live = 'TRUE' === env.AVIATIONWEATHER_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AVIATIONWEATHER_DATA_TEST_G_AIRMET_ENTID'];
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
//# sourceMappingURL=GAirmetEntity.test.js.map