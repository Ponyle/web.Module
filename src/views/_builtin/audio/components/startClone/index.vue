<template>
    <div class="audio-container">
        <h1>声音克隆流程</h1>
        <div class="audio-content">
            <div class="left">
                <div>
                    <svg-icon localIcon="CilSmile" class="text-40px" style="color:rgb(68 194 233)" />
                    <!-- <svg-icon icon="cil:smile" class="text-40px" style="color:rgb(68 194 233)" /> -->
                    <div class="audio-divider"></div>
                    <svg-icon localIcon="CilSmile" class="text-40px" style="color:rgb(68 194 233)" />
                    <div class="audio-divider"></div>
                </div>
                <div>
                    <svg-icon localIcon="CilSmile" class="text-40px" style="color:rgb(68 194 233)" />
                    <div class="audio-divider"></div>
                    <svg-icon localIcon="CilSmile" class="text-40px" style="color:rgb(68 194 233)" />
                </div>
            </div>
            <div class="right">
                <div class="tip">
                    <h2>环境检测</h2>
                    <p>请同意授权网站使用麦克风，并确保环境安静，比如少回声、少杂音的录音棚、卧室</p>
                </div>
                <div class="tip">
                    <h2>录制1句高质量音频</h2>
                    <p>1、建议使用手机自带麦克风10cm左右距离，尽量保证录制的每一条都清晰无比;</p>
                    <p>2、想象自己是配音演员,在录制时需要保证发音清晰，声音饱满富有情感，减少吞咽口水等口噪音</p>
                </div>
                <div class="tip">
                    <h2>等待声音训练</h2>
                    <p>约30分钟后，即可克隆你的声音</p>
                </div>
                <div class="tip">
                    <h2>试听并使用</h2>
                    <p>在阿里云-控制台-个性化人声定制查看和试听声音</p>
                </div>
            </div>
        </div>
        <div class="start">
            <n-radio :checked="checkedValue === 'agree'" value="agree" name="basic-demo" @change="handleChange">
                我已阅读并同意<span style="color:rgb(68 194 233)">《个性化人声定制服务协议》</span>
            </n-radio>
            <n-button type="primary" class="btn" @click="startClone">开始克隆</n-button>
        </div>
    </div>
</template>

<script setup>
import { ref,defineEmits } from 'vue'
import { useMessage } from 'naive-ui'

const emit = defineEmits()
const message = useMessage()
const checkedValue = ref()
const handleChange = (e) => {
    console.log('选择', e.target.value);

    checkedValue.value = e.target.value
}
const startClone = () => {
    if (checkedValue.value === 'agree') {
        emit('changeModule', 'audioName')
    } else {
        message.warning('请先同意协议')
    }
}

</script>

<style lang="scss" scoped>
.audio-container {
    overflow: hidden;
    color: #fff;
    padding: 20px;

    h1 {
        font-size: 24px;
        height: 36px;
    }

    .audio-content {
        display: flex;
        justify-content: center;

        .left {
            margin: 10px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;

            >div {

                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;

                .audio-divider {
                    width: 1px;
                    height: 24px;
                    border-left: 1px solid #aaaaaa;
                }
            }

            >div:first-child {
                height: 180px;
            }

            >div:last-child {
                height: 120px;
            }
        }

        .right {
            .tip {
                margin: 20px 0 20px 20px;

                h2 {
                    font-size: 18px;
                    padding: 5px 0;
                }

                p {
                    color: #aaaaaa;
                }
            }
        }
    }

    .start {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0;

        .btn {
            width: 50%;
            height: 40px;
            border-radius: 20px;
            margin: 20px 0;
            background: rgb(68 194 233);
        }
    }
}

:deep(.n-radio .n-radio__label) {
    color: #fff
}
</style>