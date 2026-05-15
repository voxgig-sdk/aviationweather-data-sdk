# AviationweatherData SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AviationweatherDataUtility.registrar = ->(u) {
  u.clean = AviationweatherDataUtilities::Clean
  u.done = AviationweatherDataUtilities::Done
  u.make_error = AviationweatherDataUtilities::MakeError
  u.feature_add = AviationweatherDataUtilities::FeatureAdd
  u.feature_hook = AviationweatherDataUtilities::FeatureHook
  u.feature_init = AviationweatherDataUtilities::FeatureInit
  u.fetcher = AviationweatherDataUtilities::Fetcher
  u.make_fetch_def = AviationweatherDataUtilities::MakeFetchDef
  u.make_context = AviationweatherDataUtilities::MakeContext
  u.make_options = AviationweatherDataUtilities::MakeOptions
  u.make_request = AviationweatherDataUtilities::MakeRequest
  u.make_response = AviationweatherDataUtilities::MakeResponse
  u.make_result = AviationweatherDataUtilities::MakeResult
  u.make_point = AviationweatherDataUtilities::MakePoint
  u.make_spec = AviationweatherDataUtilities::MakeSpec
  u.make_url = AviationweatherDataUtilities::MakeUrl
  u.param = AviationweatherDataUtilities::Param
  u.prepare_auth = AviationweatherDataUtilities::PrepareAuth
  u.prepare_body = AviationweatherDataUtilities::PrepareBody
  u.prepare_headers = AviationweatherDataUtilities::PrepareHeaders
  u.prepare_method = AviationweatherDataUtilities::PrepareMethod
  u.prepare_params = AviationweatherDataUtilities::PrepareParams
  u.prepare_path = AviationweatherDataUtilities::PreparePath
  u.prepare_query = AviationweatherDataUtilities::PrepareQuery
  u.result_basic = AviationweatherDataUtilities::ResultBasic
  u.result_body = AviationweatherDataUtilities::ResultBody
  u.result_headers = AviationweatherDataUtilities::ResultHeaders
  u.transform_request = AviationweatherDataUtilities::TransformRequest
  u.transform_response = AviationweatherDataUtilities::TransformResponse
}
