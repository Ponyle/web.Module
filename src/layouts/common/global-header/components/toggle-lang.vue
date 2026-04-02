<template>
	<hover-container class="w-40px h-full" :inverted="theme.header.inverted">
		<n-dropdown :options="options" trigger="hover" :value="language" @select="handleSelect">
			<icon-cil:language class="text-18px outline-transparent" />
		</n-dropdown>
	</hover-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/store';
import { localStg } from '@/utils';
import { SwitchLanguages } from '@/service';
const theme = useThemeStore();
const { locale } = useI18n();

const language = ref<I18nType.langType>(localStg.get('lang') || 'zh-CN');
const options = [
	{
		label: '中文',
		key: 'zh-CN',
	},
	{
		label: 'English',
		key: 'en',
	},
	// {
	//   label: 'ភាសាខ្មែរ',
	//   key: 'km-KH'
	// }
];
const handleSelect =async (key: string) => {
	// console.log("key", key)
	// console.log("token1111", localStg.get('token'))
	let token = localStg.get('token')
	if (token) {
		if (key == 'en') {
			const res = await SwitchLanguages({ "code": "EN" })
			console.log('res',res)
			if (!res.error) {
				localStg.set('token', res.data.token);
			}
		} else if (key == 'zh-CN') {
			const res = await SwitchLanguages({ "code": "CN" })
			if (!res.error) {
				localStg.set('token', res.data.token);
				console.log('res.data.token',res.data.token)
			}
		}
	}

	language.value = key as I18nType.langType;
	locale.value = key;
	console.log('key',key)
	localStg.set('lang', key as I18nType.langType);
	window.location.reload()
};
</script>
<style scoped></style>
