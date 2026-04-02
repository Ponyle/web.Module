<template>
    <div class="p-16px box">
        <div class="flex items-center justify-between title">
            <div @click="goBack"><svg-icon icon="ri:arrow-left-s-line" class="text-30px" style="color:#949CAA" /></div>
            <h1>声音命名</h1>
            <div style="width: 40px;"></div>
        </div>
        <n-flex vertical class="mt-20px">
            <n-form label-placement="top" :model="formData" :rules="rules" ref="formRef" label-width="auto"
                :label-style="{ fontSize: '14px' }" require-mark-placement="left">
                <n-grid x-gap="6" :cols="6" item-responsive responsive="screen">
                    <n-grid-item span="6">
                        <n-form-item path="voiceName" label="声音ID">
                            <div class="flex-col justify-between gap-10px w-100%">
                                <MInput v-model:value="formData.voiceName" :maxlength="15"
                                    placeholder="请输入15位以内的中文、数字、英文字符" class="rounded-10px"
                                    style="background: #314568;--n-border: none;--n-text-color:#b9c6db;--n-height:60px" />
                                <span>可使用中文、数字、英文字符，最多15字</span>
                            </div>
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item span="6">
                        <n-form-item path="gender" label="请选择性别">
                            <div class="flex justify-between w-100%">
                                <div v-for="gender in genderList" :key="gender.id"
                                    class="flex-col items-center justify-center w-48% h-60px rounded-10px color-#fff text-16px Box"
                                    @click="changegenderBox(gender.value)"
                                    :style="formData.gender === gender.value ? 'background: #182131' : 'background:#314568'">
                                    <span>{{ gender.name }}</span>
                                </div>
                            </div>
                        </n-form-item>
                    </n-grid-item>
                    <!-- <n-grid-item span="6">
                        <n-form-item path="scenario" label="请选择使用场景">
                            <div class="flex justify-between w-100%">
                                <div v-for="scene in sceneList" :key="scene.id"
                                    class="flex-col items-center justify-center w-32% h-100px rounded-10px color-#fff Box"
                                    @click="changeSceneBox(scene.value)"
                                    :style="formData.scenario === scene.value ? 'background: #182131':'background:#314568'">
                                    <svg-icon :icon="scene.icon" class="text-40px" style="color:#949CAA" />
                                    <span>{{ scene.name}}</span>
                                </div>
                            </div>
                        </n-form-item>
                    </n-grid-item> -->
                </n-grid>
            </n-form>
            <div class="start">
                <a @click="openPermission" style="color:rgb(68 194 233)">如何开启麦克风权限</a>
                <n-button type="primary" class="btn" @click="startRecord">开始录制</n-button>
            </div>
        </n-flex>
        <Modal ref="modalRef"></Modal>
    </div>
</template>

<script setup>
import Modal from './components/modal.vue'
import { ref, defineEmits } from 'vue'
import { useMessage } from 'naive-ui'
const message = useMessage()
import axios from 'axios'
//必须引入的核心
import Recorder from 'recorder-core';

//引入mp3格式支持文件；如果需要多个格式支持，把这些格式的编码引擎js文件放到后面统统引入进来即可
import 'recorder-core/src/engine/mp3';
import 'recorder-core/src/engine/mp3-engine';
//录制wav格式的用这一句就行
import 'recorder-core/src/engine/wav';
const emit = defineEmits()
const modalRef=ref()
const formRef=ref()
const initFormData = () => {
    return {
        voiceName: null,
        gender:null,
        // scenario:null,
        url:null,
    }
}
const formData = ref(initFormData())
const rules = {
    voiceName: { required: true, message: '请输入声音ID', trigger: ['target', 'blur'] },
    gender: { required: true, message: '请选择性别', trigger: ['target', 'blur'] },
    // scenario: { required: true, message: '请选择使用场景', trigger: ['target', 'blur'] },
}
const genderList=ref([
    { id: 1 ,name:'男',value:'male'},
    { id: 2, name: '女', value: 'female' },
])
const sceneList=ref([
    { id: 1, icon: 'ep:collection', name: '故事', value:'story'},
    { id: 2, icon: 'ep:user', name: '交互', value:'interaction'},
    { id: 3, icon: 'ep:position', name: '导航', value: 'navigation' },
])
const changegenderBox=(s)=>{
    formData.value.gender = s
}
const changeSceneBox=(s)=>{
    formData.value.scenario=s
}


// 开始录制
const isFirstSuccessClick = ref(true)
const startRecord = () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            if (isFirstSuccessClick.value) {
                isFirstSuccessClick.value = false
                console.log('开始录制',formData.value);
                recOpen()
                isFirstSuccessClick.value = true
            }

        } else {
        }
    })
}
const openPermission=()=>{
    modalRef.value.openModal()
}
const goBack=()=>{
    emit('changeModule','startClone')
}

let rec;
let recBlob;
// 打开录音
function recOpen() {
    //创建录音对象,只支持单声道
    rec = Recorder({
        type: 'wav', //录音格式，可以换成wav等其他格式
        sampleRate: 23000, //录音的采样率，越大细节越丰富越细腻
        bitRate: 16, //录音的比特率，越大音质越好
        onProcess: (
            buffers,
            powerLevel,
            bufferDuration,
            bufferSampleRate,
            newBufferIdx,
            asyncEnd,
        ) => {
            //录音实时回调，大约1秒调用12次本回调
            //可实时绘制波形，实时上传（发送）数据
            console.log('1232321');
        },
    });
    if (!rec) {
        alert('当前浏览器不支持录音功能！');
        return;
    }
    //打开录音，获得权限
    rec.open(
        () => {
            console.log('录音已打开');
            // 获取到录音权限跳转到声音命名
            emit('changeModule', 'recording')
            emit('changeAudioData',formData.value)
        },
        (msg, isUserNotAllow) => {
            //用户拒绝了录音权限，或者浏览器不支持录音
            message.error((isUserNotAllow ? 'UserNotAllow，' : '') + '无法录音:' + msg)
            // console.log((isUserNotAllow ? 'UserNotAllow，' : '') + '无法录音:' + msg);
        },
    );
}
</script>

<style lang="scss" scoped>
.box{
    color:#949CAA;
}
.title{
    font-size: 20px;
    color: #b9c6db;
}
:deep(.n-form-item .n-form-item-label){
    color: #b9c6db;
}
.Box{
    &:hover{
        background:#263550;
    }
}
.start {
    display: flex;
    flex-direction: column;
    align-items: center;
    .btn {
        width: 50%;
        height: 40px;
        border-radius: 20px;
        margin: 20px 0;
        background: rgb(68 194 233);
    }
}
:deep(.n-form-item .n-form-item-label .n-form-item-label__asterisk){
    display: none;
}
</style>