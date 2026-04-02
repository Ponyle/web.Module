import { mockRequest } from '../request';
// 音频检测及训练
export function AudioDetectionTraining(data: Object) {
    return mockRequest.post<boolean>('/api/SpeechSynth/AudioDetectionTraining', data);
}
// 获取定制化录入语句
export function GetCustomizedStatement(data: Object) {
    return mockRequest.post<boolean>('/api/SpeechSynth/GetCustomizedStatement', data);
}
// CosyVoice声音复刻服务
export function CosyVoiceCloneAudio(data: Object) {
    return mockRequest.post<boolean>('/api/SpeechSynth/UploadVoiceCloneAudio', data);
}