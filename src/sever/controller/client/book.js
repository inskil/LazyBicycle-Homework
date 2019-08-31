import bookModel from '../../models/book'
import allmaxModel from "../../models/allmax";

module.exports = {
    async list(ctx, next) {
        console.log('----------------按照所给数量分配固定条数书籍list,0则all-----------------------');
        let {start = 1, count = 0} = ctx.request.query;
        console.log('conut:' + count)
        try {
            let data = await ctx.find(bookModel, null, null, {
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
            let data = await ctx.findOne(bookModel, {"title": {$regex: title}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },

    async booksByKey(ctx, next) {
        console.log('----------------获取指定多条指定title的info-----------------------');
        let {title = "", start = 1, count = 0} = ctx.request.query;
        try {
            let data = await ctx.find(bookModel, {"title": {$regex: title}}, null, {
                limit: count,
                skip: (start - 1) * count,
                sort: {level: -1, createTime: -1}
            });
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async getnewbid(ctx, next) {
        console.log('----------------获取新的bid-----------------------');
        try {
            let data = await ctx.findOne(allmaxModel, {"name": "bidmax"});
            let bidmax = data.count + 1;
            console.log(bidmax);
            await ctx.update(allmaxModel, {name: "bidmax"}, {name: "bidmax", count: bidmax});
            return ctx.send({"bid": bidmax});
        } catch (e) {
            return ctx.sendError(e)
        }
    },

    async addnewbook(ctx, next) {
        console.log('----------------获取指定一条指定title的info-----------------------');
        let {title = ""} = ctx.request.query;
        try {
            let data = await ctx.findOne(bookModel, {"title": {$regex: title}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async removeBook(ctx, next) {
        console.log('----------------删除一本书-----------------------');
        let predata = ctx.request.body;
        console.log(predata)
        try {
            let bid = predata.bid;
            //let newbid = bid.toString();
            await ctx.remove(bookModel, {"id": bid});
            return ctx.send("success")
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async updatebookrate(ctx, next) {
        console.log('----------------更新书的评分-----------------------');
        let predata = ctx.request.body;
        console.log(predata)
        try {
            let bid = predata.bid;
            let bookdata = await ctx.findOne(bookModel, {id: bid});
            let ave = 0 + bookdata.rating[0].average;
            let num = 0 + bookdata.rating[0].numRaters;
            let rate = ave * num;
            rate = rate + predata.rate;
            bookdata.rating[0].average = rate / (num + 1);
            bookdata.rating[0].numRaters = num + 1;
            await ctx.update(bookModel, {id: bid}, bookdata)
            return ctx.send({"rate": rate / (num + 1)})
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async addbook(ctx, next) {
        console.log('----------------增加新的book-----------------------');
        let {isbn13 = "", bid = -1, bookmsg} = ctx.request.body;
        try {
            let data = await ctx.findOne(bookModel, {"isbn13": isbn13});
            if (!data) {
                bookmsg.id = bid;
                bookmsg.likes = 0;
                bookmsg.rating = [{
                    max: 10.0,
                    numRaters: 0,
                    average: 0,
                    min: 0.0
                }];
                await ctx.add(bookModel, bookmsg);
                return ctx.send(bookmsg);
            } else {
                return ctx.sendError("已有此书")
            }
        } catch (e) {
            console.log(e)
            return ctx.sendError(e)
        }
    },

}