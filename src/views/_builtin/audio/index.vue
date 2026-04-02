<template>
    <div class="container1">
        <transition name="fade-slide" mode="out-in" appear>
            <component :is="activeModule.component" @changeModule="changeModule" :audioData="audioData"
                @changeAudioData="changeAudioData" />
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { startClone, audioName, recording, success, notSupport } from './components'
const audioData=ref()
let curModule = ref() //当前模块
const modules=[
    {name:'startClone',component:startClone},
    {name:'audioName',component:audioName},
    { name: 'recording', component: recording },
    { name: 'success', component: success },
    { name: 'notSupport', component: notSupport },
]
// 计算当前模块
const activeModule=computed(()=>{
    const active = { ...modules[0] }
    const findItem = modules.find(item => item.name === curModule.value)
    // console.log(findItem, active);
    if (findItem){
        Object.assign(active, findItem)
    }
    return active
})
// 更换模块
const changeModule = (step)=>{
    console.log('step', step);
    
    curModule.value = step
}
const changeAudioData=(data)=>{
    audioData.value = data
}
// 判断浏览器是否支持录音
let rec;
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
        // alert('当前浏览器不支持录音功能！');
        curModule.value='notSupport'
        return;
    }
    curModule.value ='startClone'
}
onMounted(()=>{
    recOpen()
})
</script>

<style lang="scss" scoped>
.container1{
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
    background: #2B3653;
    height: 100%;
    width: 100%;
}
</style>