<template>
	<n-card :title="SearchData.title" :bordered="false" class="rounded-5px shadow-sm SearchBox"
		style="--n-padding-top:8px;--n-padding-bottom:12px">
		<div style="display:flex;justify-content:space-between">
			<div>
				<n-space justify="flex-start">
					<slot></slot>
				</n-space>
			</div>

			<!-- 				<div style="width:120px;">
					<n-divider style="min-height:100%" vertical />
					<n-space justify="flex-start" style="float:right;width:90px;">
						<n-button size="medium" type="primary">
						  <icon-ic-round-search class="mr-4px text-20px" />
						  查询
						</n-button>
						<n-button size="medium" @click="resetData">
						  <icon-mdi-refresh class="mr-4px text-20px" />
						  重置
						</n-button>
					</n-space>
				</div> -->
		</div>
	</n-card>
</template>

<script setup>
import { ref, watch } from 'vue';
const emit = defineEmits();


const props = defineProps(['SearchData']);
function resetData() {
	emit('resetClick', '987654321')
}
</script>

<style lang="scss" scoped></style>
