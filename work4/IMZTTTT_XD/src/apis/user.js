// 导入request.js请求工具
import service from '../utils/request'
export const userRegisterSevrvice = (registerData) => {
    return service.post('/user/register', {
        userName: registerData.username,
        userPassword: registerData.password
    });
}
export const userLoginSevrvice = (loginData) => {
    return service.post('/user/login', {
        userName: loginData.username,
        userPassword: loginData.password
    });
}
export const userInfoSevrvice = (token) => {
    return service.request({
        method: "get",
        url: '/user/current_user',
        headers: {
            token: token
        }
    })
}
export const changePasswordSevrvice = (passwordChange,token) => {
    return service.request({
        method: "post",
        url: '/user/change_password',
        params: {
            newPassword:passwordChange.newPassword,
            oldPassword:passwordChange.oldPassword,
        },
        headers: {
            token: token
        }
    })
}
export const changeNameSevrvice = (nameChange,token) => {
    return service.request({
        method: "post",
        url: '/user/update_username',
        data: {
            userName:nameChange
        },
        headers: {
            token: token
        }
    })
}
export const postIntrSevrvice = (introduction,token) => {
    return service.request({
        method: "post",
        url: '/user/update_username',
        data: {
            introduction:introduction
        },
        headers: {
            token: token
        }
    })
}

export const getUserArticleSevrvice = (token) => {
    return service.request({
        method: "get",
        url: '/user/my_article',
        headers: {
            token: token
        }
    })
}
export const getUserLikeSevrvice = (token) => {
    return service.request({
        method: "get",
        url: '/user/my_favorites',
        headers: {
            token: token
        }
    })
}
export const getImgSevrvice = (id) => {
    return service.request({
        method: "get",
        url: '/common/download',
        params: {
            id: id
        },
        responseType: 'blob'
    })
}
