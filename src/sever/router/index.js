import koaRouter from 'koa-router'

const router = koaRouter()

export default app => {

    /*----------------------user-------------------------------*/
    router.post('/user/login', app.client.user.login)
    router.get('/user/info', app.client.user.info)
    router.get('/user/list', app.client.user.list)
    router.post('/user/add', app.client.user.add)
    router.post('/user/update', app.client.user.update)
    router.get('/user/del', app.client.user.del)
    router.post('/user/getnewuid',app.client.user.getnewuid)
    router.get('/user/usergroup',app.client.user.usergroup)
    router.get('/user/isuserofgroup',app.client.user.isuserofgroup)
    router.get('/user/isadminofgroup',app.client.user.isadminofgroup)
    /*----------------------movie-------------------------------*/
    router.get('/movie', app.client.movie.list)
    router.get('/onemoviebykey', app.client.movie.OneInfoByKey)
    router.get("/moviesbykey", app.client.movie.moviesByKey)
    router.post('/getnewmid',app.client.movie.getnewmid)

    /*----------------------book------------------------------*/
    router.get('/book', app.client.book.list)
    router.get('/onebookbykey', app.client.book.OneInfoByKey)
    router.get('/booksbykey', app.client.book.booksByKey)
    router.post('/getnewbid',app.client.book.getnewbid)
    //router.get('/booklist', app.client.book.list)
    //router.get('/bookreview', app.client.book.review)

    /*----------------------review-----------------------------*/
    router.get('/bookreview', app.client.review.bookreview)
    router.get('/moviereview', app.client.review.moviereview)

    /*----------------------group-----------------------------*/
    router.get('/group', app.client.group.list)
    router.post('/addgroup', app.client.group.addgroup)
    router.post('/getnewgid',app.client.group.getnewgid)
    router.post('/delgroup',app.admin.group.delgroup)
    router.post('/joingroup',app.client.group.joingroup)
    router.post('/quitgroup',app.client.group.quitgroup)
    router.get('/onegroupbykey', app.client.group.OneInfoByKey)
    router.get('/groupsbykey', app.client.group.groupsByKey)


    /*----------------------topic-----------------------------*/
    router.get('/topic', app.client.topic.list)
    router.get('/onetopicbykey', app.client.topic.OneInfoByKey)
    router.get('/topicsbykey', app.client.topic.topicsByKey)
    router.get('/topic/addtopic', app.client.topic.addtopic)
    router.get('/topic/getnewtid', app.client.topic.getnewtid)
    router.get('/topic/addreviewsreview', app.client.topic.addreviewsreview)

    /*----------------------search-----------------------------*/
    router.get('/search', app.client.search.search)
    router.get('/search/movie',app.client.movie.moviesByKey)
    router.get('/search/book',app.client.book.booksByKey)
    router.get('/search/topic',app.client.topic.topicsByKey)
    router.get('/search/group',app.client.group.groupsByKey)

    app.use(router.routes()).use(router.allowedMethods());
}