<template>
	<div>
		<div  :style="theme.darkMode ? '--w-e-textarea-bg-color: #333;--w-e-textarea-color: #fff;' : ''" class="EditorBox" >
							<!-- v-show="showToolbar" -->
			<Toolbar
				style="border-bottom: 1px solid #ccc; position: sticky; top: 0; z-index: 100; background-color: white;"
				:editor="editorRef"
				:defaultConfig="toolbarConfig"
				:mode="mode"

			/>
				<!-- :style="showToolbar?'height: 100%':'min-height:160px;'" -->
			<Editor
				v-model:modelValue="valueHtml"
				:defaultConfig="editorConfig"
				:mode="mode"
				@onCreated="handleCreated"
				@onFocus="handleFocus"
				@onBlur="handleBlur"

			/>
		</div>
	</div>

</template>
<script setup lang="tsx">
import { onBeforeUnmount, ref, shallowRef, onMounted, onUpdated,nextTick,watch } from 'vue';
import { toRaw } from '@vue/reactivity'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { upLoadImg  } from '@/service'
import { useThemeStore } from '@/store';
import axios from 'axios'
import { localStg  } from '@/utils';

const emit = defineEmits(['UploadData', 'update:valueHtml'])
const showToolbar = ref(false)
const placeholder = ref('请输入内容')
const value = ref(null)
const theme = useThemeStore();
const props = defineProps(['valueHtml','placeholder','times'])
const times = ref(0)
if (props.placeholder) {
	placeholder.value = props.placeholder
}
if (props.times) {
	times.value = props.times
}
const safeDecode = (str: string) => {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}
const valueHtml = ref(props.valueHtml?safeDecode(props.valueHtml):null)
watch(
  () => props.valueHtml,
  newValue => {
		valueHtml.value = newValue
  }
);
watch(valueHtml, (newValue) => {
  emit('update:valueHtml', newValue)
})
const mode = ref('default')
const handleCreted = ref()
const editorRef = shallowRef()
const toolbarConfig = {
	// excludeKeys:['bulletedList','numberedList','emotion','todo','codeBlock','insertImage',],
	toolbarKeys:[


	'fontSize','fontFamily','lineHeight',
	{
		key:'group-justify',
		title:'对齐方式',
		menuKeys: ['justifyLeft','justifyRight','justifyCenter','justifyJustify','indent','delIndent'],
	},
	'|','numberedList','uploadImage','uploadVideo','insertTable','divider','undo','redo','empty']

	// toolbarKeys:['headerSelect','bold','underline','italic','color','bgColor','fontSize','fontFamily','lineHeight','numberedList','group-justify','uploadImage','insertTable','divider','undo','redo','fullScreen']
}
const editorConfig = {
	placeholder: placeholder.value,
	autoFocus:false,
	MENU_CONF:{
		uploadImage:{
			async customUpload(file, insertFn) {
				let params = new FormData()
				console.log('file',file)
				params.append('file',file,file.name)
				console.log('params',params)
				let config = {
				  headers:{'Content-Type':'multipart/form-data',authorization:'Bearer' + ' '+localStg.get('token')}
				  };
				let res = await axios.post(upLoadImg(),params,config)
				console.log(res,'res')
				if (res.status == 200) {
					if (res.data.status == 200 ) {

						insertFn(res.data.response.filePath);
					}
				}
			}
		},
		uploadVideo:{
			async customUpload(file, insertFn) {
				let params = new FormData()
				params.append('file',file,file.name)
				let config = {
				  headers:{'Content-Type':'multipart/form-data',authorization:'Bearer' + ' '+localStg.get('token')}
				  };
				console.log('params-----------',file)
				let res = await axios.post(upLoadImg(),params,config)
				if (res.status == 200) {
					if (res.data.status == 200 ) {
						insertFn(res.data.response.filePath);
					}
				}
			}
		},
		uploadAttachment:{
			async customUpload(file, insertFn) {
				let params = new FormData()
				params.append('file',file,file.name)
				let config = {
				  headers:{'Content-Type':'multipart/form-data',authorization:'Bearer' + ' '+localStg.get('token')}
				  };
				console.log('params-----------',file)
				let res = await axios.post(upLoadImg(),params,config)
				if (res.status == 200) {
					if (res.data.status == 200 ) {
						insertFn(res.data.response.filePath);
					}
				}
			}
		},
	},
}

const handleCreated = (editor) => {
	editorRef.value = editor // 记录 editor 实例，重要！

}
function handleFocus() {

		if (times.value == 1) {

			times.value = 0

		} else {

			showToolbar.value = true
		}
		emit('UploadData',valueHtml)


}
function handleBlur() {
	if (times.value == 2) {
			showToolbar.value = true
		} else{

			showToolbar.value = false
		}
		console.log(321654)
	emit('UploadData',valueHtml)
}
onMounted(() => {

	if (times.value == 2) {

showToolbar.value = true
}

    })


defineExpose({ valueHtml });
</script>

<style lang="scss" scoped>
	:deep(h1),:deep(h2),:deep(h3),:deep(h4),:deep(h5),:deep(h6){
		font-weight: revert!important;
		font-size: revert!important;
	}
	:deep(.dark) {
	    --w-e-textarea-bg-color: #333;
	    --w-e-textarea-color: #fff;
	}
	.EditorBox{
		border: 1px solid #ccc;
	}
	:deep(.w-e-text-placeholder) {
		color: #c2c2c2;
		font-size: 12px;
		font-style: unset!important;
	}
	:deep(.w-e-scroll){
		>div{
			min-height: 160px;
		}
		min-height: 160px;
		/* max-height: 280px; */
		height: auto!important;
		&::-webkit-scrollbar-thumb {
			background-color: #e1e1e1;
			border-radius: 8px;
		}

		&::-webkit-scrollbar-thumb:hover{
			background-color: #e1e1e1;
			border-radius: 8px;
		}
		&::-webkit-scrollbar{
			width: 8px;
			height: 8px;
		}
		&::-webkit-scrollbar-track-piece {
			background-color: rgba(0, 0, 0, 0);
			border-radius: 0;
		}
	}
	.w-e-full-screen-container{
		background:red;
		z-index: 9999;
		:deep(.w-e-scroll){
			// max-height: unset!important;

			min-height: 160px;
		}
	}
	.w-e-text-container{
		min-height: 160px;
		height: auto!important;
	}
	:deep(button, input, optgroup, select, textarea){
		font-size: 12px;
	}
	:deep(.w-e-full-screen-container .w-e-scroll) {
		max-height: 100%;
        height: 100%!important;
	}
	:deep(.w-e-full-screen-container .w-e-scroll > div) {
		height: 100%!important;
	}
	:deep(.w-e-full-screen-container .w-e-text-container) {
		height: 100%!important;
	}
</style>
