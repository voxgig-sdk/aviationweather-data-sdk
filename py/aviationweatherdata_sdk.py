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

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
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


    @property
    def air_sigmet(self):
        """Idiomatic facade: client.air_sigmet.list() / client.air_sigmet.load({"id": ...})."""
        from entity.air_sigmet_entity import AirSigmetEntity
        cached = getattr(self, "_air_sigmet", None)
        if cached is None:
            cached = AirSigmetEntity(self, None)
            self._air_sigmet = cached
        return cached

    def AirSigmet(self, data=None):
        # Deprecated: use client.air_sigmet instead.
        from entity.air_sigmet_entity import AirSigmetEntity
        return AirSigmetEntity(self, data)


    @property
    def airport(self):
        """Idiomatic facade: client.airport.list() / client.airport.load({"id": ...})."""
        from entity.airport_entity import AirportEntity
        cached = getattr(self, "_airport", None)
        if cached is None:
            cached = AirportEntity(self, None)
            self._airport = cached
        return cached

    def Airport(self, data=None):
        # Deprecated: use client.airport instead.
        from entity.airport_entity import AirportEntity
        return AirportEntity(self, data)


    @property
    def cache(self):
        """Idiomatic facade: client.cache.list() / client.cache.load({"id": ...})."""
        from entity.cache_entity import CacheEntity
        cached = getattr(self, "_cache", None)
        if cached is None:
            cached = CacheEntity(self, None)
            self._cache = cached
        return cached

    def Cache(self, data=None):
        # Deprecated: use client.cache instead.
        from entity.cache_entity import CacheEntity
        return CacheEntity(self, data)


    @property
    def cwa(self):
        """Idiomatic facade: client.cwa.list() / client.cwa.load({"id": ...})."""
        from entity.cwa_entity import CwaEntity
        cached = getattr(self, "_cwa", None)
        if cached is None:
            cached = CwaEntity(self, None)
            self._cwa = cached
        return cached

    def Cwa(self, data=None):
        # Deprecated: use client.cwa instead.
        from entity.cwa_entity import CwaEntity
        return CwaEntity(self, data)


    @property
    def g_airmet(self):
        """Idiomatic facade: client.g_airmet.list() / client.g_airmet.load({"id": ...})."""
        from entity.g_airmet_entity import GAirmetEntity
        cached = getattr(self, "_g_airmet", None)
        if cached is None:
            cached = GAirmetEntity(self, None)
            self._g_airmet = cached
        return cached

    def GAirmet(self, data=None):
        # Deprecated: use client.g_airmet instead.
        from entity.g_airmet_entity import GAirmetEntity
        return GAirmetEntity(self, data)


    @property
    def metar(self):
        """Idiomatic facade: client.metar.list() / client.metar.load({"id": ...})."""
        from entity.metar_entity import MetarEntity
        cached = getattr(self, "_metar", None)
        if cached is None:
            cached = MetarEntity(self, None)
            self._metar = cached
        return cached

    def Metar(self, data=None):
        # Deprecated: use client.metar instead.
        from entity.metar_entity import MetarEntity
        return MetarEntity(self, data)


    @property
    def pirep(self):
        """Idiomatic facade: client.pirep.list() / client.pirep.load({"id": ...})."""
        from entity.pirep_entity import PirepEntity
        cached = getattr(self, "_pirep", None)
        if cached is None:
            cached = PirepEntity(self, None)
            self._pirep = cached
        return cached

    def Pirep(self, data=None):
        # Deprecated: use client.pirep instead.
        from entity.pirep_entity import PirepEntity
        return PirepEntity(self, data)


    @property
    def station_info(self):
        """Idiomatic facade: client.station_info.list() / client.station_info.load({"id": ...})."""
        from entity.station_info_entity import StationInfoEntity
        cached = getattr(self, "_station_info", None)
        if cached is None:
            cached = StationInfoEntity(self, None)
            self._station_info = cached
        return cached

    def StationInfo(self, data=None):
        # Deprecated: use client.station_info instead.
        from entity.station_info_entity import StationInfoEntity
        return StationInfoEntity(self, data)


    @property
    def taf(self):
        """Idiomatic facade: client.taf.list() / client.taf.load({"id": ...})."""
        from entity.taf_entity import TafEntity
        cached = getattr(self, "_taf", None)
        if cached is None:
            cached = TafEntity(self, None)
            self._taf = cached
        return cached

    def Taf(self, data=None):
        # Deprecated: use client.taf instead.
        from entity.taf_entity import TafEntity
        return TafEntity(self, data)


    @property
    def tcf(self):
        """Idiomatic facade: client.tcf.list() / client.tcf.load({"id": ...})."""
        from entity.tcf_entity import TcfEntity
        cached = getattr(self, "_tcf", None)
        if cached is None:
            cached = TcfEntity(self, None)
            self._tcf = cached
        return cached

    def Tcf(self, data=None):
        # Deprecated: use client.tcf instead.
        from entity.tcf_entity import TcfEntity
        return TcfEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
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
