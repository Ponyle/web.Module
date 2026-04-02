import { mockRequest } from '../request';
const baseURL = import.meta.env.VITE_BASE_API
// ---用户管理
// 新增用户
export function postCrmUserCreateCrmUserInfo(data: Object) {
    return mockRequest.post<boolean>('/api/User/CreateSysUserInfo', data);
}
export function fetchSysUserItems(data: Object) {
    return mockRequest.post<boolean>('/api/SysUser/Items', data);
}
export function postCrmUserPageList(data: Object) {
    return mockRequest.post<boolean>('/api/User/GetSysUserPageList', data);
}
export function postCrmUserSaveCrmUserInfo(data: Object) {
    return mockRequest.post<boolean>('/api/User/SaveSysUserInfo', data);
}
export function postCrmUserDelCrmUserInfo(id: Object) {
    return mockRequest.post<boolean>('/api/User/DelSysUserInfo', {id});
}
// 修改密码
export function postCrmUserResetPassByUser(data: Object) {
    return mockRequest.post<boolean>('/api/User/ResetPassByUser', data);
}
// 判断是否首次登录

export function postCrmUserJudgeUserFirstLogin(data: Object) {
    return mockRequest.post<boolean>('/api/User/JudgeUserFirstLogin', data);
}
// 获取部门树
export function getCrmDepartmentGetDepartmentTree(data: Object) {
    return mockRequest.get<boolean>(`/api/EspDepartment/GetDepartmentTree`, data);
}
// 获取下拉一级地区信息
export function GetSysRegionSelect(data: Object) {
    return mockRequest.get<boolean>(`/api/Dict/GetSysRegionSelect`, data);
}


// 获取下拉角色信息
export function getCrmRoleSelect(data: Object) {
    return mockRequest.get<boolean>('/api/Dict/GetRoleSelect', data);
}

//保存菜单信息
export function SaveCrmPermissionInfo(data: Object) {
    return mockRequest.post<boolean>('/api/Permission/SaveSysPermissionInfo', data);
}
//新增菜单信息
export function CreateCrmPermissionInfo(data: Object) {
    return mockRequest.post<boolean>('/api/Permission/CreateSysPermissionInfo', data);
}
//获取菜单信息
export function GetCrmPermissById(data: Object) {
    return mockRequest.get<boolean>('/api/Permission/GetSysPermissById', data);
}
//删除菜单信息
export function DelCrmPermission(data: Object) {
    return mockRequest.post<boolean>('/api/Permission/DelSysPermission', data);
}


export function GetPermisTreeTable(data: Object) {
    return mockRequest.post<boolean>('/api/Permission/GetPermisTreeTable', data);
}

//菜单下拉框
export function GetPermissionTree(data: Object) {
    return mockRequest.get<boolean>('/api/Permission/GetPermissionTree', data);
}
//获取角色详情

export function GetCrmRoleByID(data: Object) {
    return mockRequest.get<boolean>('/api/Role/GetSysRoleByID', data);
}
// ---区域管理
//新增区域信息
export function postCrmAreaCreateCrmAreaInfo(data: Object) {
    return mockRequest.post<boolean>('/api/Region/CreateSysAreaInfo', data);
}
// 编辑区域信息
export function postCrmAreaSaveCrmAreaInfo(data: Object) {
    return mockRequest.post<boolean>('/api/Region/SaveSysAreaInfo', data);
}
// 获取区域信息列表
export function postCrmAreaGetCrmAreaPageList(data: Object) {
    return mockRequest.post<boolean>('/api/Region/GetSysAreaPageList', data);
}
// 删除区域信息
export function postCrmAreaDelCrmAreaInfo(id) {
    return mockRequest.post<boolean>('/api/Region/DelSysAreaInfo', { id });
}


// 获取下拉人员信息
export function GetSalesUserSelect(data) {
    return mockRequest.post<boolean>('/api/Region/GetSalesUserSelect',data);
}


// 获取下拉人员信息
export function getCrmAreaGetAreaUserRelatedSelect(data) {
    return mockRequest.get<boolean>(`/api/CrmArea/GetAreaUserRelatedSelect`,data);
}
// 获取下拉全称信息

export function getCrmAreaGetUserInfoSelect(data) {
    return mockRequest.get<boolean>(`/api/CrmArea/GetUserInfoSelect`,data);
}

// ---产品管理
//新增产品信息
export function postCrmProductCreateCrmProductInfo(data: Object) {
    return mockRequest.post<boolean>('/api/CrmProduct/CreateCrmProductInfo', data);
}
// 编辑产品信息
export function postCrmProductSaveCrmProductInfo(data: Object) {
    return mockRequest.post<boolean>('/api/CrmProduct/SaveCrmProductInfo', data);
}
// 获取产品信息列表
export function postCrmProductGetCrmProductPageList(data: Object) {
    return mockRequest.post<boolean>('/api/CrmProduct/GetCrmProductPageList', data);
}
// 删除产品信息
export function postCrmProductDelCrmProductInfo(id) {
    return mockRequest.post<boolean>('/api/CrmProduct/DelCrmProductInfo', { id });
}

// 获取下拉单位信息
export function getCrmAreaSelectGetCrmSchoolSelect(data: Object) {
    return mockRequest.get<boolean>(`/api/Dict/GetSchoolSelect`, data);
}

//获取班级信息
export function getDictGetClassSelect(Keyword: any) {
	return mockRequest.get<boolean>(`/api/Dict/GetClassSelect`, Keyword);
}

// 获取下拉专业信息
export function getCrmProductGetCrmMajorSelect(Keyword: String) {
    return mockRequest.get<boolean>(`/api/CrmProduct/GetCrmMajorSelect?Keyword=${Keyword}`);
}

export function getDictGetCollegeSelect(Keyword: String) {
    return mockRequest.get<boolean>(`/api/Dict/GetCollegeSelect?Keyword=${Keyword}`);
}

// ---产品分类管理
// 查询产品分类树形 Table
export function postCrmProCategoryGetProCategoryTreeTable(data: Object) {
    return mockRequest.post<boolean>('/api/CrmProCategory/GetProCategoryTreeTable', data);
}
// 新增产品分类信息
export function postCrmProCategoryCreateCrmProCategoryInfo(data: Object) {
    return mockRequest.post<boolean>('/api/CrmProCategory/CreateCrmProCategoryInfo', data);
}
// 编辑产品分类信息
export function postCrmProCategorySaveCrmProCategoryInfo(data: Object) {
    return mockRequest.post<boolean>('/api/CrmProCategory/SaveCrmProCategoryInfo', data);
}
// 删除产品分类信息
export function postCrmProCategoryDelCrmProCategoryInfo(id) {
    return mockRequest.post<boolean>('/api/CrmProCategory/DelCrmProCategoryInfo', { id });
}
// 获取产品分类树
export function getCrmProCategoryGetProCategoryTree(data: Object) {
    return mockRequest.get<boolean>(`/api/CrmProCategory/GetProCategoryTree`, data);
}

//新增角色信息
export function CreateCrmRoleInfo(data: Object) {
    return mockRequest.post<boolean>('/api/Role/CreateSysRoleInfo', data);
}

//编辑角色信息
export function SaveCrmRoleInfo(data: Object) {
    return mockRequest.post<boolean>('/api/Role/SaveSysRoleInfo', data);
}

//角色列表
export function GetCrmRolePageList(data: Object) {
    return mockRequest.post<boolean>('/api/EspRole/GetEspRolePageList', data);
}

//删除角色
export function DelCrmRoleInfo(data: Object) {
    return mockRequest.post<boolean>('/api/Role/DelSysRoleInfo', data);
}


//保存菜单权限分配
export function SaveAssign(data: Object) {
    return mockRequest.post<boolean>('/api/Permission/SaveAssign', data);
}


//菜单下拉框
export function GetPermissionIdByRoleId(data: Object) {
    return mockRequest.get<boolean>('/api/Permission/GetPermissionIdByRoleId', data);
}


export function UploadFiles() {
    return baseURL + '/api/Tools/UploadFiles';
}

export function UpLoadCompressFile() {
    return baseURL + '/api/Tools/UpLoadCompressFile';
}
//获取验证码
export function SlideImage(data: Object) {
    return mockRequest.get<boolean>('/api/Verification/SlideImage', data);
}

//验证验证码
export function Validate(data: Object) {
    return mockRequest.post<boolean>('/api/Verification/Validate', data);
}



//学校管理
//获取学校信息列表
export function SchoolGetSysSchoolPageList(data: Object) {
	return mockRequest.post<boolean>('/api/School/GetSysSchoolPageList', data);
}

//新增学校信息
export function CreateSysSchoolInfo(data: Object) {
	return mockRequest.post<boolean>('/api/School/CreateSysSchoolInfo', data);
}

//编辑学校信息
export function SaveSysSchoolInfo(data: Object) {
	return mockRequest.post<boolean>('/api/School/SaveSysSchoolInfo', data);
}

//删除学校信息
export function DelSysSchoolInfo(data: Object) {
	return mockRequest.post<boolean>('/api/School/DelSysSchoolInfo', data);
}

//获取学校详情
export function GetSchoolByID(data: Object) {
	return mockRequest.get<boolean>('/api/School/GetSchoolByID', data);
}

//班级管理
//获取班级信息列表
export function GetClassPageList(data: Object) {
	return mockRequest.post<boolean>('/api/Class/GetClassPageList', data);
}
//新增班级信息
export function CreateClassInfo(data: Object) {
	return mockRequest.post<boolean>('/api/Class/CreateClassInfo', data);
}

//编辑班级信息
export function SaveClassInfo(data: Object) {
	return mockRequest.post<boolean>('/api/Class/SaveClassInfo', data);
}

//删除班级信息
export function DelClassInfo(data: Object) {
	return mockRequest.post<boolean>('/api/Class/DelClassInfo', data);
}



//切换当前用户语言
export function SwitchLanguages(data: Object) {
	return mockRequest.post<boolean>('/api/User/SwitchLanguages', data);
}


// ---语音管理
// 获取语音合成模型列表
export function GetSpeechSynthPageList(data: Object) {
    return mockRequest.post<boolean>('/api/SpeechSynth/GetSpeechSynthPageList', data);
}


//语言列表
export function GetVoiceOverPageList(data: Object) {
    return mockRequest.post<boolean>('/api/SpeechSynth/GetVoiceOverPageList', data);
}
// 获取语音合成模型
export function GetSpeechSynthByID(data: Object) {
    return mockRequest.get<boolean>('/api/SpeechSynth/GetSpeechSynthByID', data);
}

//语音合成模型列表
export function GetSpeechSynthList(data: Object) {
    return mockRequest.post<boolean>('/api/SpeechSynth/GetSpeechSynthList', data);
}


// 获取语音主题集合
export function GetSpeechSceneSelect(data: Object) {
    return mockRequest.get<boolean>('/api/Dict/GetSpeechSceneSelect', data);
}

// 获取语音性别集合
export function GetSpeechSexSelect(data: Object) {
    return mockRequest.get<boolean>('/api/Dict/GetSpeechSexSelect', data);
}

//删除标准问题
export function DelVoiceOverInfo(data: Object) {
    return mockRequest.post<boolean>('/api/SpeechSynth/DelVoiceOverInfo', data);
}

export function UploadVoiceCloneAudio(data: Object) {
    return mockRequest.post<boolean>('/api/SpeechSynth/UploadVoiceCloneAudio', data);
}


//保存配音信息
export function SaveSpeechSynthInfo(data: Object) {
    return mockRequest.post<boolean>('/api/SpeechSynth/SaveSpeechSynthInfo', data);
}

export function SpeechPlayDownload(data: Object) {
    return baseURL + '/api/SpeechSynth/SpeechPlayDownload';
}

//保存配音信息
export function GetSystemOperatePageList(data: Object) {
    return mockRequest.post<boolean>('/api/OperateRecord/GetSystemOperatePageList', data);
}

//学生导入
// export function SchoolUserStudentImport(data: Object) {
//     return mockRequest.post<boolean>('/api/User/StudentImport', data);
// }
export function SchoolUserStudentImport(){
	return baseURL + '/api/User/StudentImport'
}


//学生导入
// export function SchoolUserTeacherImport(data: Object) {
//     return mockRequest.post<boolean>('/api/User/TeacherImport', data);
// }

export function SchoolUserTeacherImport(){
	return baseURL + '/api/User/TeacherImport'
}


//获取Minimax列表
export function GetMiniMaxPageList(data: Object) {
    return mockRequest.post<boolean>('/api/SpeechSynth/GetMiniMaxPageList', data);
}

// 播放下载
export function PlayMiniMaxSound(data: any) {
	return mockRequest.post<boolean>('/api/SpeechSynth/PlayMiniMaxSound', data);
}
