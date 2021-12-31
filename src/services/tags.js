import {METHOD, request} from "@/utils/request";
import {TAGS} from "@/services/api";


const tagsApi = {}


tagsApi.list = () => {
  return request({
    url: TAGS,
    method: METHOD.GET
  })
}


export default tagsApi
