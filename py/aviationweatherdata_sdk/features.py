# AviationweatherData SDK feature factory

from aviationweatherdata_sdk.feature.base_feature import AviationweatherDataBaseFeature
from aviationweatherdata_sdk.feature.ratelimit_feature import AviationweatherDataRatelimitFeature
from aviationweatherdata_sdk.feature.retry_feature import AviationweatherDataRetryFeature
from aviationweatherdata_sdk.feature.test_feature import AviationweatherDataTestFeature
from aviationweatherdata_sdk.feature.timeout_feature import AviationweatherDataTimeoutFeature


_FEATURES = {
    "base": lambda: AviationweatherDataBaseFeature(),
    "ratelimit": lambda: AviationweatherDataRatelimitFeature(),
    "retry": lambda: AviationweatherDataRetryFeature(),
    "test": lambda: AviationweatherDataTestFeature(),
    "timeout": lambda: AviationweatherDataTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
