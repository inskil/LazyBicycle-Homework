import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const _import_ = file => () => import('components/' + file + '.vue')
const _import_ = file => () => import('@/views/' + file + '.vue')

//权限管理
export const asyncRouterMap = [
    {
        path: '/permission',
        name: '权限管理',
        meta: { role: ['admin'] },
        component: _import_('Layout/index'),
        redirect: '/permission/list',
        requireAuth: true, // 是否需要登录
        dropdown: true,
        icon: 'authority',
        children: [
            { path: 'list', component: _import_('Permission/list/index'), name: '管理员列表' },
            { path: 'add', component: _import_('Permission/add/index'), name: '添加管理员' }
        ]
    },
    {
        path: '/article',
        name: '文章',
        component: _import_('Layout/index'),
        redirect: '/article/list',
        dropdown: true,
        icon: 'zuowen',
        children: [
            { path: 'list', component: _import_('Article/list/index'), name: '文章列表' },
            { path: 'add', component: _import_('Article/add/index'), name: '添加文章' }
        ]
    }
]

//  路由数据
export const constantRouterMap =[
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
    {
        path: '/group',
        name:'group',
        component: _import_('groupPage'),
    },
    {
        path: '/movieDetail',
        name:'movieDetail',
        component: _import_('movieDetailPage'),
    },
    {
        path: '/bookDetail',
        name:'bookDetail',
        component: _import_('bookDetailPage'),
    },
    {
        path: '/topic',
        name:'topicDetail',
        component: _import_('topicPage'),
    },
    {
        path: '/groupDetail',
        name: 'groupDetail',
        component: _import_('groupDetailPage'),
    },
    {
        path: '/addGroup',
        name: 'addGroup',
        component: _import_('addGroupPage'),
    },
    {
            path:'/submitpost',
            name:'submitpost',
            component:_import_('postPage'),
        },
        {
            path:'/publishbookPage',
            name:'publishbookPage',
            component:_import_('publishbookPage'),
        }
        ]

const router = new Router({
    mode: 'history',
    routes: constantRouterMap
})

export default router
