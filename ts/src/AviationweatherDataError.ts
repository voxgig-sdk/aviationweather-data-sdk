
import { Context } from './Context'


class AviationweatherDataError extends Error {

  isAviationweatherDataError = true

  sdk = 'AviationweatherData'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AviationweatherDataError
}

