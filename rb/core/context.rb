# AviationweatherData SDK context

require_relative '../utility/struct/voxgig_struct'
require_relative 'control'
require_relative 'operation'
require_relative 'spec'
require_relative 'result'
require_relative 'response'
require_relative 'error'
require_relative 'helpers'

class AviationweatherDataContext
  attr_accessor :id, :out, :client, :utility, :ctrl, :meta, :config,
                :entopts, :options, :entity, :shared, :opmap,
                :data, :reqdata, :match, :reqmatch, :point,
                :spec, :result, :response, :op

  def initialize(ctxmap = {}, basectx = nil)
    ctxmap ||= {}
    @id = "C#{rand(10000000..99999999)}"
    @out = {}

    @client = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "client") || basectx&.client
    @utility = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "utility") || basectx&.utility

    @ctrl = AviationweatherDataControl.new
    ctrl_raw = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "ctrl")
    if ctrl_raw.is_a?(Hash)
      @ctrl.throw_err = ctrl_raw["throw"] if ctrl_raw.key?("throw")
      @ctrl.explain = ctrl_raw["explain"] if ctrl_raw["explain"].is_a?(Hash)
    elsif basectx&.ctrl
      @ctrl = basectx.ctrl
    end

    m = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "meta")
    @meta = m.is_a?(Hash) ? m : (basectx&.meta || {})

    cfg = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "config")
    @config = cfg.is_a?(Hash) ? cfg : basectx&.config

    eo = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "entopts")
    @entopts = eo.is_a?(Hash) ? eo : basectx&.entopts

    o = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "options")
    @options = o.is_a?(Hash) ? o : basectx&.options

    e = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "entity")
    @entity = e || basectx&.entity

    s = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "shared")
    @shared = s.is_a?(Hash) ? s : basectx&.shared

    om = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "opmap")
    @opmap = om.is_a?(Hash) ? om : (basectx&.opmap || {})

    @data = AviationweatherDataHelpers.to_map(AviationweatherDataHelpers.get_ctx_prop(ctxmap, "data")) || {}
    @reqdata = AviationweatherDataHelpers.to_map(AviationweatherDataHelpers.get_ctx_prop(ctxmap, "reqdata")) || {}
    @match = AviationweatherDataHelpers.to_map(AviationweatherDataHelpers.get_ctx_prop(ctxmap, "match")) || {}
    @reqmatch = AviationweatherDataHelpers.to_map(AviationweatherDataHelpers.get_ctx_prop(ctxmap, "reqmatch")) || {}

    pt = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "point")
    @point = pt.is_a?(Hash) ? pt : basectx&.point

    sp = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "spec")
    @spec = sp.is_a?(AviationweatherDataSpec) ? sp : basectx&.spec

    r = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "result")
    @result = r.is_a?(AviationweatherDataResult) ? r : basectx&.result

    rp = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "response")
    @response = rp.is_a?(AviationweatherDataResponse) ? rp : basectx&.response

    opname = AviationweatherDataHelpers.get_ctx_prop(ctxmap, "opname") || ""
    @op = resolve_op(opname)
  end

  def resolve_op(opname)
    return @opmap[opname] if @opmap[opname]
    return AviationweatherDataOperation.new({}) if opname.empty?

    entname = @entity&.respond_to?(:get_name) ? @entity.get_name : "_"
    opcfg = VoxgigStruct.getpath(@config, "entity.#{entname}.op.#{opname}")

    input = (opname == "update" || opname == "create") ? "data" : "match"

    points = []
    if opcfg.is_a?(Hash)
      t = VoxgigStruct.getprop(opcfg, "points")
      points = t if t.is_a?(Array)
    end

    op = AviationweatherDataOperation.new({
      "entity" => entname,
      "name" => opname,
      "input" => input,
      "points" => points,
    })
    @opmap[opname] = op
    op
  end

  def make_error(code, msg)
    AviationweatherDataError.new(code, msg, self)
  end
end
