<template>
    <div class="title flex-col justify-between items-center text-center p-20px w-100% h-50%" style="color: #b9c6db;">
        <h1>浏览器不兼容</h1>
        <div>
            <p>抱歉，您的浏览器不兼容，</p>
            <p>如需浏览，请点击复制网址后，推荐使用Chrome \ Firefox \ Safari 等浏览器打开</p>
        </div>
        <div>
            <MInput class="rounded-10px" v-model:value="url" readonly
                style="background: #314568;--n-border: none;--n-text-color:#b9c6db;--n-height:40px" />
            <n-button id="url" :data-clipboard-text="url" type="primary" class="btn" @click="copyUrl">复制网址</n-button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useMessage } from 'naive-ui'
import Clipboard from "clipboard";
const message = useMessage()
const url=ref('https://gw.mengoo.com/audio')

const copyUrl=()=>{
    let clipboard = new Clipboard("#url");
    clipboard.on("success", (e) => {
        message.success("复制成功");
        clipboard.destroy(); // 释放内存
    });
    clipboard.on("error", (e) => {
        message.error("复制失败"); // 不支持复制
        clipboard.destroy(); // 释放内存
    });
}
</script>

<style lang="scss" scoped>
.title{
    h1{
        font-size: 24px;
    }
    p{
        font-size: 14px;
    }
}
.btn {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    margin: 20px 0;
    background: rgb(68 194 233);
}
</style>