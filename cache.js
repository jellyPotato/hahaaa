class Cache {
    constructor(options) {
        this.list = {}
        this.path = ''
        this.paths = options.paths
        this.durTime = options.durTime
    }
    // 是否需要缓存
    checkPath = () => {
        return this.paths.includes(this.path)
    }
    // 是否存在缓存
    checkCache = () => {
        return !!this.list[this.path]
    }
    // 是否过期
    isTimeout = () => {
        return (this.checkCache() && (Date.parse(new Date()) - this.list[this.path].saveTime > this.durTime))
    }
    // 获取数据
    getData = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve((new Date()).toLocaleString())
            }, 200)
        })
    }
    // init方法
    init = async (ctx, next) => {
        this.path = ctx.request.path
        if(this.checkPath()) {
            if(!this.checkCache() || this.isTimeout()) {
                this.list[this.path] = {
                    saveTime: Date.parse(new Date()) ,
                    val: await this.getData(),
                    path: this.path
                }
            }
            ctx.body = this.list[this.path] 
        }
        await next()
    }
}

module.exports = Cache