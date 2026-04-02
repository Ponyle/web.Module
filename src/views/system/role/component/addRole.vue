<template>
	<n-modal v-model:show="showModal" transform-origin="center" style="width:800px" class="custom=card" preset="card" :title="title" size="huge" :bordered="true">
		<div>
			<n-form ref="formRef" label-placement="left" require-mark-placement="left" inline :label-width="100" :model="formValue" :rules="rules" size="large">
				<n-grid cols="4" :x-gap="20" :y-gap="6" item-responsive responsive="screen">
					<n-grid-item span="s:2 m:2 l:2">
						<n-form-item :label="t('page.system.role.Name')" path="name">
							<m-input v-model:value="formValue.name" :placeholder="t('page.system.role.placeholder_name')" />
						</n-form-item>
					</n-grid-item>
					<n-grid-item span="s:2 m:2 l:2">
						<n-form-item :label="t('page.system.role.RoleNumber')" path="code">
							<m-input v-model:value="formValue.code" :placeholder="t('page.system.role.placeholder_Number')" />
						</n-form-item>
					</n-grid-item>
					<n-grid-item span="s:2 m:2 l:2">
            <n-form-item :label="t('page.system.role.MenuSorting')" path="orderSort">
              <n-input-number :min="0" v-model:value="formValue.orderSort" :placeholder="t('page.system.role.SortTheInputMenu')" />
            </n-form-item>
          </n-grid-item>
					<n-grid-item span="s:2 m:2 l:2">
					  <n-form-item :label="t('page.system.role.IsActivated')" path="enabled">
					    <n-switch v-model:value="formValue.enabled" />
					  </n-form-item>
					</n-grid-item>
					<n-grid-item span="s:4 m:4 l:4">
						<n-form-item :label="t('global.remark')" path="school.description">
							<m-input v-model:value="formValue.description" resize='none' type="textarea" :rows="4" :placeholder="t('global.placeholder_enter_remark')" />
						</n-form-item>
					</n-grid-item>
				</n-grid>
			</n-form>
		</div>
		<template #footer>
			<n-space class="pb-12px" justify="end">
			  <n-space>
			    <n-button type="primary" @click="submit">
			      {{t('global.confirm')}}
			    </n-button>
			  </n-space>
				<n-space>
				  <n-button @click="closeModal">
						{{t('global.cancel')}}
				  </n-button>
				</n-space>
			</n-space>
		</template>
	</n-modal>
</template>

<script setup lang="ts">
	import { ref, onMounted, toRefs, nextTick} from 'vue';
	import { useMessage} from 'naive-ui';
	import { CreateCrmRoleInfo, SaveCrmRoleInfo } from '@/service';
	import { t } from '@/locales';
	const title = ref( t('page.system.role.NewRole'))
	const isAdd = ref(true)
	const showModal = ref(false)
	const message = useMessage()
	const emit = defineEmits();
	const formRef = ref()
	const initFormValue = () =>{
		return {
			id:0,
			name: "",
			code: "",
			description: "",
			orderSort:0,
			// dids:null,
			// authorityScope:null,
			enabled:true,

		}
	}
	const formValue = ref(initFormValue())
	let rules = {
		name:{required:true,message:t('page.system.role.placeholder_name'),trigger:'blur'},
		code:{required:true,message:t('page.system.role.placeholder_Number'),trigger:'blur'},
	}

	async function submit() {
		formRef.value?.validate(async (errors) => {
			if (!errors) {
				const params = formValue.value
				if (isAdd.value) {
					const res = await CreateCrmRoleInfo(params)
					if (!res.error) {
						message.success(t('global.SuccessfullyAdded'))
						emit('getTableData','')
						closeModal()
					}
				} else {
					const res = await SaveCrmRoleInfo(params)
					if (!res.error) {
						message.success(t('global.EditedSuccessfully'))
						emit('getTableData','')
						closeModal()
					}
				}

			}
		})

	}
	function closeModal (){
		showModal.value = false
	}


	async function openModal (data){
		formValue.value = initFormValue()
		showModal.value = true
		if (data) {
			isAdd.value = false
			formValue.value = {...data}
			title.value= t('page.system.role.EditRole')

		} else {
			isAdd.value = true
			title.value = t('page.system.role.NewRole')
			formValue.value = initFormValue()
		}
		init()
	}
	//初始化编辑参数

	async function init() {


	}
	defineExpose({ openModal });

</script>

<style>
</style>
