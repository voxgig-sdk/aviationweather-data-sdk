-- AviationweatherData SDK error

local AviationweatherDataError = {}
AviationweatherDataError.__index = AviationweatherDataError


function AviationweatherDataError.new(code, msg, ctx)
  local self = setmetatable({}, AviationweatherDataError)
  self.is_sdk_error = true
  self.sdk = "AviationweatherData"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AviationweatherDataError:error()
  return self.msg
end


function AviationweatherDataError:__tostring()
  return self.msg
end


return AviationweatherDataError
