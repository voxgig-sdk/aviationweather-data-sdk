<?php
declare(strict_types=1);

// AviationweatherData SDK utility: prepare_body

class AviationweatherDataPrepareBody
{
    public static function call(AviationweatherDataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
