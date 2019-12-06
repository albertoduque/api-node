const lang = require('./lang_es')
module.exports = class ServiceError extends Error {
  constructor (code, info) {
    super(lang.errors[code])
    this.code = code
    this.info = info
    Error.captureStackTrace(this, ServiceError)
  }
}
