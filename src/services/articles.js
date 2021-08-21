import {ARTICLES} from "@/services/api"
import {request,METHOD} from "@/utils/request";

const articlesApi = {}

articlesApi.latest = () =>{
    return request({
        url:`${ARTICLES}/latest`,
        method:METHOD.GET,
    })
}

articlesApi.list = (params) =>{
    return request({
        url:ARTICLES,
        method:METHOD.GET,
        params:params
    })
}

articlesApi.get = id =>{
    return request({
        url: `${ARTICLES}/${id}`,
        method:METHOD.GET
    })
}

articlesApi.top = num =>{
    return request({
        url: `${ARTICLES}/top/${num}`,
        method:METHOD.GET
    })
}


export default articlesApi
