require('dotenv').config()
const Koa = require('koa')

// configuracion de modulos de la aplicacion
const moment = require('./app/moment')

// inicializacion de la aplicacion
const app = new Koa()

if (process.env.NODE_ENV !== 'development') {
    app.proxy = true
}

app.context.services = require('./services')

// middlewares
app.use(require('koa-body')({ multipart: true }))
app.use(async(ctx, next) => {
    await next()
})
app.use(require('./app/cors'))
app.use(require('./app/jwt'))
app.use(require('./app/errorHandler'))

const router = require('./router')(app)
app.use(router.routes())
app.use(router.allowedMethods())

const port = Number(process.env.PORT || 3000)

app.listen(port)
console.log(`[API ${moment().format('YYYY/MM/DD HH:mm:ss')}] listening on port: ${port}`)