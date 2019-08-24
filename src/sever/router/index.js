import fs from 'fs'
import path from 'path'
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

    /*----------------------movie-------------------------------*/
    router.get('/movie', app.client.movie.list)
    router.get('/onemoviebykey', app.client.movie.OneInfoByKey)
    router.get("/moviesbykey", app.client.movie.moviesByKey)

    /*----------------------book------------------------------*/
    router.get('/book', app.client.book.list)
    router.get('/onebookbykey', app.client.book.OneInfoByKey)
    router.get('/booksbykey', app.client.book.booksByKey)
    //router.get('/booklist', app.client.book.list)
    //router.get('/bookreview', app.client.book.review)

    /*----------------------review-----------------------------*/
    router.get('/bookreview', app.client.review.bookreview)
    router.get('/moviereview', app.client.review.moviereview)

    /*----------------------search-----------------------------*/
    router.get('/search', app.client.search.search)


    app.use(router.routes()).use(router.allowedMethods());
}