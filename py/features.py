# AviationweatherData SDK feature factory

from feature.base_feature import AviationweatherDataBaseFeature
from feature.test_feature import AviationweatherDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AviationweatherDataBaseFeature(),
        "test": lambda: AviationweatherDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
