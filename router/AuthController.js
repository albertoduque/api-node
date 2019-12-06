const UsersService = require('../services/Users')

/**
 * Endpoint que devuelve el la informacion del usuario logueado y setea
 * una cookie de session para aplicaciones web
 * @param  {Object} ctx Contexto de la aplicacion
 */
exports.getWebSession = async function(ctx) {
    const { key, email, name, photo, roles, company, clientConfig } = ctx.state.user
    ctx.cookies.set(process.env.COOKIE_KEY, ctx.state.token)
    let arrPermission = await UsersService.getUserPermissions({ userId: key })

    let clients
    if (arrPermission.find(item => item.name === 'admin_clients' && item.value === true)) {
        clients = await ctx.services.clients.getClientsConfiguration()
    }

    ctx.body = {
        status: 'Cookie asignada',
        userData: {
            correo: email,
            foto: photo,
            nombre: name,
            roles,
            permissions: arrPermission,
            id: key,
            empresa: company
        },
        clientConfig,
        clients
    }
}

/**
 * Endpoint que alimina la cookie para aplicaciones web
 * @param  {Object} ctx Contexto de la aplicacion
 */
exports.removeWebSession = async function(ctx) {
    ctx.cookies.set(process.env.COOKIE_KEY, '')
    ctx.body = { status: 'Cookie eliminada' }
}