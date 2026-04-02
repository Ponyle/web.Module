<template>
	<div>
		<n-modal v-model:show="showModal" :mask-closable="false" transform-origin="center" style="width:40%"
			class="custom=card" preset="card" :title="title" size="huge" :bordered="true">
			<div>
				<div style="font-size: 14px;margin-left: 16px;margin-bottom: 16px;">
					<a v-if="title == '导入学生'" href="/template/Student.xlsx" download style="color:#1890ff ;">点击下载模板</a>
					<a v-else-if="title == '导入教师'" href="/template/Teacher.xlsx" download style="color:#1890ff ;">点击下载模板</a>
				</div>
				<n-form ref="formRef" label-placement="left" inline :label-width="100" :model="formValue" :rules="rules"
					size="large">
					<n-grid cols="4" :x-gap="20" :y-gap="6" item-responsive responsive="screen">
						<n-grid-item span="s:4 m:4 l:4">
							<n-form-item label="所属院校" path="schoolid">
								<!-- <SelectLoad :disabled="Boolean(userInfo.baseAdmin)" ref="SchoolSelect" PlaceHolder="请选择所属院校" :loadApi="getCrmAreaSelectGetCrmSchoolSelect" @SelctLoadCheck='SelctLoadCheck'/> -->
								<n-select :disabled="Boolean(userInfo.baseAdmin)" size="large" v-model:value="formValue.schoolid"
									clearable :options="agencyIdOptions" :placeholder="t('page.system.user.placeholder_school')"
									@update:value="getClassOptions" filterable />
							</n-form-item>
						</n-grid-item>
						<n-grid-item span="s:4 m:4 l:4">
							<n-form-item label="上传文件" path="fileList">
								<n-upload name="files" ref="uploadRef" :action="uploadFile" :default-upload="false" multiple
									@change="handleChange" @finish="handleFinish" @beforeUpload="beforeUpload"
									:headers="{ 'Authorization': localStg.get('token') ? ('Bearer' + ' ' + localStg.get('token')) : '' }"
									accept=".xlsx" :max="1" :data="formValue">
									<n-button>选择文件</n-button>
								</n-upload>
							</n-form-item>
						</n-grid-item>
						<n-grid-item span="s:4 m:4 l:4">
							<n-space style="font-size: 14px;margin-left: 16px;margin-bottom: 16px;">
								<div>
									<n-checkbox :checked-value="1" :unchecked-value="0" v-model:checked="formValue.cover"
										>
										如果相同的账号已存在，则覆盖之前的信息（姓名、班级、性别、手机号、开始时间、结束时间）
									</n-checkbox>
								</div>
								<div>
									<n-checkbox :checked-value="1" :unchecked-value="0" v-model:checked="formValue.coverPassword">
										如果相同的账号已存在，则覆盖之前的密码
									</n-checkbox>
								</div>
							</n-space>
						</n-grid-item>
					</n-grid>
				</n-form>

			</div>
			<template #footer>
				<n-space class="pb-12px" justify="end">
					<n-space>
						<n-button type="primary" @click="submit" style="width: 80px; height: 40px;">
							确认
						</n-button>
					</n-space>
					<n-space>
						<n-button @click="closeModal" style="width: 80px; height: 40px;">
							取消
						</n-button>
					</n-space>
				</n-space>
			</template>
		</n-modal>
		<n-drawer v-model:show="drawerModal" :width="502" placement="right">
			<n-drawer-content title="错误信息">
				<n-scrollbar style="max-height:100%">
					<n-data-table :bordered="false" :single-line="false" single-column :columns="columns" :data="drawerData" />
				</n-scrollbar>
			</n-drawer-content>
		</n-drawer>
	</div>

</template>

<script setup lang="tsx">
import { ref, onMounted, nextTick } from 'vue';
import { useMessage } from 'naive-ui';
import { SchoolUserStudentImport, SchoolUserTeacherImport, getCrmAreaSelectGetCrmSchoolSelect } from '@/service';
// import { toRaw } from '@vue/reactivity'
// import { UpdatePwd } from '@/utils'
// import UploadDom from '@/components/common/Upload.vue'
import { t } from '@/locales';
import { localStg } from '@/utils';
import { useAuthStore } from '@/store'
const agencyIdOptions = ref()
const { userInfo } = useAuthStore()
const drawerModal = ref(false)
const drawerData = ref([])
const emit = defineEmits();
const message = useMessage()
const token = ref({
	token: localStg.get('token')
})
const formValue: any = ref({
	schoolid: null,
	fileList: '',
	cover: 0,
	coverPassword:0
})
const formRef = ref()
const CheckId = ref(null)
const uploadRef = ref()
const title = ref('导入账号')
const showModal = ref(false)
const uploadFile: any = ref(null)
const rules = {
	schoolid: { required: true, message: '请选择院校', trigger: ['target', 'blur'] },
	fileList: { required: true, message: '请选择文件', trigger: ['target', 'blur'] },
}
const SchoolSelect = ref()
const fileList: any = ref(null)
const columns: any = ref([
	{
		key: 'row',
		title: '序号',
		align: 'center'
	},
	{
		key: 'error',
		title: '错误信息',
		align: 'center'
	},
]);



async function getClassOptions() {

}
async function openModal(type: any) {
	showModal.value = true
	console.log("userInfo", userInfo)
	if (userInfo.baseAdmin) {
		formValue.value.schoolid = userInfo.baseAdmin
		// getClassOptions()
	}

	await nextTick()
	if (type == 0) {
		title.value = '导入学生'
		uploadFile.value = SchoolUserStudentImport()
		// await SchoolSelect.value.getList()
	} else {
		title.value = '导入教师'
		uploadFile.value = SchoolUserTeacherImport()
		// await SchoolSelect.value.getList()
	}
}
function closeModal() {
	formValue.value = {
		schoolid: '',
		fileList: 0
	}
	fileList.value = 0
	showModal.value = false
	emit('getTableData', '')
}

function SelctLoadCheck(id: any) {
	formValue.value.schoolid = id
}
function handleChange(options: any) {
	console.log('options', options)
	fileList.value = options.fileList.length
}
function submit() {
	if (fileList.value && fileList.value > 0) {
		formValue.value.fileList = 'finished'
	} else {
		formValue.value.fileList = null
	}
	formRef.value?.validate(async (errors: any) => {
		if (!errors) {
			uploadRef.value?.submit()
		}
	})
}
function handleFinish({ event, file }: any) {
	const res = JSON.parse(event.target.response)
	console.log('res', res)
	if (res.success == true) {
		message.success("添加成功")
		// emit('getTableData', '')
		closeModal()
	} else if (res.status == '-501') {
		drawerData.value = res.response
		drawerModal.value = true
		message.error(res.msg)
	} else {
		message.error(res.msg)
	}
}
function beforeUpload(data: any) {

}
async function init() {

}
async function initData() {

}
onMounted(() => {
	init()
})
defineExpose({ openModal, initData });

</script>

<style lang="scss" scoped></style>
