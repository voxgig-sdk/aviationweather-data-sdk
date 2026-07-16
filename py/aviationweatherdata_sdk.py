# AviationweatherData SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import AviationweatherDataUtility
from core.spec import AviationweatherDataSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import AviationweatherDataBaseFeature
from features import _make_feature


class AviationweatherDataSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = AviationweatherDataUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return AviationweatherDataUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = AviationweatherDataSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    def AirSigmet(self, data=None) -> "AirSigmetEntity":
        """Entity factory: client.AirSigmet().list() / client.AirSigmet().load({"id": ...})."""
        from entity.air_sigmet_entity import AirSigmetEntity
        return AirSigmetEntity(self, data)


    def Airport(self, data=None) -> "AirportEntity":
        """Entity factory: client.Airport().list() / client.Airport().load({"id": ...})."""
        from entity.airport_entity import AirportEntity
        return AirportEntity(self, data)


    def Cache(self, data=None) -> "CacheEntity":
        """Entity factory: client.Cache().list() / client.Cache().load({"id": ...})."""
        from entity.cache_entity import CacheEntity
        return CacheEntity(self, data)


    def Cwa(self, data=None) -> "CwaEntity":
        """Entity factory: client.Cwa().list() / client.Cwa().load({"id": ...})."""
        from entity.cwa_entity import CwaEntity
        return CwaEntity(self, data)


    def GAirmet(self, data=None) -> "GAirmetEntity":
        """Entity factory: client.GAirmet().list() / client.GAirmet().load({"id": ...})."""
        from entity.g_airmet_entity import GAirmetEntity
        return GAirmetEntity(self, data)


    def Metar(self, data=None) -> "MetarEntity":
        """Entity factory: client.Metar().list() / client.Metar().load({"id": ...})."""
        from entity.metar_entity import MetarEntity
        return MetarEntity(self, data)


    def Pirep(self, data=None) -> "PirepEntity":
        """Entity factory: client.Pirep().list() / client.Pirep().load({"id": ...})."""
        from entity.pirep_entity import PirepEntity
        return PirepEntity(self, data)


    def StationInfo(self, data=None) -> "StationInfoEntity":
        """Entity factory: client.StationInfo().list() / client.StationInfo().load({"id": ...})."""
        from entity.station_info_entity import StationInfoEntity
        return StationInfoEntity(self, data)


    def Taf(self, data=None) -> "TafEntity":
        """Entity factory: client.Taf().list() / client.Taf().load({"id": ...})."""
        from entity.taf_entity import TafEntity
        return TafEntity(self, data)


    def Tcf(self, data=None) -> "TcfEntity":
        """Entity factory: client.Tcf().list() / client.Tcf().load({"id": ...})."""
        from entity.tcf_entity import TcfEntity
        return TcfEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "AviationweatherDataSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entity.air_sigmet_entity import AirSigmetEntity
    from entity.airport_entity import AirportEntity
    from entity.cache_entity import CacheEntity
    from entity.cwa_entity import CwaEntity
    from entity.g_airmet_entity import GAirmetEntity
    from entity.metar_entity import MetarEntity
    from entity.pirep_entity import PirepEntity
    from entity.station_info_entity import StationInfoEntity
    from entity.taf_entity import TafEntity
    from entity.tcf_entity import TcfEntity
