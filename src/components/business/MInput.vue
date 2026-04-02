<template>
		<n-input v-bind="$attrs" ref="inputRef"  :allow-input="noSideSpace"/>
</template>

<script setup lang="tsx">
	import { ref } from 'vue';
	const props = defineProps({
		// maxlength:{
		// 	default:100
		// },
		noSideSpace:{}
	})
	const inputRef = ref()
	// const maxlength = ref()
	const noSideSpace = ref()
	// maxlength.value = props.maxlength
	if (props.noSideSpace) {
		noSideSpace.value = props.noSideSpace
	} else {
		noSideSpace.value = (value: string) => {
			return !value.startsWith(' ') && !value.endsWith(' ')
		}
	}
	defineExpose({ inputRef });
</script>

<style lang="scss" scoped>
</style>
