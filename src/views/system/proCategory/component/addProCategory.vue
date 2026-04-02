<template>
    <n-modal v-model:show="showModal" :style="{ width: '400px' }" transform-origin="center" preset="card" :title="title"
        @after-leave="closeModal" :mask-closable="false">
        <n-form :model="formData" :rules="rules" ref="formRef" label-placement="left" label-width="auto"
            :label-style="{ width: '100px' }" require-mark-placement="left">
            <n-form-item label="分类名称" path="cateName">
                <n-input size="large" v-model:value="formData.cateName" placeholder="请输入分类名称" show-count
                    :maxlength="25" />
            </n-form-item>
            <n-form-item label="上级分类" path="parentId">
                <n-tree-select size="large" v-model:value="formData.parentId" check-strategy="all" :show-path="true"
                    key-field="id" label-field="cateName" :options="parentOptions" placeholder="请选择上级分类" cascade
                    allow-checking-not-loaded @load="handleLoad" clearable />
            </n-form-item>
            <n-form-item label="排序" path="orderSort">
                <n-input-number :min="0" size="large" v-model:value="formData.orderSort" placeholder="请输入分类名称" />
            </n-form-item>
            <n-form-item label="备注" path="remark">
                <n-input size="large" v-model:value="formData.remark" placeholder="请输入分类名称" show-count :maxlength="120" />
            </n-form-item>
        </n-form>
        <template #footer>
            <n-flex class=" pb-12px" justify="end">
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
import { postCrmProCategoryGetProCategoryTreeTable, postCrmProCategoryCreateCrmProCategoryInfo, postCrmProCategorySaveCrmProCategoryInfo } from '@/service'
import { useMessage } from 'naive-ui'
const title = computed(() => {
    return isAdd.value ? '新增产品分类' : '编辑产品分类'
})
const isAdd = ref(false)
const message = useMessage()
const emit = defineEmits()
const showModal = ref(false)
const formRef = ref()
const initFormData = () => {
    return {
        cateName: null,
        parentId: null,
        KeyWord: "",
        orderSort: null,
        remark: ""
    }
}
const formData = ref(initFormData())
const parentOptions = ref()
// = ref([
//     {
//         label: '上海市',
//         value: 1,
//     },
//     {
//         label: '天津市',
//         value: 2,
//     },
// ])
let rules
const openModal = async (data) => {
    // console.log('data', data);
    isAdd.value = data.isAdd
    rules = {
        cateName: { required: true, message: '请输入省市名称', trigger: ['target', 'blur'] },
        // parentId: { type: 'array', required: false, message: '请选择上级分类', trigger: ['target', 'blur'] },
        orderSort: { type: 'number', required: true, message: '请输入排序', trigger: ['target', 'blur'] },
        // remark: { required: false, message: '请输入备注', trigger: ['target', 'blur'] },
    }
    if (data.id) {
        formData.value.id = data.id
    }
    // 编辑状态
    if (!isAdd.value) {
        let res2 = await postCrmProCategoryGetProCategoryTreeTable({ Keyword: data.cateName })
        res2.data.forEach(e => {
            if (e.cateCode === data.cateCode) {
                formData.value = e
            }
        });
        // formData.value.userNames = formData.value.userNames.split(',')
        console.log(formData.value);
    }
    showModal.value = true
}
// 确定
const submit = () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            let res
            if (isAdd.value) {
                res = await postCrmProCategoryCreateCrmProCategoryInfo(formData.value)
            } else {
                res = await postCrmProCategorySaveCrmProCategoryInfo(formData.value)
            }
            emit('getTreeTableData')
            if (!res.error) {
                message.success('保存成功')
                closeModal()
            } 
        } else {
            console.log(errors)
        }
    })
    // console.log('formData提交', localDatatoAsyncData());
}
// 取消
const closeModal = () => {
    formData.value = initFormData()
    showModal.value = false
}
const getSelectData = async () => {
    const params = {
        Pid: 0,
        KeyWord: formData.KeyWord
    }
    const res = await postCrmProCategoryGetProCategoryTreeTable(params)
    if (!res.error) {
        parentOptions.value = res.data
        parentOptions.value.map((item) => {
            // item.label = item.cateName
            // item.value = item.id
            item.isLeaf = !item.hasChildren

        })
    }
}
const handleLoad = async (row) => {
    const params = {
        Pid: row.id,
        KeyWord: formData.KeyWord
    }
    const res = await postCrmProCategoryGetProCategoryTreeTable(params)
    if (!res.error) {
        let data = res.data
        data.map((item) => {
            // item.label = item.cateName
            // item.value = item.id
            item.isLeaf = !item.hasChildren
        })
        return row.children = data
    }
}
defineExpose({ openModal })
onMounted(() => {
    getSelectData()
})
</script>

<style lang="scss" scoped></style>