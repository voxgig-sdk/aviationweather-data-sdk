# AviationweatherData SDK utility: make_context

from aviationweatherdata_sdk.core.context import AviationweatherDataContext


def make_context_util(ctxmap, basectx):
    return AviationweatherDataContext(ctxmap, basectx)
