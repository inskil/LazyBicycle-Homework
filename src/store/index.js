import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import book from "./modules/book";
import movie from "./modules/movie";
import group from "./modules/group"
import topic from "./modules/topic";
import review from "./modules/review";
import notice from "./modules/notice";
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