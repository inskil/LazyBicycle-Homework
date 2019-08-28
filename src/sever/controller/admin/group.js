import groupModel from '../../models/group'

module.exports = {
    async delgroup(ctx, next) {
        console.log('----------------删除指定gid的小组-----------------------');
        let { gid="" } = ctx.request.query;
        try{
            let data = await ctx.remove(groupModel,{"gid":gid});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },


}