import { mockRequest } from '../request';
const baseURL = import.meta.env.VITE_BASE_API
//学校下拉框列表
export function schoolCategory(data:{}) {
	return mockRequest.post('/mengoo-weavest/user/school/category', data)
}

//分类树形列表 -- 系统分类
export function diseaseCateTree(data) {
  return mockRequest.post('/mengoo-weavest/disease-cate/get-tree',data);
}
//分类树形列表 -- 课程分类
export function courseCateTree(data) {
  return mockRequest.post('/mengoo-weavest/course-cate/get-tree',data);
}

//获取科室下拉集合
export function DictGetDepartSelec() {
  return mockRequest.get('/api/Dict/GetDepartSelect');
}

//下载文件
export function DownLoadFile(){
	return baseURL + '/api/EspSoundLibrary/DownLoadFile'
}


