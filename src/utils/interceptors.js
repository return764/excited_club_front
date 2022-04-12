import {METHOD, request, xsrfHeaderName} from "@/utils/request";
import {REFRESH_TOKEN} from "@/services/api";

const respCommon = {
  /**
   * 发送请求之前做些什么
   * @param config axios config
   * @param options 应用配置 包含: {router, store, message}
   * @returns {*}
   */
  onFulfilled(config, options) {
    const {message} = options
    if (config.data.result && config.data.result !== "ok"){
      message.error(config.data.msg)
      return
    }
    return config
  },
  /**
   * 请求出错时做点什么
   * @param error 错误对象
   * @param options 应用配置 包含: {router, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const {message} = options
    console.log(error)
    message.error(error.message)
    return Promise.reject(error)
  }
}

// 是否正在刷新的标记
let isRefreshing = false

let retryRequests = [];
function onAccessTokenFetched() {
  retryRequests.forEach((callback)=>{
    callback();
  })
  retryRequests = [];
}

function addRequestQueue(callback) {
  retryRequests.push(callback)
}

const reqCommon = {
  /**
   * 发送请求之前做些什么
   * @param config axios config
   * @returns {*}
   */
  onFulfilled(config) {
    const {xsrfHeaderName} = config
    if (localStorage.getItem(xsrfHeaderName)){
      config.headers.Authorization = localStorage.getItem(xsrfHeaderName)
    }
    return config
  },
  /**
   * 请求出错时做点什么
   * @param error 错误对象
   * @param options 应用配置 包含: {router, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const {message} = options
    console.log(error)
    message.error(error.message)
    return Promise.reject(error)
  }
}

// 401拦截
const resp401 = {
  /**
   * 响应数据之前做点什么
   * @param response 响应对象
   * @returns {*}
   */
  onFulfilled(response) {
    return response
  },
  /**
   * 响应出错时执行
   * @param error 错误对象
   * @param options 应用配置 包含: {router, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const {message, store, router} = options
    const {response,config} = error
    console.log(config)
    if (response && response.status === 401) {
      const {result} = response.data
      //refreshToken过期
      if (result === "refreshToken failed"){
        message.error('登录已失效，请重新登录')
        store.commit('account/removeAccount')
        router.push("/")
        return Promise.reject(error)
      }
      //阻塞批量请求，直到新的token更新
      if (!isRefreshing){
        isRefreshing = true
        request({
          url: REFRESH_TOKEN,
          method: METHOD.POST,
          params: {refresh_token: localStorage.getItem("refresh_token")}
        }).then(resp=>{
          if (resp.data.result === "ok"){
            localStorage.setItem(xsrfHeaderName,'Bearer ' + resp.data.data.newToken)
          }
          isRefreshing = false
          //执行队列中缓存的请求
          onAccessTokenFetched()
        })
      }
      //缓存请求
      return new Promise((resolve => {
        addRequestQueue(()=>{
          resolve(request(config))
        })
      }))
    }
    return Promise.reject(error)
  }
}

export default {
  request: [reqCommon], // 请求拦截
  response: [resp401, respCommon] // 响应拦截
}

