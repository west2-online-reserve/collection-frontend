// 导入request.js请求工具
import service from '../utils/request'
export const getRankingListService=(token)=>{
    return service.request({
        method:"get",
        url:'/article/ranking_list',
        headers: {
            token: token
        }
    })
}
export const getCurrentListService=(token)=>{
    return service.request({
        method:"get",
        url:'/article/current_list',
        headers: {
            token: token
        }
    })
}
export const postArticleService=(articleModel,token)=>{
    return service.request({
        method:"post",
        url:'/article/new',
        data:{
            title:articleModel.title,
            content:articleModel.content
        },
        headers: {
            token: token
        }
    })
}


export const clickArticleService=(id,token)=>{
    return service.request({
        method:"put",
        url:'/article/click',
        data:{
            id:id
        },
        headers: {
            token: token
        }
    })
}
export const likeArticleService=(id,token)=>{
    return service.request({
        method:"post",
        url:'/favorites/add',
        data:{
            articleId:id
        },
        headers: {
            token: token
        }
    })
}
export const deletLikeArticleService=(id,token)=>{
    return service.request({
        method:"delete",
        url:'/favorites/delete',
        data:{
            articleId:id
        },
        headers: {
            token: token
        }
    })
}

export const getArticleDetailService=(id,token)=>{
    return service.request({
        method:"get",
        url:'/article/find_article_by_id',
        params:{
            id:id
        },
        headers: {
            token: token
        }
    })
}