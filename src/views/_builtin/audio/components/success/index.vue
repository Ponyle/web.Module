<template>
    <div class="successBox">
        <div class="tipBox">
            <div class="textBox">
                <span>提交成功</span>
                <div><svg-icon icon="bi:check-circle" class="text-50px" style="color:rgb(68 194 233)" /></div>
                <p>提交成功，请返回控制台查看</p>
            </div>
        </div>
        <n-flex class="questionBox mt-20px text-#fff" style="gap:16px" vertical>
            <n-flex vertical>
                <h2>Q1：如何试听声音效果？</h2>
                <p>登录阿里云-控制台-智能语音交互-个性化人声定制-试听</p>
            </n-flex>
            <n-flex vertical>
                <h2>Q2：训练时间太长？</h2>
                <p>通常训练1个声音会在10分钟-30分钟完成，如遇排队则最长会在8小时内完成。</p>
            </n-flex>
        </n-flex>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.successBox{
    padding:0px 20px 20px;
}
.tipBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    // width: 90%;
    height: 200px;
    padding: 20px;
    border-bottom: 1px solid #949CAA;
    color: #949CAA;
    .textBox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        span {
            font-size: 20px;
            color: #b9c6db;
        }

        p {
            padding: 0 20px;
            text-align: center;
            font-size: 16px;
        }
    }
}
.questionBox{
    h2{
        font-size: 16px;
    }
}
</style>