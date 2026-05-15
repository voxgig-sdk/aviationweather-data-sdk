<?php
declare(strict_types=1);

// AviationweatherData SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

AviationweatherDataUtility::setRegistrar(function (AviationweatherDataUtility $u): void {
    $u->clean = [AviationweatherDataClean::class, 'call'];
    $u->done = [AviationweatherDataDone::class, 'call'];
    $u->make_error = [AviationweatherDataMakeError::class, 'call'];
    $u->feature_add = [AviationweatherDataFeatureAdd::class, 'call'];
    $u->feature_hook = [AviationweatherDataFeatureHook::class, 'call'];
    $u->feature_init = [AviationweatherDataFeatureInit::class, 'call'];
    $u->fetcher = [AviationweatherDataFetcher::class, 'call'];
    $u->make_fetch_def = [AviationweatherDataMakeFetchDef::class, 'call'];
    $u->make_context = [AviationweatherDataMakeContext::class, 'call'];
    $u->make_options = [AviationweatherDataMakeOptions::class, 'call'];
    $u->make_request = [AviationweatherDataMakeRequest::class, 'call'];
    $u->make_response = [AviationweatherDataMakeResponse::class, 'call'];
    $u->make_result = [AviationweatherDataMakeResult::class, 'call'];
    $u->make_point = [AviationweatherDataMakePoint::class, 'call'];
    $u->make_spec = [AviationweatherDataMakeSpec::class, 'call'];
    $u->make_url = [AviationweatherDataMakeUrl::class, 'call'];
    $u->param = [AviationweatherDataParam::class, 'call'];
    $u->prepare_auth = [AviationweatherDataPrepareAuth::class, 'call'];
    $u->prepare_body = [AviationweatherDataPrepareBody::class, 'call'];
    $u->prepare_headers = [AviationweatherDataPrepareHeaders::class, 'call'];
    $u->prepare_method = [AviationweatherDataPrepareMethod::class, 'call'];
    $u->prepare_params = [AviationweatherDataPrepareParams::class, 'call'];
    $u->prepare_path = [AviationweatherDataPreparePath::class, 'call'];
    $u->prepare_query = [AviationweatherDataPrepareQuery::class, 'call'];
    $u->result_basic = [AviationweatherDataResultBasic::class, 'call'];
    $u->result_body = [AviationweatherDataResultBody::class, 'call'];
    $u->result_headers = [AviationweatherDataResultHeaders::class, 'call'];
    $u->transform_request = [AviationweatherDataTransformRequest::class, 'call'];
    $u->transform_response = [AviationweatherDataTransformResponse::class, 'call'];
});
