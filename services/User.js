const db = require('./Database')
const ServiceError = require('./ServiceError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async function(username, password) {
    let query = db('user').where({ username })
    let result = await query
    if (!result) {
        return { res: 'acceso denegado' }
    }

    let { username: usernameDb, password: passwordDb } = result[0]

    if (!bcrypt.compareSync(password, passwordDb)) {
        return { message: 'Usuario o contraseña no son correctos' }
    }

    let token = jwt.sign({
        username
    }, process.env.SECRET, { expiresIn: process.env.CADUCIDAD_TOKEN })

    return { token }
}

exports.saveUser = async function(name, username, password) {
    await db('user').insert({
        name,
        username,
        password: bcrypt.hashSync(password, 10)
    })

    return true
}