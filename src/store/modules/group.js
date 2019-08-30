import axios from '../../utils/fetch'
/* eslint-disable */
const group = {
    state: {
        list: [],
        info: {},
        count: 0,
        loadingMore: false,
        loadingBol: true,
        userGroupList:[],
        hotGroup:[]
    },
    mutations: {
        GROUPLIST(state, res) {
            state.list = res;
        },
        GROUPINFO(state, res) {
            state.info = res.data;
        },
        USERGROUPLIST(state, res){
            state.userGroupList=res.data;
        },
        HOTGROUP(state,res){
            state.hotGroup = res;
        }
    },
    actions: {
        // 获取列表
        async getGroupList({commit, state}){
            //console.log("sssssssssssssssssssssssssssssss")
            //params.type = params.type === 'all' ? null : params.type
            state.loadingMore = true
            state.loadingBol = false
            return new Promise((resolve, reject) => {
                axios.get('/group',{"count":0}).then(res => {
                    state.loadingMore = false;
                    resolve(res)
                    //console.log("sssssgetsgettttsssssssssss")
                    console.log(res.data)

                    commit('GROUPLIST', res.data)
                    state.count=res.data.length
                    commit('HOTGROUP',res.data.slice(0,res.data.length>=5?5:res.data.length))
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

        async getUserGroupList({commit},uid){
            return new Promise((resolve, reject) => {
                axios.get('/usergroup ', {"uid":uid}).then(res => {
                    commit('USERGROUPLIST', res)
                    resolve(res)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
        async joinGroup(params){
            return new Promise((resolve, reject) => {
                axios.get('/addgroup ', params).then(res => {
                    resolve(res)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },

    }
}
export default group