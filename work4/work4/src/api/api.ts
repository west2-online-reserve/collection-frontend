import { service } from "@/utils/request";

// 定义响应类型
interface homePage {
  getHottest: number;
  count: number;
  Authorization: string;
}

interface homePageResponse {
  base: {
    code: string;
    msg: string | null;
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
  } | null
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
  Authorization: string;
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

interface changePassword {
  password: string;
  Authorization: string;
}

interface changePasswordResponse {
  base: {
    code: string,
    msg: string,
  }
  data: null;
}

// 修改密码
export const changePassword = (data: changePassword): Promise<changePasswordResponse> => {
  return service.request<changePasswordResponse>({
      method: "put",
      url: `/juejin/user/setup/password`,
      data
  });
};

interface changeAvatar {
  avatar_url: string;
  Authorization: string;
}

interface changeAvatarResponse {
  base: {
    code: string,
    msg: string,
  }
  data: null;
}

// 修改头像
export const changeAvatar = (data: changeAvatar): Promise<changeAvatarResponse> => {
  return service.request<changeAvatarResponse>({
      method: "put",
      url: `/juejin/user/setup/avatar_url`,
      data
  });
};

interface changeUsername {
  username: string;
  Authorization: string;
}

interface changeUsernameResponse {
  base: {
    code: string,
    msg: string,
  }
  data: null;
}

// 修改用户名
export const changeUsername = (data: changeUsername): Promise<changeUsernameResponse> => {
  return service.request<changeUsernameResponse>({
      method: "put",
      url: `/juejin/user/setup/username`,
      data
  });
};

interface  Articles {
  article_id: string;
  Authorization: string;
}

interface  ArticlesResponse {
  base: {
    code: string,
    msg: string,
  }
  data: {
    task: {
      article_id: number,
      user_id: number,
      username: string,
      title: string,
      content: string,
      cover_url: string,
      visit_count: number,
      like_count: number,
      comment_count: number,
      created_at: string,
    },
    items: [
      comment_id: number,
      user_id: number,
      username: string,
      avatar_url: string,
      article_id: number,
      parent_id: number,
      like_count: number,
      child_count: number,
      content: string,
      created_at: string,
    ],
    total: number
  } | null
}

// 获取详细文章信息
export const Articles = (data: Articles): Promise<ArticlesResponse> => {
  return service.request<ArticlesResponse>({
      method: "get",
      url: `/juejin/article`,
      data
  });
};

interface writeArticles {
  Authorization: string;
  title: string;
  content: string;
  cover_url: string;
}

interface writeArticlesResponse  {
  base: {
    code: string,
    msg: string,
  };
  data: null;
}

// 写文章
export const writeArticles = (data: writeArticles): Promise<writeArticlesResponse> => {
  return service.request<writeArticlesResponse>({
      method: "post",
      url: `/juejin/write`,
      data
  });
};