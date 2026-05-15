# ProjectName SDK exists test

import pytest
from aviationweatherdata_sdk import AviationweatherDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AviationweatherDataSDK.test(None, None)
        assert testsdk is not None
