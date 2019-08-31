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
    router.post('/user/likebook',app.client.user.likebook)
    router.post('/user/likemovie',app.client.user.likemovie)
    router.post('/user/isuserlikebook',app.client.user.isuserlikebook)
    router.post('/user/isuserlikemovie',app.client.user.isuserlikemovie)
    router.post('/user/unlikebook',app.client.user.unlikebook)
    router.post('/user/unlikemovie',app.client.user.unlikemovie)
    /*----------------------movie-------------------------------*/
    router.get('/movie', app.client.movie.list)
    router.get('/onemoviebykey', app.client.movie.OneInfoByKey)
    router.get("/moviesbykey", app.client.movie.moviesByKey)
    router.post('/getnewmid',app.client.movie.getnewmid)
    router.post('/removeMovie',app.client.movie.removeMovie)
    router.get('/addmovie',app.client.movie.addmovie)
    router.post('/updatemovierate',app.client.movie.updatemovierate)
    /*----------------------book------------------------------*/
    router.get('/book', app.client.book.list)
    router.get('/onebookbykey', app.client.book.OneInfoByKey)
    router.get('/booksbykey', app.client.book.booksByKey)
    router.post('/getnewbid',app.client.book.getnewbid)
    //router.get('/booklist', app.client.book.list)
    //router.get('/bookreview', app.client.book.review)
    router.post('/removeBook',app.client.book.removeBook)
    router.get('/addbook',app.client.book.addbook)
    router.post('/updatebookrate',app.client.book.updatebookrate)


    /*----------------------review-----------------------------*/
    router.get('/bookreview', app.client.review.bookreview)
    router.get('/moviereview', app.client.review.moviereview)
    router.post('/addmoviereview', app.client.review.addmoviereview)
    router.post('/addbookreview', app.client.review.addbookreview)

    /*----------------------group-----------------------------*/
    router.get('/group', app.client.group.list)
    router.post('/addgroup', app.client.group.addgroup)
    router.post('/getnewgid',app.client.group.getnewgid)
    router.post('/delgroup',app.admin.group.delgroup)
    router.post('/joingroup',app.client.group.joingroup)
    router.post('/quitgroup',app.client.group.quitgroup)
    router.get('/onegroupbykey', app.client.group.OneInfoByKey)
    router.get('/groupsbykey', app.client.group.groupsByKey)
    router.post('/removeGroup',app.client.group.removeGroup)

    /*----------------------topic-----------------------------*/
    router.get('/topic', app.client.topic.list)
    router.get('/onetopicbykey', app.client.topic.OneInfoByKey)
    router.get('/topicsbykey', app.client.topic.topicsByKey)
    router.post('/topic/addtopic', app.client.topic.addtopic)
    router.get('/topic/getnewtid', app.client.topic.getnewtid)
    router.get('/topic/addreviewsreview', app.client.topic.addreviewsreview)
    router.get('/topic/addreview', app.client.topic.addreview)
    router.post('/topic/totop', app.client.topic.totop)
    router.post('/topic/togood', app.client.topic.togood)
    router.post('/topic/nottop', app.client.topic.nottop)
    router.post('/topic/notgood', app.client.topic.notgood)
    router.post('/topic/removeTopic', app.client.topic.removeTopic)

    /*----------------------search-----------------------------*/
    router.get('/search', app.client.search.search)
    router.get('/search/movie',app.client.movie.moviesByKey)
    router.get('/search/book',app.client.book.booksByKey)
    router.get('/search/topic',app.client.topic.topicsByKey)
    router.get('/search/group',app.client.group.groupsByKey)

    /*----------------------imgs-----------------------------*/
    router.post('/upload', app.client.img.upload)
    /*----------------------notice-----------------------------*/
    router.post('/notice/newapply', app.client.notice.newapply)
    router.get('/notice/listnotice', app.client.notice.listnotice)
    router.get('/notice/agreeapply', app.client.notice.agreeapply)
    router.post('/notice/disagreeapply', app.client.notice.disagreeapply)
    router.post('/notice/readnotice', app.client.notice.readnotice)
    router.post('/notice/readsuccess', app.client.notice.readsuccess)


    app.use(router.routes()).use(router.allowedMethods());
}