<template>
  <n-config-provider :theme="theme.naiveTheme" :theme-overrides="theme.naiveThemeOverrides"  :locale="langList[lang]['locale']"
    :date-locale="langList[lang]['dateLocale']" class="h-full">
    <naive-provider>
      <router-view />
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { dateZhCN, zhCN, useThemeVars, enUS, dateEnUS } from 'naive-ui';
import { ref } from 'vue'
import type { GlobalThemeOverrides } from 'naive-ui';
import { subscribeStore, useThemeStore, useAuthStore } from '@/store';
import { useGlobalEvents } from '@/composables';
import { localStg } from '@/utils';
const lang = ref(localStg.get('lang')?localStg.get('lang'):'zh-CN')
const langList = {
	en:{
		locale:enUS,
		dateLocale:dateEnUS
	},
	'zh-CN':{
		locale:zhCN,
		dateLocale:dateZhCN
	}
}
const theme = useThemeStore();
const userInfo = useAuthStore().userInfo;
let themeVars = useThemeVars()


subscribeStore();
useGlobalEvents();
</script>

<style>
@font-face {
  font-family: 'HarmonyOS Sans SC';
  src: url('./assets/fonts/HarmonyOS_Sans_SC_Regular.ttf') format('opentype');
}

body {
  font-family: 'HarmonyOS Sans SC', sans-serif;
  color: #000;
}
</style>
