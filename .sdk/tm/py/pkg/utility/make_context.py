# AviationweatherData SDK utility: make_context

from projectname_sdk.core.context import AviationweatherDataContext


def make_context_util(ctxmap, basectx):
    return AviationweatherDataContext(ctxmap, basectx)
