<template>
	<div>
		<div class="table-container">
			<n-data-table
				:columns="columns"
				:data="tableData"
				:pagination="false"
				:bordered="true"
				:single-line="false"

				:min-height="500"
			/>
		</div>
	</div>
</template>

<script setup lang="tsx">
	import { onMounted, ref, onActivated, h } from 'vue';
	import { useRoute } from 'vue-router'
	import { GetAssessPhysiCheckList } from '@/service'
	const route = useRoute()
	const tableData = ref([])
	const rowId:any = ref(null)
	const columns = ref([
		{
			title: '序号',
			key: 'index',
			titleAlign: 'center',
			width: 80,
			align: 'center',
			render(row:any,index:any) {
				return index +1
			}
		},
		{
			title: '检查分类',
			key: 'checkClassify',
			titleAlign: 'center',
			width: 120,
			align: 'center',
		},
		{
			title: '检查方法',
			key: 'checkMethod',
			titleAlign: 'center',
			width: 160,
			align: 'center',
		},
		{
			title: '检查名称',
			key: 'checkName',
			align: 'left',
		},{
			title: '结果',
			key: 'outcome',
			align: 'left',
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
	async function getTableData() {
		const res:any = await GetAssessPhysiCheckList({ id: rowId.value });
		if (!res.error) {
			// console.log('res---------------------123123',res.data.data)
			tableData.value = res.data.data?res.data.data:[]
			// console.log('tableData---------',tableData)
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

<style>
</style>
