import { mockRequest } from '../request';
const baseURL = import.meta.env.VITE_BASE_API
import axios from "axios";
// about 页面 近期访问量
export function GetRecentAccessList(data:{}) {
	return mockRequest.post('/api/Home/GetRecentAccessList', data)
}

// about 页面 近期访问量
export function GetDataGlanceInfo(data:{}) {
	return mockRequest.post('/api/Home/GetDataGlanceInfo', data)
}

// about 页面 获取病例点击量
export function GetCaseHitList(data:{}) {
	return mockRequest.post('/api/Home/GetCaseHitList', data)
}

// about 页面 获取活跃学生
export function GetActiveStudent(data:{}) {
	return mockRequest.post('/api/Home/GetActiveStudent', data)
}

// about 页面 获取活跃老师
export function GetActiveTeacher(data:{}) {
	return mockRequest.post('/api/Home/GetActiveTeacher', data)
}

// about 页面 病例详情
export function GetCourseAnalyse(data:{}) {
	return mockRequest.post('/api/Home/GetCourseAnalyse', data)
}

// 获取访问报表
export function GetAccessSchoolReport(data:{}) {
	return mockRequest.post('/api/Home/GetAccessSchoolReport', data)
}

// 获取案例报表
export function GetCourseSchoolReport(data:{}) {
	return mockRequest.post('/api/Home/GetCourseSchoolReport', data)
}

export function GetDeliverCaseList(data:{}) {
	return mockRequest.post('/api/Home/GetDeliverCaseList', data)
}

export function GetCourseSchoolDetail(data:{}) {
	return mockRequest.post('/api/Home/GetCourseSchoolDetail', data)
}


export const getDownload = (str: string, title: string,params:any,token:any) => {
	const src =   baseURL + str
	return axios({
		method: 'post',
		url: src,
		headers: {authorization:'Bearer '+token},
		data:params,
		responseType: 'blob'
		}).then(res => {
			if (!res) return
			const blob = new Blob([res.data], { type: 'application/vnd.ms-excel;charset=utf-8'}) // 构造一个blob对象来处理数据，并设置文件类型
			const href = URL.createObjectURL(blob) //创建新的URL表示指定的blob对象
			const a = document.createElement('a') //创建a标签
			a.style.display = 'none'
			a.href = href // 指定下载链接
			a.download = title //指定下载文件名
			a.click() //触发下载
			URL.revokeObjectURL(a.href) //释放URL对象
			const codemsg = 1
			return codemsg

			// 这里也可以不创建a链接，直接window.open(href)也能下载
	})
	.catch(err => {
			console.log(err)
	})
}
export function ExportDeliverCase(data:{},token){
	// return testRequest.post('/Api/TeacherExperimentResult/ExportItems',data);
	return getDownload('/api/Home/ExportDeliverCase','案例报表',data,token)
}


export function ExportAccessSchoolReport(data:{},token){
	// return testRequest.post('/Api/TeacherExperimentResult/ExportItems',data);
	return getDownload('/api/Home/ExportAccessSchoolReport','访问报表',data,token)
}

export function ExportCourseSchoolReport(data:{},token){
	// return testRequest.post('/Api/TeacherExperimentResult/ExportItems',data);
	return getDownload('/api/Home/ExportCourseSchoolReport','病例报表',data,token)
}
