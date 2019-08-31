import axios from '../../utils/fetch'
/* eslint-disable */
const topic = {
    state: {
        list: [],
        count: 0,
        loadingMore: false,
        loadingBol: true,
        hotTopic: []
    },
    mutations: {
        TOPICLIST(state, res) {
            state.list = res;
        },
        HOTTOPIC(state, res) {
            state.hotTopic = res;
        }
    },
    actions: {
        // 获取列表
        async getTopicList({commit, state}) {
            //console.log("sssssssssssssssssssssssssssssss")
            //params.type = params.type === 'all' ? null : params.type
            state.loadingMore = true
            state.loadingBol = false
            return new Promise((resolve, reject) => {
                axios.get('/topic', {"count": 0}).then(res => {
                    state.loadingMore = false;
                    resolve(res)
                    //console.log("sssssgetsgettttsssssssssss")
                    console.log(res.data)
                    res.data.sort(function (a, b) {
                        return b.review.length - a.review.length
                    });
                    commit('TOPICLIST', res.data)
                    state.count = res.data.length
                    commit('HOTTOPIC', res.data.slice(0, res.data.length >= 4 ? 4 : res.data.length))
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
        async addtopic({commit}, params) {
            return new Promise((resolve, reject) => {
                axios.get('/topic/addtopic ', params).then(res => {
                    resolve(res)
                    console.log('/topic/addtopic', res)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
    }
}
export default topic