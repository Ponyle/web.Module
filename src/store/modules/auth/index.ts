import { unref, nextTick } from 'vue';
import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchLogin, fetchUserInfo } from '@/service';
import { useRouterPush } from '@/composables';
import { localStg } from '@/utils';
import { useTabStore } from '../tab';
import { useRouteStore } from '../route';
import { getToken, getUserInfo, clearAuthStorage } from './helpers';
import { t } from '@/locales';
const baseAdmin = import.meta.env.VITE_BASE_ADMIN
interface AuthState {
	/** 用户信息 */
	userInfo: Auth.UserInfo;
	/** 用户token */
	token: string;
	/** 登录的加载状态 */
	loginLoading: boolean;
}

export const useAuthStore = defineStore('auth-store', {
	state: (): AuthState => ({
		userInfo: getUserInfo(),
		token: getToken(),
		loginLoading: false,
	}),
	getters: {
		/** 是否登录 */
		isLogin(state) {
			console.log('Boolean(state.token)', Boolean(state.token))
			return Boolean(state.token);
		}
	},
	actions: {
		/** 重置auth状态 */
		resetAuthStore() {
			const { toLogin } = useRouterPush(false);
			const { resetTabStore } = useTabStore();
			const { resetRouteStore } = useRouteStore();
			const route = unref(router.currentRoute);
			clearAuthStorage();
			this.$reset();

			// if (route.meta.requiresAuth) {
			//   toLogin();
			// }
			toLogin();
			nextTick(() => {

				resetTabStore();
				resetRouteStore();
			});
		},
		/**
		 * 处理登录后成功或失败的逻辑
		 * @param backendToken - 返回的token
		 */
		async handleActionAfterLogin(data) {
			const route = useRouteStore();
			const { toLoginRedirect } = useRouterPush(false);

			const loginSuccess = await this.loginByToken(data);
			// const loginSuccess = true
			if (loginSuccess) {
				await route.initAuthRoute();

				// 跳转登录后的地址
				// toLoginRedirect();

				// 登录成功弹出欢迎提示
				// if (route.isInitAuthRoute) {
				// 	window.$notification?.success({
				// 		title: t('page.login.loginSuccess'),
				// 		content: t('page.login.welcomeBack') + this.userInfo.realname + '!',
				// 		duration: 3000
				// 	});
				// }

				return;
			}

			// 不成功则重置状态
			this.resetAuthStore();
		},
		/**
		 * 根据token进行登录
		 * @param backendToken - 返回的token
		 */
		async loginByToken(response) {
			let successFlag = false;
			// 先把token存储到缓存中(后面接口的请求头需要token)
			// const { token, refreshToken } = backendToken;
			// localStg.set('token', token);
			// localStg.set('refreshToken', refreshToken);

			// // 获取用户信息
			// const { data } = await fetchUserInfo();
			if (response) {
				// 成功后把用户信息存储到缓存中
				response.realname = response.realname
				response.token = response.token
				response.baseAdmin = (baseAdmin == response.schoolid?null:response.schoolid)
				localStg.set('userInfo', response);
				localStg.set('token', response.token);
				let token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcmVhSWRzIjoiMiwzLDUiLCJSZWFsTmFtZSI6IuadjuWbmyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJsaXNpIiwianRpIjoiMTc4MDc5NTQ4NjAxMDIxNjQ0OCIsImlhdCI6IjE3MTUxNTc1MzciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDI0LzUvOCA5OjM4OjU3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJuYmYiOjE3MTUxMjg3MzcsImV4cCI6MTcxNTEzMjMzNywiaXNzIjoiTWVuZ29vIiwiYXVkIjoiTWVuZ29vIn0.8Rrej3MuAIMdsq_hmQ7tDknbtw86702fz5FztMJ-uRQ'
				localStg.set('token1', token1);
				// 更新状态
				this.userInfo = response;
				this.token = response.token;
				successFlag = true;
			}

			return successFlag;
		},
		/**
		 * 登录
		 * @param userName - 用户名
		 * @param password - 密码
		 */
		async login(userName: string, password: string, code: string) {
			this.loginLoading = true;
			return await fetchLogin(userName, password, code);
			// console.log('123333333333',data)

			this.loginLoading = false;
		},
		/**
		 * 更换用户权限(切换账号)
		 * @param userRole
		 */
		async updateUserRole(userRole: Auth.RoleType) {
			const { resetRouteStore, initAuthRoute } = useRouteStore();

			const accounts: Record<Auth.RoleType, { userName: string; password: string }> = {
				super: {
					userName: 'Super',
					password: 'super123'
				},
				admin: {
					userName: 'Admin',
					password: 'admin123'
				},
				user: {
					userName: 'User01',
					password: 'user01123'
				}
			};
			const { userName, password } = accounts[userRole];
			const { data } = await fetchLogin(userName, password);
			if (data) {
				await this.loginByToken(data);
				resetRouteStore();
				initAuthRoute();
			}
		}
	}
});
