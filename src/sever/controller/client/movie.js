import movieModel from '../../models/movie'
import allmaxModel from "../../models/allmax";

module.exports = {
    async list(ctx, next) {
        console.log('----------------按照所给数量分配固定条数电影list,0则all-----------------------');
        let { start=1,count=0 } = ctx.request.query;
        console.log('conut:'+count)
        try {
            let data = await ctx.find(movieModel,null,null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
            console.log(data)
            return ctx.send(data)
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },

    async OneInfoByKey(ctx, next) {
        console.log('----------------获取指定一条指定title的info-----------------------');
        let { title="" } = ctx.request.query;
        try{
            let data = await ctx.findOne(movieModel,{"title" : {$regex:title}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },

    async moviesByKey(ctx, next) {
        console.log('----------------获取指定多条指定titleid的info-----------------------');
        let { title="" ,start=1,count=0 } = ctx.request.query;
        try {
            let data = await ctx.find(movieModel,{"title" : {$regex:title}},null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async getnewmid(ctx, next) {
        console.log('----------------获取新的mid-----------------------');

        try {
            let data = await ctx.findOne(allmaxModel, {"name":"midmax"});
            let midmax = data.count+1;
            console.log(midmax);
            await ctx.update(allmaxModel,{name:"midmax"},{name:"midmax",count:midmax});
            return ctx.send({"mid":midmax});
        } catch (e) {
            return ctx.sendError(e)
        }
    },
}