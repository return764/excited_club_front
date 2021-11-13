import {COMMENTS} from "@/services/api"
import {request, METHOD} from "@/utils/request";

const commentsApi = {}

commentsApi.list = (postId) => {
  return request({
    url: COMMENTS,
    method: METHOD.GET,
    params: {
      postId: postId
    }
  })
}

commentsApi.publish = (data) => {
  return request({
    url: COMMENTS,
    method: METHOD.POST,
    data: data
  })
}

commentsApi.count = (postId) => {
  return request({
    url: `${COMMENTS}/count`,
    method: METHOD.GET,
    params: {
      postId: postId
    }
  })
}


export default commentsApi
