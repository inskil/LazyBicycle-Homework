import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import book from "@/store/modules/book";
import movie from "@/store/modules/movie";
import group from "@/store/modules/group"
import topic from "@/store/modules/topic";
import notice from "@/store/modules/notice";
import user from "./modules/user";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        movie,
        book,
        group,
        topic,
        notice,
        user,
        review,
        app,
    },
    getters
})

export default store;