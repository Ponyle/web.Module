<template>
	<div class='foot' style="width: 100%;">
			底部
	</div>
</template>
<script setup lang='ts'>
import {onMounted} from 'vue'
import { useAuthStore } from '@/store';
import { useRouterPush } from '@/composables';
import { routeName } from '@/router';

const { routerPush } = useRouterPush()
const hostname = window.location.hostname

function tourl(val){
if(val===1){
	window.open("https://beian.miit.gov.cn/#/Integrated/index","_blank")

}else if(val===2){

	window.open("https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502012029","_blank")

}
}

function towe(){
	routerPush({ name: routeName('Mengoo_Aboutus'),query: { 'href': 'about' }});

}

function tolink(val) {
		if(val==1){
					window.open("https://www.ilab-x.com/","_blank")
		}else if(val==2){
			window.open("https://www.zhihuishu.com/","_blank")

		}
		else if(val==3){
			window.open("https://www.adinstruments.com.cn/","_blank")

		}
		else if(val==4){
			window.open("https://www.chuxinmedical.com/","_blank")

		}
		else if(val==5){
			window.open("https://www.pmph.com/","_blank")

		}
		else if(val==6){
			window.open("http://www.csas.org.cn/","_blank")

		}
		else if(val==7){
			window.open("https://www.caps-china.org.cn/","_blank")

		}
		else if(val==8){
			window.open("https://www.cast.org.cn/","_blank")

}
}


const auth = useAuthStore();

function init(){

}

function gonbeian() {
      let wap = auth.$state.schoolmsg.waNo;
      var str = wap.replace(/[^\d]/g, " ");
      let dohttp = "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=" + str;
      window.open(dohttp);
    }

onMounted(() => {

init()
})
</script>
<style lang='scss' scoped>

</style>
