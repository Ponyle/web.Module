import { defineStore } from 'pinia';
import { ROOT_ROUTE, constantRoutes, router, routes as staticRoutes } from '@/router';
import { fetchUserRoutes } from '@/service';
import {
	localStg,
	filterAuthRoutesByUserPermission,
	getCacheRoutes,
	getConstantRouteNames,
	transformAuthRouteToVueRoutes,
	transformAuthRouteToVueRoute,
	transformAuthRouteToMenu,
	transformAuthRouteToSearchMenus,
	transformRouteNameToRoutePath,
	transformRoutePathToRouteName,
	sortRoutes,
	RouterConvert
} from '@/utils';
import { useAuthStore } from '../auth';
import { useTabStore } from '../tab';
import { t } from '@/locales';
let childrenRouter = []
let childrenBtn = [];
interface RouteState {
	/**
	 * 权限路由模式:
	 * - static - 前端声明的静态
	 * - dynamic - 后端返回的动态
	 */
	authRouteMode: ImportMetaEnv['VITE_AUTH_ROUTE_MODE'];
	/** 是否初始化了权限路由 */
	isInitAuthRoute: boolean;
	/** 路由首页name(前端静态路由时生效，后端动态路由该值会被后端返回的值覆盖) */
	routeHomeName: AuthRoute.AllRouteKey;
	/** 菜单 */
	menus: App.GlobalMenuOption[];
	/** 搜索的菜单 */
	searchMenus: AuthRoute.Route[];
	/** 缓存的路由名称 */
	cacheRoutes: string[];
}

export const useRouteStore = defineStore('route-store', {
	state: (): RouteState => ({
		authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
		isInitAuthRoute: false,
		routeHomeName: transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH),
		menus: [],
		searchMenus: [],
		cacheRoutes: []
	}),
	actions: {
		/** 重置路由的store */
		resetRouteStore() {
			this.resetRoutes();
			this.$reset();
		},
		/** 重置路由数据，保留固定路由 */
		resetRoutes() {
			const routes = router.getRoutes();
			routes.forEach(route => {
				const name = (route.name || 'root') as AuthRoute.AllRouteKey;
				if (!this.isConstantRoute(name)) {
					router.removeRoute(name);
				}
			});
		},
		/**
		 * 是否是固定路由
		 * @param name 路由名称
		 */
		isConstantRoute(name: AuthRoute.AllRouteKey) {
			const constantRouteNames = getConstantRouteNames(constantRoutes);
			return constantRouteNames.includes(name);
		},
		/**
		 * 是否是有效的固定路由
		 * @param name 路由名称
		 */
		isValidConstantRoute(name: AuthRoute.AllRouteKey) {
			const NOT_FOUND_PAGE_NAME: AuthRoute.NotFoundRouteKey = 'not-found';
			const constantRouteNames = getConstantRouteNames(constantRoutes);
			return constantRouteNames.includes(name) && name !== NOT_FOUND_PAGE_NAME;
		},
		/**
		 * 处理权限路由
		 * @param routes - 权限路由
		 */
		handleAuthRoute(routes: AuthRoute.Route[]) {
			(this.menus as App.GlobalMenuOption[]) = transformAuthRouteToMenu(routes);
			this.searchMenus = transformAuthRouteToSearchMenus(routes);
			console.log('routes',routes)
			const vueRoutes = transformAuthRouteToVueRoutes(routes);

			vueRoutes.forEach(route => {
				router.addRoute(route);
			});

			this.cacheRoutes = getCacheRoutes(vueRoutes);
		},
		/** 动态路由模式下：更新根路由的重定向 */
		handleUpdateRootRedirect(routeKey: AuthRoute.AllRouteKey) {
			if (routeKey === 'root' || routeKey === 'not-found') {
				throw new Error('routeKey的值不能为root或者not-found');
			}
			const rootRoute: AuthRoute.Route = { ...ROOT_ROUTE, redirect: transformRouteNameToRoutePath(routeKey) };
			const rootRouteName: AuthRoute.AllRouteKey = 'root';
			router.removeRoute(rootRouteName);
			const rootVueRoute = transformAuthRouteToVueRoute(rootRoute)[0];
			router.addRoute(rootVueRoute);
		},
		appendChild(routerList) {
			routerList.forEach(item => {
				let Item = {
					name: item.path,
					path: '/' + item.path.replace(/_/g, '/'),
					component: item.path.indexOf('_') == -1 ? 'basic' : 'self',
					parentId: item.pid,
					id: item.id,
					meta: {
						title: item.name,
						requiresAuth: item.meta.requireAuth,
						keepAlive: item.meta.keepAlive,
						icon: item.iconCls ? item.iconCls : 'ep:user-filled',
						hide: item.isHide,
						order: item.order,
						type: item.isButton,

					}
				}
				if (item.singleLayout) {
					Item.meta.singleLayout = 'basic'
					Item.component = 'self'
				}
				childrenRouter.push(Item)
				if (item.children && item.children.length > 0) {
					return this.appendChild(item.children)
				}
			})
		},
		initRouter(routerList) {
			console.log(routerList,'routerList')
			let routerLists = routerList || []
			routerLists.map(item => {
				if (item.children) {
					const hasChildren = item.children.find(Item => Item.isButton == false && Item.isHide == false)

					if (!hasChildren) {
						item.singleLayout = 'basic'
					}
				} else {
					item.singleLayout = 'basic'
				}
			})
			this.appendChild(routerLists)
			let List = RouterConvert(childrenRouter)
			console.log('List', List)
			List.unshift({
				name: 'about',
				path: '/about',
				id: 'd68ddde2-cd7c-45ad-a129-94422f6d2d28',
				component: 'self',
				parentId: '00000000-0000-0000-0000-000000000001',
				meta: {
					title: '工作台',
					requiresAuth: true,
					icon: 'ep:home-filled',
					singleLayout: 'basic',
					keepAlive: true,
					hide: false,
					type: 0
				}
			})
			let lang = localStg.get('lang')
			List.forEach((item: any) => {
				if (item.children) {
					let txtName = t('route.' + item.name) || item.name
					item.meta.title = txtName
					item.children.forEach((child: any) => {
						let txtNameChild = t('route.' + child.name) || child.name
						child.meta.title = txtNameChild
					});
				} else {
					let txtName = t('route.' + item.name) || item.name
					item.meta.title = txtName
				}

				// if (lang == 'en') {

				// }
				// else if (lang == 'zh-CN') {

				// }
			})

			// console.log(' localStg.get(lang);', localStg.get('lang'))
			// console.log('list-------', List)
			childrenRouter = []
			return List
		},
		/** 初始化动态路由 */
		async initDynamicRoute() {
			const { resetAuthStore } = useAuthStore();
			const { initHomeTab } = useTabStore();

			const data = await fetchUserRoutes();
			console.log("初始化路由")
			console.log('data-----', data)
			if (data && !data.error) {
				// this.routeHomeName = data.home;
				// this.handleUpdateRootRedirect(data.home);
				let routerData = this.initRouter(data.data.children)

				this.handleAuthRoute(routerData);

				initHomeTab(this.routeHomeName, router);
				this.isInitAuthRoute = true;
				return

			} else {
				this.isInitAuthRoute = true;

			}
		},
		/** 初始化静态路由 */
		async initStaticRoute() {
			const { initHomeTab } = useTabStore();
			const auth = useAuthStore();
			const routes = filterAuthRoutesByUserPermission(staticRoutes, auth.userInfo.roleId);
			//静态路由显示隐藏
			console.log(routes, 'routes')
			this.handleAuthRoute(routes);

			initHomeTab(this.routeHomeName, router);

			this.isInitAuthRoute = true;
		},
		/** 初始化权限路由 */
		async initAuthRoute() {
			if (this.authRouteMode === 'dynamic') {
				await this.initDynamicRoute();
			} else {
				await this.initStaticRoute();
			}
		},

		/** 从缓存路由中去除某个路由 */
		removeCacheRoute(name: AuthRoute.AllRouteKey) {
			const index = this.cacheRoutes.indexOf(name);
			if (index > -1) {
				this.cacheRoutes.splice(index, 1);
			}
		},

		/** 添加某个缓存路由 */
		addCacheRoute(name: AuthRoute.AllRouteKey) {
			const index = this.cacheRoutes.indexOf(name);
			if (index === -1) {
				this.cacheRoutes.push(name);
			}
		}
	}
});
