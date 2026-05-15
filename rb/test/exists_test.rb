# AviationweatherData SDK exists test

require "minitest/autorun"
require_relative "../AviationweatherData_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AviationweatherDataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
