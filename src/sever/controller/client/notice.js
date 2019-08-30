import noticeModel from '../../models/notice'
import groupModel from '../../models/group'
import userModel from '../../models/user'

module.exports = {
    async newapply(ctx, next) {
        console.log('----------------新增申请-----------------------');
        let predata = ctx.request.body;
        try {
            let groupdata = await ctx.findOne(groupModel, {gid:predata.gid});
            predata.touid = groupdata.creator.uid;
            predata.createtime = (new Date()).Format("yyyy-MM-dd HH:mm:ss");
            predata.type = "apply";
            await ctx.add(noticeModel,predata);
            return ctx.send("success");
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },
    async listnotice(ctx, next) {
        console.log('----------------按照所给数量分配固定条数noticelist,0则all-----------------------');
        let {start = 1, count = 0,uid = -1}= ctx.request.query;
        console.log('count:' + count)
        try {
            let data = await ctx.find(noticeModel, {touid :uid}, null, {
                limit: count,
                skip: (start - 1) * count,
                sort: {createtime:-1}
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
            let noticedata = await ctx.findOne(noticeModel, {uid:predata.uid,touid:predata.touid});
            console.log(noticedata);
            let gid = noticedata.gid;
            let usermsg = {
                uid : noticedata.uid,
                username : noticedata.username,
                userheadimg : noticedata.userheadimg,
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

            //下面是添加通知
            let newnoticedata = {
                gid : gid,
                uid : noticedata.touid,
                username: groupdata.creator.username,
                userheadimg: groupdata.creator.userheadimg,
                touid: noticedata.uid,
                createtime: (new Date()).Format("yyyy-MM-dd HH:mm:ss"),
                type: "success",
            };
            await ctx.add(noticeModel,newnoticedata);

            await ctx.update(groupModel,{gid:gid},groupdata);
            await ctx.update(userModel,{uid:predata.uid},userdata);
            await ctx.remove(noticeModel, {_id:predata._id,uid:predata.uid,touid:predata.touid});
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
            let noticedata = await ctx.findOne(noticeModel, {_id:predata._id,uid:predata.uid,touid:predata.touid});
            console.log(noticedata);
            await ctx.remove(noticeModel, {uid:predata.uid,touid:predata.touid});
            return ctx.send("success");
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },
    async readnotice(ctx, next) {
        console.log('----------------已读消息-----------------------');
        let predata = ctx.request.body;
        try {
            let noticedata = await ctx.findOne(noticeModel, {_id:predata._id,uid:predata.uid,touid:predata.touid});
            console.log(noticedata);
            await ctx.remove(noticeModel, {uid:predata.uid,touid:predata.touid});
            return ctx.send("success");
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },
    async readsuccess(ctx, next) {
        console.log('----------------已读success-----------------------');
        let predata = ctx.request.body;
        try {
            let noticedata = await ctx.findOne(noticeModel, {_id:predata._id,uid:predata.uid,touid:predata.touid});
            console.log(noticedata);
            await ctx.remove(noticeModel, {uid:predata.uid,touid:predata.touid});
            return ctx.send("success");
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },
}
