import { getLoginModuleRegExp } from '@/utils';

/** 根路由: / */
export const ROOT_ROUTE: AuthRoute.Route = {
  path: '/',
  name: 'Mengoo',
  component: 'self',
  meta: {
					requiresAuth: true, // 是否需要登录
			title: '医境工坊',

    singleLayout: 'basicMengoo',
    keepAlive: true // 启用keepalive
  }
};

/** 固定的路由 */
export const constantRoutes: AuthRoute.Route[] = [
	ROOT_ROUTE,
	{
		name: 'login',
		path: '/login',
		component: 'self',
		props: route => {
			const moduleType = (route.params.module as UnionKey.LoginModule) || 'pwd-login';
			return {
				module: moduleType
			};
		},
		meta: {
			title: '登录',
			dynamicPath: `/login/:module(${getLoginModuleRegExp()})?`,
			singleLayout: 'blank',
			i18nTitle: 'route.login'
		}
	},
	{
		name: 'constant-page',
		path: '/constant-page',
		component: 'self',
		meta: {
			title: '固定页面',
			singleLayout: 'blank'
		}
	},
	{
		name: '403',
		path: '/403',
		component: 'self',
		meta: {
			title: '无权限',
			singleLayout: 'blank'
		}
	},
	{
		name: '404',
		path: '/404',
		component: 'self',
		meta: {
			title: '未找到',
			singleLayout: 'blank'
		}
	},
	{
		name: '500',
		path: '/500',
		component: 'self',
		meta: {
			title: '服务器错误',
			singleLayout: 'blank'
		}
	},
	// 匹配无效路径的路由
	{
		name: 'not-found',
		path: '/:pathMatch(.*)*',
		component: 'blank',
		meta: {
			title: '未找到',
			singleLayout: 'blank'
		}
	},

];
