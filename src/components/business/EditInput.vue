<template>
	<div>
		<h3 v-if="!showInput" style="font-size:14px;font-weight:bolder;text-overflow:ellipsis;　white-space:nowrap;overflow:hidden;" @click="Pclick">{{value?value:'大题名称，点此编辑'}}</h3>
		<n-input
			class="Input"
			ref="InputRef"
			v-if="showInput"
			v-model:value="value"
			type="text"
			@blur="BlurInput"
			@change="handelChange"
		/>
	</div>
</template>

<script setup lang="tsx">
	import { ref, nextTick, watch } from 'vue'
	import { toRaw } from '@vue/reactivity'//加载toraw方法
	const emit = defineEmits(['UploadData'])
	const props = defineProps(['Index','name'])
	const InputRef = ref()
	const value = ref(null)
	if (props.name) {
		value.value = props.name
	}

	const showInput = ref(false)

	async function Pclick() {
		showInput.value = true;
		await nextTick()
		InputRef.value?.focus()
	}
	function BlurInput() {
		showInput.value = false;
	}
	function Focus() {
		InputRef.value?.focus()
	}
	function handelChange() {

		emit('UploadData',{Index:props.Index,data:value.value})
	}
	function getName() {
		console.log('props.name',props.name)
		console.log('props.name',props.name)
	}
	watch(props, (current, previous) => {
		//hidden  visible
		value.value = previous.name
	})
</script>

<style lang="scss" scoped>
	.Input{
		width:220px;
	}
</style>
