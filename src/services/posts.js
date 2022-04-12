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

postsApi.uploadImage = (file) => {
  return request({
    url: `${POSTS}/upload`,
    method: METHOD.POST,
    data: file,
  })
}

postsApi.insert = (data) => {
  return request({
    url: POSTS,
    method: METHOD.POST,
    data: data,
  })
}

postsApi.delete = (id) => {
  return request({
    url: `${POSTS}/delete`,
    method: METHOD.POST,
    params: {
      id: id
    }
  })
}

export default postsApi
