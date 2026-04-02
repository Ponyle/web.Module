<template>
  <dark-mode-container class="flex-center h-full" :inverted="theme.footer.inverted">
    <span>Copyright ©2025 上海梦之路数字科技有限公司</span>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store';

defineOptions({ name: 'GlobalFooter' });

const theme = useThemeStore();
</script>

<style scoped></style>
