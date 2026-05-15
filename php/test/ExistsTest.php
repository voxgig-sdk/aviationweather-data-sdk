<?php
declare(strict_types=1);

// AviationweatherData SDK exists test

require_once __DIR__ . '/../aviationweatherdata_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AviationweatherDataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
