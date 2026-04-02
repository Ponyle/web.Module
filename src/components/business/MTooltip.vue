<template>
		<n-tooltip trigger="hover">
			<template #trigger>
				<n-icon-wrapper :size="size" style="cursor: pointer;" color="#999" :border-radius="9">
					<n-icon size="12" color="#fff">
						<svg-icon :icon="icon" class="text-12px" />
					</n-icon>
				</n-icon-wrapper>
			</template>
			{{info}}
		</n-tooltip>
</template>

<script setup lang="tsx">
	import { ref } from 'vue';
	const props = defineProps({
		info:{
			default:'test'
		},
		size:{
			default:16
		},
		icon:{
			default:'ion:alert'
		}
	})

</script>

<style lang="scss" scoped>
	:deep(.n-icon-wrapper){
		background: #fff!important;
		border:1px solid red
	}
</style>
