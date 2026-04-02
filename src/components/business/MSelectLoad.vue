<!-- <template>
	<n-select
		:clear-filter-after-select="false"
		:reset-menu-on-options-change="false"
		:value="CheckId"
		:clearable="true"
		v-bind="$attrs"
		size="large"
		value-field="id"
		label-field="name"
		:filterable="true"
		@scroll="handleScroll"
		filterable
		:loading="loadingSearch"
		:options="Lists"
		@update:value="Update"
		:placeholder="PlaceHolder"/>
</template> -->
<template>
		<n-select
			remote
			:clear-filter-after-select="false"
			:reset-menu-on-options-change="false"
			:value="CheckId"
			:clearable="true"
			v-bind="$attrs"
			:filterable="true"
			@scroll="handleScroll"
			@search="handleSearch"
			:loading="loadingSearch"
			:options="Lists"
			@update:value="Update"
			@update:show="Show"
			:placeholder="PlaceHolder"/>

</template>
<script setup lang="ts">
	import { ref, onMounted, nextTick } from 'vue';
	import { watch } from 'vue';
	const emit = defineEmits();
	const props = defineProps(['loadApi','PlaceHolder','OtherParams','List','CheckId','CheckName']);
	const CheckId = ref()
	const Lists = ref([])
	const checkItem = ref()


	const reload = ref(true)

	const loadingSearch = ref(false)
	const ListData = ref({  //院校下拉框接口参数
		keyword:'',
		pageIndex: 1,
		pageSize: 20,
	})
	if (props.List) {
		Lists.value = props.List
	}
	function clearOptions() {
		console.log('99999999',CheckId.value)
		CheckId.value = null
		Lists.value = []

	}
	async function handleScroll(e) {
		const currentTarget = e.currentTarget
		if (currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight-60 && reload.value == true) {
			ListData.value.pageIndex = ListData.value.pageIndex + 1
			const params = ListData.value
			loadingSearch.value = true
			const res = await props.loadApi({...props.OtherParams,...params})
			if (!res.error) {
				if(res.data.data.length < ListData.value.pageSize&!ListData.value.keyword) {
					reload.value = false
				}
				Lists.value.push(...fileCheckVal(res.data.data))
			}
			loadingSearch.value = false
		}
	}
	const isFileCheck = ref(false)
	function fileCheckVal (val) {
		if (isFileCheck.value) {
			const newVal = val.filter(item => item.id != checkItem.value.id)
			console.log('newVal',newVal)
			if (newVal.length == val.length) {
				return newVal
			} else {

				return newVal
			}
		} else {
			return val
		}

	}
	async function handleSearch(keyword) {
		ListData.value.keyword = keyword
		ListData.value.pageIndex = 1
		const params = ListData.value
		loadingSearch.value = true
		const res = await props.loadApi({...props.OtherParams,...params})
		if (!res.error) {
			if (res.data.data) {
				let arr
				if(checkItem.value) {
					arr = [checkItem.value,...fileCheckVal(res.data.data)]
				} else {
					arr = res.data.data
				}

				Lists.value = arr
				if (res.data.data.length < ListData.value.pageSize &!ListData.value.keyword) {
					reload.value = false
				}
			} else if (res.data) {
				Lists.value = res.data
				if(res.data.length < ListData.value.pageSize &!ListData.value.keyword) {
					reload.value = false
				}
			}
			console.log('props',props.CheckId)
		}
		loadingSearch.value = false
	}
	async function getList(checkVal={checkId:null,checkName:null,IdLabl:'id',NameLabel:'name'}) {

		if (checkVal.checkId&&checkVal.checkName) {
			CheckId.value = checkVal.checkId
			let obj = {}
			obj[checkVal.IdLabl] = checkVal.checkId
			obj[checkVal.NameLabel] =checkVal.checkName
			checkItem.value = obj

			isFileCheck.value = true
		} else {
			isFileCheck.value = false
		}

		ListData.value.pageIndex = 1
		const params = ListData.value
		loadingSearch.value = true
		const res = await props.loadApi({...props.OtherParams,...params})
		if (!res.error) {
			if (res.data.data) {
				let arr = []
				if (checkItem.value) {
					arr= [checkItem.value,...fileCheckVal(res.data.data)]
				} else{
					arr = res.data.data
				}

				Lists.value = arr
				if (res.data.data.length < ListData.value.pageSize) {
					reload.value = false
				}
			} else if (res.data) {
				Lists.value = res.data
				if(res.data.length < ListData.value.pageSize) {
					reload.value = false
				}
			}
			console.log('props',props.CheckId)
		}
		loadingSearch.value = false

	}
	function Update(row) {
		CheckId.value = row

		emit('SelctLoadCheck',row)
	}
	function Show(res) {
		if (res) {
			console.log(Boolean(ListData.value.keyword))
			if (ListData.value.keyword) {
				reload.value = true
				handleSearch()
			}
		}
	}
	function getCheckLabel() {
		const Info = Lists.value.find(item => item.id == CheckId.value)
		return Info
	}
	onMounted(() => {
		console.log('props',props.CheckId)
	})
	defineExpose({ getList, CheckId, getCheckLabel, clearOptions});
</script>

<style>
</style>
