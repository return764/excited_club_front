import axios from "axios";

// http method

const METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}

const http = axios.create({
  timeout: 20000,
  baseURL: process.env.VUE_APP_API_BASE_URL,
})

function setAuthorization(auth){
  localStorage.setItem("refresh_token",auth.refreshToken)
  localStorage.setItem('Authorization','Bearer ' + auth.token)
}

function removeAuthorization(){
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("Authorization")
}

function loadInterceptors(interceptor,options){
  const {request,response} = interceptor
  request.forEach(item=>{
    let {onFulfilled, onRejected} = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = config => config
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    http.interceptors.request.use(
      config => onFulfilled(config, options),
      error => onRejected(error, options)
    )
  })

  response.forEach(item=>{
    let {onFulfilled, onRejected} = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = response => response
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    http.interceptors.response.use(
      response => onFulfilled(response, options),
      error => onRejected(error, options)
    )
  })
}

export {
  METHOD,
  setAuthorization,
  removeAuthorization,
  loadInterceptors,
  http as request,
}
