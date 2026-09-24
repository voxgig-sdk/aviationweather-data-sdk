"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AviationweatherDataError = void 0;
class AviationweatherDataError extends Error {
    isAviationweatherDataError = true;
    sdk = 'AviationweatherData';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.AviationweatherDataError = AviationweatherDataError;
//# sourceMappingURL=AviationweatherDataError.js.map