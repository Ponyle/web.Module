<template>
	<div style="height: 100vh">
		<n-flex justify="center" align="center">
			<n-spin size="large" />
		</n-flex>
	</div>
</template>

<script>
import { fetchDingLogin} from '@/service'
import { onMounted } from 'vue' 
import { useAuthStore } from '@/store';
const { handleActionAfterLogin } = useAuthStore();
function getUrlParams(url) {
    let urlStr = url.split('?')[1]
	let obj = {};
	let paramsArr = urlStr.split('&')
	for(let i = 0,len = paramsArr.length;i < len;i++){
        // 通过 = 将每一个参数分割为 key:value 的形式
		let arr = paramsArr[i].split('=')
		obj[arr[0]] = arr[1];
	}
	return obj
}
const ddLogin=async()=>{
	const URL = window.location.href;
	const obj=getUrlParams(URL)
	if(obj.code){
		let res=await fetchDingLogin({code:obj.code})
		console.log('res---',res);
		if(!res.error){
			handleActionAfterLogin(res.data)
		}
	}
}
ddLogin()
// onMounted(()=>{
// 	ddLogin()
// })
</script>

<style>
</style>