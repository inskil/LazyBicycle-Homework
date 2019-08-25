import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import book from "@/store/modules/book";
import movie from "@/store/modules/movie";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        movie,
        // activities,
        book,
        // subject,
        // group,
        // search,
        // user,
        app,
    },
    getters
})

export default store;