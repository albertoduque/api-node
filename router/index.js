const Router = require('koa-router')
const paymentController = require('./PaymentsController')

module.exports = function(app) {
    const router = new Router()

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