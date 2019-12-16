const jwt = require('jsonwebtoken')
const moment = require('moment')

/**
 * Middleware para el manejo del token JWT
 */
module.exports = async function(ctx, next) {
    let token
    if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer') {
      token = ctx.headers.authorization.split(' ')[1]
    }
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, payload) => {
          if (err) {
            ctx.state = 401
            ctx.state.errorDescription = 'Error verificando el token'
            console.log(ctx.state)
          }
          try {
              console.log(err)
              ctx.state.username = payload.username
              ctx.state.payload = payload
              ctx.state.token = token
              ctx.state.isAuthenticated = true
            } catch (e) {
              if (process.env.NODE_ENV === 'development') {
                  console.log(e)
              }
              ctx.state.errorDescription = 'Error verificando el token'
          }
        })
    }
    await next()
}