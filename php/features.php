<?php
declare(strict_types=1);

// AviationweatherData SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AviationweatherDataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AviationweatherDataBaseFeature();
            case "test":
                return new AviationweatherDataTestFeature();
            default:
                return new AviationweatherDataBaseFeature();
        }
    }
}
