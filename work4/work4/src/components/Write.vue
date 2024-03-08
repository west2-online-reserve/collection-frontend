<script setup lang="ts">
import { ref, computed } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()
const title = ref('')
const markdownContent = ref('')

const compiledMarkdown = computed(() => {
  return md.render(markdownContent.value)
})

const publishArticle = () => {
  console.log('输入文章标题...', { title: title.value, content: markdownContent.value })
}
</script>

<template>
  <div class="editor-container">
    <input type="text" v-model="title" placeholder="Article Title" class="title-input" />

    <div class="markdown-editor">
      <textarea v-model="markdownContent" class="markdown-input" placeholder="Write in Markdown..."></textarea>
      <div class="markdown-preview" v-html="compiledMarkdown"></div>
    </div>

    <button @click="publishArticle" class="publish-button">发布</button>
  </div>
</template>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
}

.title-input {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1.2em;
}

.markdown-editor {
  display: flex;
}

.markdown-input {
  flex: 1;
  padding: 10px;
  margin-right: 20px;
  height: 300px;
  border: 1px solid #ccc;
  resize: vertical;
}

.markdown-preview {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  overflow-y: auto;
  height: 300px;
}

.publish-button {
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.publish-button:hover {
  background-color: #0056b3;
}
</style>