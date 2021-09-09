import {USERS} from "@/services/api"
import {request,METHOD} from "@/utils/request";

const usersApi = {}

usersApi.register = (data)=>{
    return request({
        url: `${USERS}/register`,
        method: METHOD.POST,
        data:data
    })
}

usersApi.getCAPTCH = (email)=>{
    return request({
        url: `${USERS}/verifyCode`,
        method: METHOD.POST,
        params: {
            email: email
        }
    })
}

usersApi.loginVerify = (email,verifyCode)=>{
    return request({
        url: `${USERS}/login/verify`,
        method: METHOD.POST,
        params:{
            email: email,
            verifyCode: verifyCode
        }
    })
}

usersApi.loginEmail = (email,password)=>{
    return request({
        url: `${USERS}/login/email`,
        method:METHOD.POST,
        data:{
            username:email,
            password:password
        }
    })
}

export default usersApi
