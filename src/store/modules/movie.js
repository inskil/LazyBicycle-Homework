import axios from '../../utils/fetch'

const movie = {
    state: {
        list: [],
        homeList: [],
        info: {},
        currType: '',
        count: 5,
        loadingMore: false,
        loadingBol: true
    },
    mutations: {
        MOVIELIST(state, res) {
            state.list = res;
        },
        MOVIEINFO(state, res) {
            state.info = res.data;
        }
    },
    actions: {
        // 获取列表
        async getMovieList({commit, state}, params){
            //params.type = params.type === 'all' ? null : params.type
            state.loadingMore = true
            state.loadingBol = false
            return new Promise((resolve, reject) => {
                axios.get('movie').then(res => {
                    state.loadingMore = false;
                    resolve(res)
                    //if (res.data.length <= 0 && params.pageindex > 1) return
                    //if (params.count> 1) {
                    //    commit('BOOKLIST', state.list.concat(res.data))
                    //} else {
                    commit('MOVIELIST', res.data)
                    //}
                    if (res.data.length >= state.count) {
                        state.loadingBol = true;
                    }
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },

        // 获取多条数据详情
        getMovieInfo({commit}, title) {
            return new Promise((resolve, reject) => {
                axios.get('/moviesbykey', {title}).then(res => {
                    commit('MOVIEINFO', res)
                    resolve(res)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
        // 获取一条数据详情
        getOneMovieInfo({commit}, title) {
            return new Promise((resolve, reject) => {
                axios.get('/onemoviebykey ', {title}).then(res => {
                    commit('MOVIEINFO', res)
                    resolve(res)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        }
    }
}
export default movie