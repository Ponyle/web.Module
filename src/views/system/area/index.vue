<template>
	<div>
		<SearchBox :SearchData="SearchData">
			<n-input-group>
				<n-input size="large" v-model:value="searchFromData.keyword" :clearable="true" @keyup.enter="getTableData"
					type="text" :placeholder="t('page.system.area.placeholder_ProvinceAndCityName')" style="width: 240px;" @clear="clearInput" />
				<n-button size="large" color="#2080f0" strong @click="getTableData">
					<icon-ic-search color="#fff" class="mr-4px text-20px" />{{ t('global.search') }}
				</n-button>
			</n-input-group>
		</SearchBox>

		<n-card>
			<n-flex justify="start" v-if="AddBtn">
				<n-button color="#2080f0" @click="handleAddTable">
					<icon-ic-round-plus class="mr-4px text-20px" />{{ t('global.add') }}
				</n-button>
			</n-flex>
			<TablePage ref="tablePageRef" :columns="columns" :tableData="tableData" :pagination="pagination"
				style="margin-top: 20px;">
			</TablePage>
		</n-card>
		<AddArea ref="addAreaRef" @getTableData="getTableData" />
	</div>
</template>

<script setup lang="tsx">
import SearchBox from '@/components/business/SearchBox.vue'
import AddArea from './component/addArea.vue'
import { h, ref, onMounted } from 'vue'
import { toRaw } from '@vue/reactivity'//加载toraw方法
import {  postCrmAreaGetCrmAreaPageList, postCrmAreaDelCrmAreaInfo } from '@/service'
import { useMessage, useDialog, NSpace, NTooltip } from 'naive-ui'
import { useRouterPush } from '@/composables';
import { t } from '@/locales';
const { routerPush, getCurRouteMeta } = useRouterPush();
const btnList: any = getCurRouteMeta().btn ? getCurRouteMeta().btn : []
let EditBtn = false, DelBtn = false, AddBtn = false
btnList.forEach((item: any) => {
	if (item.name == 'systemAreaDel') {
		DelBtn = true
	} else if (item.name == 'systemAreaEdit') {
		EditBtn = true
	}	else if (item.name == 'systemAreaAdd') {
		AddBtn = true
	}
})
const message = useMessage()
const dialog = useDialog()
const addAreaRef = ref()
const SearchData = ref({
	title: t('page.system.area.title')
})
const searchFromData: any = ref({
	keyword: '',
})
const columns = [
	{
		title: t('global.serialNumber'), key: 'index', align: 'center', width: 80, render: (row: any, index: any) => {
			return (
				<span>{(tablePageRef.value.pagination.page - 1) * tablePageRef.value.pagination.pageSize + index + 1} </span>
			)
		}
	},
	{ title:  t('page.system.area.ProvinceAndCityName'), key: 'regionName', align: 'center', },
	{ title: t('page.system.area.OpenUniversities'), key: 'orderSort', align: 'center', width: 150 },
	// { title: '排序', key: 'orderSort', align: 'center', width: 80 },
	{ title:  t('global.creator'), key: 'createBy', align: 'center', width: 120 },
	{ title: t('global.creationTime'), key: 'createTime', align: 'center', width: 200 },
	{
		title: t('global.action'), key: 'action', fixed: 'right', width: 80, align: 'center', render(row: any) {
			// if (!isNullBtn) {
			// console.log(row);

			const Edit = h(
				<NTooltip>
					{{
						trigger: () => {
							return (<n-button size={'small'} onClick={() => handleEditTable(row)} text type="info">
								<svg-icon icon="bytesize:compose" class="text-18px" />
							</n-button>)
						},
						default: () => t('global.edit')
					}}
				</NTooltip>
			)
			const Delete = h(
				<NTooltip>
					{{

						trigger: () => {
							return (<n-button size={'small'} onClick={() => handleDelTable(row)} text type="info" >
								<svg-icon icon="bytesize:trash" class="text-18px" />
							</n-button>)
						},
						default: () =>  t('global.delete'),
					}}
				</NTooltip>
			)

			let arr = [];
			if (EditBtn) {
				arr.push(Edit)
			}
			if (DelBtn) {
				arr.push(Delete)
			}
			const dom = h(<NSpace justify={'center'}></NSpace>, () => [...arr])
			return dom
			// }
		}
	}
]
if (!EditBtn&&!DelBtn) {
	columns.pop()
}
const tableData = ref({
	LoadApi: postCrmAreaGetCrmAreaPageList,
	SearchData: searchFromData.value,
})

const pagination = ref({
	pageIndex: 1,
	pageSize: 10,
	pageSizes: [10, 30, 50],
	itemCount: 0,
})
const tablePageRef = ref()
const getTableData = async () => {
	toRaw(tablePageRef.value.getTableData())
}
const clearInput = () => {
	searchFromData.value.keyword = null
	getTableData()
}
const handleEditTable = (row: any) => {
	addAreaRef.value.openModal({ ...row, isAdd: false })
}
const handleDelTable = async (row: any) => {
	dialog.warning({
		title: t('global.deletePrompt.title'),
		content:  t('global.deletePrompt.before')+'  ' + row.regionName + '  ,' + t('global.deletePrompt.after'),
		positiveText: t('global.confirm'),
		negativeText:  t('global.cancel'),
		positiveButtonProps: {
			type: 'primary'
		},
		onPositiveClick: async () => {
			let res = await postCrmAreaDelCrmAreaInfo(row.id)
			if (!res.error) {
				message.success(t('global.delete'))
				getTableData()
			}
		},
		onNegativeClick: () => {
		}
	})
}
const getInitData = async () => {
	getTableData()
}
onMounted(() => {
	getInitData()
})

const handleAddTable = () => {
  addAreaRef.value.openModal({ isAdd: true })
}
</script>

<style lang="scss" scoped></style>
