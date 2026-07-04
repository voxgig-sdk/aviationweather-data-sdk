# GAirmet entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from aviationweatherdata_sdk import AviationweatherDataSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestGAirmetEntity:

    def test_should_create_instance(self):
        testsdk = AviationweatherDataSDK.test(None, None)
        ent = testsdk.GAirmet(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _g_airmet_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "g_airmet." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set AVIATIONWEATHERDATA_TEST_G_AIRMET_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        g_airmet_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.g_airmet")))
        g_airmet_ref01_data = None
        if len(g_airmet_ref01_data_raw) > 0:
            g_airmet_ref01_data = helpers.to_map(g_airmet_ref01_data_raw[0][1])

        # LIST
        g_airmet_ref01_ent = client.GAirmet(None)
        g_airmet_ref01_match = {}

        g_airmet_ref01_list_result = g_airmet_ref01_ent.list(g_airmet_ref01_match, None)
        assert isinstance(g_airmet_ref01_list_result, list)



def _g_airmet_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/g_airmet/GAirmetTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = AviationweatherDataSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["g_airmet01", "g_airmet02", "g_airmet03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "AVIATIONWEATHERDATA_TEST_G_AIRMET_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "AVIATIONWEATHERDATA_TEST_G_AIRMET_ENTID": idmap,
        "AVIATIONWEATHERDATA_TEST_LIVE": "FALSE",
        "AVIATIONWEATHERDATA_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("AVIATIONWEATHERDATA_TEST_G_AIRMET_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("AVIATIONWEATHERDATA_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = AviationweatherDataSDK(helpers.to_map(merged_opts))

    _live = env.get("AVIATIONWEATHERDATA_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("AVIATIONWEATHERDATA_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
