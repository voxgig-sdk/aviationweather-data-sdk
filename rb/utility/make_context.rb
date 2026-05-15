# AviationweatherData SDK utility: make_context
require_relative '../core/context'
module AviationweatherDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    AviationweatherDataContext.new(ctxmap, basectx)
  }
end
