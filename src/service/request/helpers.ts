import type { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';
import { localStg } from '@/utils';
import { fetchUpdateToken } from '../api';
import { unref } from 'vue';
import { router } from '@/router';
import { useRouterPush } from '@/composables';
	const { toLogin } = useRouterPush(false);
/**
 * 刷新token
 * @param axiosConfig - token失效时的请求配置
 */

let Switch = true
let token = null

export async function handleRefreshToken(axiosConfig) {
  const { resetAuthStore } = useAuthStore();
  const refreshToken = localStg.get('token') || '';
	console.log('switch',Switch)
	if (Switch) {
		console.log('refreshToken-----------',refreshToken)
		console.log('axiosConfig---------------',axiosConfig)
		Switch = false
		const data = await fetchUpdateToken({token:refreshToken});
		console.log('data123123123',data)
		if (!data.error) {
		  const config = { ...axiosConfig };
			console.log('data456456456',data)
		  if (config.headers) {
		    config.headers.Authorization = 'Bearer '+data.data.token;
				localStg.set('token',data.data.token)
				token = data.data.token;
		  }
			console.log('config------------',config)
			Switch = true
		  return config;
		} else {
			Switch = true
			resetAuthStore();
			setTimeout(() => {
				const route = unref(router.currentRoute);
				console.log('route',route)
				if (route.name != "login") {
					toLogin();
					console.log('123123')
				}
			},1000)
		}
	}


}
