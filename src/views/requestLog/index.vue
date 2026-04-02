<template>
    <div>
        <SearchBox :SearchData="SearchData">
					<n-select size="large" v-model:value="dateTime" :options="dateList" placeholder="请选择日期"
						filterable @update:value="getTableData" label-field="label" value-field="value" />
        </SearchBox>

        <n-card>
					<div>
						<div class="title">查看请求日志</div>
						<div class="content">
							<n-scrollbar ref="scorllBarRef" style="height: calc(100vh - 300px);" trigger="none">
							  <p style="padding: 10px 80px;">{{logText}}</p>
							</n-scrollbar>

						</div>
					</div>
        </n-card>
    </div>
</template>

<script setup lang="jsx">
import { ref, onMounted } from 'vue'

import { GetAllLogDates, GetLogContentByDate } from '@/service'
const SearchData = ref({
    title: '请求日志'
})
const scorllBarRef = ref()
const dateList = ref([])
const dateTime = ref(null)
const logText = ref(null)
async function getDateList () {
	const res = await GetAllLogDates()
	if (!res.error){
		console.log('res',res)
		let arr = res.data.map(item => {
			return {label:item,value:item}
		})
		dateList.value = arr
	}
}
async function getTableData() {
	let params = {
		date:dateTime.value
	}
	const res = await GetLogContentByDate(params)
	if (!res.error) {
		logText.value = res.data
		scorllBarRef.value.scrollTo(0)
	}
	console.log('getTableData',res)
}

async function init() {
	await getDateList()
	if(dateList.value.length > 0) {
		dateTime.value = dateList.value[0].value
		getTableData()
	}
}
onMounted(() => {
	init()
})

</script>

<style lang="scss" scoped>
:deep(.SearchBox .n-input) {
  width: 260px !important;
}
.title{
	font-size: 20px;
	margin-bottom: 10px;
}
.content{
	background: #292929;
	border-radius: 14px;
	color: #fcfcfc;
	white-space: pre-wrap;
}
:deep(.n-scrollbar-rail__scrollbar) {
	background-color: rgba(255,255,255,.6)!important;
}
</style>
