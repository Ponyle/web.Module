<template>
	<div>
		<div :class="theme.darkMode ? 'mainContent dark' : 'mainContent bg-white'">
			<n-page-header @back="handleBack">
				<template #back>
					<span></span>
				</template>
				<template #title>
					<h2>{{t('page.system.role.title')}}</h2>
				</template>
			</n-page-header>
			<n-grid :x-gap="12" :y-gap="12" :cols="6" layout-shift-disabled>
				<n-gi :span="1">
					<n-space :size="16" vertical>
						<n-button class="test" secondary style="width: 100%; height: 42px">{{t('page.system.role.AllRoles')}}({{ RoleLists.length
							}})</n-button>
						<!-- <n-button v-if="RoleLists" id="actived" style="width: 100%;height:42px ;" @click="setSwitch(RoleLists.menuIds)">{{RoleLists.name}}</n-button> -->
						<div v-for="item in RoleLists" class="slideBtn">
							<n-button :id="item.value == RoleListsInfo.value ? 'actived' : ''"
								style="width: 100%; height: 60px" @click="setSwitch(item)">
								<template #default>
									<div style="width: 100%;">
										<div class="left">
											<p class="RoleName">
												<svg-icon style="display: inline-block;" icon="ri:user-settings-line"
													class="text-14px" />
												{{ item.label }}
											</p>



										</div>
										<div v-if="(EditBtn || DelBtn)" @click.stop="Setting(item)" class="right">
											<n-dropdown trigger="click" :options="options" @select="handleSelect">
												...
											</n-dropdown>
										</div>
									</div>
								</template>
							</n-button>
						</div>

						<n-button v-if="addBtn" class="test" style="width: 100%; height: 42px"
							@click="handleAddTable"><svg-icon style="display: inline-block;" icon="ic:outline-plus"
								class="text-14px" />{{t('page.system.role.ClicktToCreateRole')}}</n-button>
					</n-space>
				</n-gi>
				<n-gi :span="5">

					<div class="RoleListDom">
						<h3>{{t('page.system.role.title')}}</h3>
						<div class="Content">
							<div class="title">
								<div>{{t('page.system.role.OperationObjects')}}</div>


								<div>{{t('page.system.role.MenuAccessPermissions')}} </div>
								<div>{{t('page.system.role.FunctionalPermissions')}}</div>
							</div>
							<div>

							</div>
							<div v-for="item in treeList" class="MenguItemBox">
								<div class="header">
									<div>

										<n-ellipsis style="max-width:160px">
											{{ item.label }}
										</n-ellipsis>
									</div>
									<div>
										<!-- v-model:value="item.checked" -->

										<n-switch v-model:value="item.checked" size="small"
											:disabled="Boolean(item.children?.find(d => d.checked))" />
									</div>
									<div>
										<n-space item-style="display: flex;">
											<n-checkbox v-for="ltem in item.btns" v-model:checked="ltem.checked"
												:disabled="!item.checked">

												<n-ellipsis style="max-width: 180px">
													{{ ltem.label }}
												</n-ellipsis>
											</n-checkbox>

										</n-space>
									</div>
								</div>
								<div v-for="Item in item.children">
									<div>
										<n-ellipsis style="max-width: 180px">
											{{ Item.label }}
										</n-ellipsis>
									</div>

									<div>
										<n-switch v-model:value="Item.checked" size="small"
											:disabled="Boolean(!item.checked) || Boolean(Item.btns?.find(d => d.checked))" />
									</div>
									<div>
										<n-space item-style="display: flex;">
											<n-checkbox v-for="ltem in Item.btns" v-model:checked="ltem.checked"
												:disabled="!Item.checked" :label="ltem.label" />
											<n-checkbox v-for="ltem in Item.children" v-model:checked="ltem.checked"
												:disabled="!Item.checked" :label="ltem.label">
											</n-checkbox>
										</n-space>

									</div>
								</div>
							</div>
						</div>
					</div>
				</n-gi>
			</n-grid>
			<addRole ref="addRoleRef" @getTableData="getTableData" />
			<div :class="theme.darkMode ? 'footContent dark' : 'footContent bg-white'" style="margin-top: 20px;">
				<n-space justify="center">
					<n-button @click="handleBack">{{t('global.cancel')}}</n-button>
					<n-button v-if="saveBtn" type="primary" @click="submit">{{t('global.Submit')}}</n-button>
				</n-space>
			</div>
		</div>
	</div>
</template>

<script setup lang="tsx">
import { reactive, ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useMessage, UploadFileInfo, useDialog } from 'naive-ui';
import { router } from '@/router';
import { GetCrmRoleByID, getCrmRoleSelect, DelCrmRoleInfo, GetPermissionTree, SaveAssign, GetPermissionIdByRoleId } from '@/service';
import { useThemeStore } from '@/store';
import { useRouterPush } from '@/composables';
import addRole from './component/addRole.vue'
import { t } from '@/locales';
const { routerPush, getCurRouteMeta } = useRouterPush();

const btnList:any = getCurRouteMeta().btn ? getCurRouteMeta().btn : [];
// console.log('btnList()', btnList, getCurRouteMeta())
let addBtn = false, EditBtn = false, DelBtn = false, saveBtn = false
btnList.forEach((item:any) => {
	if (item.name == 'CreateEspRoleInfo') {
		addBtn = true
	} else if (item.name == 'DelEspRoleInfo') {
		DelBtn = true
	} else if (item.name == 'SaveEspRoleInfo') {
		EditBtn = true
	} else if (item.name == 'SaveAssign') {
		saveBtn = true
	}
})
const options:any = []
if (EditBtn) {
	options.push({
		label: t('global.edit'),
		key: "edit"
	})
}
if (DelBtn) {
	options.push({
		label: t('global.delete'),
		key: 'delete'
	})
}
const theme = useThemeStore();
const route = useRoute();
const ClickData:any = ref(null)
const dialog = useDialog()
const message = useMessage();
const treeList:any = ref([])
const addRoleRef = ref()
const RoleListsInfo = ref({
	value: null
})
const RoleLists:any = ref([])
// if (route.query.id) {
// 	id.value = route.query.id;
// }
// if (route.query.orgId) {
// 	orgId.value = route.query.orgId;
// }
async function getRoleLists() {
	let params = {
		page: 1,
		pageSize: 9999,
		keyword: null,
	}
	const res = await getCrmRoleSelect({ Keyword: '' })
	// const res = await GetCrmRolePageList(params)
	if (!res.error) {
		RoleLists.value = res.data
		if (RoleLists.value.length > 0) {
			if (!RoleListsInfo.value.value) {
				setSwitch(RoleLists.value[0])
			}

		}
	}
}
async function getTree() {
	const res:any = await GetPermissionTree({ pid: 0 })
	if (!res.error) {
		treeList.value = res.data.children
		// console.log('treeList', treeList.value)
	}
}
function Setting(data:any) {
	ClickData.value = data
	// console.log('11', data, ClickData.value);
}
async function setSwitch(data:any) {
	RoleListsInfo.value = data
	//获取选中的id
	await getCheckMenuList()
	//根据选中的id 改变树状数据的checked
	await MenuListsReset(treeList.value)

}
const checkList:any = ref([])
async function getCheckMenuList() {
	let params = {
		rid: RoleListsInfo.value.value
	}
	const res:any = await GetPermissionIdByRoleId(params)
	if (!res.error) {
		checkList.value = [...res.data.permissionids]
	}

}
async function MenuListsReset(data:any) {
	data.forEach((item:any) => {
		if (checkList.value.includes(item.value)) {
			item.checked = true
		} else {
			item.checked = false
		}
		if (item.btns && item.btns.length > 0) {
			item.btns.forEach((Item:any) => {
				if (checkList.value.includes(Item.value)) {
					Item.checked = true
				} else {
					Item.checked = false
				}
			})
		}
		if (item.children && item.children.length > 0) {
			return MenuListsReset(item.children)
		}
	})

}
// function SelectReset() {
// 	console.log('SelectReset')
// }
//点击编辑删除的时候判断
function handleSelect(res:any) {
	if (res == 'edit') {
		handleEditTable()
	} else if (res = 'delete') {
		dialog.warning({
			title:  t('global.deletePrompt.title'),
			content:  t('global.deletePrompt.before') +'  '+ ClickData.value.label + '  ,' + t('global.deletePrompt.after'),
			positiveText:t('global.confirm'),
			negativeText: t('global.cancel'),
			positiveButtonProps: {
				type: 'primary'
			},
			onPositiveClick: async () => {
				const res = await DelCrmRoleInfo({ id: ClickData.value.value })
				if (!res.error) {
					message.success(t('global.delete'))
					getTableData()
				}
			},
			onNegativeClick: () => {
				message.info(t('global.cancel'))
			}
		})
	}
}
async function handleEditTable() {
	let res = await GetCrmRoleByID({ ID: ClickData.value.value })
	if (!res.error) {
		addRoleRef.value.openModal(res.data)
	}

}
function handleAddTable() {
	addRoleRef.value.openModal()
}
function getTableData() {
	getRoleLists()
}
let pids:any = ref([])
function getPids(data:any) {
	data.forEach((item:any) => {
		if (item.checked) {
			pids.value.push(item.value)
		}
		if (item.btns && item.btns.length > 0) {
			let btns = item.btns.filter((Item:any) => Item.checked).map((Item:any) => Item.value)
			// console.log('btns', btns)
			pids.value.push(...btns)
		}

		if (item.children && item.children.length > 0) {
			return getPids(item.children)
		}
	})
}
async function submit() {
	pids.value = []
	getPids(treeList.value)
	let params = {
		rid: RoleListsInfo.value.value,
		pids: pids.value
	}
	const res = await SaveAssign(params)
	if (!res.error) {
		message.success(t('global.save'))
	}

}
function handleBack() {
	router.back();
}

async function init() {
	await getTree()
	await getRoleLists()

}
onMounted(() => {
	init()
})
</script>

<style lang="scss" scoped>
.n-list-item {
	margin-bottom: 10px;
	border: 1px solid #e5e6eb;
	border-radius: 4px;
	padding: 10px;
}

.RoleListDom {
	border: 1px solid #dfdfdf;
	border-radius: 4px;
	overflow: hidden;

	h3 {
		padding: 0 12px;
		height: 42px;
		line-height: 42px;
		background: #efefef;
		color: #444;
		font-size: 16px;
	}

	.Content {
		>div {
			overflow: hidden;

			&.title {
				padding: 10px;
				border-bottom: 1px solid #dfdfdf;
				color: #9b9b9b;

				>div {
					float: left;
					text-align: left;
					width: 180px;
					padding-left: 20px;
					box-sizing: border-box;
				}

				>div:last-child {
					width: calc(100% - 440px);
					margin-left: 20px;
					text-align: left;
				}
			}
		}

		.MenguItemBox {
			margin-left: -10px;

			>div {
				position: relative;
				display: flex;
				align-items: center;

				&.header:before {
					content: '';
					display: inline-block;
					height: 20px;
					width: 4px;
					background: #2f93f1;
					position: absolute;
					border-radius: 4px;
					left: 12px;
					top: 19px;
				}

				&.header {
					background: #efefefa6;
					height: 60px;
					line-height: 60px;

					>div:first-child {
						font-size: 16px;
						font-weight: bolder;
					}
				}

				margin-top: 10px;
				width: calc(100% - 40px);
				margin-left: 20px;
				overflow: hidden;
				min-height: 30px;
				line-height: 30px;

				>div {
					float: left;
					width: 200px;
					text-align: left;
					padding-left: 22px;
					overflow: hidden;
				}

				>div:last-child {
					width: calc(100% - 260px);
					margin-left: 20px;
					text-align: left;
				}
			}
		}
	}
}

:deep(#actived .n-button__border) {
	border-color: #40a9ff;
}

:deep(#actived .n-button__content) {
	color: #40a9ff;
}

:deep(.n-checkbox) {
	width: 200px;
}

.Content {
	padding-bottom: 10px;
}

.slideBtn {
	position: relative;
	display: block;
	height: 60px !important;
	align-items: center;

	.left {
		float: left;
		font-size: 14px;

		p:nth-child(1) {
			font-size: 14px;
			display: flex;
			align-items: center;

			&:nth-child(2) {
				font-size: 12px;
			}
		}
	}

	.right {
		position: absolute;
		z-index: 9;
		transform: rotate(270deg);
		right: 12px;
		top: 50%;
		margin-top: -8px;
		font-size: 16px;

	}

	.systemRole {
		text-align: left;
		padding-left: 16px;
		padding-top: 4px;
		color: #999;
	}

	.RoleName {
		:deep(svg) {
			margin-right: 4px;
		}
	}
}
</style>
