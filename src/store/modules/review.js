import axios from '../../utils/fetch'
/* eslint-disable */
const review = {
    state: {
        movieReviewList: [],
        bookReviewList: []
    },
    mutations: {
        MREVIEWLIST(state, res) {
            state.movieReviewList = res;
        },
        BREVIEWLIST(state, res) {
            state.bookReviewList = res;
        },
    },
    actions: {
        // 获取列表
        async getbookreviewList({commit, state},id) {
            //console.log("sssssssssssssssssssssssssssssss")
            //params.type = params.type === 'all' ? null : params.type
            state.loadingMore = true
            state.loadingBol = false
            return new Promise((resolve, reject) => {
                axios.get('/bookreview', {id:id}).then(res => {
                    state.loadingMore = false;
                    resolve(res)
                    //console.log("sssssgetsgettttsssssssssss")
                     console.log(res.data)
                    // res.data.sort(function (a, b) {
                    //     return b.review.length - a.review.length
                    // });
                    commit('BREVIEWLIST', res.data[0].comments)
                    //}
                    // if (res.data.length >= state.count) {
                    //     state.loadingBol = true;
                    // }
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })
        },
        async addbookreview({commit}, params) {
            return new Promise((resolve, reject) => {
                axios.post('/addbookreview ', params).then(res => {
                    resolve(res)
                    console.log('/addreview', res)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
    }
}
export default review