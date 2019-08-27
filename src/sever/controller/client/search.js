import bookModel from '../../models/book'
import movieModel from '../../models/movie'
import path from 'path'
import topicModel from "../../models/topic";
import groupModel from "../../models/group";

module.exports = {
    async search(ctx, next) {
        console.log('----------------按照所给数量分配固定条数书籍list,0则all-----------------------');
        let { title='',start=1,count=0 } = ctx.request.query;
        console.log('title:'+title+'  count:'+count+'  start='+start);
        try {
            let searchkey = {"title" : {$regex:title}};
            let bookdata = await ctx.find(bookModel,searchkey,null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
            let moviedata = await ctx.find(movieModel,searchkey,null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
            let topicdata = await ctx.find(topicModel,searchkey,null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
            let groupdata = await ctx.find(groupModel,{"groupname" : {$regex:title}},null,{limit: count, skip: (start-1)*count, sort: {level: -1, createTime: -1}});
            let data = {
                'book':bookdata,
                'movie':moviedata,
                'topic':topicdata,
                'group':groupdata,
            } ;
            console.log(data);
            return ctx.send(data);
        }catch (e){
            console.log(e);
            return ctx.sendError(e)
        }
    },

}