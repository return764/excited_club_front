import {PICTURES} from "@/services/api"
import {request,METHOD} from "@/utils/request";

const picturesApi = {}


picturesApi.list = (params)=>{
    return request({
        url: PICTURES,
        method: METHOD.GET,
        params: params
    })
}

export default picturesApi
