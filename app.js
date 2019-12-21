const Koa = require('koa')
const app = new Koa()

const Cache = require('./cache')
const cache = new Cache({
    durTime: 1000,
    paths: ['/getSuperData']
})

app.use(cache.init)

app.listen(3000, () => {
    console.log('监听3000');
})
