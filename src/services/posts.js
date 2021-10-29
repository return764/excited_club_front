import {METHOD, request} from "@/utils/request";
import {POSTS} from "@/services/api";


const postsApi = {}


postsApi.list = (routerName, params) => {
  return request({
    url: `${POSTS}/${routerName}`,
    method: METHOD.GET,
    params: params
  })
}

export default postsApi
