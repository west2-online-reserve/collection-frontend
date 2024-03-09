// 导入request.js请求工具
import service from '../utils/request'
export const postMainCommentService=(id,comment,token)=>{
    return service.request({
        method:"post",
        url:'/comment/new_main',
        data:{
            articleId:id,
            content:comment
        },
        headers:{
            token: token
        }
    })
}
export const postReplyCommentService=(parentId,id,reply,token)=>{
    return service.request({
        method:"post",
        url:'/comment/new_extra',
        data:{
            parentId:parentId,
            articleId:id,
            content:reply
        },
        headers:{
            token: token
        }
    })
}
export const getMainCommentService=(id)=>{
    return service.request({
        method:"get",
        url:'/comment/get_all_main_comment',
        params:{
            id:id
        },
    })
}

export const getReplyCommentService=(id)=>{
    return service.request({
        method:"get",
        url:'/comment/get_extra_comment',
        params:{
            id:id
        }
    })
}