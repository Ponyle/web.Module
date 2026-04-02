import global from './zh-cn/global.ts'
import login from './zh-cn/login.ts';
import system from './zh-cn/system.ts';
import model from './zh-cn/model.ts';
import caseManage from './zh-cn/case.ts';
import Initialized from './zh-cn/Initialized.ts';
import logManage from './zh-cn/logManage.ts';
import report from './zh-cn/report.ts';
const locale: any = {
	route:{
		about:"工作台",
		login:'登录',
		system:"系统管理",
		system_user:"用户管理",
		operation_school:"院校管理",
		operation_school_addSchool:"新增",
		user_class:"班级管理",
		system_role:"角色管理",
		system_menu:"菜单管理",
		system_menu_addMenu:'菜单管理',
		InitializedData_area:"区域管理",
		model_speechSynth:"配音管理",
		model_speechSynth_addSpeech:"新增",
		logManage:"日志管理",
		requestLog:"请求日志",
		model:'模型数据',
		model_question:'标准问题库管理',
		model_sort:'标准问题库分类',
		model_talkType:'医患沟通问题库分类',
		case:'病例管理',
		case_case:'病例管理',
		case_case_add:'病例管理',
		case_score:'病例成绩管理',
		case_score_info:'病例成绩详情',
		operation:'运营管理',
		operation_case:'病例分配管理',
		InitializedData:'初始数据管理',
		InitializedData_school:'学校/单位管理',
		operation_trial:'试用账号管理',
		operation_version:'版本管理',
		operation_trial_details:'操作记录',
		container_container:'病例容器管理',
		container:"容器管理",
		container_qjcontainer:'全局容器管理',
		download:'客户端下载',
		Homework:'作业管理',
		Homework_detail:"作业成绩",
		user:'教务管理',
		report:'报表管理',
		report_school:'学校报表',
		report_case:'案例报表',
		model_talkQuestion:"医患沟通问题库",
		exam:'考试管理',
		exam_examine:'考试管理',
		exam_add:'考试管理',
		exam_score:'考试成绩',
		model_homonym:'同音词管理',
		questions:'试题管理',
		questions_list:'试题管理',
		questions_list_add:'新增试题',
		questions_testPaper:'试卷管理',
		questions_testPaper_add:'新增试卷'
	},
	system: {
		title: '临床思维能力训练与评测系统',
		companyName: '上海梦之路数字科技有限公司',
		welcome: "欢迎访问"
	},
	global,
	page: {
		login,
		system,
		model,
		case:caseManage,

		Initialized,

		logManage,
		report,

	}


};


export default locale;
