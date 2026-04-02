/** 获取登录页面模块的动态路由的正则 */
export function getLoginModuleRegExp() {
  const modules: UnionKey.LoginModule[] = ['pwd-login', 'ewm-login', 'code-login', 'register', 'reset-pwd', 'bind-wechat'];
  return modules.join('|');
}
