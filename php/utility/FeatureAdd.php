<?php
declare(strict_types=1);

// AviationweatherData SDK utility: feature_add

class AviationweatherDataFeatureAdd
{
    public static function call(AviationweatherDataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
