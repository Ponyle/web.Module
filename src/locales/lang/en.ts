import global from './en/global.ts'
import login from './en/login.ts';
import system from './en/system.ts';
import model from './en/model.ts';
import caseManage from './en/case.ts';
import Initialized from './en/Initialized.ts';
import logManage from './en/logManage.ts';
import report from './en/report.ts';

const locale: any = {
	route: {
		about: "Home",
		login:'Login',
		system: "System Management",
		user_user: "User Management",
		system_school: "School Management",
		system_school_addSchool: "Add",
		user_class: "Class Management",
		system_role: "Roles Management",
		system_menu: "Menu Management",
		system_menu_add: "Menu Management",
		InitializedData_area:"Region Management",
		model_speechSynth:"speechSynth",
		model_speechSynth_addSpeech:"add",
		logManage:"log management",
		requestLog:"request log",
		model:'Model Data',
		model_question:'Problem Base',
		model_sort:'Problem Class',
		model_talkType:'Talk Class',
		case:'Case Management',
		case_case:'Case',
		case_case_add:'Case',
		case_score:'Case Score',
		operation:'Operation Management',
		operation_case:'Case allocation Management',
		InitializedData:'Initial Data Management',
		InitializedData_school:'School/Unit Management',
		operation_trial:'Trial Account Management',
		operation_version:'Version management',
		operation_trial_details:'operating record',
		container_container:'Case container management',
		container_qjcontainer:'Global container management',

		container:"Container",
		download:'Client download',
		Homework:'Operation management',
		Homework_detail:"Homework grade",
		user:'administration',
		report:'Report manage',
		report_school:'School report',
		report_case:'Case report',
		model_talkQuestion:"problem database",
		exam:'exam',
		exam_examine:'exam',
		exam_add:'exam add',
		exam_score:'score',
		model_homonym:'homonym',
		questions:'exam',
		questions_list:'exam list',
		questions_testPaper:'exma testPaper'
	},
	system: {
		title: 'Clinical Thinking Ability Training and Evaluation System',
		companyName: 'Mengoo',
		welcome: "Welcome"
	},
	global,
	page: {
		login,
		system,
		model,
		case: caseManage,

		Initialized,


		logManage,
		report,

	}
};



export default locale;
