<template>
	<div>

		<transition appear >
					<component :is="comheader"  />

				</transition>
	</div>
</template>


<script setup lang='ts'>
import { useRouterPush } from '@/composables';
import { routeName } from '@/router';
import { h, ref, onMounted, watch, nextTick,markRaw,defineAsyncComponent,reactive } from 'vue'
import { useMessage, useNotification } from 'naive-ui'
import { Access } from '@/service';
import CryptoJS from 'crypto-js'

import { useAuthStore, useThemeStore} from '@/store';
import { useRouter } from 'vue-router';

import { comheader } from './component/index';


import { localStg } from '@/utils';
import { getServiceEnvConfig } from '~/.env-config';
import { init } from 'echarts';
import { storeToRefs } from "pinia";
import { theme } from '@unocss/preset-mini';

const secondUrl = import.meta.env.VITE_TEST_URL
const auth = useAuthStore();
const currentindex = ref(1)
const showModal = ref(false)
const logoutmodel = ref(false)
const hostname = window.location.hostname
const { routerPush } = useRouterPush()
const notification = useNotification()
let router = useRouter()
const ComComponent = ref("")
const props = defineProps({
	style: Object,
	routerpath: String,
	cstyle:{
		type:Array,
	},
	themeSet:Object
})

console.log(props.cstyle,props.themeSet,'headercss的值')


const topheight = ref()

if(props.cstyle){
	topheight.value = props.cstyle[0].HeaderConfig.LogoStyle.height + props.cstyle[0].HeaderConfig.TabStyle.height

}

console.log(topheight,'头部高度')
// console.log(props.domainpath,"header domainpath")
// if(props.domainpath?.length>0){
// 	const urlmsg = props.domainpath
// const modules = import.meta.glob('./component/*/*.vue');
// // const themenum = routeStore.$state.themenum
// // markRaw(defineAsyncComponent(link))
// const link = modules[urlmsg[0].headlogo]
// ComComponent.value = markRaw(defineAsyncComponent(link))
// }else{
// 	ComComponent.value = markRaw(oneheader)
// }

function Showthemenum() {
	console.log(themenum.value)
}

async function init() {
	await nextTick()

}



onMounted(() => {

	init()

})

</script>




<style scoped>
a {
	text-decoration: none;
}

.active {
	border-bottom: 5px solid #2971DD;
	cursor: pointer;
	color: #2971DD;
	height: 40px;
}

.active:hover {
	color: #2971DD
}

.nactive:hover {
	color: #2971DD
}

.nactive {
	cursor: pointer;

}

.bottomnav {

	position: relative;
}

.bottomnav:after {
	content: "";
	width: 0;
	height: 5px;
	background: #2971DD;
	position: absolute;
	top: 100%;
	left: 50%;
	transition: all .8s;
}

.bottomnav:hover:after {
	left: 0%;
	width: 100%;
}

.hiddenmenu {
	display: none;
}

.header {
	position: fixed;
	top: 20;
	left: 0;
	z-index: 2;
	width: 100%;
	height: 80px;
	transition: all linear 0.5s;
	background-color: #fff;
	/* border-bottom: 1px solid #f3f5f6; */
	/* box-shadow: rgb(95 101 105 / 10%) 0px 12px 20px 0px; */

}

.topnav {
	display: flex;
	align-items: center;
	height: 70px;
	width: 1400px;;
	margin: 0 auto;
	justify-content: space-between;
}

.rightnav {
	width: 700px;
	color: #828282;
	line-height: 43px;
	height: 33px;
	/* font-size: 20px; */

}

/*
@media only screen and (max-width: 800px) {
	.rightnav{
		display: none;
	}
	.hiddenmenu{
		display: block;
	}

}

@media screen and (min-width:800px) and (max-width:1920px) {
	.rightnav{
		display: block;
	}
	.hiddenmenu{
		display: none;
	}
    } */
</style>
