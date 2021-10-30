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

postsApi.get = (id) => {
  return request({
    url: POSTS,
    method: METHOD.GET,
    params:{
      id: id
    }
  })
}

export default postsApi
