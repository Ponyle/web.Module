<template>
	<router-view v-slot="{ Component, route }">
		<transition :name="theme.pageAnimateMode" mode="out-in" :appear="true"
			@before-leave="app.setDisableMainXScroll(true)" @after-enter="app.setDisableMainXScroll(false)">
			<!-- <keep-alive :include="routeStore.cacheRoutes"> -->
					<!-- <keep-alive :include="includeData"> -->
			<keep-alive>
				<component :is="Component" v-if="app.reloadFlag" :key="route.fullPath" :class="{ 'p-20px': showPadding }"
					class="flex-grow bg-#F2F2F2 dark:bg-#101014 transition duration-300 ease-in-out" />
			</keep-alive>
		</transition>
	</router-view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore, useRouteStore, useThemeStore, useTabStore } from '@/store';

defineOptions({ name: 'GlobalContent' });

interface Props {
	/** 显示padding */
	showPadding?: boolean;
}
const tabStore = useTabStore()
const includeData = computed(() => {
	return tabStore.tabs.map(item => item.name)
})

withDefaults(defineProps<Props>(), {
	showPadding: true
});

const app = useAppStore();
const theme = useThemeStore();
const routeStore = useRouteStore();

</script>

<style scoped></style>
