import topicModel from '../../models/topic'
import groupModel from "../../models/group";

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
            return ctx.send({"tid": max});
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async addreviewsreview(ctx, next) {
        console.log('----------------增加新的楼中楼-----------------------');
        let {tid = '', reviewindex=0, reviewmsg = {}} = ctx.request.body;
        console.log('tid=' + tid, 'reviewindex', reviewindex,'reviewmsg',reviewmsg)
        try {
            let data = await ctx.findOne(topicModel, {"tid": tid});
            if (!data) return ctx.send("无此讨论");
            if ( data.review[reviewindex]){
                if (data.review[reviewindex].review){
                    data.review[reviewindex].review.push(reviewmsg)
                }else{
                    data.review[reviewindex].review =[reviewmsg]
                }
                console.log(data)
            }else return ctx.send("无此回复");
            await ctx.update(topicModel, {tid: tid}, data);
            return ctx.send("回复成功");
        } catch (e) {
            return ctx.sendError(e)
        }
    },

}