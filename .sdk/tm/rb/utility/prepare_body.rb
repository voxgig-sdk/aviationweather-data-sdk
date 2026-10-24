# AviationweatherData SDK utility: prepare_body
require_relative 'media'
module AviationweatherDataUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return AviationweatherDataUtilities.raw_body(ctx.reqdata) if AviationweatherDataUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
