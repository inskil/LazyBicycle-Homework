import topicModel from '../../models/topic'
import groupModel from "../../models/group";
import userModel from "../../models/user";
import noticeModel from "../../models/notice";

module.exports = {
    async list(ctx, next) {
        console.log('----------------按照所给数量分配固定条数小组list,0则all-----------------------');
        let {start = 1, count = 0} = ctx.request.query;
        console.log('count:' + count)
        try {
            let data = await ctx.find(topicModel, null, null, {
                limit: count,
                skip: (start - 1) * count,
                sort: {level: -1, createTime: -1}
            });
            console.log(data)
            return ctx.send(data)
        } catch (e) {
            console.log(e)
            return ctx.sendError(e)
        }
    },

    async OneInfoByKey(ctx, next) {
        console.log('----------------获取指定一条指定title的info-----------------------');
        let {title = ""} = ctx.request.query;
        try {
            let data = await ctx.findOne(topicModel, {"title": {$regex: title}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },

    async topicsByKey(ctx, next) {
        console.log('----------------获取指定多条指定title的info-----------------------');
        let {title = "", start = 1, count = 0} = ctx.request.query;
        try {
            let data = await ctx.find(topicModel, {"title": {$regex: title}}, null, {
                limit: count,
                skip: (start - 1) * count,
                sort: {level: -1, createTime: -1}
            });
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async addtopic(ctx, next) {
        console.log('----------------添加topic-----------------------');
        let data = ctx.request.body;
        let json = JSON.parse(JSON.stringify(data))
        try {
            json.createtime = (new Date()).Format("yyyy-MM-dd HH:mm:ss");
            json.updatetime = json.createtime;
            json.istop = false;
            json.isgood = false;
            let data = await ctx.add(topicModel, json);
            ctx.send('添加成功')
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async getnewtid(ctx, next) {

        console.log('----------------获取对应gid的新的tid-----------------------');
        let predata = ctx.request.body;
        try {
            let data = await ctx.findOne(groupModel, {gid: predata.gid});
            let max = data.topicmax + 0.001;
            console.log(max);
            let json = JSON.parse(JSON.stringify(data));
            json.topicmax = max;
            await ctx.update(groupModel, {gid: predata.gid}, json);
            max = max + data.gid;
            return ctx.send({"tid": max});
        } catch (e) {
            return ctx.sendError(e)
        }
    },

    async addreviewsreview(ctx, next) {
        console.log('----------------增加新的楼中楼-----------------------');
        let predata = ctx.request.body;
        console.log('tid=' + predata.tid, 'reviewindex', predata.reviewindex, 'reviewmsg', predata.reviewmsg)
        try {
            let data = await ctx.findOne(topicModel, {"tid": predata.tid});
            if (!data) return ctx.send("无此讨论");
            if (data.review[predata.reviewindex]) {
                if (data.review[predata.reviewindex].review) {
                    data.review[predata.reviewindex].review.push(predata.reviewmsg)
                } else {
                    data.review[predata.reviewindex].review = [predata.reviewmsg]
                }
                console.log(data)
            } else return ctx.send("无此回复");
            await ctx.update(topicModel, {tid: predata.tid}, data);
            //添加通知
            let tid = predata.tid;
            let tidstring = tid.toString();
            let gid = tidstring.split('.')[0];
            let noticedata = {
                gid : gid,
                uid : predata.reviewmsg.uid,
                username: predata.reviewmsg.username,
                userheadimg: predata.reviewmsg.userheadimg,
                touid: data.review[predata.reviewindex].uid,
                createtime: (new Date()).Format("yyyy-MM-dd HH:mm:ss"),
                type: "notice",
            }
            await ctx.add(noticeModel,noticedata)

            return ctx.send("回复成功");
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async addreview(ctx, next) {
        console.log('----------------添加review-----------------------');
        let predata = ctx.request.body;
        let prejson = JSON.parse(JSON.stringify(predata));
        try {
            let data = await ctx.findOne(topicModel, {tid: predata.tid});
            if (data) {
                let json = JSON.parse(JSON.stringify(data));
                json.updatetime = (new Date()).Format("yyyy-MM-dd HH:mm:ss");
                prejson.review.createtime = (new Date()).Format("yyyy-MM-dd HH:mm:ss");
                if (json["review"]) {
                    json["review"].push(prejson["review"]);
                } else {
                    json["review"] = prejson["review"];
                }

                //添加通知
                let tid = predata.tid;
                let tidstring = tid.toString();
                let gid = tidstring.split('.')[0];
                let noticedata = {
                    gid : gid,
                    uid : prejson.review.uid,
                    username: prejson.review.username,
                    userheadimg: prejson.review.userheadimg,
                    touid: data.uid,
                    createtime: (new Date()).Format("yyyy-MM-dd HH:mm:ss"),
                    type: "notice",
                }
                await ctx.add(noticeModel,noticedata)

                await ctx.update(topicModel, {tid: predata.tid}, json);
                ctx.send('添加成功')
            } else {
                ctx.sendError("无此topic")
            }
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async totop(ctx, next) {
        console.log('----------------置顶帖子-----------------------');
        let predata = ctx.request.body;
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});
            console.log(data);
            let count = data.admingroup.indexOf(predata.gid);
            if(count > -1){
                let data = await ctx.findOne(topicModel, {tid: predata.tid});
                if(data){
                    await ctx.update(topicModel, {tid: predata.tid}, {$set:{istop:true}});
                    return ctx.send(data);
                }else{
                    return ctx.sendError("该topic不存在");
                }
            }
            else {
                return ctx.sendError("该用户无此权限");
            }
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async togood(ctx, next) {
        console.log('----------------加精帖子-----------------------');
        let predata = ctx.request.body;
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});
            console.log(data);
            let count = data.admingroup.indexOf(predata.gid);
            if(count > -1){
                let data = await ctx.findOne(topicModel, {tid: predata.tid});
                if(data){
                    await ctx.update(topicModel, {tid: predata.tid}, {$set:{isgood:true}});
                    return ctx.send(data);
                }else{
                    return ctx.sendError("该topic不存在");
                }
            }
            else {
                return ctx.sendError("该用户无此权限");
            }
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async nottop(ctx, next) {
        console.log('----------------取消置顶帖子-----------------------');
        let predata = ctx.request.body;
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});
            console.log(data);
            let count = data.admingroup.indexOf(predata.gid);
            if(count > -1){
                let data = await ctx.findOne(topicModel, {tid: predata.tid});
                if(data){
                    await ctx.update(topicModel, {tid: predata.tid}, {$set:{istop:false}});
                    return ctx.send(data);
                }else{
                    return ctx.sendError("该topic不存在");
                }
            }
            else {
                return ctx.sendError("该用户无此权限");
            }
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async notgood(ctx, next) {
        console.log('----------------取消加精帖子-----------------------');
        let predata = ctx.request.body;
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});
            console.log(data);
            let count = data.admingroup.indexOf(predata.gid);
            if(count > -1){
                let data = await ctx.findOne(topicModel, {tid: predata.tid});
                if(data){
                    await ctx.update(topicModel, {tid: predata.tid}, {$set:{isgood:false}});
                    return ctx.send(data);
                }else{
                    return ctx.sendError("该topic不存在");
                }
            }
            else {
                return ctx.sendError("该用户无此权限");
            }
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async removeTopic(ctx, next) {
        console.log('----------------删除帖子-----------------------');
        let predata= ctx.request.body;
        console.log(predata)
        try {
            let tid = predata.tid;
            let tidstring = tid.toString();
            let gid = tidstring.split('.')[0];
            let data = await ctx.findOne(groupModel,  {"gid": gid});
            console.log(data)
            data.tid.remove(tid);
            await ctx.update(groupModel,{"gid": gid},data)
            await ctx.remove(topicModel,  {"tid": tid});
            return ctx.send("success")
        } catch (e) {
            return ctx.sendError(e)
        }
    },
}