<template>
	<div class="bindContent" v-if="showPage">
		<div style="padding:80px 40px 60px">
			<div class="title">
				<h3>临床思维能力训练与评测系统</h3>
				<h3>账号绑定</h3>
			</div>
		</div>
		<div style="padding:0 40px" v-if="!isBind">
			<n-space vertical style="gap:28px">
				<div>
					<p style="color: #efefef;margin-bottom: 10px;">学号</p>
					<n-input v-model:value="formValue.name" type="text" size="large" placeholder="请输入学号" />
				</div>
				<div>
					<p style="color: #efefef;margin-bottom: 10px;">密码</p>
					<n-input v-model:value="formValue.password" size="large" placeholder="请输入密码"  :input-props="{ autocomplete: false }" type="password" show-password-on="click" />
				</div>
			</n-space>
		</div>
		<div style="padding:80px 40px 0px" v-if="!isBind">
			<n-button style="background: #fff; width:100%;height: 46px;color:#1890ff ;" @click="handleSubmit" size="large">绑定账号</n-button>
		</div>
		<div style="padding:0 40px" v-if="isBind">
				<p style="color:#fff;font-size: 36px;">已绑定！</p>
		</div>
		<div style="padding:80px 40px 0px" v-if="isBind">
			<n-button style="background: #fff; width:100%;height: 46px;color:#1890ff ;" @click="handleSubmitRemove" size="large">解除绑定</n-button>
		</div>
	</div>
</template>

<script setup lang="tsx">
	import { onMounted, ref } from 'vue';
	import CryptoJS from 'crypto-js'
	import { useRoute } from 'vue-router'
	import { useDialog, useMessage } from 'naive-ui'
	import { BindWx, RemoveBindWx } from '@/service'
	import { useRouterPush } from '@/composables';
	const { routerPush } = useRouterPush();
	const showPage = ref(true)
	const message = useMessage()
	const route = useRoute()
	const formValue = ref({
		name:null,
		password:null,
		openid:null,
		uuid:null
	})
	const isBind = ref(false)
	function EncodePwd(pwd) {
		const md5 = CryptoJS.MD5(pwd).toString().toLowerCase()
		return md5
	}
	async function handleSubmit() {
		if (!formValue.value.name || !formValue.value.password) {
			message.error('请输入账号/密码')
		} else {
			let params = {...formValue.value};
			params.password = EncodePwd(formValue.value.password)
			let res = await BindWx(params)
			if (!res.error){
				isBind.value = true
			}
		}
	}
	async function handleSubmitRemove() {
		let params = formValue.value;
		let res = await RemoveBindWx(params)
		if (!res.error){
			isBind.value = false;
		}
	}
	onMounted(() => {

		if (route.query.openid) {
			formValue.value.openid = route.query.openid
		}else {
			showPage.value = false
		}
		if (route.query.uuid) {
			formValue.value.uuid = route.query.uuid
		} else {
			isBind.value = true;
		}
	})
</script>

<style lang="scss" scoped>
	.bindContent{
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: linear-gradient(to bottom, rgb(80,118,255), rgb(109,137,244));
		h3{
			font-size: 28px;
			line-height: 60px;
			color: #efefef;
		}
	}
	:deep(.n-input) {
		background-color: rgba(99,99,99,.1) !important;

	}
	:deep(.n-input .n-input__input-el) {
		color: #efefef!important;
	}
</style>
