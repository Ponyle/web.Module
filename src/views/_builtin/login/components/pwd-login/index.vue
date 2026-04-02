<template>
	<n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
		<n-form-item path="userName">
			<n-input v-model:value="model.userName" size="large" :placeholder="t('page.login.userNamePlaceholder')" />
		</n-form-item>
		<n-form-item path="password">
			<n-input v-model:value="model.password" size="large" :input-props="{ autocomplete: false }" type="password"
				show-password-on="click" :placeholder="t('page.login.passwordPlaceholder')" />
		</n-form-item>
		<n-space :vertical="true" :size="24">
			<n-button class="loginBtn" size="large" :block="true" color="#2b55e6"
				@click="handleSubmit">
				{{ t('page.login.login') }}
			</n-button>

		</n-space>

	</n-form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import RSAKey from '@/assets/js/rsa.min.js';
import Base from '@/assets/js/base64.js';
import type { FormInst, FormRules } from 'naive-ui';
import { loginModuleLabels } from '@/constants';
import { useAuthStore } from '@/store';
import { useRouterPush } from '@/composables';
import { formRules } from '@/utils';
import { OtherAccount } from './components';
import { pk } from '@/service'
import CryptoJS from 'crypto-js'
import { t } from '@/locales';
import { localStg } from '@/utils';
const emit = defineEmits(['changeLoginMethod', 'showSlideImg', 'loginSuccess']);
const auth = useAuthStore();
const { login, handleActionAfterLogin } = useAuthStore();
const { toLoginModule } = useRouterPush();

const formRef = ref<HTMLElement & FormInst>();

const model = reactive({
	userName: null,
	password: null,
	mode: null,
});
const LoginInfo = ref({
	username: null,
	password: null,
	remember: 0,
	code: null,
})
const rules: FormRules = {
	userName: formRules.userName,
	password: formRules.pwd,
	// userName: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
	// password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
	// password: formRules.pwd
};

const rememberMe = ref(false);
async function getPk() {
	const res = await pk()
	console.log('res1---', res)
	if (!res.error) {
		return res.data
	}
}

// 点击回车键登录
function keyDown(e) {
	// 回车则执行登录方法 enter键的ASCII是13
	if (e.key == 'Enter') {
		handleSubmit()
		e.preventDefault(); // 去掉默认的换行
	}
	// console.log('auth.loginLoading',auth.loginLoading);
}

function EncodePwd(pwd) {
	const md5 = CryptoJS.MD5(pwd).toString().toLowerCase()
	// const DK = CryptoJS.PBKDF2(pwd, 'mengoolab', {
	// 	keySize: 8,
	// 	iterations: 10000,
	// 	hasher: CryptoJS.algo.SHA256
	// });
	return md5
	// return DK.toString(CryptoJS.enc.Base64)
}

async function handleSubmit() {
	// const res = await getPk()

	if (1) {
		// const {pk , ts, nonce} = res
		// const nonce = 'WIy23H2wSZ7j5'
		// const pk = 'fb5f8d4ba0174b7ce8a94464e51d9cb1baf6021dfb02178cb869a414be7eb43c38bfc4418f4f39190c1ff328ef10984f47776b229d5858d613eaad4760ad0f58e6efa52b59cf409d0f3861ef904d19a6b2b092607a69fc5c11e0cfe0bf4b24780f76df22732d4efc5dbf650bb0ae51f33ccfee8a3c61ef58f4b8772dbdb4e4b3';
		// const ts = '1688117544';

		// let newEncrypter = new RSAKey();
		// newEncrypter.setPublic(pk,"10001");
		// LoginInfo.value.password = Base.hex2b64(newEncrypter.encrypt(JSON.stringify([ts, nonce, model.password])));
		LoginInfo.value.username = model.userName
		// LoginInfo.value.password = model.password
		LoginInfo.value.password = EncodePwd(model.password)
		// console.log('LoginInfo.value', LoginInfo.value);

		await formRef.value?.validate();
		const { username, password } = LoginInfo.value;
		let loc = localStg.get('lang')
		let langCode = 'CN'
		if(loc=='en'){
			langCode = 'EN'
		}

		const res = await login(username, password,langCode);
		if (res.data) {
			await handleActionAfterLogin(res.data);
			emit('loginSuccess')
		} else if (res.error.response?.isShow) {

			emit('showSlideImg', { username: LoginInfo.value.username, password: LoginInfo.value.password })
			console.log('res----------', res)
		}

	}


}

function handleLoginOtherAccount(param: { userName: string; password: string }) {
	const { userName, password } = param;
	login(userName, password);
}
const loginByDingTalk = () => {
	emit('changeLoginMethod', 'ewm-login')
}
onMounted(() => {
	// 绑定监听事件
	window.addEventListener("keydown", keyDown);



})


onUnmounted(() => {
	window.removeEventListener("keydown", keyDown, false);

})
</script>

<style lang="scss" scoped>
.n-input {
	border-radius: 8px;
}

.loginBtn {
	border-radius: 8px;
	letter-spacing: 8.64px;
	font-weight: 400;
	color: #FFF;
	border: none;
	margin-top: 20px;
}
</style>
