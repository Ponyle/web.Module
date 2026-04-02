<template>
	<div>
		<div>
			<n-space style="cursor: pointer;" justify="space-between" align="center" @click="toggleShow()">
				<div class="title">{{props.title}}</div>
				<div style="display: none;">
					<n-space align="center">
						<slot name="action"></slot>
						<div>
							<span>{{Show?'关闭':'展开'}}</span>
							<svg-icon style="display: inline-block;" icon="material-symbols:keyboard-arrow-up-rounded" :class="Show?'text-20px animate':'text-20px animate CloseIcon'" />
						</div>
					</n-space>
				</div>
			</n-space>
			<Collapse v-show="Show">
				<slot name="content"></slot>
			</Collapse>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import Collapse from './Collapse.vue'
	const emit = defineEmits(['EditorReport']);
	const props = defineProps(['title']);
	const Show = ref(false)
	const isOpen = ref(1)
	function toggleShow(val){
		Show.value = !Show.value
	}
	function handleCheck(val){
		isOpen.value == 1?isOpen.value = 0:isOpen.value = 1
	}
	function handleEditor() {
		emit('EditorReport')
	}
	function handleDelte() {

	}
</script>

<style lang="scss" scoped>
	:deep(.animate){
		transition: all .2s linear;
	}
	:deep(.CloseIcon){
		transform:rotate(180deg)
	}
	.title{
		color: #303133;
		font-size: 14px;
		font-weight: 40px;

	}
	.title:before{
		display: inline-block;
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 3px;
		border:1px solid #165DFF;
		background: #165DFF;
		margin-right: 12px;
		position: relative;
		top: -1px;
	}
</style>
