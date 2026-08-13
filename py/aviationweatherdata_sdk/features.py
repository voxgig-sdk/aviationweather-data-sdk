# AviationweatherData SDK feature factory

from aviationweatherdata_sdk.feature.base_feature import AviationweatherDataBaseFeature
from aviationweatherdata_sdk.feature.test_feature import AviationweatherDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AviationweatherDataBaseFeature(),
        "test": lambda: AviationweatherDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
