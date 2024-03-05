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
    items: {
      article_id: number,
      username: string,
      title: string,
      content: string,
      cover_url: string,
      visit_count: number,
      like_count: number,
      comment_count: number,
      created_at: string
    };
    total: number;
  }
}

// 获取文章列表的函数
export const getHomePage = (data: homePage): Promise<homePageResponse> => {
  return service.request<homePageResponse>({
    method: "get",
    url: "",
    data
}) 
};