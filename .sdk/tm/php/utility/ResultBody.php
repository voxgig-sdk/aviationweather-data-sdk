<?php
declare(strict_types=1);

// AviationweatherData SDK utility: result_body

class AviationweatherDataResultBody
{
    public static function call(AviationweatherDataContext $ctx): ?AviationweatherDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
