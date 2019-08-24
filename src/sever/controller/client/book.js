import bookModel from '../../models/book'
import movieModel from '../../models/movie'
import path from 'path'

module.exports = {
    async list(ctx, next) {
        console.log('----------------按照所给数量分配固定条数书籍list,0则all-----------------------');
        let { start=1,count=0 } = ctx.request.query;
        console.log('conut:'+count)
        try {
            let data = await ctx.find(bookModel,null,null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
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
            let data = await ctx.findOne(bookModel,{"title" : {$regex:title}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },

    async booksByKey(ctx, next) {
        console.log('----------------获取指定多条指定title的info-----------------------');
        let { title="" ,start=1,count=0 } = ctx.request.query;
        try {
            let data = await ctx.find(bookModel,{"title" : {$regex:title}},null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    }
}