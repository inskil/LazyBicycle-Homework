import store from '../store'
import {getSSToken} from '../utils/auth'
import  router  from './index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

const blackList = [];

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getSSToken()) { //本地存在token
        if (to.path === '/login') { //当前页是登录直接跳过进入主页
            next()
        }else{
            if (!store.state.user.hasLogin) { // 不存在用户信息， 需要重新拉取
                store.dispatch('gerUserInfoFromLocal')
                // store.dispatch('getUserInfo').then( res => { //拉取用户信息
                //     let roles = res.data.roles
                //     store.dispatch('setRoutes', {roles}).then( () => { //根据权限动态添加路由
                //         router.addRoutes(store.state.permission.addRouters)
                //         next({ ...to }) //hash模式  确保路由加载完成
                //     });
                // })
                next()
            }else{ // 存在信息，直接跳转到该页面
                next()
            }
        }
    }else{//本地不存在token
        if (blackList.indexOf(to.path) >= 0) { //是否在黑名单内,在的话直接跳转登录页
            next('/login')
        }else{
            next()
        }

    }    

})
router.afterEach((to, from) => {
    document.title = to.name
    NProgress.done()
})

export default router
