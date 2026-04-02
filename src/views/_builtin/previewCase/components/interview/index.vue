<template>
	<div>
		<div>
			<div class="design-header">
				<div class="title">面试回答</div>
			</div>
			<div>
				<n-data-table
					:columns="columns1"
					:data="tableData1"
					:pagination="false"
					:bordered="true"
					:single-line="false"
				/>
			</div>
			<div style="margin-top:20px">
				<n-data-table
					:columns="columns2"
					:data="tableData2"
					:pagination="false"
					:bordered="true"
					:single-line="false"
				/>
			</div>
		</div>
		<div style="margin-top:30px;">
			<div class="design-header">
				<div class="title">表达技巧</div>
			</div>
			<div>
				<n-data-table
					:columns="columns3"
					:data="tableData3"
					:pagination="false"
					:bordered="true"
					:single-line="false"
				/>
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
				align: 'left',
				render:(row) => {
					const dom = row.name
					// const dom = h(<NInput v-model:value={row.name} disabled type="textarea" rows={3}> </NInput>)
					return dom
				}
			},
			{
				title: '分数',
				key: 'score',
				width: 100,
				align: 'center',
				render:(row) => {
					const dom = row.score
					// const dom = h(<NInputNumber v-model:value={row.score} disabled showButton={false}> </NInputNumber>)
					return dom
				}
			},
			{
				title: '激发条件',
				key: 'incentyCondition',
				width: 320,
				align: 'left',
				render:(row) => {
					const dom = row.incentyCondition
					// const dom = h(<NInput v-model:value={row.incentyCondition} disabled type="textarea" rows={3}> </NInput>)
					return dom
				}
			},
			{
				title: '答案要点',
				key: 'gradeRule',
				align: 'left',
				render:(row) => {
					const dom = row.gradeRule
					// const dom = h(<NInput v-model:value={row.gradeRule} disabled type="textarea" rows={3}> </NInput>)
					return dom
				}
			}
	])
	const columns2 = ref([
		{
			title: '请输入AI面试考官想重点提问的知识点',
			key: 'gradeRule',
			align: 'left',
			render:(row) => {
					const dom = row.gradeRule
				// const dom = h(<NInput v-model:value={row.gradeRule} disabled type="textarea" rows={5}> </NInput>)
				return dom
			}
		}
	])
	const tableData1 =ref([])
	const tableData2 =ref([])
	async function getTableData1() {
		let params = {
			id:rowId.value,
			assessId:props.assessIdList[0].id
		}
		const res = await GetAssessContentDetails(params)
		if (!res.error) {
			tableData1.value = res.data.filter(item => item.tabType == 1)
			tableData2.value = res.data.filter(item => item.tabType == 2)
		}
	}

	const columns3 = ref([
		{
			title: '考核内容',
			key: 'name',
			width: 280,
			align: 'center',
		},
		{
			title: '详细赋分',
			key: 'score',
			width: 100,
			align: 'center',
			render:(row) => {
					const dom = row.score
				// const dom = h(<NInputNumber v-model:value={row.score} disabled showButton={false}> </NInputNumber>)
				return dom
			}
		},
		{
			title: '判分模式',
			key: 'gradeRule',
			align: 'left',
			render:(row) => {
				const dom = row.gradeRule
				// const dom = h(<NInput v-model:value={row.gradeRule} disabled type="textarea" placeholder="" rows={3}> </NInput>)
				return dom
			}
		}
	])
	const tableData3 =ref([])
	async function getTableData2() {
		let params = {
			id:rowId.value,
			assessId:props.assessIdList[1].id
		}
		const res = await GetAssessContentDetails(params)
		if (!res.error) {
			tableData3.value = res.data
		}
	}
	async function init() {
		if (route.query.id) {
			rowId.value = route.query.id;
			await getTableData1()
			await getTableData2()
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
