module.exports = async function (ctx, next) {
  ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
  ctx.set('Access-Control-Allow-Credentials', 'true')
  ctx.set('Access-Control-Allow-Headers', 'authorization, content-type')
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')

  if (ctx.method === 'OPTIONS') {
    ctx.body = ''
    return
  }

  await next()
}
