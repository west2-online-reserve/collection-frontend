<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getHomePage } from '@/api/api';

interface Article {
  article_id: number;
  username: string;
  title: string;
  content: string;
  cover_url: string;
  visit_count: number;
  like_count: number;
  comment_count: number;
  created_at: string;
}

const articles = ref();

//async和await配合，实现异步操作，保证在接口调用完后才读取值​
const fetchHomePageData = async () => {
  try {
    const data = {
      getHottest: 1,
      count: 10,
    };

    const response = await getHomePage(data);

    if (response.data && response.data.items) {
      articles.value = response.data.items;
    }
  } catch (err: any) {
    ElMessage.error(err.message || "登录失败");
  }
};

onMounted(() => {
  fetchHomePageData();
});

console.log(articles.value)
</script>

<template>
  <div>
    <div v-for="article in articles" :key="article.article_id">
      <h2>{{ article.title }}</h2>
      <p>{{ article.content }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
