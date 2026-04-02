<template>
    <n-modal v-model:show="isShowModel" :mask-closable="false">
        <div class="tipBox">
            <div class="textBox">
                <span>设置浏览器麦克风允许访问权限</span>
                <div>
                    <p>1、找到设置;</p>
                    <p>2、在搜索框内输入“麦克风”，根据指示找到麦克风的权限设置并设置为允许。</p>
                    <p style="color:red">注意：如果仍然无法录音，可能需要设置该设备的应用访问麦克风的权限，如windows系统：设置-隐私-麦克风-开启允许应用访问你的麦克风。</p>
                </div>
            </div>
            <div class="btnBox">
                <n-button style="color: rgb(68 194 233);--n-border-hover:rgb(68, 194, 233)"
                    @click="isShowModel = false">关闭</n-button>
            </div>
        </div>
    </n-modal>
</template>

<script setup>
import {ref,defineExpose} from 'vue'
const isShowModel=ref(false)
const openModal=()=>{
    isShowModel.value=true
}
defineExpose({ openModal })
</script>

<style lang="scss" scoped>
.tipBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    width: 90%;
    height: 340px;
    padding: 20px;
    border-radius: 20px;

    .textBox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 60%;

        span {
            font-size: 18px;
            font-weight: 600;
        }

        p {
            padding: 0 20px;
            // text-align: center;
            font-size: 14px;
        }
    }

    .btnBox {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 90%;

        .n-button {
            height: 40px;
            font-size: 14px;
            border-radius: 50px;
        }
    }
}
</style>