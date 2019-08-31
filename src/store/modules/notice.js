import axios from '../../utils/fetch'

/* eslint-disable */
const notice = {
    state: {
        list: [],
        count: 0,
    },
    mutations: {
        NOTICELIST(state, res) {
            state.list = res;
        },
    },
    actions: {
        // 获取列表
        async getNotice({commit, state},param){
            //console.log("sssssssssssssssssssssssssssssss")
            //params.type = params.type === 'all' ? null : params.type
            return new Promise((resolve, reject) => {
                axios.get('/notice/listnotice',param).then(res => {
                    resolve(res)
                    //console.log("sssssgetsgettttsssssssssss")
                    console.log(res.data)
                    commit('NOTICELIST', res.data)
                    state.count=res.data.length
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })
        },
    }
}
export default notice