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
    async removeMovie(ctx, next) {
        console.log('----------------删除一个电影-----------------------');
        let predata= ctx.request.body;
        console.log(predata)
        try {
            let mid = predata.mid;
            let newmid = mid.toString();
            await ctx.remove(movieModel,  {"id": newmid});
            return ctx.send("success")
        } catch (e) {
            return ctx.sendError(e)
        }
    },

    async updatemovierate(ctx, next) {
        console.log('----------------更新movie的评分-----------------------');
        let predata= ctx.request.body;
        console.log(predata)
        try {
            let mid = predata.mid;
            let moviedata = await ctx.findOne(movieModel,{id:mid});
            let ave = 0 + moviedata.rating[0].average;
            let num = 123 + moviedata.rating[0].numRaters;
            let rate = ave * num;
            rate = rate + predata.rate;
            moviedata.rating[0].average = rate / (num + 1);
            moviedata.rating[0].numRaters = num + 1;
            await ctx.update(movieModel,{id:mid},moviedata)
            return ctx.send({"rate":rate / (num + 1)})
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async addmovie(ctx, next) {
        console.log('----------------增加新的movie-----------------------');
        let { mid = -1,moviemsg } = ctx.request.body;
        try {
            let data = await ctx.findOne(movieModel,{id :mid});
            if(!data){
                moviemsg.id = mid;
                moviemsg.likes = 0;
                moviemsg.rating = [{
                    max : 10.0,
                    numRaters : 0,
                    average : 0,
                    min : 0.0
                }];
                await ctx.add(movieModel,moviemsg);
                return ctx.send(moviemsg);
            }else{
                return ctx.sendError("已有此书")
            }
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },
}