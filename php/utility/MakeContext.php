<?php
declare(strict_types=1);

// AviationweatherData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AviationweatherDataMakeContext
{
    public static function call(array $ctxmap, ?AviationweatherDataContext $basectx): AviationweatherDataContext
    {
        return new AviationweatherDataContext($ctxmap, $basectx);
    }
}
