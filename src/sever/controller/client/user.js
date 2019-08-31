import jwt from 'jsonwebtoken'
import conf from '../../config'
import userModel from '../../models/user'
import allmaxModel from "../../models/allmax";
import bookModel from "../../models/book";
import movieModel from "../../models/movie"

module.exports = {
    async login(ctx, next) {
        console.log('----------------登录接口 user/login-----------------------');
        console.log(ctx)
        console.log(ctx.request)
        let {username, pwd} = ctx.request.query;
        console.log(username)
        try {
            let data = await ctx.findOne(userModel, {username: username});
            console.log(data)
            if (!data) {
                return ctx.sendError('用户名不存在！');
            }
            if (pwd !== data.pwd) {
                return ctx.sendError('密码错误,请重新输入！');
            }
            await ctx.update(userModel, {_id: data._id}, {$set: {loginTime: new Date()}}) //更新登陆时间

            let payload = {
                username: data.username,
                name: data.name,
                _id: data._id,
                roles: data.roles
            }
            let token = jwt.sign(payload, conf.auth.admin_secret, {expiresIn: '24h'})  //token签名 有效期为24小时
            ctx.cookies.set(conf.auth.tokenKey, token, {
                httpOnly: false,  // 是否只用于http请求中获取
            });
            console.log('登陆成功')
            ctx.send({message: '登录成功',info:data});
        } catch (e) {
            if (e === '暂无数据') {
                console.log('用户名不存在')
                return ctx.sendError('用户名不存在');
            }
            ctx.throw(e);
            ctx.sendError(e)
        }

    },
    async info(ctx, next) {
        console.log('----------------获取用户信息接口 user/getUserInfo-----------------------');
        let token = ctx.request.query.token;
        try {
            let tokenInfo = jwt.verify(token, conf.auth.admin_secret);
            console.log(tokenInfo)
            ctx.send({
                username: tokenInfo.username,
                name: tokenInfo.name,
                _id: tokenInfo._id,
                roles: tokenInfo.roles
            })
        } catch (e) {
            if ('TokenExpiredError' === e.name) {
                ctx.sendError('鉴权失败, 请重新登录!');
                ctx.throw(401, 'token expired,请及时本地保存数据！');
            }
            ctx.throw(401, 'invalid token');
            ctx.sendError('系统异常!');
        }

    },

    async list(ctx, next) {
        console.log('----------------获取用户信息列表接口 user/getUserList-----------------------');
        let {keyword, pageindex = 1, pagesize = 10} = ctx.request.query;
        console.log('keyword:' + keyword + ',' + 'pageindex:' + pageindex + ',' + 'pagesize:' + pagesize)

        try {
            let reg = new RegExp(keyword, 'i')
            let data = await ctx.findPage(userModel, {
                $or: [
                    {name: {$regex: reg}},
                    {username: {$regex: reg}}
                ]
            }, {pwd: 0}, {limit: pagesize * 1, skip: (pageindex - 1) * pagesize});

            ctx.send(data)
        } catch (e) {
            console.log(e)
            ctx.sendError(e)
        }

    },

    async add(ctx, next) {
        console.log('----------------添加管理员 user/add-----------------------');
        let paramsData = ctx.request.query;
        console.log(paramsData)
        try {
            let data = await ctx.findOne(userModel, {username: paramsData.username})
            if (data) {
                ctx.sendError('数据已经存在, 请重新添加!')
            } else {
                let data = await ctx.add(userModel, paramsData);
                ctx.send(paramsData)
            }
        } catch (e) {
            ctx.sendError(e)
        }
    },
    async update(ctx, next) {
        console.log('----------------更新管理员 user/update-----------------------');
        let paramsData = ctx.request.body;
        console.log(paramsData)
        try {
            let data = await ctx.findOne(userModel, {uid: paramsData.uid})
            if (paramsData.old_pwd !== data.pwd) {
                return ctx.sendError('密码不匹配!')
            }
            delete paramsData.old_pwd
            await ctx.update(userModel, {_id: paramsData._id}, paramsData)
            ctx.send()
        } catch (e) {
            if (e === '暂无数据') {
                ctx.sendError(e)
            }
        }
    },

    async del(ctx, next) {
        console.log('----------------删除管理员 user/del-----------------------');
        let id = ctx.request.query.id
        try {
            ctx.remove(userModel, {_id: id})
            ctx.send()
        } catch (e) {
            ctx.sendError(e)
        }
    },
    async getnewuid(ctx, next) {
        console.log('----------------获取新的uid-----------------------');
        try {
            let data = await ctx.findOne(allmaxModel, {"name": "uidmax"});
            let uidmax = data.count + 1;
            console.log(uidmax);
            await ctx.update(allmaxModel, {name: "uidmax"}, {name: "uidmax", count: uidmax});
            return ctx.send({"uid": uidmax});
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async usergroup(ctx, next) {
        console.log('----------------返回用户所在所有小组id-----------------------');
        let predata = ctx.request.body;
        console.log(predata);
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid})
            console.log(data);
            return ctx.send(data.group);
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async isuserofgroup(ctx, next) {
        console.log('----------------查询所给uid是否属于所给gid的小组-----------------------');
        let predata = ctx.request.body;
        console.log(predata);
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});
            console.log(data);
            if (data) {
                let count = data.group.indexOf(predata.gid);
                if (count > -1) {
                    return ctx.send({result:true});
                } else {
                    return ctx.send({result:false});
                }
            } else {
                return ctx.send({result:false});
            }
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async isadminofgroup(ctx, next) {
        console.log('----------------返回是否该uid能够管理gid-----------------------');
        let predata = ctx.request.body;
        console.log(predata);
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});
            console.log(data);
            if (data) {
                let count = data.admingroup.indexOf(predata.gid);
                if (count > -1) {
                    return ctx.send({result:true});
                } else {
                    return ctx.send({result:false});
                }
            } else {
                return ctx.send({result:false});
            }

        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async likebook(ctx, next) {
        console.log('----------------用户收藏一本书-----------------------');
        let predata = ctx.request.body;
        console.log(predata);
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});
            let json = JSON.parse(JSON.stringify(data));
            let bookdata = await ctx.findOne(bookModel, {id: predata.bid});
            let likes = bookdata.likes + 1;
            if (!json.likebooks) {
                json.likebooks = [predata.bid];
            } else {
                if (json.likebooks.indexOf(predata.bid) > -1) {
                    return ctx.sendError("该书籍已被收藏");
                } else {
                    json.likebooks.push(predata.bid);
                }
            }
            await ctx.update(userModel, {uid: predata.uid}, json);
            await ctx.update(bookModel, {id: predata.bid}, {$set: {likes: likes}});
            return ctx.send({bid: predata.bid, likes: likes})
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async likemovie(ctx, next) {
        console.log('----------------用户收藏一个电影-----------------------');
        let predata = ctx.request.body;
        console.log(predata);
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});
            let json = JSON.parse(JSON.stringify(data));
            let moviedata = await ctx.findOne(movieModel, {id: predata.mid});
            let likes = moviedata.likes + 1;
            if (!json.likemovies) {
                json.likemovies = [predata.mid];
            } else {
                if (json.likemovies.indexOf(predata.mid) > -1) {
                    return ctx.sendError("该电影已被收藏");
                } else {
                    json.likemovies.push(predata.mid);
                }
            }
            await ctx.update(userModel, {uid: predata.uid}, json);
            await ctx.update(movieModel, {id: predata.mid}, {$set: {likes: likes}});
            return ctx.send({mid: predata.mid, likes: likes})
        } catch (e) {
            return ctx.sendError(e)
        }
    },

    async isuserlikebook(ctx, next) {
        console.log('----------------查询所给uid是否收藏了这本书-----------------------');
        let predata = ctx.request.body;
        console.log(predata);
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});
            console.log(data);
            if (data.likebooks.indexOf(predata.bid) > -1) {
                return ctx.send({result:true});
            } else {
                return ctx.send({result:false});
            }
        } catch (e) {
            return ctx.send({result:false});
        }
    },
    async isuserlikemovie(ctx, next) {
        console.log('----------------查询所给uid是否收藏了这个电影-----------------------');
        let predata = ctx.request.body;
        console.log(predata);
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});
            console.log(data);
            if (data.likemovies.indexOf(predata.mid) > -1) {
                return ctx.send({result:true});
            } else {
                return ctx.send({result:false});
            }
        } catch (e) {
            return ctx.send({result:false});
        }
    },
    async unlikebook(ctx, next) {
        console.log('----------------用户取消收藏一本书-----------------------');
        let predata = ctx.request.body;
        console.log(predata);
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});

            let bookdata = await ctx.findOne(bookModel, {id: predata.bid});
            let likes = bookdata.likes - 1;
            if (!data.likebooks) {
                return ctx.sendError("该书籍未被收藏");
            } else {
                if (data.likebooks.indexOf(predata.bid) > -1) {
                    data.likebooks.remove(predata.bid);
                    let json = JSON.parse(JSON.stringify(data));
                    await ctx.update(userModel, {uid: predata.uid}, json);
                    await ctx.update(bookModel, {id: predata.bid}, {$set: {likes: likes}});
                } else {
                    return ctx.sendError("该书籍未被收藏");
                }
            }
            return ctx.send({bid: predata.bid, likes: likes})
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async unlikemovie(ctx, next) {
        console.log('----------------用户取消收藏一个电影-----------------------');
        let predata = ctx.request.body;
        console.log(predata);
        try {
            let data = await ctx.findOne(userModel, {uid: predata.uid});
            let moviedata = await ctx.findOne(movieModel, {id: predata.mid});
            let likes = moviedata.likes - 1;
            if (!data.likemovies) {
                return ctx.sendError("该书籍未被收藏");
            } else {
                if (data.likemovies.indexOf(predata.mid) > -1) {
                    data.likemovies.remove(predata.mid);
                    let json = JSON.parse(JSON.stringify(data));
                    await ctx.update(userModel, {uid: predata.uid}, json);
                    await ctx.update(movieModel, {id: predata.mid}, {$set: {likes: likes}});
                } else {
                    return ctx.sendError("该书籍未被收藏");
                }
            }
            return ctx.send({mid: predata.mid, likes: likes})
        } catch (e) {
            return ctx.sendError(e)
        }
    },
}

