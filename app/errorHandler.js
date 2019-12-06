const { errors } = require('../services/ServiceError/lang_es')
const moment = require('moment')

module.exports = async function (ctx, next) {
  try {
    await next()
    if (process.env.NODE_ENV === 'development') {
      console.error(`----->[${moment().format('YYYY-MM-DD HH:mm:ss')}]`, ctx.method, ctx.path, ctx.query, ctx.request.body)
      console.log('<-----', ctx.status, ctx.body)
    }
  } catch (err) {
    if (err.code && errors[err.code]) {
      ctx.status = 400
      ctx.body = { description: errors[err.code], code: err.code, info: err.info }
    } else {
      ctx.status = err.status || 500
      switch (err.status) {
        case 403:
          ctx.body = 'Permiso denegado para relizar esta acción'
          break
        case 401:
          ctx.body = 'Unauthorized'
          break
        default:
          if (process.env.NODE_ENV !== 'development') {
            console.error(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`, ctx.method, ctx.path, ctx.query, ctx.request.body, err)
          }
          ctx.body = 'Lo sentimos ha ocurrido un error'
          break
      }
    }
    if (process.env.NODE_ENV === 'development') {
      console.error(`----->[${moment().format('YYYY-MM-DD HH:mm:ss')}]`, ctx.method, ctx.path, ctx.query, ctx.headers, ctx.request.body, err)
      console.log('<-----', ctx.status, ctx.body)
    }
  }
}
