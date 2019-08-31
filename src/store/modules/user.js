import axios from '../../utils/fetch'
import {getToken, removeToken} from '../../utils/auth'
import md5 from 'js-md5'
import {Cookie, Session} from "../../utils/storage";

const user = {
    state: {
        userTotal: 0,
        username: '',
        userheadimg: 'http://b-ssl.duitang.com/uploads/item/201711/10/20171110225150_ym2jw.jpeg',
        isQQ: false,
        isWECHAT: false,
        hasLogin:false,
        roles: null,
        ismanager: false,
        token: getToken(),
        otherList: [],
        userinfo: {
            username: '',
            userheadimg: 'http://b-ssl.duitang.com/uploads/item/201711/10/20171110225150_ym2jw.jpeg',
            uid: 0
        },
        headimg: 'http://b-ssl.duitang.com/uploads/item/201711/10/20171110225150_ym2jw.jpeg',
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            Session.set('token',token)
        },
        SET_USERINFO(state, info) {
            state.name = info.name;
            state.username = info.username;
            state.roles = info.roles;
        },
        USERLIST(state, data) {
            state.list = data.list
            state.total = data.total;
        },
        UPDATE_INFO(state, data) {
            state.userinfo = data;
            state.username = data.username;
            if (data.userheadimg) {
                state.userheadimg = data.userheadimg
                state.userinfo.userheadimg = data.userheadimg
            } else {
                state.userheadimg = state.headimg
                state.userinfo.userheadimg = state.headimg
            }
        },
        CLEARINFO(state) {
            state.name = '';
            state.username = '';
            state.roles = null;
            state.userinfo = {
                username: '',
                userheadimg: 'http://b-ssl.duitang.com/uploads/item/201711/10/20171110225150_ym2jw.jpeg',
                uid: 0
            }
            Session.remove('userinfo')
            Session.remove('token')
            state.hasLogin = false
        },
        CHANGELOGINSTA(state, data) {
            state.hasLogin = data
        }

    },
    actions: {
        clearInfo({commit}) {
            commit('CLEARINFO')
        },
         userLogin({state, commit}, info) {
            //console.log(info)
            let {username, pwd} = info;
            return new Promise((resolve, reject) => {
                axios.post('user/login', {
                    username: username,
                    pwd: md5(pwd)
                }).then(res => {
                    console.log(res)
                    commit('SET_TOKEN', getToken())
                    commit('UPDATE_INFO', res.data.info)
                    Session.set('userinfo',res.data.info)
                    commit('CHANGELOGINSTA', true)
                    resolve(res)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })
        },
        gerUserInfoFromLocal({state, commit}){
            if ((Session.get('userinfo') !=null) && (Session.get('token')!=null)){
                commit('UPDATE_INFO',Session.get('userinfo'))
                state.hasLogin = true
            }else
                state.hasLogin = false
        },
        getUserInfo({state, commit}) {
            console.log('getuserinfo````````````````')
            return new Promise((resolve, reject) => {
                axios.get('user/info', {
                    token: state.token
                }).then(res => {
                    console.log(res)
                    commit('UPDATE_INFO', res.data)
                    resolve(res)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
        addUser({commit}, info) {
            info.pwd = md5(info.pwd)
            return new Promise((resolve, reject) => {
                axios.post('user/add', info)
                    .then(res => {
                        resolve(res)
                    }).catch(err => {
                    reject("用户已存在,请重新添加")
                })
            })
        },
        delUser({commit}, id) {
            return new Promise((resolve, reject) => {
                axios.get('user/del', {id: id})
                    .then(res => {
                        resolve(res)
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        updateUser({commit}, info) {
            info.pwd = md5(info.pwd)
            info.old_pwd = md5(info.old_pwd)
            return new Promise((resolve, reject) => {
                axios.post('user/update', info)
                    .then(res => {
                        resolve(res)
                    }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

export default user