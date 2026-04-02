<template>
	<div style=" display: flex; justify-content: center; min-height: 100%;">
		<n-card style="width: 1400px; ">
			<!-- <n-grid :x-gap="0" :y-gap="0" :cols="8"> -->
				<!-- <n-grid-item span="5" style="border-right: 1px solid silver ;"> -->
					<div>
						<div class="title" style="margin-bottom: 18px;">病例信息</div>
					</div>
					<div :class="theme.darkMode ? 'dark' : 'bg-white'">
						<div style="margin-top: 10px;padding:0 16px;position: relative;">
							<div class="userInfo">
								<div>
									<n-space style="gap:8px 60px;margin-bottom: 10px;    flex-flow: column;">
										<div>
											<!-- <div class="label">编号：</div> -->
											<div class="labelVal">{{ caseInfo.patientName }} / {{ getUserSex() }}
												{{ caseInfo.patientAge }} / {{ caseInfo.departmentCatsName }}</div>
										</div>

										<div>
											<div class="label">患者主诉：</div>{{ caseInfo.chiefComplaint }}
										</div>
										<div>
											<div class="label">初步诊断：</div>
											<span style="line-height: 26px;">{{ caseInfo.preliminaryDiagnosticCriteria }}
											</span>

										</div>

									</n-space>

								</div>
							</div>
						</div>
						<div style="margin-top: 10px;padding:0 16px;">
							<n-tabs type="line" animated>
								<n-tab-pane name="bsxj" tab="病史小结">
									<div>
										<div class="title" style="margin-bottom: 18px;color: #4e5969;">
											{{ t('page.case.case.add.courseDesign.medicalHistory') }}
										</div>
										<div style="">
											<n-form ref="formRef3" inline require-mark-placement="left" label-placement="top"  size="large">
												<n-grid cols="2" :x-gap="20" :y-gap="6" item-responsive responsive="screen">
													<n-grid-item span="s:2 m:2 l:2">
														<n-form-item label="一般信息" path="generalInfo">
															<n-input class="fs14" v-model:value="caseInfo.generalInfo" disabled type="textarea" style="--n-text-color-disabled:#000"
																placeholder="请输入一般信息" :autosize="{ minRows: 2 }" />
														</n-form-item>
													</n-grid-item>
													<n-grid-item span="s:2 m:2 l:2">
														<n-form-item label="患者病史" path="medicalHistory">
															<n-input class="fs14" v-model:value="caseInfo.medicalHistory" disabled type="textarea" style="--n-text-color-disabled:#000"
																:placeholder="t('page.case.case.add.courseDesign.placeholder_medicalHistory_summary_tips')"
																:autosize="{ minRows: 4 }" />
														</n-form-item>
													</n-grid-item>
													<n-grid-item span="s:2 m:2 l:2">
														<n-form-item label="体格检查" path="physicalExamination">
															<n-input class="fs14" v-model:value="caseInfo.physicalExamination" disabled type="textarea" style="--n-text-color-disabled:#000"
																placeholder="请输入体格检查" :autosize="{ minRows: 4 }" />
														</n-form-item>
													</n-grid-item>
													<n-grid-item span="s:2 m:2 l:2">
														<n-form-item label="辅助检查" path="auxiliaryExamination">
															<n-input class="fs14" v-model:value="caseInfo.auxiliaryExamination" disabled type="textarea" style="--n-text-color-disabled:#000"
																placeholder="请输入辅助检查" :autosize="{ minRows: 4 }" />
														</n-form-item>
													</n-grid-item>
													<n-grid-item span="s:2 m:2 l:2">
														<n-form-item :label="t('page.case.case.add.courseDesign.primary_diagnosis')" path="diagnosis">
															<n-input class="fs14" v-model:value="caseInfo.diagnosis" type="textarea" disabled style="--n-text-color-disabled:#000"
																:placeholder="t('page.case.case.add.courseDesign.placeholder_primary_diagnosis_tips')"
																:autosize="{ minRows: 4 }" />
														</n-form-item>
													</n-grid-item>
													<n-grid-item span="s:2 m:2 l:2">
														<n-form-item :label="t('page.case.case.add.courseDesign.mainDiagnosis')" path="mainDiagnosis">
															<n-input class="fs14" v-model:value="caseInfo.mainDiagnosis" type="textarea" disabled style="--n-text-color-disabled:#000"
																:placeholder="t('page.case.case.add.courseDesign.placeholder_mainDiagnosis_tips')"
																:autosize="{ minRows: 4 }" />
														</n-form-item>
													</n-grid-item>
													<n-grid-item span="s:2 m:2 l:2">
														<n-form-item :label="t('page.case.case.add.courseDesign.TreatmentPlan')" path="treatmentPlan">
															<n-input class="fs14" v-model:value="caseInfo.treatmentPlan" type="textarea" disabled style="--n-text-color-disabled:#000"
																:placeholder="t('page.case.case.add.courseDesign.placeholder_TreatmentPlan_tips')"
																:autosize="{ minRows: 4 }" />
														</n-form-item>
													</n-grid-item>
												</n-grid>
											</n-form>
										</div>
									</div>
								</n-tab-pane>
								<n-tab-pane name="historyTaking" tab="病史资料收集">
									<div>
										<div style="padding:10px 20px 0 0">
											<n-space justify="start" style="margin-bottom: 20px;">
												<div v-for="item in menulist" :class="activeId == item.id ? 'btn actived' : 'btn'"
													@click="pageTo(item)">
													{{ item.name }}</div>
											</n-space>
										</div>
										<keep-alive>
											<component ref="conponentes" :caseInfo="caseInfo" :is="activeTab" />
										</keep-alive>
									</div>
								</n-tab-pane>
								<n-tab-pane name="analysis" tab="分析推理决策">
									<analysis :assessIdList="pageList[1]?.data"></analysis>
								</n-tab-pane>
								<n-tab-pane name="interview" tab="考官面试应对">
									<interview :assessIdList="pageList[2]?.data"></interview>
								</n-tab-pane>
								<n-tab-pane name="sumWriting" tab="病史小结书写">
									<sumWriting :assessIdList="pageList[3]?.data"></sumWriting>
								</n-tab-pane>
								<n-tab-pane name="humQuality" tab="医学人文素养">
									<humQuality :assessIdList="pageList[4]?.data"></humQuality>
								</n-tab-pane>
							</n-tabs>
						</div>
					</div>
				<!-- </n-grid-item> -->
				<!-- <n-grid-item span="3"> -->

				<!-- </n-grid-item> -->
			<!-- </n-grid> -->

		</n-card>
	</div>
</template>

<script setup lang="tsx">
import { ref, nextTick, onMounted, h, shallowRef } from 'vue'
import { useThemeStore } from '@/store';
import { t } from '@/locales';
import { GetCourseAssessItemList, CourseBasicInfoGetProblemBaseItem } from '@/service'
import { useRoute } from 'vue-router'
import { historyTaking,physicalExamination,experimentExamination,analysis,interview,sumWriting,humQuality } from './components/index';
const caseInfo: any = ref({});
const theme = useThemeStore();
const route = useRoute()
const rowId: any = ref(null)
const isOpen = ref(true)
const userInfoRef = ref()
const userInfoHeight = ref(0)
const activeTab = shallowRef(historyTaking);
const activeId = ref(1)
const menulist = ref([
	{
		id: 1,
		name: t('page.case.case.historyTaking'), //病史采集
		component: shallowRef(historyTaking),
		num: 0,
	}, {
		id: 2,
		name: t('page.case.case.healthCheckup'), //体格检查
		component: shallowRef(physicalExamination),
		num: 0,
	},
	{
		id: 3,
		name: t('page.case.case.ExamInspection'), //实验检查
		component: shallowRef(experimentExamination),
		num: 0,
	}

]);
const getUserSex = () => {
	if(caseInfo.value.patientSex == 0) {
		return '男'
	} else if(caseInfo.value.patientSex == 1) {
		return '女'
	} else {
		return '-'
	}
}
function handleToggle() {
	isOpen.value = !isOpen.value
}
function pageTo(item: any) {
	activeTab.value = item.component
	activeId.value = item.id
}
const pageList: any = ref([])
async function getPageId() {
	let params = {
		id: rowId.value
	}
	const res = await GetCourseAssessItemList(params)
	// console.log('res', res)
	if (!res.error) {
		pageList.value = res.data
	}
}
async function init() {
	const res: any = await CourseBasicInfoGetProblemBaseItem({ id: rowId.value })
	if (!res.error) {
		// console.log("res.data", res.data)
		if (res.data.trialObject != null && res.data.trialObject != '') {
			res.data.trialObject = res.data.trialObject.split(',')
			res.data.trialObject = [...new Set(res.data.trialObject)];

		}

		res.data.patientAge = res.data.patientAge ? res.data.patientAge.toString() : null
		res.data.suggestTime = res.data.suggestTime ? res.data.suggestTime.toString() : null
		caseInfo.value = res.data
		caseInfo.value.sceneIds = []

		if (caseInfo.value.scenes && caseInfo.value.scenes.length > 0) {
			caseInfo.value.scenes.forEach((item: any) => {
				caseInfo.value.sceneIds.push(item.id)
			})
		}
	}

	getPageId()
}
onMounted(() => {

});

if (route.query.id) {
	rowId.value = route.query.id;
}

init();
</script>

<style lang="scss" scoped>
.title {
	font-size: 16px;
	color: #000;
	font-weight: bolder;

	&::before {
		display: inline-block;
		content: "";
		position: relative;
		top: 5px;
		width: 3px;
		height: 20px;
		background: #165DFF;
		margin-right: 6px;
	}
}

.titleTip {
	line-height: 28px;

	.blueText {
		color: #527FD7;
	}
}

.userInfo {
	font-size: 14px;
	color: #000;

	.label {
		display: inline-block;
	}

	.labelVal {
		display: inline-block;
	}

	.mainSuit {}
}

.isClose {
	height: 0px !important;
	transition: all 0.28s;
}

.isOpen {
	transition: all 0.28s;
}

.isBtnOpen {
	transition: all 0.28s;
}

.isBtnClose {
	transform: rotate(180deg);
	transition: all 0.28s;
}

.btn {
	width: 300px;
	height: 40px;
	border: 1px solid #E5E6EB;
	border-radius: 6px;
	text-align: center;
	line-height: 40px;
	box-sizing: border-box;
	padding: 0 16px;
	cursor: pointer;
	font-size: 16px;
	color: #1D2129;
	background: #F7F8FA;
	transition: all 0.2s ease-in-out;

	&:hover {
		background: #165DFF;
		color: #fff;
		transition: all 0.2s ease-in-out;
	}

	&.actived {
		background: #165DFF;
		color: #fff;
		transition: all 0.2s ease-in-out;
	}
}

:deep(.n-tabs-tab__label){
	font-weight: bold;
}
</style>
