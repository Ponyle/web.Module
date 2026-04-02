<template>
	<n-modal v-model:show="showModal" :style="{ width: '600px' }" transform-origin="center" preset="card" :title="title"
		@after-leave="closeModal" :mask-closable="false">
		<n-form :model="formData" :rules="rules" ref="formRef" label-placement="left" label-width="auto"
			:label-style="{ width: '100px' }" require-mark-placement="left">
			<n-form-item :label="t('page.system.area.RegionName')" path="regionName">
				<n-input size="large"  v-model:value="formData.regionName" :placeholder="t('page.system.area.placeholder_RegionName')" />
			</n-form-item>
			<n-form-item :label="t('page.system.area.RegionCode')" path="regionCode">
				<n-input size="large"  v-model:value="formData.regionCode" :placeholder="t('page.system.area.placeholder_RegionCode')" />
			</n-form-item>
		</n-form>
		<template #footer>
			<n-flex class="pb-12px" justify="end">
				<n-button type="primary" @click="submit">
					{{t('global.Submit')}}
				</n-button>
				<n-button @click="closeModal">
					{{t('global.cancel')}}
				</n-button>
			</n-flex>
		</template>
	</n-modal>
</template>

<script setup lang="tsx">
import { defineExpose, defineEmits, ref ,computed } from 'vue'
import {  postCrmAreaCreateCrmAreaInfo, postCrmAreaSaveCrmAreaInfo, } from '@/service'
import { useMessage } from 'naive-ui'
import { t } from '@/locales';
const message = useMessage()
const emit = defineEmits()
const showModal = ref(false)
const formRef = ref()
const title = computed(() => {
	return isAdd.value ? t('page.system.area.AddRegion') : t('page.system.area.EditRegion')
})
const isAdd = ref(false)
const initFormData = () => {
	return {
		id:0,
		parentId:0,
		regionName: null, //地区名称
		regionCode: null, //地区编码
		orderSort: 0,
	}
}
const formData = ref(initFormData())
let rules:any = null
const openModal = async (data:any) => {
	formData.value = initFormData()
	isAdd.value = data.isAdd
	rules = {
	    regionName: { required: true, message: t('page.system.area.placeholder_RegionName'), trigger: ['target', 'blur'] },
	}
	if (data.id) {
	  formData.value.id = data.id
	}
	// // 编辑状态
	if (!isAdd.value) {
	    formData.value=data
	}
	showModal.value = true
}

// // 确定
const submit = () => {
    formRef.value?.validate(async (errors:any) => {
        if (!errors) {
            let res:any = null
            if (isAdd.value) {

              res = await postCrmAreaCreateCrmAreaInfo(formData.value)


            } else {
                res = await postCrmAreaSaveCrmAreaInfo(formData.value)
            }
            emit('getTableData')

            if (!res.error) {
                message.success(isAdd.value ? t('global.SuccessfullyAdded') : t('global.EditedSuccessfully'))
                closeModal()
            }
        } else {
            console.log(errors)
        }
    })
}
// // 取消
const closeModal = () => {
	showModal.value = false
	formData.value = initFormData()
}

defineExpose({ openModal })

</script>

<style lang="scss" scoped></style>
