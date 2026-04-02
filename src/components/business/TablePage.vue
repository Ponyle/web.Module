<template>
	<div>



				<!--  -->
				<n-data-table :class="tableData&&tableData.length >= 1?'':'TablePage'" ref="TablePage" :scroll-x="columnsShow?ScrollX:''"   :max-height="maxHeight"  :default-checked-row-keys="defaultCheckedRowKeys" v-model:checked-row-keys="checkedRowKeys" v-bind="$attrs"  v-if="isShow" :remote='true' :columns="Columns" :cascade="false" :bordered="true" :single-line="false" @load="loadData" allow-checking-not-loaded :data="tableData" :row-key="getRowKey" :loading="loading">
				</n-data-table>
				<!-- <n-data-table ref="TablePage" v-model:checked-row-keys="checkedRowKeys" v-bind="$attrs" :scroll-x="1800" /> -->
				<n-grid cols="6" :x-gap="20" :y-gap="6" style="margin-top:20px;" item-responsive responsive="screen">
					<n-grid-item span="s:6 m:5 l:5">
						<n-pagination
								v-model:page="pagination.page"
								v-model:page-size="pagination.pageSize"
								:page-count="pagination.pageCount"
								show-size-picker
								:page-sizes="pagination.pageSizes"
								:on-update:page="PageChange"
								:on-update:page-size="PageSizeChange"
								:item-count="pagination.itemCount"
							>
							<template #prefix="{ itemCount }">
								{{t('global.Total')}} {{ itemCount }} {{t('global.item')}}
							</template>
						</n-pagination>
					</n-grid-item>
					<n-grid-item span="s:6 m:1 l:1">
						<n-space justify="end" :size="18" >
							<n-button quaternary circle @click="reloadData">
								<icon-mdi-refresh  class="text-16px"  :class="{ 'animate-spin': loading }" />
							</n-button>
							<column-setting v-if="columnsShow" v-model:columns="Columns"  @update="updateColums"  />
						</n-space>
					</n-grid-item>

				</n-grid>


	</div>
</template>

<script setup lang="tsx">
	import { reactive, ref, onActivated, onMounted  } from 'vue';
	import { useMessage } from 'naive-ui';
	import { useLoading} from '@/hooks';
	import SearchBox from '../component/searchbox.vue';
	import ColumnSetting from './ColumnSetting.vue';
	import { toRaw } from '@vue/reactivity'
	import { t } from '@/locales';
	import { convert } from '@/utils'
	import { number } from 'echarts';
	const { loading, startLoading, endLoading } = useLoading(false)
	const tableData = ref([])
	const message = useMessage()
	const isShow  = ref(true);
	const TablePage = ref();
	const checkedRowKeys = ref<Array<string | number>>([])
		const emit = defineEmits(['tablemsg'])

	// const props = defineProps(["columns","tableInfo"])
	const props = defineProps({
		columns:Array,
		tableData:Object,
		defaultCheckedRowKeys:Array,
		initword:number,
		initscore:number,
		selectlength:number,
		maxHeight:number,
		pagination:{
			type:Object,
			default:{
				page: 1,
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
		},
		rowKey:{
			defalut:'id'
		}
	})
	const maxHeight = ref(props.maxHeight)
	const ScrollX = ref(props.scrollX)
	const defaultCheckedRowKeys = ref(props.defaultCheckedRowKeys)
	const Columns = ref()
	Columns.value = props.columns
	let actions = Columns.value.find(item => item.key == 'actions')
	if (actions) {
		actions.fixed = 'right'
	}
	let scorllx = 50;

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
		ScrollX.value = scorllx
	}
	const pagination = ref()
	pagination.value = props.pagination
	pagination.value.page = props.pagination.pageIndex
	const getRowKey = row => {
		if(props.rowKey) {
			return row[props.rowKey]
		} else {
			return row.id;
		}
	}
	function reloadData() {
		props.tableData.LoadDataApi?getTableTreeData():getTableData()
	}
	async function getTableData(obj) {
	  startLoading();


		let params = {...toRaw(props.tableData.SearchData),pageIndex:1,pageSize:props.pagination.pageSize}
		if (obj && obj.reload == false) {
			params.pageIndex = props.pagination.page?props.pagination.page:props.pagination.pageIndex
		} else {
			pagination.value.page = 1
		}
		const res = await props.tableData.LoadApi(params)
		if (!res.error) {
			if (!props.tableData.isTree) {
				if(props.initscore===1){
					initCourseDeptScoreList(res)
				}else{
					tableData.value = res.data.data || res.data || res.data.body;

				}
			} else {
				tableData.value = convert(res.data)
			}
			console.log(res.data.dataCount,'res.data.dataCount')
			props.pagination.itemCount = res.data.dataCount || tableData.value.length
			emit('tablemsg',tableData.value,res.data.extra)
		}
		endLoading()
	}
	async function getTableTreeData() {
		const params = {...toRaw(props.tableData.SearchData),pageIndex:props.pagination.pageIndex,pageSize:props.pagination.pageSize}
		startLoading();
		isShow.value = false
		const res = await props.tableData.LoadApi(params)
		tableData.value = []
		if (!res.error) {
			const newData = res.data.data.map(item=> ({...item,isLeaf:false,isSchool:true}))
			tableData.value = newData
			props.pagination.itemCount  = res.data.totalCount
			isShow.value = true
			endLoading()
		}
	}
	async function loadData(row) {
		let params = row.isSchool?{orgId:row.id,parentId:'0'}:{orgId:row.schoolId,parentId:row.id};
		const res = await props.tableData.LoadDataApi(params)
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

	function initCourseDeptScoreList(res){
		var msglength = 0
		if(props.tableData.SearchData.OrgExperimentIds){
			msglength = props.tableData.SearchData.OrgExperimentIds.length

		}
		ScrollX.value = 0
		Columns.value = []

		let msg = res.data.head
		msg.forEach(r=>{
			if(!r.children){
					delete r.children
				}else{
					(r.children).forEach(rr=>{
						rr.width = parseInt(rr.width)+20
						delete rr.children


					})
				}
				Columns.value.push(r)
		})


		if (props.columns) {
			Columns.value.push(...props.columns)
		}
		if (scorllx > ScrollX.value) {
			ScrollX.value = scorllx
		}
		tableData.value = res.data.body;

	}
	onMounted(() => {

	})
	onActivated(() => {

		// getTableData()
	})
	function updateColums(data) {
	    Columns.value = data
	}
		function updateTable(data) {
	    tableData.value = data
	}
	defineExpose({ getTableData,pagination,getTableTreeData ,TablePage,checkedRowKeys,tableData, updateColums,updateTable});

</script>
<style lang="scss" scoped>
	:deep(.TablePage .n-data-table-base-table-header) {
		overflow-y:hidden!important;
		scrollbar-width:auto!important;
		scrollbar-width:thin!important;
	}
</style>
