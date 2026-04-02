<template>
	<div>
		<n-data-table :columns="columns" :data="tableData" :pagination="false" :bordered="true" :single-line="false"
			:row-key="getRowKey" :min-height="500" />
	</div>
</template>

<script setup lang="tsx">
import { ref, onMounted, h, computed } from 'vue';
import { NSpace } from 'naive-ui';
import { useRoute } from 'vue-router'
import { GetMedicalHistoryList } from '@/service'
import { t } from '@/locales';
const route = useRoute()
const rowId = ref()
// const ModeOptions = ref([
// 	{
// 		label: '仔细查问',
// 		value: 1,
// 	},
// 	{
// 		label: '问到即可',
// 		value: 2,
// 	},
// 	{
// 		label: '其它',
// 		value: 3,
// 	}
// ])
const columns = ref([
	{
		title: '考核目标',
		key: 'type',
		width: 200,
		align: 'center',
		rowSpan: (row: any, index: any) => row.PNameCount ? Number(row.PNameCount) : 1,
		render(row: any) {
			if (row.type == 1) {
				return '患者一般信息'
			} else if (row.type == 2) {
				return '现病史'
			} else if (row.type == 3) {
				return '既往史及其他相关病史'
			} else {
				return '问诊思维框架'
			}

		}
	},
	{
		title: '总分',
		key: 'typeAllSco',
		width: 60,
		align: 'center',
		rowSpan: (row: any, index: any) => row.PNameCount ? Number(row.PNameCount) : 1,
		render(row: any) {
			let allsco = 0
			tableData.value.forEach((item: any) => {
				if (row.type == item.type) {
					allsco += Number(item.score)
				}
			})
			return allsco.toFixed(1)
		}
	},
	{
		title: '考核内容(话题名称）',
		key: 'topicName',
		align: 'center',
		rowSpan: (row: any, index: any) => row.topicNameCount ? row.topicNameCount : 1,
	},
	{
		title: '问询考核内容（问题结构）',
		key: 'structure',
		titleAlign: 'center',
		align: 'left',
		render(row: any) {
			if (row.type == 4 && row.topicName == '额外加分项') {
				return row.structure
			} else {
				return row.structure
			}

		}
	},
	{
		title: '记分',
		key: 'score',
		align: 'center',
		width: 120,
	},
	{
		title: '判分模式',
		key: 'score',
		titleAlign: 'center',
		align: 'left',
		rowSpan: (row: any, index: any) => row.topicNameCount && row.type != 1 ? row.topicNameCount : 1,
		render(row: any) {
			if (!row.scoring) {
				// console.log("row", row)
				row.scoring = {
					gradeMode: 1,
					gradeRule: ''
				}
			}
			if (row.type == 4) {
				row.scoring.gradeMode = 3
				return row.scoring.gradeRule
			} else {
				let arr = [];
				// console.log("row.scoring.gradeMode", row.scoring.gradeMode)
				let cDom = Number(row.scoring.gradeMode) == 1 ? '仔细查问' : (Number(row.scoring.gradeMode) == 2 ? '问到即可' : (Number(row.scoring.gradeMode) == 3 ? "其它" : "-"))
				// if (Number(row.scoring.gradeMode) != 2) {
					arr.push(cDom);
				// }

				if (Number(row.scoring.gradeMode) == 3) {
					let tDom = row.scoring.gradeRule
					arr.push(tDom);
				}
				const dom = h(<NSpace justify={'center'} style={'align-items: center;'}></NSpace>, () => [...arr])
				if (row.category != 1 && row.category != 2) {
					return dom
				}
				else { return '' }
			}
		}
	}
])
const tableData:any = ref([])
function changeData(data: any) {
	let newData: any = [];
	data.forEach((item: any) => {
		switch (item.type) {
			case 1:
				item.name = t('page.case.case.add.patientDesign.historyTaking.GeneralInformationOfPatients')
				break;
			case 2:
				item.name = t('page.case.case.add.patientDesign.historyTaking.HistoryOfPresentIllness')
				break;
			case 3:
				item.name = t('page.case.case.add.patientDesign.historyTaking.MedicalHistoryAndOtherRelatedMedicalHistories')
				break;
		}

		if (!item.gradeMode) {
			item.gradeMode = 1
		}
		newData.push(item)
	})

	// 统计 PName 的出现次数
	const pNameCounts = computed(() => {
		return newData.reduce((acc: any, item: any) => {
			const name = item.name;
			acc[name] = (acc[name] || 0) + 1;
			return acc;
		}, {});
	});

	// 统计 topicName 的出现次数（忽略 "-"）
	const topicNameCounts = computed(() => {
		return newData.reduce((acc: any, item: any) => {
			const topic = item.topicName;
			if (topic !== "-") {
				acc[topic] = (acc[topic] || 0) + 1;
			}
			return acc;
		}, {});
	});

	// 修改数据，添加统计结果到第一个匹配项
	const modifiedData = computed(() => {
		const pNameSeen = new Set();
		const topicNameSeen = new Set();

		return newData.map((item: any) => {
			const newItem = { ...item };

			// 统计 PName
			if (!pNameSeen.has(item.name)) {
				pNameSeen.add(item.name);
				newItem.PNameCount = pNameCounts.value[item.name];
			}

			// 统计 topicName（忽略 "-"）
			if (item.topicName !== "-" && !topicNameSeen.has(item.topicName)) {
				topicNameSeen.add(item.topicName);
				newItem.topicNameCount = topicNameCounts.value[item.topicName];
			}

			return newItem;
		});
	});
	return modifiedData.value
}
const getRowKey = (row: any) => {
	return row.qId
}
async function getTableData1() {
	let params = {
		id: rowId.value,
	}
	const res: any = await GetMedicalHistoryList(params)
	if (!res.error) {
		tableData.value = changeData(res.data.data)
		tableData.value = tableData.value.map((item: any) => {
			const matchingScore = res.data.scoring.find((score: any) => score.topicId === item.topicId);
			return {
				...item,
				scoring: matchingScore ? matchingScore : { "topicId": item.topicId, "category": item.category, "gradeMode": 1, "gradeRule": "" }
			};
		});
		// console.log('tableData.value', tableData.value)
	}
}
async function init() {
	if (route.query.id) {
		rowId.value = route.query.id;
		await getTableData1()
	}
}
onMounted(() => {
	init()
})
</script>

<style lang="scss" scoped></style>
