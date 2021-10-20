import {BOARDS} from "@/services/api"
import {request, METHOD} from "@/utils/request";

const boardsApi = {}

boardsApi.listRoute = () =>{
  return request({
    url: `${BOARDS}/route`,
    method: METHOD.GET
  })
}

export default boardsApi
