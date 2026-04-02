import { mockRequest } from '../request';
const urlPattern = import.meta.env.VITE_BASE_API
import axios from "axios";

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
  return mockRequest.post<boolean>('/getSmsCode', { phone });
}

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
// export function fetchLogin(userName: string, password: string) {
//   return mockRequest.post<ApiAuth.Token>('/mengoo-esp/site/admin-login', {remember:0 ,username:userName, password });
// }

export function fetchLogin(userName: string, pwd: string,code:string) {
  return mockRequest.post('/api/Login/Login', {name:userName, pwd,code });

	// let src = urlPattern+'/api/Login/Login'

	// return axios({
	// 	method: 'post',
	// 	url: src,
	// 	data:{name:userName, pwd,code},
	// 	}).then(res=>{
	// 		return res
	// 	})
}
export function SysArea(data:{}) {
  return mockRequest.post('/AdminApi/Common/Areas',data);
}
export function pk(data:{}) {
	return mockRequest.post('/mengoo-esp/site/pk', data)
}
/** 获取用户信息 */
export function fetchUserInfo() {
  return mockRequest.get<ApiAuth.UserInfo>('/getUserInfo');
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(data) {
  return mockRequest.get<ApiRoute.Route>('/api/Permission/GetNavigationBar',fetchUserRoutes);
}

/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(data) {
  return mockRequest.get<ApiAuth.Token>('/api/Login/RefreshToken', data);
}

// ---钉钉登录
// 获取登录管理
export function fetchGetAuthCode() {
  return mockRequest.get('/DingDing/api/DingLogin/GetAuthCode');
}
// 钉钉登录
export function fetchDingLogin(data:Object) {
  return mockRequest.post('/api/DingLogin/DingTalkLogin', data);
}
// 发送邮箱验证信息
export function postCrmUserSendEmailInspectInfo(data:Object) {
	return mockRequest.post('/api/CrmUser/SendEmailInspectInfo', data);
}
// 效验邮箱验证码并重置密码
export function postCrmUserResetPassVerification(data:Object) {
	return mockRequest.post('/api/CrmUser/ResetPassVerification', data);
}

// 重置验证码
export function SendEmailInspectInfo(data: Object) {
    return mockRequest.post<boolean>('/api/EspUser/SendEmailInspectInfo', data);
}
// 发送邮箱验证信息
export function ValidateEmail(data: Object) {
    return mockRequest.post<boolean>('/api/EspUser/ValidateEmail', data);
}

// 效验邮箱验证码并重置密码
export function ResetPassVerification(data: Object) {
    return mockRequest.post<boolean>('/api/EspUser/ResetPassVerification', data);
}

export function BindWx(data: Object) {
    return mockRequest.post<boolean>('/api/WXAuth/Bind', data);
}

export function RemoveBindWx(data: Object) {
    return mockRequest.post<boolean>('/api/WXAuth/RemoveBind', data);
}

export function WXAuthQRCode(data: Object) {
    return mockRequest.get<boolean>('/api/WXAuth/QRCode', data);
}

export function LoginListen(data: Object) {
    return mockRequest.get<boolean>('/api/WXAuth/LoginListen', data);
}
