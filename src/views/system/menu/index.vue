<template>
	<div>
		<n-card :title="t('page.system.menu.title')" :bordered="false" class="rounded-5px shadow-sm">
			<n-space class="pb-12px" justify="space-between">
				<n-space>
					<n-button type="primary" @click="handleAddTable">
						<icon-ic-round-plus class="mr-4px text-20px" />
						{{ t('global.add') }}
					</n-button>
				</n-space>
			</n-space>
			<n-data-table :columns="columns" :cascade="false" :bordered="true" :single-line="false" allow-checking-not-loaded
				:data="tableData" :row-key="getRowKey" :loading="loading" @load="loadData" />
			<n-grid cols="6" :x-gap="20" :y-gap="6" style="margin-top:10px;" item-responsive responsive="screen">
				<n-grid-item span="s:6 m:5 l:5">
					<!-- <span style="font-size: 14px;">总共 {{tableData.length}} 条</span> -->
				</n-grid-item>
				<n-grid-item span="s:6 m:1 l:1">
					<n-space justify="end" :size="18">
						<n-button quaternary circle @click="getTableData">
							<icon-mdi-refresh class="text-16px" :class="{ 'animate-spin': loading }" />
						</n-button>
					</n-space>
				</n-grid-item>
			</n-grid>
		</n-card>
	</div>
</template>

<script setup lang="tsx">
import { ref, h, onActivated,onMounted } from 'vue';
import { useDialog, useMessage, NTooltip, NSpace } from 'naive-ui';
import { useLoading } from '@/hooks';
import { GetPermisTreeTable, DelCrmPermission } from '@/service';
import { routeName, } from '@/router';
import { useRouterPush } from '@/composables';
import { t } from '@/locales';
const { routerPush } = useRouterPush();
const { loading, startLoading, endLoading } = useLoading(false);
// const defaultOpen = ref(null)
// const tableDataLength = ref(null)
const tableData: any = ref([])
const dialog = useDialog()
const message = useMessage()
const getRowKey = (row: any) => row.id
// const dataRef = ref([
// 	{ key: "p1", example: "p1", isLeaf: false },
// 	{ key: "p2", example: "p2", isLeaf: false },
// 	{ key: "p3", example: "p3", isLeaf: false }
// ]);
const columns = ref([
	{
		key: 'name',
		title: t('page.system.menu.MenuName'),
		align: 'left',
		ellipsis: {
			tooltip: true
		},
	},
	{
		key: 'code',
		title: t('page.system.menu.MenuNumber'),
		align: 'left'
	},
	{
		key: 'isButton',
		title:  t('page.system.menu.ListType'),
		align: 'left',
		render: (row: any) => {
			return row.isButton == 0 ?  t('page.system.menu.Menu') : t('page.system.menu.Button')
		}
	},
	{
		key: 'orderSort',
		title: t('page.system.menu.SortList'),
		align: 'left'
	},
	{
		key: 'createTime',
		title: t('global.creationTime'),
		align: 'left'
	}, {
		key: 'actions',
		title: t('global.action'),
		align: 'center',
		render: (row: any) => {

			const Edit = h(
				<NTooltip>
					{{
						trigger: () => {
							return (<n-button size={'small'} onClick={() => handleEditTable(row.id)} text type="info">
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
						default: () => t('global.delete'),
					}}
				</NTooltip>
			)
			const dom = h(<NSpace justify={'center'}></NSpace>, () => [Edit, Delete])
			return dom
		}
	}


])
function handleAddTable() {
	routerPush({ name: routeName('system_menu_addMenu'), query: {} }, false);
}
async function getTableData() {
	startLoading()
	let params = {
		pid: null,
		keyword: null
	}
	const res = await GetPermisTreeTable(params)
	if (!res.error) {
		tableData.value = res.data
		tableData.value.map((item: any) => {
			item.isLeaf = !item.hasChildren
		})
	}
	endLoading()
}
async function loadData(row: any) {
	// console.log('row', row)
	let params = {
		pid: row.id,
		keyword: null
	}
	const res = await GetPermisTreeTable(params)
	if (!res.error) {
		let data: any = res.data
		data.map((item: any) => item.isLeaf = !item.hasChildren)
		return row.children = data
	}

}
function handleEditTable(rowId: string) {
	routerPush({ name: routeName('system_menu_addMenu'), query: { rowId } }, false);
}
function deleteTableData(row: any) {
	let parentDom: any = null
	row.pidArr.forEach((item: any) => {
		if (item == '0') {
			parentDom = tableData.value;
		} else {
			// console.log('parentDom', parentDom)
			// console.log('parentDom.children', parentDom.children)
			if (parentDom.children) {
				parentDom = parentDom.children.find((Item: any) => Item.id == item)
			} else {
				parentDom = parentDom.find((Item: any) => Item.id == item)
			}

		}
	})
	if (parentDom.children) {
		parentDom.children = parentDom.children.filter((Item: any) => Item.id != row.id)
	} else {
		getTableData()
	}
}
function handleDelTable(row: any) {
	dialog.warning({
		title: t('global.deletePrompt.title'),
		content: t('global.deletePrompt.before')+'  ' + row.name + '  ,' + t('global.deletePrompt.after'),
		positiveText: t('global.confirm'),
		negativeText:  t('global.cancel'),
		positiveButtonProps: {
			type: 'primary'
		},
		onPositiveClick: async () => {
			const res = await DelCrmPermission({ id: row.id })
			if (!res.error) {
				message.success(t('global.delete'))
				deleteTableData(row)
			}
		},
		onNegativeClick: () => {
			message.info(t('global.cancel'))
		}
	})
}
async function init() {
	await getTableData()
}
onMounted(() => {
	// console.log('onmounted')
	init()

})
onActivated(() => {

})

</script>

<style scoped></style>
