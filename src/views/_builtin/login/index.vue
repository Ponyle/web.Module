<template>
	<div class="login-container wh-full ">
		<!-- Header -->
		<div class="absolute top-0 left-0 w-full flex justify-between items-center px-20 py-6 z-20">
			<img src="@/assets/images/logo.png" alt="Logo" class="h-12 object-contain" />
			<div>
				<div v-if="!authStore.isLogin">
					<n-button type="primary" round size="large" color="#2b55e6" class="px-8 font-bold"
						@click="showLogin = true">
						用户登录/注册
					</n-button>
				</div>
				<div v-else class="flex items-center gap-6">

					<n-dropdown :options="userOptions" @select="handleSelect" trigger="hover">
						<div class="flex items-center gap-3 cursor-pointer py-1 px-2 rounded-lg hover:bg-white/50 transition-colors">
							<img class="w-10 h-10 rounded-full border border-gray-200 object-cover"
								src="@/assets/images/mengoo/Avatar.svg"
								@error="handleImageError" />
							<span class="font-medium text-gray-700 text-lg">{{ authStore.userInfo?.realname || '用户' }}</span>
						</div>
					</n-dropdown>
				</div>
			</div>
		</div>

		<!-- Landing Content -->
		<div class="container  px-20 flex items-center h-full w-full z-10 relative">
			<div class="flex flex-col justify-center space-y-8 max-w-3xl">
				<h2 class="text-2xl font-bold text-[#031A79] tracking-wider">从智能辅助到智慧教学</h2>
				<div class="text-5xl font-extrabold text-[#031A79] leading-tight space-y-2">
					<div>助您将教学思想转化为</div>
					<div>可实施可评估的完整教学方案</div>
				</div>
				<p class="text-xl  leading-relaxed max-w-2xl">
					基于AI驱动的医学全学科多模态临床教学病例创作助手，以人类教学思维精准把握
					教学思想，生产素材并交付可立即实施的完整教学解决方案。
				</p>

				<div class=" cursor-pointer hover:opacity-90 transition-opacity w-max" @click="handleClickExperience">
					<img src="@/assets/images/btn.png" alt="Enter Experience" class="h-16 object-contain" />
				</div>

				<div class="flex gap-8 ">
					<img src="@/assets/images/g1.png"
						class="h-58 object-contain shadow-lg rounded-xl transform hover:-translate-y-1 transition-transform" />
					<img src="@/assets/images/g2.png"
						class="h-58 object-contain shadow-lg rounded-xl transform hover:-translate-y-1 transition-transform" />
					<img src="@/assets/images/g3.png"
						class="h-58 object-contain shadow-lg rounded-xl transform hover:-translate-y-1 transition-transform" />
				</div>
			</div>
		</div>

		<!-- Login Card Overlay -->
		<div v-if="showLogin" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
			<div class="relative bg-white rounded-2xl shadow-2xl w-[480px] p-10 min-h-[500px] flex flex-col">
				<div class="absolute top-4 right-4 z-10">
					<n-button quaternary circle size="medium" @click="showLogin = false">
						<template #icon><svg-icon icon="ep:close"
								class="text-gray-400 hover:text-gray-600 text-xl" /></template>
					</n-button>
				</div>

				<div class="flex flex-col items-center mb-10 mt-4">
					<img src="@/assets/images/tlogo.svg" alt="Logo" class="h-16 object-contain" />
				</div>

				<div class="flex justify-center space-x-12 mb-8 border-b border-gray-100 relative">
					<div class="pb-3 text-lg cursor-pointer transition-colors border-b-2 font-medium"
						:class="loginMethod === 'pwd-login' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'"
						@click="loginMethod = 'pwd-login'">
						账号密码登录
					</div>
					<!-- <div class="pb-3 text-lg cursor-pointer transition-colors border-b-2 font-medium"
						:class="loginMethod === 'code-login' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'"
						@click="loginMethod = 'code-login'">
						手机验证码登录
					</div> -->
				</div>

				<div class="flex-1">
					<transition name="fade-slide" mode="out-in" appear>
						<div v-if="loginMethod === 'pwd-login'">
							<component :is="activeModule.component" @changeLoginMethod="changeLoginMethod"
								@showSlideImg="openModel" @loginSuccess="handleLoginSuccess" />
						</div>
						<div v-else class="h-full flex items-center justify-center text-gray-400">
							手机验证码登录功能开发中...
						</div>
					</transition>
				</div>

				<div class="flex justify-between items-center text-blue-600 text-base mt-4 px-1">
					<!-- <span class="cursor-pointer hover:opacity-80">注册</span> -->
					<!-- <span class="cursor-pointer hover:opacity-80">扫码登录</span> -->
				</div>
			</div>
		</div>

		<n-modal v-model:show="showModal" :mask-closable="false" preset="card" title="安全验证" class="w-[480px]">
			<div class="flex flex-col items-center p-4">
				<div class="actionBox relative w-[420px] h-[240px] rounded overflow-hidden mb-4 bg-gray-100">
					<n-image :src="imgInfo.backgroundImage" preview-disabled class="nImage w-full h-full object-cover" />
					<div class="absolute top-0 h-full" :style="{ left: sliderNum + 'px' }">
						<n-image :src="imgInfo.blockImage" preview-disabled class="w-12 h-full object-cover" />
					</div>
					<div class="msgBox" :class="{ showMsgBox: showMessage }">{{ message }}</div>
				</div>
				<div class="w-full relative h-10 bg-gray-100 rounded-full flex items-center px-1">
					<div class="text-gray-400 text-sm w-full text-center select-none">向右滑动完成验证</div>
					<div class="absolute left-0 top-0 h-10 w-12 bg-blue-600 rounded-full cursor-pointer shadow-md flex items-center justify-center transition-all duration-100"
						:style="{ left: sliderNum + 'px' }" @mousedown="handleDragstart"
						@touchstart.passive="handleDragstart">
						<svg-icon icon="ep:arrow-right" class="text-white" />
					</div>
				</div>
			</div>
		</n-modal>

	</div>

</template>

<script setup lang="tsx">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Component } from 'vue';
import { loginModuleLabels } from '@/constants';
import { useThemeStore } from '@/store';
import { useAppInfo } from '@/composables';
import { getColorPalette, mixColor } from '@/utils';
import { PwdLogin } from './components';
import { fetchDingLogin, SlideImage, Validate } from '@/service'
import { useAuthStore } from '@/store';
import { ToggleLang } from '@/layouts/common/global-header/components';
import JSEncrypt from 'jsencrypt'
import { t } from '@/locales';
import { useRouterPush } from '@/composables';
const { routerPush } = useRouterPush();
import { routeName } from '@/router';

const authStore = useAuthStore();
const router = useRouter();
const { login, handleActionAfterLogin } = useAuthStore();
const message = ref('暂无信息')
const showMessage = ref(false);
const showLogin = ref(false);

interface Props {
	/** 登录模块分类 */
	module: UnionKey.LoginModule;
}
let loginMethod = ref('pwd-login') //登录方式
// const isPwdLogin = ref(true)  //是否密码登录
const props = defineProps<Props>();

const theme = useThemeStore();
const { title } = useAppInfo();
const showModal = ref(false)
const imgInfo = ref({
	backgroundImage: null,
	blockImage: null,
	sessionId: null
})
const sliderNum = ref(0)
interface LoginModule {
	key: UnionKey.LoginModule;
	label: string;
	component: Component;
}

const modules: LoginModule[] = [
	{ key: 'pwd-login', label: loginModuleLabels['pwd-login'], component: PwdLogin },

];
const changeLoginMethod = (method: string) => {
	console.log(method);

	loginMethod.value = method
}
const activeModule = computed(() => {
	const active: LoginModule = { ...modules[0] };
	let findItem = modules.find(item => item.key === loginMethod.value);
	if (findItem) {
		Object.assign(active, findItem);
	}
	return active;
});

const bgThemeColor = computed(() => (theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor));

const bgColor = computed(() => {
	const COLOR_WHITE = '#ffffff';
	const ratio = theme.darkMode ? 0.5 : 0.2;
	return mixColor(COLOR_WHITE, theme.themeColor, ratio);
});

async function getImage() {
	const res = await SlideImage()
	if (!res.error) {
		imgInfo.value = res.data
	}
}

const mousePosition = ref({
	startX: 0,
	startTime: null,
	endX: 0,
	endTime: null
})
function getCurDate() {
	const currentTime = new Date().getTime();

	return currentTime
}
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkIgotbTKoA/+RCxOSISf64Ng9AsM0Vry6/OqoFzncpY2iPjO5bloz88jFvoBxfH/QZuBArDS0VgC0KZjtNiKxZh9BD6SY24POtB92hCnF0ZgU0MYdipvdO3/XS8Zi6E8cp4cYYvYr6ALbL6sLpKef/NCttKITIeHT3TdwQibY2gUCZ/PEehWZR/cR4lGQi8KjER6kr6qpCd+niyyNzRkYC/p+eak1b9JVWvq/RO/yukg8zWI6whfYwtMT7SwYeOGElWcOqeuTLYxJXmZoulTkblleTAyh0yvIHa7H0WF0B/79yYpNqamK88uOwx9eq1NbxCausMbxZB7RkuVTFs7cwIDAQAB
-----END PUBLIC KEY-----`
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQiCi1tMqgD/5ELE5IhJ/rg2D0CwzRWvLr86qgXOdyljaI+M7luWjPzyMW+gHF8f9Bm4ECsNLRWALQpmO02IrFmH0EPpJjbg860H3aEKcXRmBTQxh2Km907f9dLxmLoTxynhxhi9ivoAtsvqwukp5/80K20ohMh4dPdN3BCJtjaBQJn88R6FZlH9xHiUZCLwqMRHqSvqqkJ36eLLI3NGRgL+n55qTVv0lVa+r9E7/K6SDzNYjrCF9jC0xPtLBh44YSVZw6p65MtjEleZmi6VORuWV5MDKHTK8gdrsfRYXQH/v3Jik2pqYrzy47DH16rU1vEJq6wxvFkHtGS5VMWztzAgMBAAECggEAJL24O5jd+ZqXNJVewSiVzrTzLJayh3XrUvf6ZBG59HMjIea+Eb/0WP97GBgt4zgFf5QcU6bHsNgCvy/NIOf7Pwfon++YHxaXYIgntguNrmkBi6j+yus2si7eP739bHVsfGadKF74kozI2rgN5Tj4eeZJC1ixtWKujxBSXwPlHHuvHXD2+e8y0JvpmX6Na/rznIJrN3SvaYgWd1cpI8hisk5CN5Zsw2OXfSSGPeBqML4wNEE3pcahZTYiw3EGdddzuKaYO/V1jOL7EuAGeNsvGUQ5PbykeSILvvEDhQInulC5qGgyLAzJSxTIryPtWBThvo8X8IjNIf4l46Yc6M8c4QKBgQD+LyGN1Yn+VZLuPKG1iwpdLkl45Z3KbE7c80fJtfnYwx8nNGCMxCFPT174xpksRJzbukVJIlwGG+lkuiJ4rdN5vpcWNWlKTpk9ZGUZAXHYPbAXP3iUnVqvsHlxlWABgzlygkCTJEcdkVaqkDI8IGKqcG2AKeeWXsLyqbKFOIpl1wKBgQCRkH0UoSMUoxXHDWwZfySu+TV2rRGG8AB16d7Q229to5DoDV201kxecgssUkgNJS2Vw9ObsFwWttIfvRichc/a6HP0EHc43rJPzLXzALYdZ0kBfM7BSkh3CEl3LP9xi+UP7Hp5q93C37WdHWnEhJtAC5fg+rAptwZzn+q9m8ZrxQKBgQDO5cw5KATf6gXkN6QlIpz4BfI2HykWGJ0Eyl23uZE6OHEGN2MTkZ3PcbrLYtRRLTREwlUdV4NyUYvjuoLOmicV5OYUZLtkiZ/AUhTcismBC41nDvn2djLX6RyhMMZp1MeRBqbLXm8oiSHzSdYqDO5i74qiFPn18wJaBXlTaRd2FwKBgCEA3Isv2a9VJpvh/C9vt1aApFGK/d1VTxVs+BrslcALBNDILwXQTLJhMw1SfomUc1hwdOrouohf3RZbHlhmsnDUoW2lyhI307/qDxrQf3n9L/1JWetTN0jdtSJzLluFN2M736z0fawwYpID2DY5RqXnuwDEdeqPV8QhbuychAltAoGANVh6h7tSGny/6BVAIXOiFpyOjExMsJ56zUqPDHz/Pzu9yphe87pThZ5zVaqdqhaTrex0FtdydMZNcKA+yqJvCUvjmd38CwclnjCeXZTbo8iEeJ5rYhksIm4oVNsgZv2sXgoDOxDBklNBes4WM6KG9RatHdQL0ljA2H3OWTCmnpA=
-----END PRIVATE KEY-----`
// console.log('publicKey', publicKey)
const encrypt = new JSEncrypt();
encrypt.setPublicKey(publicKey)
function EncodePwd(str) {

	let encryptedData = encrypt.encrypt(str)
	return encryptedData
}
let TimeOut = null
async function handleDragend(event) {
	mousePosition.value.endX = window.event.pageX
	mousePosition.value.endTime = getCurDate()
	let params = {
		distance: mousePosition.value.endX - mousePosition.value.startX,
		percent: sliderNum.value * 0.0086,
		startTime: mousePosition.value.startTime,
		endTime: mousePosition.value.endTime,
		sessionId: imgInfo.value.sessionId,
	}
	console.log('params', params)
	params = JSON.stringify(params)
	const res = await Validate({ token: EncodePwd(params), name: loginInfo.value.username, pwd: loginInfo.value.password })
	console.log('res----------', res)
	if (!res.error) {
		await handleActionAfterLogin(res.data);
		handleLoginSuccess(); // Manually call if validate succeeds, though handleActionAfterLogin is usually enough, but we want to close modal
	} else {
		if (res.error.msg) {
			cloaseModel()
		} else {
			clearTimeout(TimeOut)
			showMessage.value = true
			message.value = res.error.response.msg
			TimeOut = setTimeout(() => {
				showMessage.value = false
			}, 2500)
			getImage()
			mousePosition.value = {
				startX: 0,
				startTime: null,
				endX: 0,
				endTime: null
			}
			sliderNum.value = 0
		}

	}
}
function handleDragstart(event) {
	mousePosition.value.startX = window.event.pageX
	mousePosition.value.startTime = getCurDate()
	document.addEventListener('mousemove', handleDragMove);
	document.addEventListener('mouseup', handleDragEnd);
}

function handleDragMove(event) {
	const moveX = event.pageX - mousePosition.value.startX;
	if (moveX >= 0 && moveX <= 378) { // 420 - 42 (block width) approx
		sliderNum.value = moveX;
	}
}

function handleDragEnd(event) {
	document.removeEventListener('mousemove', handleDragMove);
	document.removeEventListener('mouseup', handleDragEnd);
	handleDragend(event);
}

function reloadImg() {
	sliderNum.value = 0
	getImage()
}
function cloaseModel() {
	showModal.value = false
}
const loginInfo = ref({
	username: null,
	password: null
})
function openModel({ username, password }) {
	showModal.value = true
	loginInfo.value.username = username;
	loginInfo.value.password = password;
	mousePosition.value = {
		startX: 0,
		startTime: null,
		endX: 0,
		endTime: null
	}
	sliderNum.value = 0
	getImage()

}

// User Info & Dropdown Logic
const userOptions = computed(() => {
	const role = authStore.userInfo?.rolename;
	if (role === 'SysAdmin' || role === 'SchoolAdmin') {
		return [
			// { label: '个人中心', key: 'per' },
			{ label: '后台管理', key: 'back' },
			{ label: '退出登录', key: 'logout' }
		];
	} else {
		return [
			// { label: '个人中心', key: 'per' },
			{ label: '退出登录', key: 'logout' }
		];
	}
});

function handleImageError(e: Event) {
	const target = e.target as HTMLImageElement;
	target.src = new URL('@/assets/images/Avatar.svg', import.meta.url).href;
}

function handleSelect(key: string) {
	if (key === 'logout') {
		window.$dialog?.info({
			title: '提示',
			content: '您确定要退出登录吗？',
			positiveText: '确定',
			negativeText: '取消',
			onPositiveClick: () => {
				authStore.resetAuthStore();
				// No need to redirect if we stay on page, but UI will update via reactivity
			}
		});
	} else if (key === 'per') {
		// Navigate to personal center if needed, or do nothing as per requirement
	} else if (key === 'back') {
		window.open('/about', '_blank');
	}
}

function handleLoginSuccess() {
	showLogin.value = false;
	// Ensure we stay on page and update UI (reactive authStore.isLogin will handle UI)
}

function handleClickExperience() {
	if (authStore.isLogin) {
  routerPush({ name: routeName('Mengoo') });
	} else {
		showLogin.value = true;
	}
}

</script>

<style lang="scss" scoped>
.loginTitle {
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #000;
	font-size: 32px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	padding-top: 45px;
}

.login-container {
	background: url(@/assets/images/bg.png) no-repeat center center;
	background-size: cover;
	background-attachment: fixed;
	display: flex;
	/* align-items: center; */
	/* justify-content: center; */
	position: relative;
}

.login-card {
	background: transparent;
}

.fontBox {


	/* position: absolute;
	left: 18%;
	top: 50%;
	margin-top: -160px;
	z-index: 9; */
}

.fontBox p {
	color: #4C89DE;
	text-shadow: 0px 4px 20px rgba(61, 138, 255, 0.25);
	font-size: 36px;
	font-style: normal;
	font-weight: 700;
	line-height: 52px;
	/* 46.095px */
	letter-spacing: 2px;
	text-transform: uppercase;
}

.fontBox .enTitle {
	font-size: 54px;
	font-style: normal;
	font-weight: 900;
	line-height: 98px;
	/* 65px */
	text-transform: uppercase;
	background: linear-gradient(176deg, #4C89DE, #D8B1FF);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

@media screen and (max-width: 1300px) {
	.fontBox {
		display: none;
	}

	.login-container {
		justify-content: center;
	}

	.login-card {
		position: static;
		transform: none;
		margin: 0 auto;
	}

	.title {
		display: none;
	}
}

.word {
	width: 1200px;
	// height: 400px;
	padding-left: 2%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
}

@media only screen and (max-width: 886px) {
	.word {
		display: none;
	}
}

@media only screen and (max-width: 1380px) {
	.word {
		display: none;
	}
}

.n-card {}

.loginType {
	margin-top: 48px;
	color: #BEBEBE;
}

.dingdingIcon {
	color: #fff;
	background: #488DF3;
	border-radius: 8px;
	width: 26px;
	height: 26px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.imgBox {
	background: #fff;
	border: 1px solid #fff;
	border-radius: 6px;
	width: 420px;
	height: 320px;

	padding: 28px 16px 32px;
}

.actionBox {
	position: relative;
	overflow: hidden;

	img {
		height: 240px;
		position: absolute;
	}

	.nImage {
		display: block;
		width: 100%;
		height: 100%;

		:deep(img) {
			width: 100%;
			height: 100%;
		}
	}
}

.msgBox {
	position: absolute;
	top: 210px;
	left: 0;
	width: 100%;
	height: 30px;
	background: #fde2e2;
	color: #f56c6c;
	font-size: 12px;
	line-height: 30px;
	text-align: center;
	opacity: 0;
	transition: opacity 0.3s;
	z-index: 999;
}

.showMsgBox {
	opacity: 1;
}
</style>
