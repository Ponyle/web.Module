<template>
	<n-card :title="SearchData.title" :bordered="false" class="rounded-5px shadow-sm SearchBox" style="--n-padding-top:8px;--n-padding-bottom:12px">
			<div style="display:flex;justify-content:space-between">
				<div style="width: calc(100% - 0px);">
					<!-- <n-space justify="flex-start" style="width: 100%;"> -->
						<slot></slot>
					<!-- </n-space> -->
				</div>

				
			</div>
	</n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits();
const props = defineProps({
		SearchData:{
			type:Object,
			default:{
				title:''
			}
		},
	})
function SearchBtn() {
	emit('SearchBtn')
}
function AddBtn() {
	emit('AddBtn')
}
</script>

<style lang="scss" scoped>
</style>
