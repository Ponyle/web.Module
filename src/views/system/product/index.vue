<template>
    <div>
        <SearchBox :SearchData="SearchData">
            <n-tree-select style="width:320px" :show-path="true" size="large" v-model:value="searchFromData.categoryId"
                clearable key-field="value" filterable :options="proCategoryOptions" placeholder="请选择分类"
                @update:value="getTableData" />
            <n-input-group>
                <n-input size="large" v-model:value="searchFromData.keyword" :clearable="true"
                    @keyup.enter="getTableData" type="text" placeholder="请输入产品编号/产品名称" style="width: 240px;"
                    @clear="clearInput" />
                <n-button size="large" color="#2080f0" strong @click="getTableData">
                    <icon-ic-search color="#fff" class="mr-4px text-20px" />搜索
                </n-button>
            </n-input-group>
        </SearchBox>

        <n-card>
            <n-flex justify="start">
                <n-button v-if="addBtn" color="#2080f0" @click="handleAddTable">
                    <icon-ic-round-plus class="mr-4px text-20px" />新增
                </n-button>
            </n-flex>
            <TablePage ref="tablePageRef" :columns="columns" :tableData="tableData" :pagination="pagination"
                style="margin-top: 20px;">
            </TablePage>
        </n-card>
        <AddProduct ref="addProductRef" @getTableData="getTableData" />
    </div>
</template>

<script setup lang="jsx">
// import SearchBox from '@/components/business/SearchBox.vue'
import AddProduct from './component/addProduct.vue'
import { h, ref, onMounted } from 'vue'
import { toRaw } from '@vue/reactivity'//加载toraw方法
import { getCrmProCategoryGetProCategoryTree, getCrmProductGetCrmMajorSelect, postCrmProductGetCrmProductPageList, postCrmProductDelCrmProductInfo } from '@/service'
import { useMessage, useDialog } from 'naive-ui'
import { useRouterPush } from '@/composables';
const { routerPush, getCurRouteMeta } = useRouterPush();
const btnList = getCurRouteMeta().btn?getCurRouteMeta().btn:[]
let addBtn = false,EditBtn = false,DelBtn = false
btnList.forEach(item => {
	if (item.name == 'CreateCrmProductInfo') {
		addBtn = true
	} else if (item.name == 'DelCrmProductInfo') {
		DelBtn = true
	} else if (item.name == 'SaveCrmProductInfo') {
		EditBtn = true
	}
})
const message = useMessage()
const dialog = useDialog()
const proCategoryOptions = ref()
const addProductRef = ref()
const SearchData = ref({
    title: '产品管理'
})
const searchFromData = ref({
    keyword: '',
    categoryId: null
    // page: 1,
    // pageSize: 10,
})
const columns = [
    {
        title: '序号', key: 'index', align: 'center', width: 60, render: (row, index) => {
            return (
                <span>{(tablePageRef.value.pagination.page - 1) * tablePageRef.value.pagination.pageSize + index + 1} </span>
            )
        }
    },
    { title: '产品编号', key: 'productCode', align: 'left', width: 120 },
    { title: '产品名称', key: 'productName', align: 'left', width: 400 },
    { title: '所属分类', key: 'parentCategoryName', align: 'left', width: 220 },
    { title: '主编教师', key: 'editChiefTeacher', align: 'center', width: 120 },
    { title: '报价', key: 'productQuote', align: 'center', width: 80,render(row){
        const num = h(<n-number-animation show-separator from={row.productQuote} to={row.productQuote} precision={2} />)
        if (row.productQuote == null){
            return row.productQuote
        }
        return num
    } },
    { title: '创建人', key: 'createBy', align: 'center', width: 80 },
    { title: '创建时间', key: 'createTime', align: 'center', width: 180 },
    {
        title: '操作', key: 'action', fixed: 'right', width: 80, align: 'center', render(row) {
            // if (!isNullBtn) {
            // console.log(row);

            const Edit = h(
                <NTooltip>
                    {{
                        trigger: () => {
                            return (<n-button size={'small'} onClick={() => handleEditTable(row)} text type="info">
                                <svg-icon icon="bytesize:compose" class="text-18px" />
                            </n-button>)
                        },
                        default: () => '编辑'
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
                        default: () => '删除',
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
        }
    }
]
if (!EditBtn&&!DelBtn) {
	columns.pop()
}
const tableData = ref({
    LoadApi: postCrmProductGetCrmProductPageList,
    SearchData: searchFromData.value,
})

const pagination = ref({
    pageIndex: 1,
    pageSize: 10,
    pageSizes: [10, 30, 50],
    itemCount: 0,
})
const tablePageRef = ref()
const getInitData=async()=>{
    let res = await getCrmProCategoryGetProCategoryTree()
    proCategoryOptions.value = res.data
    getTableData()
}
const clearInput = () => {
    searchFromData.value.keyword = null
    getTableData()
}
const getTableData = async () => {
    toRaw(tablePageRef.value.getTableData())
}
const handleEditTable = (row) => {
    addProductRef.value.openModal({ ...row, isAdd: false })
}
const handleDelTable = async (row) => {
    dialog.warning({
        title: '提示',
        content: `此操作将永久删除 ${row.productName} , 是否继续?`,
        positiveText: '确定',
        negativeText: '取消',
        positiveButtonProps: {
            type: 'primary'
        },
        onPositiveClick: async () => {
            let res = await postCrmProductDelCrmProductInfo(row.id)
            if (!res.error) {
                message.success('已删除')
                getTableData()
            }
        },
        onNegativeClick: () => {
        }
    })
}
onMounted(() => {
    getInitData()
})

const handleAddTable = () => {
    addProductRef.value.openModal({ isAdd: true })
}
</script>

<style lang="scss" scoped></style>