const getters = {
    // app
    screen_width: state => state.app.screen_width,
    pc_width: state => state.app.pc_width,
    pc_bol: state => state.app.pc_bol,

    // // blog
    // blogTypes: state => state.blog.types,
    // blogList: state => state.blog.list,
    // blogInfo: state => state.blog.info,
    // blogLoadingMore: state => state.blog.loadingMore,
    // blogLoadingBol: state => state.blog.loadingBol,

    // books
    bookTypes: state => state.book.types,
    bookList:state => state.book.list,
    bookInfo: state => state.book.info,
    bookLoadingMore: state => state.book.loadingMore,
    bokLoadingBol: state => state.book.loadingBol,

    //movie
    movieList:state => state.movie.list,


}
export default getters