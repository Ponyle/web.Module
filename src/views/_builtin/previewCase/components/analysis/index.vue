<template>
	<div>
		<div>
			<div class="design-header">
				<div class="title">检查结果判读</div>
			</div>
			<div>
				<n-data-table :columns="columns1" :data="tableData1" :pagination="false" :bordered="true"
					:single-line="false" />
			</div>
		</div>
		<div style="margin-top:30px;">
			<div class="design-header">
				<div class="title">初步诊断及依据</div>
			</div>
			<div>
				<n-data-table :columns="columns2" :data="tableData2" :pagination="false" :bordered="true"
					:single-line="false" />
			</div>
		</div>
		<div style="margin-top:30px;">
			<div class="design-header">
				<div class="title">鉴别诊断及依据</div>
			</div>
			<div>
				<n-data-table :columns="columns2" :data="tableData3" :pagination="false" :bordered="true"
					:single-line="false" />
			</div>
		</div>
		<div style="margin-top:30px;">
			<div class="design-header">
				<div class="title">诊疗计划</div>
			</div>
			<div>
				<n-data-table :columns="columns2" :data="tableData4" :pagination="false" :bordered="true"
					:single-line="false" />
			</div>
		</div>

	</div>
</template>

<script setup lang="tsx">
	import { ref, defineProps, h, onMounted } from 'vue';
	import { NButton, NSpace, NInputNumber, NInput } from 'naive-ui';
	import { useRoute } from 'vue-router'
	import { GetAssessContentDetails } from '@/service'

	const route = useRoute()
	const props = defineProps(['assessIdList']);
	const rowId = ref(null)
	const columns1 = ref([
			{
				title: '考核内容',
				key: 'name',
				width: 280,
				align: 'center',
			},
			{
				title: '考核方法细则（填写本病例数据）',
				key: 'incentyCondition',
				width: 320,
				align: 'left',
				render:(row) => {
					const dom =row.incentyCondition
					// const dom = h(<NInput v-model:value={row.incentyCondition} disabled type="textarea" placeholder="" rows={3}> </NInput>)
					return dom
				}
			},
			{
				title: '详细赋分',
				key: 'score',
				width: 100,
				align: 'center',
				render:(row) =>{
					const dom =row.score
					// const dom = h(<NInputNumber v-model:value={row.score} disabled showButton={false}> </NInputNumber>)
					return dom
				}
			},
			{
				title: '判分模式',
				key: 'gradeRule',
				align: 'left',
				render:(row) => {
					const dom =row.gradeRule
					// const dom = h(<NInput v-model:value={row.gradeRule} disabled type="textarea" placeholder="" rows={3}> </NInput>)
					return dom
				}
			}
	])
	const tableData1 =ref([])
	async function getTableData1() {
		let params = {
			id:rowId.value,
			assessId:props.assessIdList[0].id
		}
		const res = await GetAssessContentDetails(params)
		if (!res.error) {
			tableData1.value = res.data
		}
	}

	let columns2List = columns1.value.filter(item => item.key!='incentyCondition')
	const columns2 = ref(columns2List)
	const tableData2 = ref([])
	async function getTableData2() {
		let params = {
			id:rowId.value,
			assessId:props.assessIdList[1].id
		}
		const res = await GetAssessContentDetails(params)
		if (!res.error) {
			tableData2.value = res.data
		}
	}

	const tableData3 = ref([])
	async function getTableData3() {
		let params = {
			id:rowId.value,
			assessId:props.assessIdList[2].id
		}
		const res = await GetAssessContentDetails(params)
		if (!res.error) {
			tableData3.value = res.data
		}
	}

	const tableData4 = ref([])
	async function getTableData4() {
		let params = {
			id:rowId.value,
			assessId:props.assessIdList[3].id
		}
		const res = await GetAssessContentDetails(params)
		if (!res.error) {
			tableData4.value = res.data
		}
	}
	async function init() {
		if (route.query.id) {
			rowId.value = route.query.id;
			await getTableData1()
			await getTableData2()
			await getTableData3()
			await getTableData4()
		}
	}
	onMounted(() => {
		init()
	})
</script>

<style lang="scss" scoped>
.design-header {
	margin-bottom: 3px;

	.title {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 10px;
		color: #4e5969;

		&::before {
			content: "";
			display: inline-block;
			width: 4px;
			height: 16px;
			background-color: #527fd7;
			margin-right: 6px;
			position: relative;
			top: 3px;
		}
	}

	.subtitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
