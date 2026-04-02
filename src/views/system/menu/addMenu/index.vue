<template>
	<div>
		<div :class="theme.darkMode?'mainContent dark':'mainContent bg-white'">
			<n-page-header  @back="handleBack">
				<template #back>
					<n-space align="center">
						<svg-icon icon="ic:baseline-arrow-back" class="text-26px" />
						<span style="font-size:18px">{{t('global.return')}}</span>
					</n-space>
				</template>
				<template #title>
					<h2 style="display: flex;align-items: center;font-size: 18px;margin-top: 2px;">
						<n-divider style="background:#ccc;margin:0 14px" vertical />
						<span v-if="pageType == 0">{{t('page.system.menu.AddMenu')}}</span>
						<span v-else-if="pageType == 1">{{t('page.system.menu.Edit')}}</span>
					</h2>
				</template>
			</n-page-header>
			<n-form
					ref="formRef"
					inline
					require-mark-placement="left"
					:label-width="80"
					:model="formValue"
					:rules="rules"
					:size="size"
				>
				<n-grid cols="4" :x-gap="20" :y-gap="6" item-responsive responsive="screen">
						<n-grid-item span="s:4 m:2 l:1">
							<n-form-item :label="t('page.system.menu.MenuName')" path="name">
								<m-input v-model:value="formValue.name" :placeholder="t('page.system.menu.placeholder_MenuName')" />
							</n-form-item>
						</n-grid-item>
						<n-grid-item span="s:4 m:2 l:1">
							<n-form-item :label="t('page.system.menu.MenuNumber')" path="code">
								<m-input v-model:value="formValue.code" :placeholder="t('page.system.menu.placeholder_MenuNumber')" />
							</n-form-item>
						</n-grid-item>
						<n-grid-item span="s:4 m:2 l:1">
							<n-form-item :label="t('page.system.menu.BelongingMenu')" path="pid">
								<n-tree-select v-model:value="formValue.pid" clearable filterable :show-path="true" check-strategy="all" :placeholder="t('page.system.menu.placeholder_correspondingMenu')" label-field="label" key-field="value" :options="MenuParentList" />
							</n-form-item>
						</n-grid-item>
						<n-grid-item span="s:4 m:2 l:1">
							<n-form-item :label="t('page.system.menu.MenuIcon')" path="icon">
								<m-input v-model:value="formValue.icon" :placeholder="t('page.system.menu.placeholder_MenuIcon')" />
							</n-form-item>
						</n-grid-item>

						<n-grid-item span="s:4 m:2 l:1">
							<n-form-item :label="t('page.system.menu.MenuType')" path="isButton">
								<n-select v-model:value="formValue.isButton"  :clearable="true" :options="MenuTypeOptions" />
							</n-form-item>
						</n-grid-item>
						<n-grid-item span="s:4 m:2 l:1">
							<n-form-item :label="t('page.system.menu.Hidden')" path="">
								<n-select v-model:value="formValue.isHide"  :clearable="false" :options="TrueOrFalse" />
							</n-form-item>
						</n-grid-item>
						<n-grid-item span="s:4 m:2 l:1">
							<n-form-item :label="t('page.system.menu.IsCached')" path="">
								<n-select v-model:value="formValue.iskeepAlive"  :clearable="false" :options="TrueOrFalse" />
							</n-form-item>
						</n-grid-item>
						<n-grid-item span="s:4 m:2 l:1">
							<n-form-item :label="t('page.system.menu.ActiveState')" path="">
								<n-select v-model:value="formValue.enabled"  :clearable="false" :options="TrueOrFalse" />
							</n-form-item>
						</n-grid-item>
						<n-grid-item span="s:4 m:2 l:1">
							<n-form-item :label="t('page.system.menu.ButtonEvent')" path="">
								<m-input v-model:value="formValue.func" :placeholder="t('page.system.menu.placeholder_ButtonEvent')" />
							</n-form-item>
						</n-grid-item>
						<n-grid-item span="s:4 m:2 l:1">
							<n-form-item :label="t('page.system.menu.Route')" path="">
								<m-input v-model:value="formValue.PageRoute" :placeholder="t('page.system.menu.placeholder_Route')" />
							</n-form-item>
						</n-grid-item>
						<n-grid-item span="s:4 m:2 l:1">
							<n-form-item :label="t('page.system.menu.MenuSorting')" path="orderSort">
								<n-input-number :min="0" v-model:value="formValue.orderSort" :placeholder="t('page.system.menu.placeholder_MenuSorting')" clearable />
							</n-form-item>
						</n-grid-item>

						<n-grid-item span="s:4 m:4 l:4">
							<n-form-item :label="t('page.system.menu.MenuDescription')" path="">
								<m-input type="textarea" v-model:value="formValue.description" :placeholder="t('page.system.menu.placeholder_MenuDescription')" />
							</n-form-item>
						</n-grid-item>

					</n-grid>
				</n-form>
		</div>
		<div :class="theme.darkMode?'mainContent dark':'mainContent bg-white'">
			<n-space justify="center">
				<n-button @click="handleBack">{{t('global.return')}}</n-button>
				<n-button type="primary" @click="submit">{{t('global.Submit')}}</n-button>
			</n-space>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref} from 'vue'
import { useMessage } from 'naive-ui'
import { useThemeStore } from '@/store';
import { router } from '@/router';
// import { routeName } from '@/router';
import { SaveCrmPermissionInfo, GetPermissionTree, CreateCrmPermissionInfo, GetCrmPermissById } from '@/service';
// import { useRouterPush } from '@/composables';
import { useRoute } from 'vue-router'
import { t } from '@/locales';
const pageType = ref(0)
const rowId:any = ref(null)
const theme = useThemeStore();
const formValue:any = ref(initFormData()) //初始化表单数据
const route = useRoute()
const size = ref<'small' | 'medium' | 'large'>('large')
const MenuParentList = ref([])
const formRef = ref()
const TrueOrFalse = ref([
	{
		label:t('global.yes'),
		value:1
	},{
		label:t('global.no'),
		value:0
	}
])
function initFormData() {
	return {
		name:'',
		code:'',
		icon:'',
		pid:null,
		enabled:0,
		id:null,
		isButton:0,
		isHide:0,
		iskeepAlive:0,
		func:null,
		orderSort:null,
		description:null,
		PageRoute:null
	}
}
const MenuTypeOptions = ref([
	{
		label:t('page.system.menu.Menu'),
		value:0
	},
	{
		label:t('page.system.menu.Button'),
		value:1
	}
])
const rulesRequired = (message:any) =>{
	return {
		required:true,
		message:message,
		trigger:'blur'
	}
}
const rules = {
	name:rulesRequired(t('page.system.menu.placeholder_MenuName')),
	code:rulesRequired(t('page.system.menu.placeholder_MenuNumber')),
	parentId:rulesRequired(t('page.system.menu.placeholder_correspondingMenu'))
}




const message = useMessage()
function handleBack () {
	router.back()
}


async function submit() {
	formRef.value?.validate(async (errors:any) => {
		if (!errors) {
			let params = formValue.value
			if (pageType.value == 0){
				const res = await CreateCrmPermissionInfo(params)
				if (!res.error) {
					message.success(t("global.CreatedSuccessfully"))
					handleBack()
				}
			} else {
				const res = await SaveCrmPermissionInfo(params)
				if (!res.error) {
					message.success(t("global.EditedSuccessfully"))
					handleBack()
				}
			}


		}
	})
}
async function loadMenuParent() {
	const res:any = await GetPermissionTree({pid:0,needbtn:false})
	// console.log('data------------',res)
	if (!res.error) {
		MenuParentList.value = res.data.children
	}
}
async function getMenuInfo() {
	let params = {
		id:rowId.value
	}
	const res = await GetCrmPermissById(params)
	if (!res.error) {
		formValue.value = res.data
	}
}
async function init() {
	if (route.query.rowId) {
			rowId.value = route.query.rowId
			pageType.value = 1
			await getMenuInfo()
		}
		await loadMenuParent()
}
init()
</script>
<style lang="scss" scoped>
	.mainContent{
		border-radius:6px;
		padding:20px;
		margin-bottom:20px;
	}
	:deep(.n-page-header){
		margin-bottom:20px;
	}
	:deep(.n-input.n-input--textarea.n-input--resizable .n-input-wrapper){
		resize:none;
	}
	:deep(.divider){
		margin:10px 0px 0;
	}
	:deep(.feedback-wrapper-none .n-form-item-feedback-wrapper) {
		display:none
	}
	:deep(.smallInput) {
		margin:0 20px;
		.n-input__input-el{
			width:20px
		}
	}
</style>
