<template>
	<div>
		<div>
			<n-space vertical>
				<!-- :scroll-x="columnsShow?ScrollX:''" -->
				<n-data-table ref="TablePage" :scroll-x="columnsShow?ScrollX:''"
					:default-checked-row-keys="defaultCheckedRowKeys" v-model:checked-row-keys="checkedRowKeys"
					v-bind="$attrs" :row-class-name="tableInfo.rowClassName" v-if="isShow" :remote='true'
					:columns="Columns" :cascade="false" :bordered="true" :single-line="false" @load="loadData"
					allow-checking-not-loaded :data="tableData" :row-key="getRowKey" :loading="loading" />
				<!-- <n-data-table ref="TablePage" v-model:checked-row-keys="checkedRowKeys" v-bind="$attrs" :scroll-x="1800" /> -->
				<n-grid cols="6" :x-gap="20" :y-gap="6" style="margin-top:10px;" item-responsive responsive="screen">
					<n-grid-item span="s:6 m:5 l:5">
						<n-pagination v-model:page="pagination.page" v-model:page-size="pagination.pageSize"
							:page-count="pagination.pageCount" show-size-picker :page-sizes="pagination.pageSizes"
							:on-update:page="PageChange" :on-update:page-size="PageSizeChange"
							:item-count="pagination.itemCount">
							<template #prefix="{ itemCount }">
								总共 {{ itemCount }} 条
							</template>
						</n-pagination>
					</n-grid-item>
					<n-grid-item span="s:6 m:1 l:1">
						<n-space justify="end" :size="18">
							<n-button quaternary circle @click="reloadData">
								<icon-mdi-refresh class="text-16px" :class="{ 'animate-spin': loading }" />
							</n-button>
							<column-setting v-if="columnsShow" v-model:columns="Columns" @update="updateColums" />
						</n-space>
					</n-grid-item>
				</n-grid>
			</n-space>

		</div>
	</div>
</template>

<script setup lang="tsx">
	import { reactive, ref, onActivated, onMounted  } from 'vue';
	import { useMessage } from 'naive-ui';
	import { useLoading} from '@/hooks';
	import SearchBox from '../component/searchbox.vue';
	import ColumnSetting from './ColumnSetting.vue';
	import { toRaw } from '@vue/reactivity'
	import { convert } from '@/utils'
	const { loading, startLoading, endLoading } = useLoading(false)
	const tableData = ref([])
	const message = useMessage()
	let extra=ref()
	const isShow  = ref(true);
	const TablePage = ref();
	const checkedRowKeys = ref<Array<string | number>>([])
	// const props = defineProps(["columns","tableInfo"])
	const props = defineProps({
		columns:Array,
		tableInfo:Object,
		defaultCheckedRowKeys:Array,
		pagination:{
			type:Object,
			default:{
				pageIndex: 1,
				pageSize: 10,
				pageSizes: [10, 30 ,50],
				itemCount:0,
			}
		},
		columnsShow:{
			default:true,
		},
		scrollX:{
			default:1500,
		}
	})
	const ScrollX = ref(props.scrollX)
	const defaultCheckedRowKeys = ref(props.defaultCheckedRowKeys)
	const Columns = ref()
	Columns.value = props.columns
	let actions = Columns.value.find(item => item.key == 'actions')
	if (actions) {
		actions.fixed = 'right'
	}
	let scorllx = 60;

	Columns.value.forEach(item => {
		if (item.width||item.minWidth||item.maxWidth) {
			let width = 0;
			if (item.width) {
				width = item.width
			} else if (item.minWidth) {
				width = item.minWidth
			} else if (item.maxWidth) {
				width = item.maxWidth
			}
			scorllx = scorllx + Number(width)
		}
	})
	if (scorllx > ScrollX.value) {
		// ScrollX.value = scorllx
	}
	const pagination = ref()
	pagination.value = props.pagination
	const getRowKey = (row) => row.id
	function reloadData() {
		props.tableInfo.LoadDataApi?getTableTreeData():getTableData()
	}
	async function getTableData(obj) {
	  startLoading();
		let params = {...toRaw(props.tableInfo.SearchData),pageIndex:1,pageSize:props.pagination.pageSize}
		if (obj && obj.reload == false) {
			params.pageIndex = props.pagination.page
		} else {
			pagination.value.page = 1
		}
		delete params.page
		const res = await props.tableInfo.LoadApi(params)

		if (!res.error) {
			if (!props.tableInfo.isTree) {
				tableData.value = res.data.data || res.data;
				extra.value = res.data.extra
			} else {
				tableData.value = convert(res.data)
			}


			props.pagination.itemCount = res.data.dataCount
		}
		endLoading()
	}
	async function getTableTreeData() {
		const params = {...toRaw(props.tableInfo.SearchData),pagination:props.pagination.page,pageSize:props.pagination.pageSize}
		startLoading();
		isShow.value = false
		const res = await props.tableInfo.LoadApi(params)
		tableData.value = []
		if (!res.error) {
			const newData = res.data.data.map(item=> ({...item,isLeaf:false,isSchool:true}))
			tableData.value = newData
			props.pagination.itemCount  = res.data.dataCount
			isShow.value = true
			endLoading()
		}
	}
	async function loadData(row) {
		let params = row.isSchool?{orgId:row.id,parentId:'0'}:{orgId:row.schoolId,parentId:row.id};
		const res = await props.tableInfo.LoadDataApi(params)
		if (!res.error) {
			const newData = row.isSchool?res.data.map(item=>({...item,isLeaf:false,schoolId:row.id})):res.data.map(item=>({...item,isLeaf:false,schoolId:row.schoolId,parentId:row.id}))
			return row.children = newData
		}
	}
	function PageChange(page) {
		pagination.value.page = page
		getTableData({reload:false})
	}
	function PageSizeChange(num) {
		pagination.value.pageSize = num
		getTableData({reload:false})
	}
	function updateColums(data) {
		Columns.value = data
	}
	onMounted(() => {

	})
	onActivated(() => {

		// getTableData()
	})

defineExpose({ getTableData, pagination, getTableTreeData, TablePage, checkedRowKeys, tableData, extra });

</script>
<style lang="scss">
	// .redRow>td{background:red!important}
</style>
