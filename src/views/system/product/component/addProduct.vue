<template>
    <n-modal v-model:show="showModal" :style="{ width: '800px' }" transform-origin="center" preset="card" :title="title"
        @after-leave="closeModal" :mask-closable="false">
        <n-form :model="formData" :rules="rules" ref="formRef" label-placement="left" label-width="auto"
            :label-style="{ width: '200px' }" require-mark-placement="left">
            <n-grid x-gap="12" :cols="8" :y-gap="6" item-responsive responsive="screen">
                <n-grid-item span="s:8 m:4 l:4">
                    <n-form-item label="产品名称" path="productName">
                        <n-input size="large" v-model:value="formData.productName" placeholder="请输入产品名称" show-count
                            :maxlength="120" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="s:8 m:4 l:4">
                    <n-form-item label="产品编号" path="productCode">
                        <n-input size="large" v-model:value="formData.productCode" placeholder="请输入产品编号" show-count
                            :maxlength="20" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="s:8 m:4 l:4">
                    <n-form-item label="所属分类" path="categoryId">
                        <n-cascader filterable clearable size="large" v-model:value="formData.categoryId"
                            placeholder="请选择所属分类" :options="catsOptions" @update:value="handleUpdateValue"
                            check-strategy="child" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="s:8 m:4 l:4">
                    <n-form-item label="产品报价" path="productQuote">
                        <n-input-number :min="0" size="large" v-model:value="formData.productQuote"
                            placeholder="请输入产品报价" clearable />
                        <!-- <n-input v-model:value="formData.productQuote" placeholder="请输入产品报价"
                                :allow-input="onlyAllowNumber" /> -->
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="s:8 m:4 l:4">
                    <n-form-item label="主编单位" path="schoolId">
                        <n-select size="large" v-model:value="formData.schoolId" clearable filterable
                            :options="schoolOptions" placeholder="请输入主编单位" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="s:8 m:4 l:4">
                    <n-form-item label="主编教师" path="editChiefTeacher">
                        <n-input size="large" v-model:value="formData.editChiefTeacher" placeholder="请输入主编教师" show-count
                            :maxlength="50" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="s:8 m:8 l:8">
                    <n-form-item label="备注" path="remark">
                        <n-input size="large" v-model:value="formData.remark" placeholder="请输入备注" />
                    </n-form-item>
                </n-grid-item>
            </n-grid>
        </n-form>
        <template #footer>
            <n-flex class="pb-12px" justify="end">
                <n-button type="primary" @click="submit">
                    确认
                </n-button>
                <n-button @click="closeModal">
                    取消
                </n-button>
            </n-flex>
        </template>
    </n-modal>
</template>

<script setup>
import { defineExpose, defineEmits, ref, onMounted, computed } from 'vue'
import { getCrmAreaSelectGetCrmSchoolSelect, postCrmProductGetCrmProductPageList, postCrmProductCreateCrmProductInfo, postCrmProductSaveCrmProductInfo, getCrmProCategoryGetProCategoryTree } from '@/service'
import { useMessage } from 'naive-ui'
const message = useMessage()
const emit = defineEmits()
const onlyAllowNumber = (value) => !value || /^\d+$/.test(value)
const showModal = ref(false)
const formRef = ref()
const title = computed(() => {
    return isAdd.value ? '新增产品' : '编辑产品'
})
const isAdd = ref(false)
const initFormData = () => {
    return {
        productName: null,
        productCode: null,
        categoryId: null,
        productQuote: null,
        schoolId: null,
        editChiefTeacher: null,
        remark: null,
    }
}
const catsOptions = ref([])
const schoolOptions = ref([])
const formData = ref(initFormData())
let rules = {}
const openModal = async (data) => {
    isAdd.value = data.isAdd
    rules = {
        productName: { required: true, message: '请输入产品名称', trigger: ['target', 'blur'] },
        productCode: { required: true, message: '请输入产品编号', trigger: ['target', 'blur'] },
        categoryId: { required: true, message: '请输入所属分类', trigger: ['target', 'blur'] },
        productQuote: { type: 'number', required: true, message: '请输入产品报价', trigger: ['target', 'blur'] },
        schoolId: { required: true, message: '请输入主编单位', trigger: ['target', 'blur'] },
        editChiefTeacher: { required: false, message: '请输入主编教师', trigger: ['target', 'blur'] },
        remark: { required: false, message: '请输入备注', trigger: ['target', 'blur'] },
    }
    if (data.id) {
        formData.value.id = data.id
    }
    let res = await getCrmProCategoryGetProCategoryTree({})
    let res1 = await getCrmAreaSelectGetCrmSchoolSelect()
    console.log('res', res);
    catsOptions.value = res.data
    schoolOptions.value = res1.data
    // 编辑状态
    if (!isAdd.value) {
        let res2 = await postCrmProductGetCrmProductPageList({ Keyword: data.productName })
        formData.value = res2.data.data[0]
        // formData.value.productName = formData.value.productName.split(',')
        // console.log(formData.value.productName);
    }
    showModal.value = true
}
const handleUpdateValue = (value) => {
    console.log(value);
}
// 聚焦
const handleFocus = () => {
    console.log('1');
}
// formData.value.productQuote = computed(() => {
//     return parseInt(formData.value.productQuote)
// })
// 确定
const submit = () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            let res
            if (isAdd.value) {
                res = await postCrmProductCreateCrmProductInfo(formData.value)
                // if (!res1.error) {
                //     res = await postCrmProductCreateCrmProductInfo(formData.value)
                // }

            } else {
                // console.log('sdadsadasdas', formData.value);
                res = await postCrmProductSaveCrmProductInfo(formData.value)
            }
            emit('getTableData')
            if (!res.error) {
                message.success(isAdd.value ? '新增成功' : '编辑成功')
                closeModal()
            }
        } else {
            // console.log('1111111111', errors, formData.value)
        }
    })
    // console.log('formData提交', localDatatoAsyncData());
}
// 取消
const closeModal = () => {
    showModal.value = false
    formData.value = initFormData()
}
const init = async () => {


}
defineExpose({ openModal })
// onMounted(() => {
//     init()
// })
</script>

<style lang="scss" scoped></style>