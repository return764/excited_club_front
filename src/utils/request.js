import axios from "axios";


// http method

const METHOD = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
}

const http = axios.create({
    timeout: 10000,
    baseURL: process.env.VUE_APP_API_BASE_URL,
})



export {
    METHOD,
    http as request,
}