const jwt = require('jsonwebtoken')
const moment = require('moment')

/**
 * Middleware para el manejo del token JWT
 */
module.exports = async function(ctx, next) {
    let token = ctx.headers.token
    console.log(ctx.headers)
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, payload) => {
                if (err) {
                    ctx.state = 401
                    ctx.state.errorDescription = 'Error verificando el token'
                }
                console.log(payload.username)
                ctx.state.username = payload.username
                next()
            })
            /*if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer') {
                token = ctx.headers.authorization.split(' ')[1]
            }
            if (token) {
                try {
                    let payload = jwt.decode(token, process.env.SECRET)
                    console.log("pa" + payload)
                    ctx.state.payload = payload
                    ctx.state.token = token
                    ctx.state.isAuthenticated = true
                } catch (e) {
                    if (process.env.NODE_ENV === 'development') {
                        console.log(e)
                    }
                    ctx.state.errorDescription = 'Error verificando el token'
                }
            }*/
    }
   // next()
}