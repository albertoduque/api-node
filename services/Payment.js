const db = require('./Database')
const ServiceError = require('./ServiceError')
const moment = require('moment')
const { intersection, difference } = require('lodash')
const uuidv3 = require('uuid/v3');
const creditCardType = require('credit-card-type');
const UUID = '1b671a64-40d5-491e-99b0-da01ff1f3341';
/**
 * Metodo que obtiene el token del usuario
 */
exports.getToken = async function(number, code, name, identificationNumber, expirationDate) {
    let token = uuidv3(`${number} ${code} ${identificationNumber}`, UUID);
    let cardType = creditCardType(number);
    let type = cardType[0].niceType;
    let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    savePaymentInformation(number, code, name, identificationNumber, expirationDate, token, createdAt)

    return { token, type, fecha: createdAt }
}

savePaymentInformation = async function(number, code, name, identificationNumber, expirationDate, token, createdAt) {
    await db('payment_information').insert({
        number,
        code,
        name,
        identification_number: identificationNumber,
        expiration_date: expirationDate,
        created_at: createdAt,
        token
    })
}

exports.createPayment = async function(nombre, correo, descripcion, monto, token, cuotas, metodo_pago, referencia, url_response, status) {
    let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    let paymentUuid = uuidv3(`${createdAt}`, token)
    savePayment(nombre, correo, descripcion, monto, token, cuotas, metodo_pago, referencia, url_response, status, createdAt, paymentUuid)

    return { paymentId: paymentUuid, status, fecha: createdAt }
}

savePayment = async function(nombre, correo, descripcion, monto, token, cuotas, metodo_pago, referencia, url_response, status, createdAt, paymentUuid) {
    await db('payments').insert({
        name: nombre,
        email: correo,
        description: descripcion,
        amount: monto,
        token,
        period: cuotas,
        payment_menthod: metodo_pago,
        reference: referencia,
        url_response,
        status,
        payment_uuid: paymentUuid,
        created_at: createdAt
    })
}

exports.reversePayment = async function(payment_id, status) {
    let updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
    let query = db('payments').where({ payment_uuid: payment_id })

    let result = await query

    if (result) {
        let res = db('payments').update({ status }).where('payment_uuid', payment_id)
        console.log(res)
    }

    return { estado: status, fecha_actualizacion: updatedAt }
}