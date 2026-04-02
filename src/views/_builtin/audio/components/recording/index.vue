<template>
    <div class="p-16px box">
        <div class="flex items-center justify-between title">
            <div @click="goBack" class="flex items-center text-16px"><svg-icon icon="ri:arrow-left-s-line"
                    class="text-30px" style="color:#949CAA" />退出录制</div>
            <h1>录制进行中</h1>
            <div style="width: 94px;"></div>
        </div>
        <n-flex vertical class="mt-10px">
            <n-progress type="line" :percentage="formData?.url?100:0" indicator-placement="outside" processing
                color="rgb(68 194 233)" indicator-text-color="#b9c6db" />
            <!-- <n-carousel effect="card" prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
                next-slide-style="transform: translateX(50%) translateZ(-800px);"
                style="height: 300px;max-height:300px;margin-top: 20px;" :show-dots="false"
                @update:current-index="handleCurrentIndex">
                <n-carousel-item :style="{ width: '75%',height:'100%', borderRadius: '20px' }"
                    v-for="item,index in statementList" :key="item.audioId">
                    <n-card content-style="overflow: scroll;"
                        style="width:100%;height:100%;font-weight:500;--n-border-color:none;--n-font-size:20px;"
                        class="bg-#3B4C70 text-#fff">
                        <n-flex vertical justify="space-between" align="center" class="h-100%">
                            <p style="letter-spacing:1px;">{{ item.text }}</p>
                            <n-flex class="text-16px bg-#2B3653 rounded-16px p-8px"
                                style="text-align:center;color:rgb(109,138,198)">
                                发音错误，请准确独处文案中的内容
                            </n-flex>
                        </n-flex>

                        <template #footer>
                            <n-flex justify="space-between" class="text-16px" style="color:#b9c6db">
                                <n-flex align="center">{{ index + 1 }}/20</n-flex>
                                <n-flex align="center">朗读示范<svg-icon icon="octicon:unmute" class="text-24px"
                                        style="color:rgb(68 194 233)" /></n-flex>
                            </n-flex>
                        </template>
                    </n-card>
                </n-carousel-item>
            </n-carousel> -->
            <n-card
                style="width:100%;height:100%;min-height:300px;font-weight:500;--n-border-color:none;--n-font-size:20px;"
                class="bg-#3B4C70 text-#fff rounded-20px mt-20px">
                <n-flex vertical justify="space-between" align="center" class="h-300px">
                    <n-scrollbar style="max-height: 200px">
                        <p style="letter-spacing:1px;">{{ statement }}</p>
                    </n-scrollbar>

                    <!-- <n-flex class="text-16px bg-#2B3653 rounded-16px p-8px"
                        style="text-align:center;color:rgb(109,138,198)">
                        发音错误，请准确独处文案中的内容
                    </n-flex> -->
                </n-flex>

                <template #footer>
                    <n-flex justify="space-between" class="text-16px" style="color:#b9c6db">
                        <n-flex align="center">1/1</n-flex>
                        <!-- <n-flex align="center">朗读示范<svg-icon icon="octicon:unmute" class="text-24px"
                                style="color:rgb(68 194 233)" /></n-flex> -->
                    </n-flex>
                </template>
            </n-card>
        </n-flex>
        <n-flex justify="space-between" class="m-40px">
            <div class="actionBtn">
                <span>试听</span>
                <div @click="recPlay">
                    
                    <svg-icon localIcon="EpVideoPlay" class="text-50px"
                        style="color:rgb(68 194 233)" />
                </div>
            </div>
            <div class="actionBtn">
                <span>点击录音</span>
                <div v-if="!isStart" @click="recStart"><svg-icon localIcon="EpMicrophone" class="text-50px"
                        style="color:rgb(68 194 233)" /></div>
                <div v-else @click="recStop">
                    <svg-icon localIcon="EntypoControllerStop" class="text-50px" style="color:red" />
                </div>
            </div>
            <div class="actionBtn">
                <span>提交</span>
                <div @click="submit"><svg-icon localIcon="EpPromotion" class="text-50px"
                        style="color:rgb(68 194 233)" />
                </div>
            </div>
        </n-flex>
        <!-- v-model:show="isShowModel" -->
        <n-modal v-model:show="isShowModel" :mask-closable="false">
            <div class="tipBox">
                <div class="textBox">
                    <span>录制成功</span>
                    <div><svg-icon icon="prime:thumbs-up-fill" class="text-50px" style="color:rgb(68 194 233)" /></div>
                    <div>
                        <p>提交录音后</p>
                        <p>您的声音会立即开始训练</p>
                    </div>
                </div>
                <div class="btnBox">
                    <n-button style="background-color: rgb(68 194 233);color:#fff;" @click="submit">确认提交</n-button>
                    <n-button style="color: rgb(68 194 233);--n-border:none;--n-border-hover:rgb(68, 194, 233)"
                        @click="isShowModel=false">返回重听录音</n-button>
                </div>
            </div>
        </n-modal>

    </div>
</template>

<script setup>
import { ref, defineEmits,defineProps, onMounted, computed } from 'vue'
import { CosyVoiceCloneAudio,GetCustomizedStatement } from '@/service'
import { useMessage } from 'naive-ui'
import CryptoJS from "crypto-js"
import axios from 'axios'
//必须引入的核心
import Recorder from 'recorder-core';

//引入mp3格式支持文件；如果需要多个格式支持，把这些格式的编码引擎js文件放到后面统统引入进来即可
import 'recorder-core/src/engine/mp3';
import 'recorder-core/src/engine/mp3-engine';
//录制wav格式的用这一句就行
import 'recorder-core/src/engine/wav';
const emit=defineEmits()
const prop = defineProps(['audioData'])
console.log('prop', prop.audioData);
let message = useMessage()
let isShowModel=ref(false)
let formData=ref()
let statementList=ref([])
let statement = ref("希望我们大家都能像他一样。")
let isStart=ref(false)
let filePathList=ref([])
let currIndex=ref(0) //当前卡片序号
let percentage=computed(()=>{
    let len=0
    filePathList.value.forEach(item=>{
        if(item&&item!=''){
            len++
        }
    })
    return len/20*100
})

// -------生成guid
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function NewGuid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
// ---------录音
let rec
let recBlob
function recOpen() {
    //创建录音对象,只支持单声道
    rec = Recorder({
        type: 'mp3', //录音格式，可以换成wav等其他格式
        sampleRate: 24000, //录音的采样率，越大细节越丰富越细腻
        bitRate: 16, //录音的比特率，越大音质越好
    });
    if (!rec) {
        alert('当前浏览器不支持录音功能！');
        return;
    }
    //打开录音，获得权限
    rec.open(
        () => {
            console.log('录音已打开');
            formData.value.url = null  //重置录音地址
            rec.start();
            console.log('已开始录音');
            
        },
        (msg, isUserNotAllow) => {
            //用户拒绝了录音权限，或者浏览器不支持录音
            message.error('无法录音:' + msg)
            // console.log((isUserNotAllow ? 'UserNotAllow，' : '') + '无法录音:' + msg);
        },
    );
}
// 开始录音
function recStart() {
    
    recOpen()
    
    if (!rec) {
        console.error('未打开录音');
        return;
    }
    isStart.value = true
}
// 结束录音
function recStop() {
    if (!rec) {
        console.error('未打开录音');
        return;
    }
    rec.stop(
        (blob, duration) => {
            //blob就是我们要的录音文件对象，可以上传，或者本地播放
            recBlob = blob;
            //简单利用URL生成本地文件地址，此地址只能本地使用，比如赋值给audio.src进行播放，赋值给a.href然后a.click()进行下载（a需提供download="xxx.mp3"属性）
            const localUrl = (window.URL || window.webkitURL).createObjectURL(blob);
            console.log('录音成功', blob, localUrl, '时长:' + duration + 'ms');
            upload(blob); //把blob文件上传到服务器
            rec.close(); //关闭录音，释放录音资源，当然可以不释放，后面可以连续调用start
            rec = null;
        },
        (err) => {
            message.error('结束录音出错：' + err);
            console.error('结束录音出错：' + err);
            rec.close(); //关闭录音，释放录音资源，当然可以不释放，后面可以连续调用start
            rec = null;
        },
    );
    isStart.value=false
}

// 上传录音
async function upload(blob) {
    // 使用FormData用multipart/form-data表单上传文件
    // 或者将blob文件用FileReader转成base64纯文本编码，使用普通application/x-www-form-urlencoded表单上传
    let params = new FormData()
    params.append('file', blob, 'recorder.mp3')
    params.append('guid', formData.value.guid)
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    };
    let res = await axios.post('/api/Tools/UpLoadAudioFiles', params, config)
    if (res.status == 200) {
        formData.value.url = 'https://lcsw.mengoo.com'+res.data.response.filePath
        isShowModel.value = true
        console.log('res------------', res)
    }else{
        message.error('录音上传失败，请重新录音')
    }
}
// 本地播放录音
function recPlay() {
    //本地播放录音试听，可以直接用URL把blob转换成本地播放地址，用audio进行播放
    const localUrl = URL.createObjectURL(recBlob);
    const audio = document.createElement('audio');
    audio.controls = true;
    // document.body.appendChild(audio);
    audio.src = localUrl;
    audio.play(); //这样就能播放了
    //注意不用了时需要revokeObjectURL，否则霸占内存
    setTimeout(function () {
        URL.revokeObjectURL(audio.src);
    }, 5000);
}
// 轮播图更换页面时调用
const handleCurrentIndex = (currentIndex, lastIndex) => {
    currIndex.value = currentIndex
    recOpen()
    console.log('currIndex------', currIndex.value);
}
const goBack = () => {
    emit('changeModule', 'audioName')
}
const GetRequest=()=>{
    let url = location.search;
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
        const str = url.slice(1);
        
        const strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            const firstIndex = strs[i].indexOf("=")
            theRequest[strs[i].split("=")[0]] = (strs[i].substring(firstIndex+1));
        }
    }
    return theRequest;
}
const isFirstSuccessClick = ref(true)
const submit=async()=>{
    // console.log('------params', request,params);
    if(isFirstSuccessClick.value){
        isFirstSuccessClick.value = false
        let params = { ...formData.value }
        const request = GetRequest()
        if (request.userName) {
            params.userName = decrypt(request.userName)
        }
        let res = await CosyVoiceCloneAudio(params)
        if (!res.error) {
            emit('changeModule', 'success')
        }
        isFirstSuccessClick.value = true
    }
    
}

// 解密
const decrypt = (word, keyStr, ivStr) => {
    keyStr = keyStr ? keyStr : "12345avb12345avb12345avb";
    ivStr = ivStr ? ivStr : "aqz12345aqz12345aqz12345";
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);

    const decrypt = CryptoJS.AES.decrypt(word, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    // console.log('decrypt', decrypt,decrypt.toString(CryptoJS.enc.Utf8));
    
    return decrypt.toString(CryptoJS.enc.Utf8);
}


const init=async()=>{
    formData.value = prop.audioData
    formData.value.voicePrefix ="tongyi"
    formData.value.sampleRate ="24000"
    formData.value.guid=NewGuid()
    console.log('formData111',formData.value);
    recOpen()
}
onMounted(()=>{
    init()
})
</script>

<style lang="scss" scoped>
.box {
    color: #949CAA;
}

.title {
    font-size: 20px;
    color: #b9c6db;
}

.actionBtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    span {
        color: #fff
    }
}
.tipBox{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    width: 90%;
    height: 340px;
    padding: 20px;
    border-radius: 20px;
    .textBox{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 60%;
        span{
            font-size: 18px;
            font-weight: 600;
        }
        p{
            padding:0 20px;
            text-align: center;
            font-size: 16px;
        }
    }
    .btnBox{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 90%;
        
        .n-button{
            height: 50px;
            font-size: 16px;
            border-radius: 50px;
        }
    }
}
</style>