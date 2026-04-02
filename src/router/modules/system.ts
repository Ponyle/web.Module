const system: AuthRoute.Route = {
  name: 'system',
  path: '/system',
  component: 'basic',
  children: [
    {
      name: 'user_user',
      path: '/user/user',
      component: 'self',
      meta: {
        title: '用户管理',
        requiresAuth: true, // 是否需要登录
        icon: 'material-symbols:deployed-code-account',
        keepAlive: true, // 启用keepalive
        hide: false // 是否在菜单隐藏
      }
    },
    {
      name: 'system_role',
      path: '/system/role',
      component: 'self',
      meta: {
        title: '角色菜单',
        requiresAuth: true, // 是否需要登录
        icon: 'eos-icons:role-binding-outlined',
        keepAlive: true, // 启用keepalive
        hide: false // 是否在菜单隐藏
      }
    },
    {
      name: 'system_menu',
      path: '/system/menu',
      component: 'self',
      meta: {
        title: '菜单管理',
        requiresAuth: true, // 是否需要登录
        icon: 'mdi:clipboard-list-outline',
        keepAlive: true, // 启用keepalive
        hide: false // 是否在菜单隐藏
      }
    },
    {
      name: 'system_menu_addMenu',
      path: '/system/menu/addMenu',
      component: 'self',
      meta: {
        title: '菜单管理',
        requiresAuth: true, // 是否需要登录
        icon: 'ep:tools',
        newTab: false,
        keepAlive: false, // 启用keepalive
        hide: true // 是否在菜单隐藏
      }
    }
  ],
  meta: {
    title: '系统管理',
    icon: 'tdesign:system-components',
    order: 2,
    hide: false, // 是否在菜单隐藏
    permissions: [] // ['admin', 'manage', 'teacher'],
  }
};

export default system;
