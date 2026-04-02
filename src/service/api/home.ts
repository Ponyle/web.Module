import { mockRequest } from '../request';

const baseURL = import.meta.env.VITE_BASE_API;

// --- 工作台
// 获取工作台统计数据
export function geHomeGetWorkbenchInfo(data: object) {
  return mockRequest.get<boolean>('/api/Home/GetWorkbenchInfo', data);
}

// 获取销售回款统计数据
export function getHomeGetSalesReceiptsInfo(data: object) {
  return mockRequest.get<boolean>('/api/Home/GetSalesReceiptsInfo', data);
}

// 获取区域销售统计数据
export function getHomeGetRegionsSalesInfo(data: object) {
  return mockRequest.get<boolean>('/api/Home/GetRegionsSalesInfo', data);
}

// 获取项目销售统计数据
export function getHomeGetProjectSalesInfo(data: object) {
  return mockRequest.get<boolean>('/api/Home/GetProjectSalesInfo', data);
}

// --- 聊天接口
// 对话接口 - 流式响应
export interface ChatRequest {
  sessionId?: string;
  question?: string;
  opening?: string;
  fileid?: string;
  lessId?: number;
  file?: {
    fileName: string;
    extenName: string;
    fileSize: number;
    filePath: string;
    fileId: string;
  };
}

export function ChatCompletStreamAsync(data: ChatRequest) {
  return mockRequest.post<boolean>('/api/Chat/ChatCompletStreamAsync', data);
}

// 开始教案
export interface StartLessonPlanRequest {
  professField?: number;
  cultivatStage?: number;
  lessonType?: number;
}

export function StartLessonionPlan(data: StartLessonPlanRequest) {
  return mockRequest.post<boolean>('/api/Chat/StartLessonionPlan', data);
}

// 获取教案名称
export interface GetLessonPlanNameRequest {
  professField?: number;
  cultivatStage?: number;
  lessonType?: number;
  question?: string;
  answer?: string;
  opening?: string;
  lessId?: number;
}

export function GetLessonPlanName(data: GetLessonPlanNameRequest) {
  return mockRequest.post<boolean>('/api/Chat/GetLessonPlanName', data);
}

// 获取历史记录
export function GetLessHistory(data: object) {
  return mockRequest.post<boolean>('/api/Chat/GetLessHistory', data);
}

// 上传文件
export function UploadFileByAI() {
  return `${baseURL}/api/Tools/UploadFileByAI`;
}


//历史记录详情
export function GetChatHistory(data: object) {
  return mockRequest.post<boolean>('/api/Chat/GetChatHistory', data);
}

//删除历史记录详情
export function DelLessInfo(data: object) {
  return mockRequest.post<boolean>('/api/Chat/DelLessInfo', data);
}

export function upLoadImg(){
	return baseURL+'/api/Tools/UploadFiles'
}



//保存用户基础信息
export function SaveLessUserInfo(data: object){
  return mockRequest.post<boolean>('/api/Chat/SaveLessUserInfo', data);
}

//判断用户是否完善信息
export function JudgeUsers(data: object){
  return mockRequest.post<boolean>('/api/Chat/JudgeUsers', data);
}
