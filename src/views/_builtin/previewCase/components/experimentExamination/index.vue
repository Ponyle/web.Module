<template>
	<div>
		<div class="table-container">
			<n-data-table :columns="columns" :data="tableData" :pagination="false" :bordered="true" :single-line="false"
			:min-height="500" />
		</div>
		<ecsDetailDrawer ref="ecsDetailDrawerRef" :caseInfo="props.caseInfo"></ecsDetailDrawer>
		<ctDrawer ref="ctDrawerRef" :caseInfo="caseInfo"></ctDrawer>
		<EDGDrawer ref="edDrawerRef" :caseInfo="caseInfo"></EDGDrawer>
	</div>
</template>

<script setup lang="tsx">
import { onMounted, ref, onActivated, h } from 'vue';
import { useRoute } from 'vue-router'
import { NButton, NSpace } from 'naive-ui';
import { GetAssessAssistCheckList, GetImgResourceByID } from '@/service'
import ecsDetailDrawer from '../../../../case/case/add/components/patientDesign/components/experimentExamination/components/ecsDrawer/ecsDetailDrawer.vue'
import ctDrawer from '../../../../case/case/add/components/patientDesign/components/experimentExamination/components/medDrawer/ctDrawer.vue'
import EDGDrawer from '../../../../case/case/add/components/EditDrawer/components/EDGDrawer.vue'

const edDrawerRef = ref()
const ecsDetailDrawerRef = ref()
const ctDrawerRef = ref()
const route = useRoute()
const tableData = ref([])
const rowId:any = ref(null)
const props = defineProps({
	caseInfo: {
		type: Object
	}
});
const columns = ref([
	{
		title: '序号',
		key: 'index',
		titleAlign: 'center',
		width: 80,
		align: 'center',
		render(row:any, index:any) {
			return index + 1
		}
	},
	{
		title: '类型',
		key: 'typeName',
		titleAlign: 'center',
		align: 'left',
	},
	{
		title: '项目名称',
		key: 'checkName',
		titleAlign: 'center',
		align: 'left',
	},
	{
		title: '检查报告',
		key: 'category',
		titleAlign: 'center',
		width: 120,
		align: 'center',
		render(row:any) {
			return h(NSpace, {
				justify: 'center', // 添加居中属性
				align: 'center'    // 添加垂直居中属性
			}, {
				default: () => [
					h(NButton, { onClick: () => previewItem(row) }, { default: () => '查看' }),
				]
			});
		}
	},
	{
		title: '分数',
		key: 'score',
		align: 'center',
		width: 120,
		render(row:any) {
			return h(<span class="Score">{row.score}</span>);
		}
	}
])
function previewItem(row:any) {
	if (row.category === 1) {
		let params = {
			caseId: props.caseInfo.id,
			sex: props.caseInfo.patientSex,
			rT_Id: row.id,
			pageIndex: 0,
			pageSize: 9999,
			keyword: null,
			label: row.checkName,
			code: row.checkName,
			sno: ''
		}
		ecsDetailDrawerRef.value.openDrawer(params)
	} else if (row.category === 2) {
		initctD(row.id)
	} else if (row.category === 3) {
		edDrawerRef.value.openDrawer(row)
	} else {

	}
}
async function initctD(id:any) {
	let res:any = await GetImgResourceByID({ id: id })
	console.log(res, 'res')
	if (!res.error) {
		res.data.checkSite = res.data.checkSiteName
		ctDrawerRef.value.openDrawer(res.data)

	}

}
async function getTableData() {
	const res:any = await GetAssessAssistCheckList({ id: rowId.value });
	if (!res.error) {
		// console.log('res---------------------123123', res)
		tableData.value = res.data.data?res.data.data:[]
		// console.log('tableData---------', tableData)
	}
}
function init() {
	if (route.query.id) {
		rowId.value = route.query.id;
	}
	getTableData()
}

onMounted(() => {
	init()
})
</script>

<style></style>
