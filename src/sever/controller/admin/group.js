import groupModel from '../../models/group'

module.exports = {
    async addgroup(ctx, next) {
        console.log('----------------获取指定一条指定title的info-----------------------');
        let { title="" } = ctx.request.query;
        try{
            let data = await ctx.findOne(topicModel,{"groupname" : {$regex:title}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },


}