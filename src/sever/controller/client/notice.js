import applyModel from '../../models/apply'
import groupModel from '../../models/group'
import userModel from '../../models/user'

module.exports = {
    async newapply(ctx, next) {
        console.log('----------------新增申请-----------------------');
        let predata = ctx.request.body;
        try {
            let groupdata = await ctx.findOne(groupModel, {gid:predata.gid});
            predata.touid = groupdata.creator.uid;
            predata.applytime = (new Date()).Format("yyyy-MM-dd HH:mm:ss");
            await ctx.add(applyModel,predata)
            return ctx.send("success");
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },
    async listapply(ctx, next) {
        console.log('----------------按照所给数量分配固定条数applylist,0则all-----------------------');
        let {start = 1, count = 0,uid = -1}= ctx.request.body;
        console.log('count:' + count)
        try {
            let data = await ctx.find(applyModel, {touid :uid}, null, {
                limit: count,
                skip: (start - 1) * count,
                sort: {applytime:-1}
            });
            console.log(data)
            return ctx.send(data)
        } catch (e) {
            console.log(e)
            return ctx.sendError(e)
        }
    },
    async agreeapply(ctx, next) {
        console.log('----------------同意申请-----------------------');
        let predata = ctx.request.body;
        try {
            let applydata = await ctx.findOne(applyModel, {uid:predata.uid,touid:predata.touid});
            console.log(applydata);
            let gid = applydata.gid;
            let usermsg = {
                uid : applydata.uid,
                username : applydata.username,
                userheadimg : applydata.userheadimg,
            }
            console.log(userdata);
            let userdata = await ctx.findOne(userModel, {uid:predata.uid});
            if (userdata && userdata["admingroup"] !== null) {
                if (userdata.admingroup.indexOf(gid) > -1) return ctx.sendError("已管理小组");
                userdata["admingroup"].push(gid)
            } else {
                userdata["admingroup"] = [gid]
            }
            let groupdata = await ctx.findOne(groupModel,{gid:gid});
            console.log(groupdata);
            if (groupdata && groupdata["admin"] !== null) {
                if (groupdata.admin.indexOf(gid) > -1) return ctx.sendError("已在小组管理中");
                groupdata["admin"].push(usermsg)
            } else {
                groupdata["admin"] = [usermsg]
            }
            await ctx.update(groupModel,{gid:gid},groupdata);
            await ctx.update(userModel,{uid:predata.uid},userdata);
            await ctx.remove(applyModel, {uid:predata.uid,touid:predata.touid});
            return ctx.send("success");
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },
    async disagreeapply(ctx, next) {
        console.log('----------------不同意申请-----------------------');
        let predata = ctx.request.body;
        try {
            let applydata = await ctx.findOne(applyModel, {uid:predata.uid,touid:predata.touid});
            console.log(applydata);
            await ctx.remove(applyModel, {uid:predata.uid,touid:predata.touid});
            return ctx.send("success");
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },
}
