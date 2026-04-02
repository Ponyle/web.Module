<template>
  <div class="markdown-content" v-html="renderedHtml"></div>
</template>

<script setup lang="ts" name="MarkdownRenderer">
import { computed, ref, watch } from 'vue';
import { marked } from 'marked';

interface Props {
  content: string;
}

const props = withDefaults(defineProps<Props>(), {
  content: ''
});

const renderedHtml = ref('');

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true,
  pedantic: false
});

// 处理 markdown 转换
const renderMarkdown = async (content: string) => {
	// console.log(content,'content')
  if (!content) {
    renderedHtml.value = '';
    return;
  }
  try {
    // 移除 markdown 代码块包裹符号，保留内容
    let filteredContent = content;
    // 如果内容被 ``` 包裹，则去除包裹
    if (filteredContent.startsWith('```')) {
       filteredContent = filteredContent.replace(/^```(?:[Mm]arkdown)?\n?/i, '').replace(/\n?```\s*$/, '');
    }

    const html = await marked(filteredContent);
		// console.log(html,'html')
    renderedHtml.value = html;
  } catch (error) {
    console.error('Markdown rendering error:', error);
    renderedHtml.value = content;
  }
};

// 监听 content 变化
watch(() => props.content, (newContent) => {
  renderMarkdown(newContent);
}, { immediate: true });
</script>

<style scoped>
.markdown-content {
  line-height: 1.6;
  color: #333;
  max-width: 56rem;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin: 12px 0 8px 0;
  font-weight: 600;
}

.markdown-content :deep(h1) {
  font-size: 2em;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
}

.markdown-content :deep(h3) {
  font-size: 1.17em;
}

.markdown-content :deep(h4) {
  font-size: 1rem;
}

.markdown-content :deep(h5) {
  font-size: 0.875rem;
}

.markdown-content :deep(h6) {
  font-size: 0.75rem;
}
.markdown-content :deep(strong) {
  font-weight: 600;
  color: #000;
}

.markdown-content :deep(em) {
  font-style: italic;
  color: #555;
}

.markdown-content :deep(code) {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 12px;
  overflow-x: auto;
  margin: 8px 0;
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 8px 0;
  padding-left: 24px;
	font-size: 1rem;
}

.markdown-content :deep(ul) {
  list-style-type: disc;
}

.markdown-content :deep(ol) {
  list-style-type: decimal;
}

.markdown-content :deep(li) {
  margin: 4px 0;
		font-size: 1rem;

}

.markdown-content :deep(p) {
  margin: 8px 0;
		font-size: 1rem;

}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 12px;
  margin: 8px 0;
  color: #666;
}

.markdown-content :deep(a) {
  color: #0066cc;
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(table) {
  border-collapse: collapse;
  margin: 8px 0;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
			font-size: 1rem;

}

.markdown-content :deep(th) {
  background-color: #f5f5f5;
  font-weight: 600;
}
</style>
