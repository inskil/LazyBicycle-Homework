const path = require('path');

module.exports = {
    async upload(ctx, next) {
        console.log('----------------上传图片-----------------------');
        try {
            let opts = {
                path: path.resolve(__dirname, '../../../../public')
            }
            let result = await ctx.uploadFile(ctx, opts)
            ctx.send(result)
        } catch (e) {
            return ctx.sendError(e)
        }
    },
}