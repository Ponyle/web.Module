<template>
	<div>
		<n-card :title="SearchData.title" :bordered="false" class="rounded-5px shadow-sm "
			style="--n-padding-top:8px;--n-padding-bottom:12px;margin-bottom: 16px;">
			<div style="display:flex;justify-content:space-between">
				<div>
					<n-space justify="flex-start">


						<n-select  size="large" v-model:value="searchFromData.classId"
							filterable :options="optionsClass" :placeholder="t('page.system.user.placeholder_class')" clearable
							@update:value="getTableData" style="width: 220px;" />
						<!-- 角色 -->
						<n-select class="roleId" size="large" v-model:value="searchFromData.roleId" :options="roleLsit"
							:placeholder="t('global.role')" clearable filterable @update:value="getTableData" label-field="label"
							value-field="value" style="width: 160px;" />
						<!-- 是否绑定微信 -->
						<!-- <n-select size="large" v-model:value="searchFromData.isBindWeChat"
							:options="[{ label: t('global.no'), value: 0 }, { label: t('global.yes'), value: 1 }]"
							:placeholder="t('page.system.user.placeholder_wechat')" clearable @update:value="getTableData"
							style="width: 160px;" /> -->
						<!-- 搜索关键字 -->
						<n-input-group>
							<n-input size="large" v-model:value="searchFromData.keyword" :clearable="true" @keyup.enter="getTableData"
								type="text" :placeholder="t('page.system.user.placeholder_search')" style="width: 240px;"
								@clear="clearInput" />
							<n-button size="large" color="#2080f0" strong @click="getTableData">
								<icon-ic-search color="#fff" class="mr-4px text-20px" />{{ t('global.search') }}
							</n-button>
						</n-input-group>
					</n-space>
				</div>

			</div>
		</n-card>


		<n-card>
			<n-flex justify="start">
				<n-button color="#2080f0" @click="handleAddTable">
					<icon-ic-round-plus class="mr-4px text-20px" />{{ t('global.add') }}
				</n-button>

				<n-button color="#2080f0" @click="handleImport(0)">
					{{ t('global.import_stu') }}
				</n-button>

				<n-button color="#2080f0" @click="handleImport(1)">
					{{ t('global.import_tec') }}
				</n-button>
			</n-flex>
			<TablePage ref="tablePageRef" :columns="columns" :tableData="tableData" :pagination="pagination"
				style="margin-top: 20px;">
			</TablePage>
		</n-card>
		<addUser ref="addUserRef" @getTableData="getTableData" />
		<importPage ref="importPageRef" @getTableData="getTableData"></importPage>
	</div>
</template>
<script setup lang="tsx">
import { h, ref, onMounted, computed } from 'vue'
import { toRaw } from '@vue/reactivity'//加载toraw方法
// import searchbox from '../../system/component/searchbox.vue'
import addUser from './component/addUser.vue'
import { useMessage, useDialog, NSpace, NTooltip } from 'naive-ui'
import { getCrmAreaSelectGetCrmSchoolSelect, getDictGetClassSelect, postCrmUserDelCrmUserInfo, postCrmUserPageList, getCrmRoleSelect, getCrmDepartmentGetDepartmentTree } from '@/service'
import { useRouterPush } from '@/composables';
import { t } from '@/locales';
import { useAuthStore } from '@/store'
import importPage from './component/Import.vue'
const { userInfo } = useAuthStore()
const { getCurRouteMeta } = useRouterPush();
const btnList: any = getCurRouteMeta().btn ? getCurRouteMeta().btn : []
console.log("btnList", btnList)
let addBtn = false, EditBtn = false, DelBtn = false
btnList.forEach((item: any) => {
	if (item.name == 'CreateEspUserInfo') {
		addBtn = true
	} else if (item.name == 'DelEspUserInfo') {
		DelBtn = true
	} else if (item.name == 'SaveEspUserInfo') {
		EditBtn = true
	}
})
const dialog = useDialog()
const message = useMessage()
const addUserRef = ref()
const tablePageRef = ref()
// const SearchData = ref({
// 	title: t('page.system.user.title')
// })

const SearchData = computed(() => {
	return { title: t('page.system.user.title') }
})

// const roleOptions = ref()
const roleLsit: any = ref([]);
const searchFromData: any = ref({
	pageIndex: 1, // 当前页码
	pageSize: 10, // 每页条数
	keyword: "", // 搜索关键字
	agencyId: null, // 机构id
	classId: null, // 班级id
	isBindWeChat: null, // 是否绑定微信
	roleId: null // 角色id
})
const optionsSchool = ref()
const optionsClass = ref()

const columns = ref([
	{
		title: t('global.serialNumber'), key: 'index', align: 'center', width: 60, render: (row: any, index: any) => {
			return (
				<span>{(tablePageRef.value.pagination.page - 1) * tablePageRef.value.pagination.pageSize + index + 1} </span>
			)
		}
	},
	{ title: t('global.ID'), key: 'userName', align: 'left', width: 120 },
	{ title: t('global.name'), key: 'realName', align: 'left', width: 90 },
	{ title: t('global.role'), key: 'roleNames', align: 'center', width: 90 },
	{ title: t('global.class'), key: 'className', align: 'left', width: 140 },
	{ title: t('global.phone_number'), key: 'mobile', align: 'center', width: 110 },
	// {
	// 	title: t('global.bind_weChat'), key: 'isBindWeChat', align: 'center', width: 80, render(row: any) {
	// 		if (row.isBindWeChat) {
	// 			return t('global.yes')
	// 		} else {
	// 			return t('global.no')
	// 		}
	// 	}
	// },
	{ title: t('global.creator'), key: 'createBy', align: 'center', width: 90 },
	{ title: t('global.creationTime'), key: 'createTime', align: 'center', width: 180 },
	{ title: t('global.lastLoginTime'), key: 'recentLoginTime', align: 'center', width: 180 },
	{ title: t('global.loginTimes'), key: 'loginCount', align: 'center', width: 80 },
	{
		title: t('global.action'), key: 'action', fixed: 'right', width: 80, align: 'center', render(row: any) {
			// if (!isNullBtn) {
			const Edit = h(
				<NTooltip>
					{{
						trigger: () => {
							return (<n-button size={'small'} onClick={() => handleEditTable(row)} text type="info">
								<svg-icon icon="bytesize:compose" class="text-18px" />
							</n-button>)
						},
						default: () => t('global.edit')
					}}
				</NTooltip>
			)
			const Delete = h(
				<NTooltip>
					{{

						trigger: () => {
							return (<n-button size={'small'} onClick={() => handleDelTable(row)} text type="info" >
								<svg-icon icon="bytesize:trash" class="text-18px" />
							</n-button>)
						},
						default: () => t('global.delete'),
					}}
				</NTooltip>
			)

			let arr = [];
			if (EditBtn) {
				arr.push(Edit)
			}
			if (DelBtn) {
				arr.push(Delete)
			}

			const dom = h(<NSpace justify={'center'}></NSpace>, () => [...arr])

			return dom
			// }
		}
	}
])
if (!EditBtn && !DelBtn) {
	columns.value.pop()
}
const tableData = ref({
	LoadApi: postCrmUserPageList,
	SearchData: searchFromData.value,
})
const pagination = ref({
	pageIndex: 1,
	pageSize: 10,
	pageSizes: [10, 30, 50],
	itemCount: 0,
})

const importPageRef = ref()
function handleImport(data: any) {
	importPageRef.value.openModal(data)
}
async function getCrmRoleSelectdata() {
	roleLsit.value = []
	const res = await getCrmRoleSelect({ schoolId: searchFromData.value.agencyId ? searchFromData.value.agencyId : '' })
	if (!res.error) {
		roleLsit.value = res.data
	}
}
// 新增用户
const handleAddTable = () => {
	addUserRef.value.openModal({ isAdd: true })
}
//编辑用户
const handleEditTable = (row: any) => {

	addUserRef.value.openModal({ ...row, isAdd: false })
	// console.log('row', row)
}
// 删除用户
const handleDelTable = (row: any) => {
	dialog.warning({
		title: t('global.deletePrompt.title'),
		content: t('global.deletePrompt.before') + row.userName + ',' + t('global.deletePrompt.after'),
		positiveText: t('global.confirm'),
		negativeText: t('global.cancel'),
		positiveButtonProps: {
			type: 'primary'
		},
		onPositiveClick: async () => {
			let res: any = await postCrmUserDelCrmUserInfo(row.id)
			if (!res.error) {
				// console.log('res', res)
				message.success(res.msg)
				getTableData()
			}
		},
		onNegativeClick: () => {
		}
	})
}
// const getIntiData = async () => {
// 	let res:any = await getCrmRoleSelect({})
// 	roleOptions.value = res.data
// }
function handleSchoolChange() {
	searchFromData.value.classId = null
	searchFromData.value.roleId = null
	if (searchFromData.value.agencyId) {
		getClassOpint()
	}
	getCrmRoleSelectdata()
	getTableData()
}
const getTableData = () => {
	toRaw(tablePageRef.value.getTableData({ reload: false }))
}
const clearInput = () => {
	searchFromData.value.keyword = null
	getTableData()
}


async function getClassOpint() {
	if (1) {
		const res = await getDictGetClassSelect({ id: 0 })
		optionsClass.value = res.data
	}

}


onMounted(() => {

	getTableData()
	if (userInfo.baseAdmin) {
		searchFromData.value.agencyId = userInfo.baseAdmin
	}
	getClassOpint()
	getCrmRoleSelectdata()
})
</script>

<style scoped lang="scss">
.SearchBox .n-input {
	width: 240px !important;
}

// :deep(.roleId .n-select .n-input) {
// 	// .n-select{
// 	width: 160px !important;
// 	min-width: 100px !important;
// 	// }
// }</style>
