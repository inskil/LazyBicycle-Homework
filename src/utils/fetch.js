import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'


axios.defaults.withCredentials = true
axios.defaults.baseURL="/api"

// 发送时
axios.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

// 响应时
axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))

// 检查状态码
function checkStatus(res) {
    console.log(res)
    if (res.status === 200 || res.status === 304) {
       return res.data
    }
   return {
        code: 0,
        msg: res.data.msg || res.statusText,
        data: res.statusText
    }
    return res
}


// 检查CODE值
function checkCode(res) {
    if (res.code === 0) {
        Message({
          message: res.msg,
          type: 'error',
          duration: 2 * 1000
        })
        throw new Error(res.msg)
    }
    return res
}


export default {
    get(url, params) {
        if (!url) return
        return axios({
            method: 'get',
            url: url,
            params,
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    // .then(function (response) {
    //     console.log(response);
    // })

    post(url, data) {
        console.log("posting")
        if (!url) return
        var data1 = qs.stringify(data)
        console.log('data1'+ data1)
        return axios({
            method: 'post',
            url: url,
            data: data1,
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    }
}
