-- AviationweatherData SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local AviationweatherDataSDK = {}
AviationweatherDataSDK.__index = AviationweatherDataSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

AviationweatherDataSDK._make_feature = _make_feature


function AviationweatherDataSDK.new(options)
  local self = setmetatable({}, AviationweatherDataSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function AviationweatherDataSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function AviationweatherDataSDK:get_utility()
  return Utility.copy(self._utility)
end


function AviationweatherDataSDK:get_root_ctx()
  return self._rootctx
end


function AviationweatherDataSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function AviationweatherDataSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:air_sigmet():list() / client:air_sigmet():load({ id = ... })
function AviationweatherDataSDK:air_sigmet(data)
  local EntityMod = require("entity.air_sigmet_entity")
  if data == nil then
    if self._air_sigmet == nil then
      self._air_sigmet = EntityMod.new(self, nil)
    end
    return self._air_sigmet
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:air_sigmet() instead.
function AviationweatherDataSDK:AirSigmet(data)
  local EntityMod = require("entity.air_sigmet_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:airport():list() / client:airport():load({ id = ... })
function AviationweatherDataSDK:airport(data)
  local EntityMod = require("entity.airport_entity")
  if data == nil then
    if self._airport == nil then
      self._airport = EntityMod.new(self, nil)
    end
    return self._airport
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:airport() instead.
function AviationweatherDataSDK:Airport(data)
  local EntityMod = require("entity.airport_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:cache():list() / client:cache():load({ id = ... })
function AviationweatherDataSDK:cache(data)
  local EntityMod = require("entity.cache_entity")
  if data == nil then
    if self._cache == nil then
      self._cache = EntityMod.new(self, nil)
    end
    return self._cache
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:cache() instead.
function AviationweatherDataSDK:Cache(data)
  local EntityMod = require("entity.cache_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:cwa():list() / client:cwa():load({ id = ... })
function AviationweatherDataSDK:cwa(data)
  local EntityMod = require("entity.cwa_entity")
  if data == nil then
    if self._cwa == nil then
      self._cwa = EntityMod.new(self, nil)
    end
    return self._cwa
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:cwa() instead.
function AviationweatherDataSDK:Cwa(data)
  local EntityMod = require("entity.cwa_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:g_airmet():list() / client:g_airmet():load({ id = ... })
function AviationweatherDataSDK:g_airmet(data)
  local EntityMod = require("entity.g_airmet_entity")
  if data == nil then
    if self._g_airmet == nil then
      self._g_airmet = EntityMod.new(self, nil)
    end
    return self._g_airmet
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:g_airmet() instead.
function AviationweatherDataSDK:GAirmet(data)
  local EntityMod = require("entity.g_airmet_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:metar():list() / client:metar():load({ id = ... })
function AviationweatherDataSDK:metar(data)
  local EntityMod = require("entity.metar_entity")
  if data == nil then
    if self._metar == nil then
      self._metar = EntityMod.new(self, nil)
    end
    return self._metar
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:metar() instead.
function AviationweatherDataSDK:Metar(data)
  local EntityMod = require("entity.metar_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:pirep():list() / client:pirep():load({ id = ... })
function AviationweatherDataSDK:pirep(data)
  local EntityMod = require("entity.pirep_entity")
  if data == nil then
    if self._pirep == nil then
      self._pirep = EntityMod.new(self, nil)
    end
    return self._pirep
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:pirep() instead.
function AviationweatherDataSDK:Pirep(data)
  local EntityMod = require("entity.pirep_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:station_info():list() / client:station_info():load({ id = ... })
function AviationweatherDataSDK:station_info(data)
  local EntityMod = require("entity.station_info_entity")
  if data == nil then
    if self._station_info == nil then
      self._station_info = EntityMod.new(self, nil)
    end
    return self._station_info
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:station_info() instead.
function AviationweatherDataSDK:StationInfo(data)
  local EntityMod = require("entity.station_info_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:taf():list() / client:taf():load({ id = ... })
function AviationweatherDataSDK:taf(data)
  local EntityMod = require("entity.taf_entity")
  if data == nil then
    if self._taf == nil then
      self._taf = EntityMod.new(self, nil)
    end
    return self._taf
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:taf() instead.
function AviationweatherDataSDK:Taf(data)
  local EntityMod = require("entity.taf_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:tcf():list() / client:tcf():load({ id = ... })
function AviationweatherDataSDK:tcf(data)
  local EntityMod = require("entity.tcf_entity")
  if data == nil then
    if self._tcf == nil then
      self._tcf = EntityMod.new(self, nil)
    end
    return self._tcf
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:tcf() instead.
function AviationweatherDataSDK:Tcf(data)
  local EntityMod = require("entity.tcf_entity")
  return EntityMod.new(self, data)
end




function AviationweatherDataSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = AviationweatherDataSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return AviationweatherDataSDK
