<?php
declare(strict_types=1);

// AviationweatherData SDK utility: feature_hook

class AviationweatherDataFeatureHook
{
    public static function call(AviationweatherDataContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
