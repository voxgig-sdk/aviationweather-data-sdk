<?php
declare(strict_types=1);

// AviationweatherData SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class AviationweatherDataSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new AviationweatherDataUtility();
        $this->_utility = $utility;

        $config = AviationweatherDataConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = AviationweatherDataHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = AviationweatherDataHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, AviationweatherDataFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return AviationweatherDataUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = AviationweatherDataHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = AviationweatherDataHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = AviationweatherDataHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new AviationweatherDataSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = AviationweatherDataHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = AviationweatherDataHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_air_sigmet = null;

    // Canonical facade: $client->AirSigmet()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->air_sigmet()
    // resolves here too.
    public function AirSigmet($data = null)
    {
        require_once __DIR__ . '/entity/air_sigmet_entity.php';
        if ($data === null) {
            if ($this->_air_sigmet === null) {
                $this->_air_sigmet = new AirSigmetEntity($this, null);
            }
            return $this->_air_sigmet;
        }
        return new AirSigmetEntity($this, $data);
    }


    private $_airport = null;

    // Canonical facade: $client->Airport()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->airport()
    // resolves here too.
    public function Airport($data = null)
    {
        require_once __DIR__ . '/entity/airport_entity.php';
        if ($data === null) {
            if ($this->_airport === null) {
                $this->_airport = new AirportEntity($this, null);
            }
            return $this->_airport;
        }
        return new AirportEntity($this, $data);
    }


    private $_cache = null;

    // Canonical facade: $client->Cache()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cache()
    // resolves here too.
    public function Cache($data = null)
    {
        require_once __DIR__ . '/entity/cache_entity.php';
        if ($data === null) {
            if ($this->_cache === null) {
                $this->_cache = new CacheEntity($this, null);
            }
            return $this->_cache;
        }
        return new CacheEntity($this, $data);
    }


    private $_cwa = null;

    // Canonical facade: $client->Cwa()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cwa()
    // resolves here too.
    public function Cwa($data = null)
    {
        require_once __DIR__ . '/entity/cwa_entity.php';
        if ($data === null) {
            if ($this->_cwa === null) {
                $this->_cwa = new CwaEntity($this, null);
            }
            return $this->_cwa;
        }
        return new CwaEntity($this, $data);
    }


    private $_g_airmet = null;

    // Canonical facade: $client->GAirmet()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->g_airmet()
    // resolves here too.
    public function GAirmet($data = null)
    {
        require_once __DIR__ . '/entity/g_airmet_entity.php';
        if ($data === null) {
            if ($this->_g_airmet === null) {
                $this->_g_airmet = new GAirmetEntity($this, null);
            }
            return $this->_g_airmet;
        }
        return new GAirmetEntity($this, $data);
    }


    private $_metar = null;

    // Canonical facade: $client->Metar()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->metar()
    // resolves here too.
    public function Metar($data = null)
    {
        require_once __DIR__ . '/entity/metar_entity.php';
        if ($data === null) {
            if ($this->_metar === null) {
                $this->_metar = new MetarEntity($this, null);
            }
            return $this->_metar;
        }
        return new MetarEntity($this, $data);
    }


    private $_pirep = null;

    // Canonical facade: $client->Pirep()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pirep()
    // resolves here too.
    public function Pirep($data = null)
    {
        require_once __DIR__ . '/entity/pirep_entity.php';
        if ($data === null) {
            if ($this->_pirep === null) {
                $this->_pirep = new PirepEntity($this, null);
            }
            return $this->_pirep;
        }
        return new PirepEntity($this, $data);
    }


    private $_station_info = null;

    // Canonical facade: $client->StationInfo()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->station_info()
    // resolves here too.
    public function StationInfo($data = null)
    {
        require_once __DIR__ . '/entity/station_info_entity.php';
        if ($data === null) {
            if ($this->_station_info === null) {
                $this->_station_info = new StationInfoEntity($this, null);
            }
            return $this->_station_info;
        }
        return new StationInfoEntity($this, $data);
    }


    private $_taf = null;

    // Canonical facade: $client->Taf()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->taf()
    // resolves here too.
    public function Taf($data = null)
    {
        require_once __DIR__ . '/entity/taf_entity.php';
        if ($data === null) {
            if ($this->_taf === null) {
                $this->_taf = new TafEntity($this, null);
            }
            return $this->_taf;
        }
        return new TafEntity($this, $data);
    }


    private $_tcf = null;

    // Canonical facade: $client->Tcf()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->tcf()
    // resolves here too.
    public function Tcf($data = null)
    {
        require_once __DIR__ . '/entity/tcf_entity.php';
        if ($data === null) {
            if ($this->_tcf === null) {
                $this->_tcf = new TcfEntity($this, null);
            }
            return $this->_tcf;
        }
        return new TcfEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new AviationweatherDataSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
