import reviewModel from '../../models/review'
import bookreviewModel from '../../models/bookreview'
import path from 'path'

module.exports = {
    async bookreview(ctx, next) {
        console.log('----------------按照所给数量分配所给id和条数的评论,0则all-----------------------');
        let { id="" ,start=1,count=0 } = ctx.request.query;
        try {
            let data = await ctx.find(bookreviewModel,{"id" : {$regex:id}},null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async moviereview(ctx, next) {
        console.log('----------------按照所给数量分配所给id和条数的评论,0则all-----------------------');
        let { id="" ,start=1,count=0 } = ctx.request.query;
        try {
            let data = await ctx.find(reviewModel,{"id" : {$regex:id}},null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
            console.log(data)
            return ctx.send(data)
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },

    async OneInfoByKey(ctx, next) {
        console.log('----------------获取指定一条指定titleid的info-----------------------');
        let { title="" } = ctx.request.query;
        try{
            let data = await ctx.findOne(bookModel,{"title" : {$regex:title}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },

}