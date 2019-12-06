const paymentService = require('../services/Payment')
const PENDING_PAYMENT = 'pending_payment'
const PAID = 'paid'
const REJECTED = 'rejected'

/**
 * Endpoint que devuelve un token
 */
exports.getToken = async function(ctx) {
    let { number, code, name, identificationNumber, expirationDate } = ctx.request.body
    let token = await paymentService.getToken(number, code, name, identificationNumber, expirationDate)

    ctx.body = token
}

exports.createPayment = async function(ctx) {
    let { nombre, correo, descripcion, monto, token, cuotas, metodo_pago, referencia, url_response } = ctx.request.body
    let response = await paymentService.createPayment(nombre, correo, descripcion, monto, token, cuotas, metodo_pago, referencia, url_response, PENDING_PAYMENT)

    ctx.body = response
}

exports.reversePayment = async function(ctx) {
    let { payment_id } = ctx.request.body
    let response = await paymentService.reversePayment(payment_id, REJECTED)

    ctx.body = response
}