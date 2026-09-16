# AviationweatherData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AviationweatherDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      AviationweatherDataBaseFeature.new
    when "ratelimit"
      AviationweatherDataRatelimitFeature.new
    when "retry"
      AviationweatherDataRetryFeature.new
    when "test"
      AviationweatherDataTestFeature.new
    when "timeout"
      AviationweatherDataTimeoutFeature.new
    else
      AviationweatherDataBaseFeature.new
    end
  end
end
