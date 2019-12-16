const { camelCase } = require('lodash')
const fs = require('fs')
const path = require('path')

/**
 * Retorna colleccion de instancias de servicios en el directorio
 * nombrandolos de la misma manera. Cada sibdirectorio debe tener in index.js para ser tomado en cuenta
 */

var services = {}
let folder = __dirname
for (let file of fs.readdirSync(folder).filter(file => fs.lstatSync(path.join(folder, file)).isFile())) {
    const name = file.split('.')[0]
    if (name !== 'index') {
        services[camelCase(name)] = require(path.resolve(folder, name))
    }
}

module.exports = services