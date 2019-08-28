import reviewModel from '../../models/review'
import bookreviewModel from '../../models/bookreview'
import path from 'path'

module.exports = {
    async bookreview(ctx, next) {
        console.log('----------------按照所给数量分配所给id和条数的评论,0则all-----------------------');
        let { id="" ,start=1,count=0 } = ctx.request.query;
        try {
            let data = await ctx.find(bookreviewModel,{"start" : id},null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async moviereview(ctx, next) {
        console.log('----------------按照所给数量分配所给id和条数的评论,0则all-----------------------');
        let { id="" ,start=1,count=0 } = ctx.request.query;
        try {
            let data = await ctx.find(reviewModel,{"start" :id},null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
            console.log(data)
            return ctx.send(data)
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },
    async addmoviereview(ctx, next) {
        console.log('----------------增加新的review-----------------------');
        let { mid="",review } = ctx.request.body;
        try {
            let data = await ctx.findOne(reviewModel,{"start" :mid});
            if (!data){ //如果没有这本书的任何review
                let newreview ={
                    "count":1,
                    "comments":[review],
                    "start":mid,
                }
                let redata = await ctx.add(reviewModel,newreview)
                return ctx.send("添加成功")
            }else{  //如果有这本书的review，add
                data.comments.push(review)
                data.count++
                let redata = await ctx.update(reviewModel,{"start" :mid},data)
                return ctx.send("添加成功")
            }
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },
    async addbookreview(ctx, next) {
        console.log('----------------增加新的review-----------------------');
        let { bid="",review } = ctx.request.body;
        try {
            let data = await ctx.findOne(bookreviewModel,{"start" :bid});
            if (!data){ //如果没有这本书的任何review
                let newreview ={
                    "count":1,
                    "comments":[review],
                    "start":bid,
                }
                let redata = await ctx.add(bookreviewModel,newreview)
                return ctx.send("添加成功")
            }else{  //如果有这本书的review，add
                data.comments.push(review)
                data.count++
                let redata = await ctx.update(bookreviewModel,{"start":bid},data)
                return ctx.send("添加成功")
            }
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }
    },

}