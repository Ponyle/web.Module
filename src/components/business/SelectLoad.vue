<template>
	<keep-alive>
		<n-select
			remote
			:clear-filter-after-select="false"
			:reset-menu-on-options-change="false"
			:value="CheckId"
			:clearable="true"
			v-bind="$attrs"
			size="large"
			value-field="id"
			label-field="name"
			:filterable="true"

			@search="getList"
			:loading="loadingSearch"
			:options="Lists"
			@update:value="Update"
			:placeholder="PlaceHolder"/>
	</keep-alive>
	<!-- @scroll="handleScroll" -->
</template>
<script setup lang="ts">
	import { ref } from 'vue';
	const emit = defineEmits();
	const props = defineProps(['loadApi','PlaceHolder','OtherParams','List','CheckId','Lists']);
	const CheckId = ref(null)
	if(props.CheckId) {
		CheckId.value = props.CheckId
	}
	const Lists = ref([])
	const loadingSearch = ref(false)
	const ListData = ref({  //院校下拉框接口参数
		keyword:'',
		page: 1,
		pageSize: 9999,
	})
	if (props.List) {
		Lists.value = props.List
	}

	function clearOptions() {
		Lists.value = []
	}

	async function handleScroll(e) {
		const currentTarget = e.currentTarget
		if (currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight) {
			ListData.value.page = ListData.value.page + 1
			const params = ListData.value
			loadingSearch.value = true
			const res = await props.loadApi({...props.OtherParams,...params})
			if (!res.error) {
				Lists.value.push(...res.data.data)
			}
			loadingSearch.value = false
		}
	}
	async function getList(keyword) {
		CheckId.value = null
		ListData.value.keyword = keyword
		ListData.value.page = 1
		const params = ListData.value
		loadingSearch.value = true
		const res = await props.loadApi({...props.OtherParams,...params})
		if (!res.error) {
			if (res.data.data) {
				Lists.value = res.data.data
			} else if (res.data) {
				Lists.value = res.data
			}

		}
		loadingSearch.value = false
	}
	function Update(row) {
		CheckId.value = row
		emit('SelctLoadCheck',row)
	}
	function getCheckLabel() {
		const Info = Lists.value.find(item => item.id == CheckId.value)
		return Info
	}
	defineExpose({ getList, CheckId, getCheckLabel, clearOptions,Lists});
</script>

<style>
</style>
