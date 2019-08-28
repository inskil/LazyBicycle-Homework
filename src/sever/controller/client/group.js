import groupModel from '../../models/group'
import userModel from '../../models/user'
import allmaxModel from '../../models/allmax'
import {jsonjoin} from "./json";

module.exports = {
    async list(ctx, next) {
        console.log('----------------按照所给数量分配固定条数小组list,0则all-----------------------');
        let {start = 1, count = 0} = ctx.request.query;
        console.log('conut:' + count)
        try {
            let data = await ctx.find(groupModel, null, null, {
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
            let data = await ctx.findOne(topicModel, {"groupname": {$regex: title}});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },

    async groupsByKey(ctx, next) {
        console.log('----------------获取指定多条指定title的info-----------------------');
        let {title = "", start = 1, count = 0} = ctx.request.query;
        try {
            let data = await ctx.find(groupModel, {"groupname": {$regex: title}}, null, {
                limit: count,
                skip: (start - 1) * count,
                sort: {level: -1, createTime: -1}
            });
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async addgroup(ctx, next) {
        console.log('----------------添加新的小组-----------------------');
        let data = ctx.request.body;
        let json = JSON.parse(JSON.stringify(data))
        try {
            let groupmsg = json["groupmsg"]
            let data = await ctx.findOne(groupModel, {"groupname": {$regex: groupmsg["groupname"]}});
            if (data) {
                ctx.sendError('该小组名已被使用，请更改!')
            } else {
                let groupaddinfo = {
                    "createtime": (new Date()).Format("yyyy-MM-dd HH:mm:ss"),
                    "usercount": 1,
                    "user": [
                        {
                            "uid": json["uid"],
                            "username": json["username"],
                            "userheadimg": json["userheadimg"]
                        }
                    ],
                    "admin": [
                        {
                            "uid": json["uid"],
                            "username": json["username"],
                            "userheadimg": json["userheadimg"]
                        }
                    ],
                    "creator": {
                        "uid": json["uid"],
                        "username": json["username"],
                        "userheadimg": json["userheadimg"]
                    },
                    "topicmax": 0,
                    "tid": []
                }
                let groupdata = jsonjoin(groupmsg, groupaddinfo)
                console.log(groupdata)
                let data = await ctx.add(groupModel, groupdata);
                let user = await ctx.findOne(userModel, {"uid": json["uid"]});
                console.log(user)
                if (user["admingroup"]) {
                    user["admingroup"].push(groupmsg["gid"])
                } else {
                    user["admingroup"] = [groupmsg["gid"]]
                }
                if (user["group"]) {
                    user["group"].push(groupmsg["gid"])
                } else {
                    user["group"] = [groupmsg["gid"]]
                }
                console.log(user)
                await ctx.add(userModel, user);
                ctx.send('添加成功')
            }
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async getnewgid(ctx, next) {
        console.log('----------------获取新的gid-----------------------');

        try {
            let data = await ctx.findOne(allmaxModel, {"name": "gidmax"});
            let gidmax = data.count + 1;
            console.log(gidmax);
            await ctx.update(allmaxModel, {name: "gidmax"}, {name: "gidmax", count: gidmax});
            return ctx.send({"gid": gidmax});
        } catch (e) {
            return ctx.sendError(e)
        }
    },
}