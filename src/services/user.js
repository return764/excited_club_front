import {ACCOUNT, USERS} from "@/services/api"
import {request,METHOD} from "@/utils/request";

const usersApi = {}

usersApi.register = (data)=>{
    return request({
        url: `${ACCOUNT}/register`,
        method: METHOD.POST,
        data:data
    })
}

usersApi.update = (data) => {
    return request({
        url: `${USERS}/${data.id}`,
        method: METHOD.PUT,
        data:data
    })
}

usersApi.getCAPTCH = (email)=>{
    return request({
        url: `${ACCOUNT}/verifyCode`,
        method: METHOD.POST,
        params: {
            email: email
        }
    })
}

usersApi.loginVerify = (email,verifyCode)=>{
    return request({
        url: `${ACCOUNT}/login/verify`,
        method: METHOD.POST,
        params:{
            email: email,
            verifyCode: verifyCode
        }
    })
}

usersApi.loginEmail = (email,password)=>{
    return request({
        url: `${ACCOUNT}/login/email`,
        method:METHOD.POST,
        data:{
            username:email,
            password:password
        }
    })
}

export default usersApi
