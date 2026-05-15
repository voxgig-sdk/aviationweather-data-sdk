<?php
declare(strict_types=1);

// AviationweatherData SDK utility: result_headers

class AviationweatherDataResultHeaders
{
    public static function call(AviationweatherDataContext $ctx): ?AviationweatherDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
