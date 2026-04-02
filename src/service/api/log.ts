import { mockRequest } from '../request';
const baseURL = import.meta.env.VITE_BASE_API


// 日志日期的下拉框列表
export function GetAllLogDates(data: any) {
  return mockRequest.get<boolean>('/api/Logs/GetAllLogDates', data);
}

//日志日期的详情
export function GetLogContentByDate(data: any) {
  return mockRequest.get<boolean>('/api/Logs/GetLogContentByDate', data);
}
