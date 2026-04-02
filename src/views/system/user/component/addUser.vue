<template>
	<n-modal v-model:show="showModal" class="custom-card" preset="card" :style="{ width: '1000px' }" :title="title"
		size="huge" :bordered="false" @after-leave="closeModal" :mask-closable="false" transform-origin="center">
		<n-flex justify="center" align="center" vertical>
			<n-form :model="formData" :rules="rules" ref="formRef" label-placement="left" label-width="auto"
				:label-style="{ fontSize: '14px' }" style="margin-top: 20px;" require-mark-placement="left">
				<n-grid x-gap="48" :cols="4" item-responsive responsive="screen">
					<n-grid-item span="s:4 m:4 l:4">
						<n-flex justify="center" align="center">
							<n-form-item path="avatar">
								<n-upload ref="upload" size="large" style="cursor: pointer;" show-retry-button :action="UploadUrls"
									:headers="{
										'Authorization': localStg.get('token') ? ('Bearer' + ' ' + localStg.get('token')) : ''
									}" :show-file-list="false" :on-remove="handleImgRemove" @finish="handleUploadFinish"
									accept="image/png, image/jpeg, image/ico">
									<n-avatar round v-if="formData.avatar && formData.avatar.length != 0" :size="88"
										:src="formData.avatar" />
									<!-- <n-button v-else>上传头像</n-button> -->
									<n-avatar v-else :size="88" round>
										<svg-icon icon="ooui:user-avatar" class="text-62px" />
									</n-avatar>
								</n-upload>


							</n-form-item>
						</n-flex>
					</n-grid-item>





					<n-grid-item span="s:4 m:2 l:2">
						<n-form-item path="classId" :label="t('page.system.user.Class_affiliation')">
							<n-select  size="large" v-model:value="formData.classId" filterable clearable :options="classOptions"
								:placeholder="t('page.system.user.placeholder_class')" />
						</n-form-item>
					</n-grid-item>

					<n-grid-item span="s:4 m:2 l:2">
						<n-form-item path="roleData" :label="t('global.role')">
							<n-select size="large"  v-model:value="formData.roleData" clearable :options="roleOptions"
								:placeholder="t('page.system.user.placeholder_enter_role')" />
						</n-form-item>
					</n-grid-item>


					<n-grid-item span="s:4 m:2 l:2">
						<n-form-item path="realName" :label="t('global.name')">
							<n-input size="large" v-model:value="formData.realName"
								:placeholder="t('page.system.user.placeholder_enter_name')" show-count :maxlength="25" />
						</n-form-item>
					</n-grid-item>
					<n-grid-item span="s:4 m:2 l:2">
						<n-form-item path="sex" :label="t('global.gender')">
							<n-radio-group size="large" v-model:value="formData.sex" name="radiogroup">
								<n-radio v-for="sex in [{ value: 1, label: t('global.male') }, { value: 0, label: t('global.female') }]"
									:key="sex.value" :value="sex.value">
									{{ sex.label }}
								</n-radio>
							</n-radio-group>
						</n-form-item>
					</n-grid-item>

					<n-grid-item span="s:4 m:2 l:2">
						<n-form-item path="userName" :label="t('global.ID')">
							<n-input size="large" v-model:value="formData.userName" :disabled="!active"
								:placeholder="t('page.system.user.placeholder_enter_id')" />
						</n-form-item>
					</n-grid-item>

					<n-grid-item span="s:4 m:2 l:2">
						<n-form-item path="passWord" :label="t('global.password')">
							<n-input-group>
								<n-input size="large" v-model:value="formData.passWord"
									:placeholder="t('page.system.user.placeholder_enter_pwd')" />
								<n-button size="large" style="font-size: 12px;" type="primary"
									@click="getRandomPassword">{{t('page.system.user.Random_generation')}}</n-button>
							</n-input-group>
						</n-form-item>
					</n-grid-item>

					<n-grid-item span="s:4 m:2 l:2">
						<n-form-item path="mobile" :label="t('global.tel')">
							<n-input size="large" v-model:value="formData.mobile"
								:placeholder="t('page.system.user.placeholder_enter_tel')" show-count :maxlength="13" />
						</n-form-item>
					</n-grid-item>

					<!-- <n-grid-item span="s:4 m:2 l:2">
						<n-form-item path="email" :label="t('global.email')">
							<n-input size="large" v-model:value="formData.email"
								:placeholder="t('page.system.user.placeholder_enter_email')" show-count :maxlength="50" />
						</n-form-item>
					</n-grid-item> -->

					<n-grid-item span="s:4 m:2 l:2">
						<n-form-item path="daterange" :label="t('global.validTime')">
							<n-date-picker size="large" v-model:formatted-value="formData.daterange" time-picker-format="yyyy-MM-dd"
								value-format="yyyy-MM-dd" type="daterange" :update-value-on-close="true" :shortcuts="rangeShortcuts" />
						</n-form-item>
					</n-grid-item>

					<!-- <n-grid-item span="s:4 m:2 l:2">
						<n-form-item path="status" :label="t('global.status')">
							<n-select size="large" v-model:value="formData.status" clearable
								:options="[{ label: t('global.normal'), value: 0 }, { label: t('global.outOfService'), value: 1 }]"
								:placeholder="t('page.system.user.placeholder_enter_status')" />
						</n-form-item>
					</n-grid-item> -->

					<n-grid-item span="s:4 m:4 l:4">
						<n-form-item path="remark" :label="t('global.remark')">
							<n-input size="large" v-model:value="formData.remark" type="textarea"
								:placeholder="t('page.system.user.placeholder_enter_notes')" show-count :maxlength="100" />
						</n-form-item>
					</n-grid-item>
				</n-grid>
			</n-form>
		</n-flex>
		<template #footer>
			<n-flex class="pb-12px" justify="end">
				<n-button type="primary" @click="submit">
					{{ t('global.confirm') }}
				</n-button>
				<n-button @click="closeModal">
					{{ t('global.cancel') }}
				</n-button>
			</n-flex>
		</template>
	</n-modal>
</template>

<script setup lang="tsx">
import { ref, defineExpose, defineEmits, computed, onMounted } from 'vue'
import { localStg } from '@/utils'
import { getCrmAreaSelectGetCrmSchoolSelect,getDictGetClassSelect,UploadFiles, getCrmRoleSelect, getCrmDepartmentGetDepartmentTree, postCrmUserCreateCrmUserInfo, postCrmUserSaveCrmUserInfo, postCrmUserPageList, GetCrmRegionSelect } from '@/service'
import { useMessage } from 'naive-ui'
import { formRules } from '@/utils';
import { REGEXP_PHONE, REGEXP_PWD } from '@/config';
import CryptoJS from 'crypto-js'
import { t } from '@/locales';
import { useAuthStore } from '@/store'
const { userInfo } = useAuthStore()
const baseURL = import.meta.env.VITE_BASE_API
const message = useMessage()
const emit = defineEmits()
const active = ref(true)
const UploadUrls = UploadFiles()
let formRef = ref()
let showModal = ref(false)
// let checkedSex = ref()
// let deptOptions = ref()
let roleOptions = ref()
const title = computed(() => {
	return isAdd.value ? t('page.system.user.add_title') : t('page.system.user.edit_title')
})
const isAdd = ref(false)
const agencyIdOptions =ref()
const classOptions =ref()
// let roleValue = ref(null)
let initFormData = () => {
	return {
		id: 0,
		avatar: "",
		userName: "", //账号
		realName: "", //真实姓名
		passWord: "", //密码
		sex: null, //性别
		mobile: "", //手机号
		email: "", //邮箱
		daterange: null,
		// departmentId: null,
		remark: "", //备注
		roleValue: null,
		expireStart: null, //过期开始时间
		expireEnd: null, //过期结束时间
		roleArray: [],
		cityIds: [],
		provinceIds: [],
		status: 0,  //0为正常 1为停用
		classId: null,//班级id
		schoolId: '10016781007389701', //机构id
		roleData: null,//角色信息
	}
}
// let areaOptions = ref([])
// async function getDeptOptions() {
// 	let res = await GetCrmRegionSelect()
// 	if (!res.error) {
// 		areaOptions.value = res.data
// 	}
// }
const getLocalTime = (time:any) => {
	if (!time) return "";
	const date = new Date(time)//按照传入的时间进行转化
	const Y = date.getFullYear();
	const M = `${(date.getMonth() + 1)}`.padStart(2, "0");
	const D = `${date.getDate()}`.padStart(2, "0");
	return `${Y}-${M}-${D}`;
}
let formData:any = ref(initFormData())
const rules = ref({
		schoolId:{ required: true, message: '请选择学校', trigger: ['target', 'blur'] },
		userName: { required: true, message: t('page.system.user.placeholder_enter_id'), trigger: ['target', 'blur'] },
		realName: { required: true, message: t('page.system.user.placeholder_enter_name'), trigger: ['target', 'blur'] },
		passWord: { required: true, pattern: REGEXP_PWD, message: t('page.system.user.require_enter_pwd'), trigger: ['target', 'blur'] },
		sex: { type: 'number', required: false, message: '请选择性别', trigger: ['target', 'blur'] },
		mobile: { pattern: REGEXP_PHONE, required: false, message: t('page.system.user.placeholder_enter_tel'), trigger: ['target', 'blur'] },
		email: formRules.email,
		daterange: { type: 'array', required: true, message: '请填写有效时间', trigger: ['target', 'blur'] },
		// departmentId: { required: false, message: '请选择部门', trigger: ['target', 'blur'] },
		roleData: { required: true, message: t('page.system.user.placeholder_enter_role'), trigger: ['target', 'blur'] },
		status: { type: 'number', required: true, message: t('page.system.user.placeholder_enter_status'), trigger: ['target', 'blur'] },
		cityIds: { type: 'array', required: false, message: '请选择区域', trigger: ['target', 'blur'] },
	})
async function getSchoolOptions() {
	const res = await getCrmAreaSelectGetCrmSchoolSelect({})
	agencyIdOptions.value = res.data
}
async function schoolChange() {
	formData.value.classId = null
	formData.value.roleData = null
	await getClassOptions()
	await getRuleData()
}
async function getClassOptions() {

	const res:any = await getDictGetClassSelect({id:formData.value.schoolId})
	classOptions.value = res.data
}
async function getRuleData() {
	let res1 = await getCrmRoleSelect({ schoolId: formData.value.schoolId })
	roleOptions.value = res1.data
}
const openModal = async (data:any) => {
	console.log('data',data)

	active.value = true
	isAdd.value = data.isAdd
	rules.value.passWord.required = data.isAdd?true:false
	if (data.id) {
		formData.value.id = data.id
	}
getRuleData()
getClassOptions()

	// 编辑状态
	if (!isAdd.value) {
		active.value = false
		formData.value = data
		formData.value.roleData = formData.value.riDs[0]
		console.log('agencyIdOptions.value',agencyIdOptions.value)
		console.log('formData.value.agencyName',formData.value)
		//let Schooldata= agencyIdOptions.value.find((item:any) => item.label === formData.value.agencyName);
	//	console.log('Schooldata',Schooldata)
	//	formData.value.schoolId = Schooldata
		formData.value.passWord=null
		formData.value.status = formData.value.status=='正常'?0:1
		if (formData.value.expireStart && formData.value.expireEnd) {
			formData.value.daterange = [formData.value.expireStart, formData.value.expireEnd]
		}

	} else {
		const cur = Date.now()
		const end = Date.now() + 5 * 365 * 24 * 60 * 60 * 1000
		const startTime = getLocalTime(cur)
		const endTime = getLocalTime(end)
		// console.log(startTime,endTime);
		formData.value.daterange = [startTime, endTime]

		console.log("userInfo.baseAdmin",userInfo.baseAdmin)
		if (userInfo.baseAdmin) {
			formData.value.schoolId = '10016781007389701'
		}
	}
	if (formData.value.schoolId) {
		getClassOptions()
		getRuleData()
	}

	showModal.value = true
}

const getRandomPassword = () => {
	const str = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		'@', '#'];
	const num = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
	const capital = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
	const minuscule = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
	const spechars = ['@', '#']
	let pwdLength = 8
	let arr = [str, num, capital, minuscule, spechars];
	for (let i = 0; i < pwdLength - 5; i++) {
		arr.push(str);
	}
	let pwdStr = '';
	arr.forEach(item => {
		pwdStr += item[Math.round(Math.random() * (item.length - 1))]
	})
	formData.value.passWord = pwdStr
}
let rangeShortcuts:any = {}
rangeShortcuts[t('global.oneWeek')] = () => {
	const cur = new Date().getTime()
	return [cur, cur + 7 * 24 * 60 * 60 * 1000]
}
rangeShortcuts[t('global.twoWeeks')] = () => {
	const cur = new Date().getTime()
	return [cur, cur + 14 * 24 * 60 * 60 * 1000]
}
rangeShortcuts[t('global.oneMonth')] = () => {
	const cur = new Date().getTime()
	return [cur, cur + 30 * 24 * 60 * 60 * 1000]
}
rangeShortcuts[t('global.twoMonths')] = () => {
	const cur = new Date().getTime()
	return [cur, cur + 60 * 24 * 60 * 60 * 1000]
}
rangeShortcuts[t('global.oneYear')] = () => {
	const cur = new Date().getTime()
	return [cur, cur + 365 * 24 * 60 * 60 * 1000]
}
rangeShortcuts[t('global.fiveYears')] = () => {
	const cur = new Date().getTime()
	return [cur, cur + 5 * 365 * 24 * 60 * 60 * 1000]
}
rangeShortcuts[t('global.longTime')] = () => {
	const cur = new Date().getTime()
	return [cur, 4070880000000]
}

// 上传头像
// const customRequest = async ({ file, onFinish, onError }) => {
// 	// console.log('file', file, onFinish, onError);
// 	const formValue = new FormData();
// 	formValue.append("file", file.file);
// 	const res = await UploadFiles(file.file);
// };
async function handleUploadFinish(data:any) {
	// console.log('data-------', data);
	let res = JSON.parse(data.event.target.response)
	if (res.success) {
		formData.value.avatar = baseURL + res.response
	}
}

//删除的回调
const handleImgRemove = ({ file, event }:any) => {
	formData.value.avatar = formData.value.avatar.filter((item:any) => item.url != file.url)
}
function EncodePwd(pwd:any) {
	const md5 = CryptoJS.MD5(pwd).toString().toLowerCase()
	return md5
}
const localDatatoAsyncData = () => {
	let params = { ...formData.value }
	if (params.passWord) {
		params.passWord = EncodePwd(params.passWord)
	}
	params.expireStart = params.daterange[0]
	params.expireEnd = params.daterange[1]
	// params.roleArray = [params.roleValue]

	// console.log('params', params, formData.value);
	delete params.daterange
	// delete params.roleValue
	return params
}
// 确定
const submit = () => {
	formRef.value?.validate(async (errors:any) => {
		if (!errors) {
			if (formData.value.mobile === "") {
				delete formData.value.mobile
			}
			delete formData.value.provinceIds
			let res:any=null;
			if (isAdd.value) {
				res = await postCrmUserCreateCrmUserInfo(localDatatoAsyncData())
			} else {
				formData.value.roleArray = [formData.value.roleValue]
				res = await postCrmUserSaveCrmUserInfo(localDatatoAsyncData())
			}
			emit('getTableData')

			if (!res.error) {
				message.success(res.msg)
				closeModal()
			} else {
				// message.error(isAdd.value ? '新增失败' : '编辑失败')
			}
		} else {
			// console.log('1111111111', errors, formData.value)
		}
	})
}
// 取消
const closeModal = () => {
	showModal.value = false
	formData.value = initFormData()
}
// const getCheckedData = (key:any, option:any) => {
// 	console.log(key, option);
// }
async function init() {
}
onMounted(() => {
	init()
})
defineExpose({ openModal })
</script>

<style lang="scss" scoped></style>
