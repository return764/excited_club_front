import {DEPARTMENTS} from "@/services/api"
import {request,METHOD} from "@/utils/request";

const departmentApi = {}

departmentApi.list = () =>{
    return request({
        url:DEPARTMENTS,
        method:METHOD.GET,
    })
}



export default departmentApi