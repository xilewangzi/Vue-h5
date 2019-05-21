import Vue from '../../node_modules/vue'
import axios from '../../node_modules/axios'
import qs from '../../node_modules/qs'

Vue.use(axios)


// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    headers: {
      'device': 'web',
      'Accept': 'application/json;charset=utf-8',
      "Content-Type": "application/x-www-form-urlencoded"
    },
    timeout: 5000, // 请求超时时间
    transformRequest: [function (data) {
      return qs.stringify({
        ...data,
        // token:'9142fa7e9b0bdcf0c212f2d657155e27'
      })
    }]
  })

  export default service