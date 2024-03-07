import { service } from "@/utils/request";

// 定义响应类型
interface homePage {
  getHottest: number;
  count: number;
}

interface homePageResponse {
  base: {
    code: string;
    msg: string;
  },
  data: {
    items: [
      article_id: number,
      user_id: number,
      username: string,
      title: string,
      content: string,
      cover_url: string,
      visit_count: number,
      like_count: number,
      comment_count: number,
      created_at: string
    ];
    total: number;
    task: null;
  }
}

// 获取文章列表的函数
export const getArticles = (data: homePage): Promise<homePageResponse> => {
  return service.request<homePageResponse>({
      method: "get",
      url: `/juejin/homepage`,
      data
  });
};

interface myHomePage {
  getWrittenArticle: number;
}

interface myHomePageResponse {
  base: {
    code: string;
    msg: string;
  },
  data: {
    items: [
      article_id: number,
      user_id: number,
      username: string,
      title: string,
      content: string,
      cover_url: string,
      visit_count: number,
      like_count: number,
      comment_count: number,
      created_at: string
    ];
    total: number;
    task: null;
  }
}

// 获取我写的文章，赞过的文章
export const getMyArticles = (data: myHomePage): Promise<myHomePageResponse> => {
  return service.request<myHomePageResponse>({
      method: "get",
      url: `/juejin/myhomepage`,
      data
  });
};

interface userInformationResponse {
  base: {
    code: string;
    msg: string;
  },
  data: {
    task: {
      user_id: number,
      username: string,
      password: string,
      avatar_url: string,
      created_at: string,
      token: string,
    };
    item: null;
    total: null;
  }
}

// 获取用户信息
export const getUserInformation = (): Promise<userInformationResponse> => {
  return service.request<userInformationResponse>({
      method: "get",
      url: `/juejin/user/information`,
      data
  });
};