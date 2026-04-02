<template>
    <div>
        <n-data-table :columns="columns" :data="tableInfo" :row-key="getRowKey" @load="onLoad" :cascade="false"
            :loading="loading" allow-checking-not-loaded :single-line="false" :summary="isSummary ? summary : null">
            
        </n-data-table>
        <n-pagination v-show="!pagination.isHidden" v-model:page="pagination.page"
            v-model:page-size="pagination.pageSize" :page-count="pagination.pageCount" show-size-picker
            :page-sizes="pagination.pageSizes" style="margin-top: 20px;" @update:page="updatePage"
            @update:page-size="updatePageSize">
            <template #prefix>
                总共{{ pagination.dataCount }} 条
            </template>
        </n-pagination>
    </div>
</template>

<script setup>
import { defineProps, ref, h } from 'vue'
const props = defineProps(['columns', 'tableData', 'pagination', 'isSummary', 'summaryData'])
// console.log('1111', props, props.tableData, props.columns);
const tableInfo = ref()
const loading = ref(false)
const getRowKey = (row) => row.id
const pagination = ref({
    page: 1, //当前页
    pageCount: 1,  //总页数
    pageSize: 10, //每页显示条数
    dataCount: 0, //总条数
    pageSizes: [10, 20, 30, 40, 50] //每页显示条数
})
pagination.value = props.pagination
const getTableData = async () => {

    const params = { ...props.tableData.SearchData, pageIndex: pagination.value.page, pageSize: pagination.value.pageSize }
    let res = await props.tableData.LoadApi(params)
    // tableInfo.value = res.data.data

    if (res.data.data) {
        tableInfo.value = res.data.data
    } else {
        tableInfo.value = []
    }
    pagination.value = {
        ...res.data,
        pageSizes: [10, 20, 30, 40, 50]
    }
    delete pagination.value.data
}
const getTreeTableData = async () => {
    const res = await props.tableData.LoadApi(props.tableData.SearchData)
    if (!res.error) {
        tableInfo.value = res.data
        tableInfo.value.map(item => {
            item.isLeaf = !item.hasChildren
        })
    }
}
const summary = (pageData) => {
    return props.summaryData(pageData)
}
const onLoad = async (row) => {
    loading.value = true
    console.log('row', row)
    let params = {
        pid: row.id,
        keyword: null
    }
    const res = await props.tableData.LoadApi(params)
    if (!res.error) {
        loading.value = false
        let data = res.data
        data.map(item => item.isLeaf = !item.hasChildren)
        return row.children = data
    }

}

const updatePage = (page) => {
    pagination.value.page = page
    getTableData()
}
const updatePageSize = (pageSize) => {
    pagination.value.pageSize = pageSize
    getTableData()
}
defineExpose({ getTableData, getTreeTableData })
</script>

<style lang="scss" scoped></style>