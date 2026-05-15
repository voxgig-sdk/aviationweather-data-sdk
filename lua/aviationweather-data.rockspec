package = "voxgig-sdk-aviationweather-data"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/aviationweather-data-sdk.git"
}
description = {
  summary = "AviationweatherData SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["aviationweather-data_sdk"] = "aviationweather-data_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
