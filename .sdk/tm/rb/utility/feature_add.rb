# AviationweatherData SDK utility: feature_add
module AviationweatherDataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
