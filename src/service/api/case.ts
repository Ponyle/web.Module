import { mockRequest } from '../request';
const baseURL = import.meta.env.VITE_BASE_API
// 获取虚拟人信息列表
export function CourseBasicInfoGetProblemsPage(data: Object) {
    return mockRequest.post<boolean>('/api/CourseBasicInfo/GetProblemsPage', data);
}

// 课程场景列表
export function CourseSceneGetCourseScenePageList(data: Object) {
	return mockRequest.post<boolean>('/api/CourseScene/GetCourseScenePageList', data);
}

// 获取人物资源列表
export function CourseBasicInfoGetResourcePageList(data: Object) {
	return mockRequest.post<boolean>('/api/CourseBasicInfo/GetResourcePageList', data);
}


//新增课程基础信息
export function CourseBasicInfoCreateCourseBasicInfo(data: Object) {
	return mockRequest.post<boolean>('/api/CourseBasicInfo/CreateCourseBasicInfo', data);
}


//获取课程基础信息
export function CourseBasicInfoGetProblemBasicPageList(data: Object) {
	return mockRequest.post<boolean>('/api/CourseBasicInfo/GetProblemBasicPageList', data);
}

//获取课程基础信息详情
export function CourseBasicInfoGetProblemBaseItem(data: Object) {
	return mockRequest.get<boolean>('/api/CourseBasicInfo/GetProblemBaseItem', data);
}

//修改课程基础信息列表
export function CourseBasicInfoSaveProblemBaseInfo(data: Object) {
	return mockRequest.post<boolean>('/api/CourseBasicInfo/SaveProblemBaseInfo', data);
}

//删除课程基础信息
export function CourseBasicInfoDelProblemBaseInfo(data: Object) {
	return mockRequest.post<boolean>('/api/CourseBasicInfo/DelProblemBaseInfo', data);
}

//发布课程基本信息状态
export function CourseBasicInfoUpdateProblemStatus(data: Object) {
	return mockRequest.post<boolean>('/api/CourseBasicInfo/UpdateProblemStatus', data);
}

//推荐课程基本信息状态
export function CourseBasicInfoUpdateProblemRecommend(data: Object) {
	return mockRequest.post<boolean>('/api/CourseBasicInfo/UpdateProblemRecommend', data);
}

//获取人物模型列表
export function CourseBasicInfoGetCharacterModelPage(data: Object) {
	return mockRequest.post<boolean>('/api/CourseBasicInfo/GetCharacterModelPage', data);
}

//引用人物模型信息记录
export function CourseBasicInfoQuoteCharacterModelInfo(data: Object) {
	return mockRequest.post<boolean>('/api/CourseBasicInfo/QuoteCharacterModelInfo', data);
}


//病史采集查询
export function SickGetHistoryTaken(data: Object) {
	return mockRequest.get<boolean>('/api/Sick/GetHistoryTaken', data);
}

//虚拟病人分配问答
export function SickVirPatientAllocatQA(data: Object) {
	return mockRequest.post<boolean>('/api/Sick/VirPatientAllocatQA', data);
}

//选中框内容结构分配
export function SickCheckContentStructure(data: Object) {
	return mockRequest.post<boolean>('/api/Sick/CheckContentStructure', data);
}

//获取考核内容列表
export function EspProblemGetAssessContent(data: Object) {
	return mockRequest.post<boolean>('/api/ProblemBase/GetAssessContent', data);
}

//问诊明细

export function SickGetConsultQuestDetail(data: Object) {
	return mockRequest.post<boolean>('/api/Sick/GetConsultQuestDetail', data);
}

//获取问题分类下拉集合
export function DictGetQuestCategorySelect(data: Object) {
	return mockRequest.get<boolean>('/api/Dict/GetQuestCategorySelect', data);
}

//获取虚拟病人已使用过的症状
export function SickGetPatientUseSymptom(data: Object) {
	return mockRequest.get<boolean>('/api/Sick/GetPatientUseSymptom', data);
}

//获取虚拟病人人文关怀
export function SickGetHumanitiesScores(data: Object) {
	return mockRequest.get<boolean>('/api/Sick/GetHumanitiesScores', data);
}

// 添加虚拟病人人文关怀
export function SickAddHumanisticCare(data: Object) {
	return mockRequest.post<boolean>('/api/Sick/AddHumanisticCare', data);
}

// 编辑虚拟病人人文关怀
export function SickSaveHumanisticCare(data: Object) {
	return mockRequest.post<boolean>('/api/Sick/SaveHumanisticCare', data);
}


// 删除虚拟病人人文关怀
export function SickDelHumanisticCare(data: Object) {
	return mockRequest.post<boolean>('/api/Sick/DelHumanisticCare', data);
}

// 获取体格检查列表
export function GetPhysicalCheckPageList(data: any) {
  return mockRequest.post<boolean>('/api/PhysicalCheck/GetPhysicalCheckPageList', data);
}

// 获取检查分类列表、检查方法列表
export function EspDictitemGetDictListInfo(data: any) {
  return mockRequest.post<boolean>('/api/Dict/GetDictListInfo', data);
}

// 删除体格检查
export function DelPhysicalCheckInfo(data: any) {
  return mockRequest.post<boolean>('/api/PhysicalCheck/DelPhysicalCheckInfo', data);
}

// 新增体格检查
export function CreatePhysicalCheckInfo(data: any) {
  return mockRequest.post<boolean>('/api/PhysicalCheck/CreatePhysicalCheckInfo', data);
}

// 编辑体格检查
export function SavePhysicalCheckInfo(data: any) {
  return mockRequest.post<boolean>('/api/PhysicalCheck/SavePhysicalCheckInfo', data);
}

// 获取体格检查
export function GetPhysicalCheckByID(data: Object) {
	return mockRequest.get<boolean>('/api/PhysicalCheck/GetPhysicalCheckByID', data);
}

// 获取阳性体征信息
export function GetPositiveSignsInfo(data: Object) {
	return mockRequest.post<boolean>('/api/PhysicalCheck/GetPositiveSignsInfo', data);
}

// 保存阳性体征信息
export function SavePositiveSignInfo(data: Object) {
	return mockRequest.post<boolean>('/api/PhysicalCheck/SavePositiveSignInfo', data);
}

// 保存阳性体征信息
export function DelPositiveSigns(data: Object) {
	return mockRequest.post<boolean>('/api/PhysicalCheck/DelPositiveSigns', data);
}


// 保存阳性体征信息
export function GetDictDataTree(data: Object) {
	return mockRequest.get<boolean>('/api/dict/GetDictDataTree', data);
}

//
export function GetPhysicalExamination(data: Object) {
	return mockRequest.post<boolean>('/api/PhysicalCheck/GetPhysicalExamination', data);
}

//批量删除视触叩诊
export function BatchDelOpticPalpate(data: Object) {
	return mockRequest.post<boolean>('/api/PhysicalCheck/BatchDelOpticPalpate', data);
}

//批量删除视触叩诊
export function DelOpticPalpate(data: Object) {
	return mockRequest.post<boolean>('/api/PhysicalCheck/DelOpticPalpate', data);
}
// 分类下拉列表
export function GetBodyInspectCatsList(data: any) {
  return mockRequest.post<boolean>('/api/EspBodyInspectCats/GetBodyInspectCatsList', data);
}

// 体格检查列表
export function GetInspectList(data: any) {
  return mockRequest.post<boolean>('/api/EspDictitem/GetInspectList', data);
}

//添加虚拟视触叩诊
export function SaveSickPhysicalExamine(data: Object) {
	return mockRequest.post<boolean>('/api/PhysicalCheck/SavePhysicalExamine', data);
}

//编辑颈部腹部听诊

export function EditPhysicalExamine(data: Object) {
	return mockRequest.post<boolean>('/api/PhysicalCheck/EditPhysicalExamine', data);
}

//获取影像学树
export function GetImagingScienceTree(data: Object) {
    return mockRequest.get<boolean>('/api/VirtualPatient/GetImagingScienceTree', data);
}

//获取影像学资源列表
export function GetImgResourcePageList(data: Object) {
    return mockRequest.post<boolean>('/api/PhysicalCheck/GetImgResourcePageList', data);
}

//取消关联
export function SickCancelBussiness(data: Object) {
    return mockRequest.post<boolean>('/api/PhysicalCheck/CancelBussiness', data);
}

//获取产品分类树
export function GetBasicDataTree(data: Object) {
    return mockRequest.get<boolean>('/api/BasicData/GetBasicDataTree', data);
}
export function SickSaveLaboratoryCheck(data: Object) {
    return mockRequest.post<boolean>('/api/PhysicalCheck/SaveLaboratoryCheck', data);
}
//获取基础数据树形Table
export function GetProCategoryTreeTable(data: Object) {
    return mockRequest.post<boolean>('/api/PhysicalCheck/GetProCategoryTreeTable', data);
}

// 详情
export function GetElecCardInfo(data: Object) {
    return mockRequest.get<boolean>('/api/PhysicalCheck/GetElecCardInfo', data);
}

// 列表
export function GetElecCardPageList(data: Object) {
    return mockRequest.post<boolean>('/api/PhysicalCheck/GetElecCardPageList', data);
}

export function SickEcgChooseOrCancel(data: Object) {
    return mockRequest.post<boolean>('/api/PhysicalCheck/EcgChooseOrCancel', data);
}

export function SickGetExperimentalCheck(data: Object) {
    return mockRequest.post<boolean>('/api/PhysicalCheck/GetExperimentalCheck', data);
}

//获取检验学树
export function GetLaboratoryScienceTree(data: Object) {
    return mockRequest.get<boolean>('/api/PhysicalCheck/GetLaboratoryScienceTree', data);
}

//获取检验学详情
export function SickGetResourceTestPageAsync(data: Object) {
    return mockRequest.post<boolean>('/api/PhysicalCheck/GetResourceTestPageAsync', data);
}
//获取检验学详情
export function SickGetResourcePageAsync(data: Object) {
    return mockRequest.post<boolean>('/api/PhysicalCheck/GetResourcePageAsync', data);
}

export function SickSaveInspection(data: Object) {
    return mockRequest.post<boolean>('/api/PhysicalCheck/SaveInspection', data);
}

// 虚拟病人管理，编辑检验学报告
export function SickEditInspection(data: Object) {
	return mockRequest.post<boolean>('/api/PhysicalCheck/EditInspection', data);
}

export function SickDelInspection(data: Object) {
    return mockRequest.post<boolean>('/api/PhysicalCheck/DelInspection', data);
}

//获取检验学树
export function SickGetCheckScienceTree(data: Object) {
    return mockRequest.get<boolean>('/api/PhysicalCheck/GetCheckScienceTree', data);
}


export function GetResourcePageAsync(data: Object) {
    return mockRequest.get<boolean>('/api/PhysicalCheck/GetResourcePageAsync', data);
}

//智能回答
export function ChatPatientSmartAnswers(data: Object) {
	return mockRequest.post<boolean>('/api/Sick/PatientSmartAnswers', data);
}


export function SaveInspection(data: Object) {
	return mockRequest.post<boolean>('/api/VirtualPatient/SaveInspection', data);
}

export function BatchInspection(data: Object) {
	return mockRequest.post<boolean>('/api/PhysicalCheck/BatchInspection', data);
}


///////////话题管理/////////////
// 获取考核内容列表
export function TopicGetTopicAssessContent(data: Object) {
	return mockRequest.post<boolean>('/api/Topic/GetTopicAssessContent', data);
}

// 保存话题
export function TopicSaveTopicInfo(data: Object) {
	return mockRequest.post<boolean>('/api/Topic/SaveTopicInfo', data);
}

// 保存考核内容
export function TopicSaveAssessContent(data: Object) {
	return mockRequest.post<boolean>('/api/Topic/SaveAssessContent', data);
}

// 获取话题内容
export function TopicGetTopicContentList(data: Object) {
	return mockRequest.post<boolean>('/api/Topic/GetTopicContentList', data);
}

//获取话题问诊内容
export function TopicGetTopicInterrogats(data: Object) {
	return mockRequest.post<boolean>('/api/Topic/GetTopicInterrogats', data);
}

// 病例智能回答
export function TopicCourseSmartAnswers(data:any) {
	return mockRequest.post<boolean>('/api/Topic/CourseSmartAnswers',data);
}



// 获取病例内容结构
export function TopicGetCourseStructure(data: Object) {
	return mockRequest.post<boolean>('/api/Topic/GetCourseStructure', data);
}

// 删除话题内容
export function TopicDelTopicContent(data: Object) {
	return mockRequest.post<boolean>('/api/Topic/DelTopicContent', data);
}


// 删除话题内容
export function DictGetCategorySelect(data:any) {
	return mockRequest.get<boolean>('/api/Dict/GetCategorySelect',data);
}

// 新增问题信息
export function CaseStudyCreateProblemInfo(data:any) {
	return mockRequest.post<boolean>('/api/CaseStudy/CreateProblemInfo',data);
}


///////////话题管理end/////////////

export function GetAssessContentDetails(data:any) {
	return mockRequest.post<boolean>('/api/MedicalHistory/GetAssessContentDetails',data);
}

export function GetQuestAnswerList(data:any) {
	return mockRequest.post<boolean>('/api/MedicalHistory/GetQuestAnswerList',data);
}

export function SaveQuestAnswerInfo(data:any) {
	return mockRequest.post<boolean>('/api/MedicalHistory/SaveQuestAnswerInfo',data);
}

export function SaveAsignPointInfo(data:any) {
	return mockRequest.post<boolean>('/api/MedicalHistory/SaveAsignPointInfo',data);
}

export function SaveConceptLoveHurts(data:any) {
	return mockRequest.post<boolean>('/api/MedicalHistory/SaveConceptLoveHurts',data);
}

//////人物配音//////

// export function SpeechSynthGetSpeechSynthList(data:any) {
// 	return mockRequest.post<boolean>('/api/SpeechSynth/GetSpeechSynthList');
// }

//播放下载
export function SpeechSynthDownloadVoices(data: Object) {
	// return mockRequest.post<boolean>('/api/SpeechSynth/DownloadVoices',data);
	return baseURL + '/api/SpeechSynth/DownloadVoices';
}


export function GetCourseGradePageList(data:any) {
	return mockRequest.post<boolean>('/api/CaseStudy/GetCourseGradePageList',data);
}

export function DelCourseGrade(data:any) {
	return mockRequest.post<boolean>('/api/CaseStudy/DelCourseGrade',data);
}

export function GetAuthCourseSelect(data:any) {
	return mockRequest.post<boolean>('/api/CaseStudy/GetAuthCourseSelect',data);
}

export function GetStuStudyDetails(data:any) {
	return mockRequest.post<boolean>('/api/CaseStudy/GetStuStudyDetails',data);
}

export function GetBasicAssessData(data:any) {
	return mockRequest.post<boolean>('/api/CaseStudy/GetBasicAssessData',data);
}

export function GetAssessmentDesignDetails(data:any) {
	return mockRequest.post<boolean>('/api/CaseStudy/GetStudentAssessGradeDetails',data);
}

//医患沟通问题管理
//获取分类下拉框
export function GetDpcCatsSelectList(data:any) {
	return mockRequest.post<boolean>('/api/DpsQuest/GetDpcCatsSelectList',data);
}

//保存医患沟通赋分信息
export function SaveDpsAssessScore(data:any) {
	return mockRequest.post<boolean>('/api/MedicalHistory/SaveDpsAssessScore',data);
}

//修改考核推送条数
export function SavePushNumber(data:any) {
	return mockRequest.post<boolean>('/api/MedicalHistory/SavePushNumber',data);
}

export function GetCourseAssessTotal(data:any) {
	return mockRequest.post<boolean>('/api/MedicalHistory/GetCourseAssessTotal',data);
}

export function GetExamCaseSelect(data:any) {
	return mockRequest.post<boolean>('/api/Examina/GetExamCaseSelect',data);
}

export function GetExamClassSelect(data:any) {
	return mockRequest.post<boolean>('/api/Examina/GetExamClassSelect',data);
}

//格式化
export function PatientInfoFormats(data:any) {
	return mockRequest.post<boolean>('/api/CourseBasicInfo/PatientInfoFormats',data);
}

export function GetActionSelect(data: any) {
  return mockRequest.get<boolean>('/api/Action/GetActionSelect', data);
}

export function GetSkinPageList(data:any) {
	return mockRequest.post<boolean>('/api/CourseBasicInfo/GetSkinPageList',data);
}

export function GetCourseMedicalHistoryList(data:any) {
	return mockRequest.post<boolean>('/api/CourseMedicalHistoryDetail/GetCourseMedicalHistoryList',data);
}

export function GetQuestionSelect(data:any) {
	return mockRequest.get<boolean>('/api/CourseMedicalHistoryDetail/GetQuestionSelect',data);
}

export function createCaseHistory(data:any) {
	return mockRequest.post<boolean>('/api/CourseMedicalHistoryDetail/CreateOrSaveCourseMedicalHistoryDetailInfo',data);
}

export function getCaseHistory(data:any) {
	return mockRequest.post<boolean>('/api/CourseMedicalHistoryDetail/GetCourseMedicalHistoryDetailList',data);
}

export function delCaseHistory(data:any) {
	return mockRequest.post<boolean>('/api/CourseMedicalHistoryDetail/DelCourseMedicalHistoryInfo',data);
}

export function SetAssessObjective(data:any) {
	return mockRequest.post<boolean>('/api/Practice/SetAssessObjective',data);
}

export function GetPracticeDetails(data:any) {
	return mockRequest.post<boolean>('/api/Practice/GetInterviewAnalysisInfo',data);
}

export function SavePracticeInfo(data:any) {
	return mockRequest.post<boolean>('/api/Practice/SaveInterviewAnalysisInfo',data);
}

export function GetMindMapInfo(data:any) {
	return mockRequest.post<boolean>('/api/CaseStudy/GetMindMapInfo',data);
}

export function TeacherReview(data:any) {
	return mockRequest.post<boolean>('/api/CaseStudy/TeacherReview',data);
}

export function GetCollectionRecords(data:any) {
	return mockRequest.post<boolean>('/api/CaseStudy/GetCollectionRecords',data);
}

//病史采集分数补偿列表
export function GetScoreCompensatList(data:any) {
	return mockRequest.post<boolean>('/api/TakenAudit/GetScoreCompensatList',data);
}

export function AddCompensation(data:any) {
	return mockRequest.post<boolean>('/api/TakenAudit/AddCompensation',data);
}

export function GetMedicalSetFractions(data:any) {
	return mockRequest.post<boolean>('/api/TakenAudit/GetMedicalSetFractions',data);
}

export function DelCompensation(data:any) {
	return mockRequest.post<boolean>('/api/TakenAudit/DelCompensation',data);
}