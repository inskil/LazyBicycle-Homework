import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const _import_ = file => () => import('components/' + file + '.vue')
const _import_ = file => () => import('@/views/' + file + '.vue')

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'hot',
            component: _import_('hotPage'),
        },
        {
            path: '/book',
            name: 'book',
            component: _import_('bookPage'),
        },
        {
            path: '/movie',
            name:'movie',
            component: _import_('moviePage'),
        },
        {
            path: '/search',
            name:'search',
            component: _import_('searchPage'),
        },
        {
            path: '/login',
            name:'login',
            component: _import_('loginPage'),
        },
        {
            path: '/register',
            name:'register',
            component: _import_('registerPage'),
        },
        // {
        //     path: '/article/:id',
        //     component: _import_('Article/index')
        // }
    ]
})

export default router
