const Router = require('koa-router')
const paymentController = require('./PaymentsController')
const authController = require('./AuthController')

module.exports = function(app) {
    const router = new Router()

    router.get('/user', authController.getUser)
    router.post('/login', authController.autorization)
    router.post('/user', authController.createUser)
    router.post('/payment/token', paymentController.getToken)
    router.post('/payment', paymentController.createPayment)
    router.put('/payment/reverse', paymentController.reversePayment)

    app.context.router = router
    return router
}

async function securityBasic(ctx, next) {
    if (!ctx.state.isAuthenticated) {
        ctx.throw(401, ctx.state.errorDescription)
    }

    await next()
}

async function clientSecurity(ctx, next) {
    if (!ctx.state.client) {
        ctx.throw(401)
    }

    await next()
}