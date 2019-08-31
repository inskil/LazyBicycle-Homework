
const app = {
    state: {
        screen_width: 0,
        pc_width: 767,
        pc_bol: (function(){
            let w = document.documentElement.clientWidth || document.body.clientWidth;
            if (w > 767) return true
                return false
        }),
        search_key:''
    },
    mutations: {
        CHANGESCREENWIDTH (state, width) {
            state.screen_width = width
        },
        CHANGEHEADERHEIGHT (state, height) {
            state.header_height = height
        },
        KEY(state,key){
            state.search_key = key
        }
    },
    actions: {
        changeScreenWidth ({commit}, width) {
            commit('CHANGESCREENWIDTH', width)
        },
        changeHeaderHeight ({commit}, height) {
            commit('CHANGEHEADERHEIGHT', height)
        },
        add_key({commit},key){
            commit('KEY',key)
        }
    }
}
export default app