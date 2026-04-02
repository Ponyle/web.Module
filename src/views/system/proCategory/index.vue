<template>
    <div>
        <SearchBox :SearchData="SearchData">
            <n-input-group>
                <n-input size="large" v-model:value="searchFromData.keyword" :clearable="true"
                    @keyup.enter="getTreeTableData" type="text" placeholder="请输入分类名称" style="width: 240px;"
                    @clear="clearInput" />
                <n-button size="large" color="#2080f0" strong @click="getTreeTableData">
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
        <AddProCategory ref="addProCategoryRef" @getTreeTableData="getTreeTableData" />
    </div>
</template>

<script setup lang="jsx">
// import SearchBox from '@/components/business/SearchBox.vue'
import AddProCategory from './component/addProCategory.vue'
// import tablePage from './component/tablePage.vue'
import { h, ref, onMounted } from 'vue'
import { toRaw } from '@vue/reactivity'//加载toraw方法
import { postCrmProCategoryGetProCategoryTreeTable, postCrmProCategoryDelCrmProCategoryInfo } from '@/service'
import { useMessage, useDialog } from 'naive-ui'
import { useRouterPush } from '@/composables';
const { routerPush, getCurRouteMeta } = useRouterPush();
const btnList = getCurRouteMeta().btn?getCurRouteMeta().btn:[]
let addBtn = false,EditBtn = false,DelBtn = false
btnList.forEach(item => {
	if (item.name == 'CreateCrmProCategoryInfo') {
		addBtn = true
	} else if (item.name == 'DelCrmProCategoryInfo') {
		DelBtn = true
	} else if (item.name == 'SaveCrmProCategoryInfo') {
		EditBtn = true
	}
})
const message = useMessage()
const dialog = useDialog()
const addProCategoryRef = ref()
const SearchData = ref({
    title: '产品分类管理'
})
const searchFromData = ref({
    pid: 0,
    keyword: '',
    // page: 1,
    // pageSize: 10,
})
const columns = [
    // {
    //     title: '序号', key: 'index', align: 'center', width: 80, render: (row, index) => {
    //         return (
    //             <span>{(pagination.value.pageIndex - 1) * pagination.value.pageSize + index + 1} </span>
    //         )
    //     }
    // },
    { title: '分类名称', key: 'cateName', align: 'left', width: 240 },
    { title: '产品数量', key: 'productNum', align: 'center', width: 80 },
    { title: '排序', key: 'orderSort', align: 'center', width: 80 },
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
    LoadApi: postCrmProCategoryGetProCategoryTreeTable,
    SearchData: searchFromData.value,
})

const pagination = ref({
    pageIndex: 1,
    pageSize: 10,
    pageSizes: [10, 30, 50],
    itemCount: 0,
    isHidden:true,
    isTree: true
})
const tablePageRef = ref()
const getTreeTableData = async () => {
    toRaw(tablePageRef.value.getTreeTableData())
}
const clearInput = () => {
    searchFromData.value.keyword = null
    getTreeTableData()
}
const handleEditTable = (row) => {
    addProCategoryRef.value.openModal({ ...row, isAdd: false })
}
const handleDelTable = async (row) => {
    dialog.warning({
        title: '提示',
        content: `此操作将永久删除 ${row.cateName} , 是否继续?`,
        positiveText: '确定',
        negativeText: '取消',
        positiveButtonProps: {
            type: 'primary'
        },
        onPositiveClick: async () => {
            let res = await postCrmProCategoryDelCrmProCategoryInfo(row.id)
            if (!res.error) {
                message.success('已删除')
                getTreeTableData()
            }
        },
        onNegativeClick: () => {
        }
    })
}
onMounted(() => {
    getTreeTableData()
})

const handleAddTable = () => {
    addProCategoryRef.value.openModal({ isAdd: true })
}
</script>

<style lang="scss" scoped></style>