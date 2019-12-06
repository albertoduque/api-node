const Knex = require('knex')

const knex = Knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT || 3306
    },
    log: {
        warn(message) {
            // sobre escribo la funcion para no mostrar eventos de desconexion en el pool
        }
    }
})

module.exports = knex