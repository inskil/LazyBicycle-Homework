import axios from '../../utils/fetch'
import {bookTypes} from './classify'

const book = {
    state: {
        types: bookTypes,
        list: [],
        homeList: [],
        info: {},
        currType: '',
        count: 5,
        loadingMore: false,
        loadingBol: true
    },
    mutations: {
        BOOKLIST(state, res) {
            state.list = res;
        },
        BOOKINFO(state, res) {
            state.info = res.data;
        }
    },
    actions: {
        // 获取列表
        async getBookList({commit, state}, params){
            params.count = params.count || state.count
            //params.type = params.type === 'all' ? null : params.type
            state.loadingMore = true
            state.loadingBol = false
            return new Promise((resolve, reject) => {
                axios.get('book', params).then(res => {
                    state.loadingMore = false;
                    resolve(res)
                    //if (res.data.length <= 0 && params.pageindex > 1) return
                    //if (params.count> 1) {
                    //    commit('BOOKLIST', state.list.concat(res.data))
                    //} else {
                        commit('BOOKLIST', res.data)
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
        getBookInfo({commit}, title) {
            return new Promise((resolve, reject) => {
                axios.get('/booksbykey', {title}).then(res => {
                    commit('BOOKINFO', res)
                    resolve(res)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
        // 获取一条数据详情
        getOneBookInfo({commit}, title) {
            return new Promise((resolve, reject) => {
                axios.get('/onebookbykey ', {title}).then(res => {
                    commit('BOOkINFO', res)
                    resolve(res)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        }
    }
}
export default book