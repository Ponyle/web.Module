<template>
  <div class="flex h-screen w-full bg-[#f6f9fc] ">
    <!-- Left Sidebar -->
    <div
		style="border-radius: 0 20px 20px 0;
border: 1px solid var(---line-2, #E5E6EB);
background: #E9F1FA;"
      class="flex flex-col bg-white border-r border-gray-100 transition-all duration-300"
      :class="collapsed ? 'w-16' : 'w-[240px]'"
    >
      <!-- Logo Area -->
      <div class="h-16 flex items-center px-4 border-b border-gray-100">
        <img src="@/assets/images/tlogo.svg" alt="Logo" class="h-8 object-contain cursor-pointer" :class="collapsed ? 'mx-auto' : ''" @click="tohome" />
        <div class="ml-auto cursor-pointer text-gray-400 hover:text-blue-600" @click="toggleCollapse">
          <n-icon size="20">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.3175 3.7688C15.8801 3.27625 15.2859 3 14.6674 3H5.3326C4.71411 3 4.11991 3.27625 3.68255 3.7688C3.24519 4.26135 3 4.92852 3 5.62435V14.3757C3 15.0715 3.24519 15.7386 3.68255 16.2312C4.11991 16.7238 4.71411 17 5.3326 17H14.6674C15.2859 17 15.8801 16.7238 16.3175 16.2312C16.7548 15.7386 17 15.0715 17 14.3757V5.62695C17 4.93112 16.7548 4.26135 16.3175 3.7688ZM7.6674 15.2539H5.3326C5.12717 15.2539 4.92837 15.1627 4.78258 14.9985C4.63679 14.8343 4.55506 14.6128 4.55506 14.3809V5.62695C4.55506 5.39501 4.63679 5.17349 4.78258 5.00931C4.92837 4.84512 5.12717 4.75391 5.3326 4.75391H7.66519V15.2539H7.6674ZM15.4449 14.3783C15.4449 14.6102 15.3632 14.8317 15.2174 14.9959C15.0716 15.1601 14.8728 15.2513 14.6674 15.2513H9.22247V4.7487H14.6674C14.8728 4.7487 15.0716 4.83991 15.2174 5.0041C15.3632 5.16828 15.4449 5.3898 15.4449 5.62174V14.3783Z" fill="#4E5969"/>
</svg>

          </n-icon>
        </div>
      </div>

      <!-- New Chat Button -->
      <div class="p-4">
        <n-button
          block
          type="info"
          ghost
          class="justify-start"
          :class="collapsed ? 'px-0 justify-center' : ''"
          @click="startNewChat"
        >
          <template #icon>
            <n-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></n-icon>
          </template>
          <span v-if="!collapsed">新对话</span>
        </n-button>
      </div>


      <div class="flex-1 overflow-y-auto px-2 mt-4" v-if="!collapsed">
        <div class="px-2 mb-2 text-xs text-gray-400">历史记录</div>
        <n-input placeholder="搜索" size="small" class="mb-4">
            <template #prefix>
                <n-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"/></svg></n-icon>
            </template>
        </n-input>
        <div v-for="history in historyList" :key="history.id"
             class="px-3 py-2 mb-3 rounded-md cursor-pointer text-sm transition-all flex justify-between items-center border border-transparent outline-none"
             :style="selectedHistoryId === (history.groupId || history.id) ? 'border-radius: 6px; border-color: var(---primary-2, #BEDAFF); background: #DFEBFB;' : ''"
             :class="selectedHistoryId === (history.groupId || history.id) ? 'text-blue-700' : 'text-gray-600 hover:bg-gray-100'"
             @click="loadHistoryChat(history)">
            <span class="truncate font-medium">{{ history.data && history.data[0] ? history.data[0].question : history.question }}</span>
            <span v-if="selectedHistoryId === (history.groupId || history.id)" class="text-xs bg-#DCE8F6 px-1.5 py-0.5 rounded">进行中</span>
        </div>
      </div>

      <!-- User Info (Bottom) -->
      <div class="p-4 border-2 border-gray-100">
         <n-dropdown :options="userOptions" @select="handleSelect" trigger="hover" placement="top-start">
             <div class="flex items-center gap-3 cursor-pointer" :class="collapsed ? 'justify-center' : ''">
                    <img class="w-10 h-10 rounded-full border border-gray-200 object-cover"
                                    src="@/assets/images/mengoo/Avatar.svg"
                                    @error="handleImageError" />
                 <div v-if="!collapsed" class="flex flex-col overflow-hidden">
                     <span class="text-sm font-medium text-gray-700 truncate">{{ authStore.userInfo?.realname || '用户' }}</span>
                 </div>
             </div>
         </n-dropdown>
      </div>
    </div>

    <!-- Right Content - Chat and Lesson Plan Area -->
   <div class="flex-1 flex flex-col h-full relative">
        <!-- Main Content Area -->
        <div class="flex-1 overflow-y-auto p-6" ref="scrollRef">

            <!-- Guide / Inquiry View -->
            <div v-if="showGuide" class="flex flex-col items-center justify-center min-h-full">
                <div class="bg-white rounded-2xl shadow-sm p-8 max-w-4xl w-full relative ">
                    <!-- Header with Mascot -->
                    <div class="bg-blue-50/50 -mx-8 -mt-8  mb-8 flex items-start gap-4 border-b border-blue-100/50">
                        <img src="@/assets/images/robot.png" class=" object-contain absolute -top-10"  /> <!-- Placeholder for Hi mascot -->
                        <div>
													                        <img src="@/assets/images/rbg.png" class=" object-contain" /> <!-- Placeholder for Hi mascot -->

                        </div>
                    </div>

                    <!-- Question 1 -->
                    <div class="mb-8">
                        <h3 class="text-blue-900 font-bold mb-4">1.您所属的专业领域是？</h3>
                        <div class="flex flex-wrap gap-3">
                            <n-tag
                                v-for="item in domains"
                                :key="item"
                                checkable
                                :checked="selectedDomain === item"
                                @update:checked="(checked) => selectedDomain = checked ? item : ''"
                                size="large"
																  class="cursor-pointer border !border-#E5E6EB rounded-2 p-4"
                                :class="{'!bg-blue-600 !text-white': selectedDomain === item}"
                            >
                                {{ item }}
                            </n-tag>
                        </div>
                    </div>

                     <!-- Question 2 -->
                     <div class="mb-8">
                        <h3 class="text-blue-900 font-bold mb-4">2.您本次授课面向的学员处于哪个培养阶段？</h3>
                        <div class="flex flex-wrap gap-3">
                            <n-tag
                                v-for="item in stages"
                                :key="item"
                                checkable
                                :checked="selectedStage === item"
                                @update:checked="(checked) => selectedStage = checked ? item : ''"
                                size="large"
																  class="cursor-pointer border !border-#E5E6EB rounded-2 p-4"
                                :class="{'!bg-blue-600 !text-white': selectedStage === item}"
                            >
                                {{ item }}
                            </n-tag>
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div class="mb-8">
                        <h3 class="text-blue-900 font-bold mb-4">3.您要生成的教案类型</h3>
                         <div class="flex flex-wrap gap-3">
                            <n-tag
                                v-for="item in types"
                                :key="item"
                                checkable
                                :checked="selectedType === item"
                                @update:checked="(checked) => selectedType = checked ? item : ''"
                                size="large"
                                class="cursor-pointer border !border-#E5E6EB rounded-2 p-4"
                                :class="{'!bg-blue-600 !text-white': selectedType === item}"
                            >
                                {{ item }}
                            </n-tag>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex justify-center gap-6 mt-8">
                        <n-button quaternary size="large" class="bg-blue-50 text-blue-600 px-8" @click="enterChat(0)">跳过询问直接开始</n-button>
                        <n-button  quaternary  size="large" class="bg-blue-50 text-blue-600 px-8" @click="enterChat(2)">确认继续 <n-icon class="ml-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></n-icon></n-button>
                    </div>
                </div>
            </div>

            <!-- Chat View -->
            <div v-else class="max-w-4xl mx-auto w-full py-4">
                <div v-if="chatMessages.length === 0" class="flex flex-col items-center justify-center mt-20">
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Hello! 我是AI小梦</h3>
                    <p class="text-gray-500 text-sm">我可以帮你搜索、查询、回答，请把你的需求告诉我吧~</p>
                </div>

                <div v-else class="flex flex-col gap-6">
                    <div v-for="(msg, index) in chatMessages" :key="index"
                         class="flex w-full"
                         :class="msg.isUser ? 'justify-end' : 'justify-start'">

                        <!-- AI Avatar -->
                        <div v-if="!msg.isUser" class="mr-3 flex-shrink-0">
                             <!-- <img src="@/assets/images/mengoo/stuAI/aichat.png" class="w-10 h-10 rounded-full bg-blue-100 p-1" /> -->
                        </div>

                        <!-- Message Content -->
                        <div class="flex flex-col max-w-[80%]" :class="msg.isUser ? 'items-end' : 'items-start'">
                             <div class="px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
                                  :class="[
                                    msg.isUser ? 'bg-#DCE8F6 rounded-br-none' : 'bg-white border border-gray-100 shadow-sm rounded-bl-none text-gray-800',
                                    msg.isError ? 'bg-red-50 border-red-200 text-red-600' : ''
                                  ]">
                                  {{ msg.content || '...' }}
                             </div>

                             <!-- AI Actions -->
                             <div v-if="!msg.isUser && !msg.isError && msg.content" class="flex items-center gap-2 mt-2 ml-1" style="opacity: 1;">
                                  <div class="cursor-pointer p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                                       :class="{ 'text-green-600': msg.copied }"
                                       @click="copyMessage(msg.content, index)" title="复制">
                                      <svg-icon :icon="msg.copied ? 'mdi:check' : 'carbon:copy'" class="text-16px" />
                                  </div>
                                  <!-- <div class="cursor-pointer p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                                       :class="{ 'text-blue-500': msg.liked }"
                                       @click="likeMessage(index)" title="点赞">
                                      <svg-icon icon="mdi:thumb-up-outline" class="text-16px" />
                                  </div>
                                   <div class="cursor-pointer p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                                        :class="{ 'text-red-500': msg.disliked }"
                                        @click="dislikeMessage(index)" title="不喜欢">
                                      <svg-icon icon="mdi:thumb-down-outline" class="text-16px" />
                                  </div> -->
                             </div>
                        </div>

                        <!-- User Avatar -->
                        <div v-if="msg.isUser" class="ml-3 flex-shrink-0">
                            <!-- <img :src="authStore.userInfo?.photo || '@/assets/images/mengoo/Avatar.svg'"
                                 class="w-10 h-10 rounded-full border border-gray-200 object-cover"
                                 @error="handleImageError"/> -->
                        </div>
                    </div>

                    <!-- Loading Indicator -->
                    <div v-if="isSending && chatMessages.length > 0 && chatMessages[chatMessages.length-1].isUser" class="flex justify-start">
                         <div class="mr-3 flex-shrink-0">
                             <img src="@/assets/images/mengoo/stuAI/aichat.png" class="w-10 h-10 rounded-full bg-blue-100 p-1" />
                         </div>
                         <div class="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-none px-4 py-3">
                             <div class="flex space-x-1 h-5 items-center">
                                 <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                                 <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                                 <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Input Area (Only in Chat Mode) -->
        <div  class="p-6 backdrop-blur border-t border-gray-100">
            <div class="max-w-4xl mx-auto ">
                     <div class="ai-input-container">
              <n-input
                ref="aiInputRef"
                v-model:value="aiQuestion"
                :autosize="{
                  minRows: 1,
                  maxRows: 5
                }"
                round
                type="textarea"
                placeholder="发消息或者选择技能"
                class="ai-input"
                style="--n-border: none; --n-border-hover: none; --n-border-focus: none"
                @keydown.enter="handleEnterKey"
              />

              <div v-if="fileList.length > 0" class="flex flex-wrap gap-2 px-4 pb-2">
                <n-tag v-for="file in fileList" :key="file.id" closable @close="removeFile(file)">
                  {{ file.name }}
                </n-tag>
              </div>
              <div class="ai-input-actions">
                <div style="display: flex; align-items: center">
                  <n-upload
                    :action="uploadUrl"
                    :headers="{ token }"
                    :show-file-list="false"
                    @finish="handleUploadFinish"
                    @before-upload="beforeUpload"
                    @error="() => message.error('上传失败')"
                    name="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
										style="width:30px;height:30px;margin-right:20px"
                  >
                    <n-button  circle >
                      <template #icon>
                        <svg-icon icon="mdi:paperclip" class="text-20px" />
                      </template>
                    </n-button>
                  </n-upload>
				<n-popselect v-model:value="selectedMode" :options="modeOptions" trigger="click" placement="top-start" >
  <div class="flex items-center gap-1 px-3 py-1.5 ml-1 bg-[#E8F3FF] text-[#165DFF] rounded-full text-xs cursor-pointer hover:bg-[#D0E2FF] transition-colors select-none">
      <span class="font-medium">{{ selectedMode }}</span>
      <n-icon size="10" class="mt-0.5">
<svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
  <path d="M3.59955 0.5C3.98445 -0.166667 4.9467 -0.166666 5.3316 0.5L8.7957 6.5C9.1806 7.16667 8.69948 8 7.92968 8H1.00147C0.231674 8 -0.249451 7.16667 0.135449 6.5L3.59955 0.5Z" fill="#6AA1FF"/>
</svg>      </n-icon>
  </div>
</n-popselect>

                </div>


                <div style="display: flex; align-items: center">

                  <div class="actionButton" style="width: 32px; margin-right: 10px" @click="toggleMic">
                    <svg-icon v-if="!AudioData.micSwitch" icon="carbon:microphone-filled" class="text-16px btn" />
                    <svg-icon v-else icon="carbon:microphone-off-filled" class="text-16px btn" />
                  </div>

                  <n-button
                    :type="sendBtnLoading ? 'error' : aiQuestion.trim() ? 'primary' : 'default'"
                    :disabled="!aiQuestion.trim() && !sendBtnLoading"
                    :style="{
                      backgroundColor: sendBtnLoading ? '#F76560' : aiQuestion.trim() ? '#165DFF' : '#C9CDD4',
                      color: aiQuestion.trim() || sendBtnLoading ? '#fff' : ''
                    }"
                    circle
                    @click="sendBtnLoading ? stopAIResponse() : askAI()"
                  >
                    <template #icon>
                      <svg-icon :icon="sendBtnLoading ? 'mdi:stop' : 'akar-icons:send'" class="text-20px" />
                    </template>
                  </n-button>
                </div>
              </div>
            </div>



            </div>
        </div>
    </div>
        <div v-if="showLessonPlan" class="w-[40%] border-l border-gray-200 bg-white flex flex-col h-full overflow-hidden">
            <!-- Toolbar Header -->
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
                <!-- Left Toolbar Icons -->
                <div class="flex items-center gap-0.5">

                </div>

                <!-- Right Actions -->
                <div class="flex items-center gap-2">
                    <!-- Download Button -->
                    <n-button size="small" type="primary" ghost class="!px-3 !py-1 text-xs">
                        <template #icon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4">
                                <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                            </svg>
                        </template>
                        下载
                    </n-button>
                    <!-- Close Button -->
                    <div class="p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors" @click="closeLessonPlan" title="关闭">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 text-gray-600">
                            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto p-4 bg-white">
                <!-- Lesson Plan Content -->
                <div class="space-y-4">
                    <!-- Title -->
                    <div class="mb-4">
                        <h3 class="font-bold text-gray-900 text-base leading-relaxed">{{ lessonPlanData.title || '教案标题' }}</h3>
                    </div>

                    <!-- Content Sections -->
                    <div class="space-y-4">
                        <div v-for="(section, idx) in lessonPlanData.sections" :key="idx" class="mb-4">
                            <h5 class="font-bold text-gray-900 mb-2 text-sm">{{ section.title }}</h5>
                            <p class="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{{ section.content }}</p>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-if="!lessonPlanData.sections || lessonPlanData.sections.length === 0" class="flex flex-col items-center justify-center py-12 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-16 h-16 mb-3 opacity-30"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/></svg>
                        <p class="text-sm font-medium">教案内容加载中...</p>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onUnmounted,computed } from 'vue';

import { UploadFiles} from '@/service';
import  { UploadFileInfo,useMessage  } from 'naive-ui';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import dayjs from 'dayjs';
import { useClipboard } from '@vueuse/core';
import { guid,localStg  } from '@/utils';
import { useAuthStore } from '@/store';
import { useRouterPush } from '@/composables';

const authStore = useAuthStore();
const message = useMessage();

const collapsed = ref(false);
const activeMenu = ref('new-chat');
const activeHistoryId = ref<number | null>(1);
const showGuide = ref(true);
const inputValue = ref('');
const scrollRef = ref<HTMLElement | null>(null);
const aiQuestion = ref('');
const chatMessages = ref([]);
const sessionId = ref(null);
const token = localStg.get('token');
console.log(token, 'token');
const sendBtnLoading = ref(false);
const questionLoading = ref(false);
const hasReceivedMessage = ref(false); // 用于跟踪是否收到过消息
const toggleCollapse = () => {
    collapsed.value = !collapsed.value;
};
const fileList = ref<UploadFileInfo[]>([]);
const uploadUrl = UploadFiles();
const { routerPush } = useRouterPush();
import { routeName } from '@/router';
const handleUploadFinish = ({ file, event }: { file: UploadFileInfo, event?: ProgressEvent }) => {
    try {
        const res = JSON.parse((event?.target as XMLHttpRequest).response);
        if (res.code === 200) {
            file.url = res.data;
            message.success('上传成功');
        } else {
            message.error('上传失败');
        }
    } catch (e) {
        message.error('上传失败');
    }
    return file;
};

const removeFile = (file: UploadFileInfo) => {
    const index = fileList.value.findIndex(f => f.id === file.id);
    if (index > -1) {
        fileList.value.splice(index, 1);
    }
};

const handleEnterKey = (e: KeyboardEvent) => {
    if (e.shiftKey) return;
    e.preventDefault();
    askAI();
};

// Menu Items
const menuItems = [
    { key: 'gen-plan', label: '教案生成', icon: new URL('@/assets/images/logo.png', import.meta.url).href }, // Placeholder icons
    { key: 'gen-resource', label: '资源生成', icon: new URL('@/assets/images/logo.png', import.meta.url).href },
    { key: 'expand-plan', label: '教案拓展', icon: new URL('@/assets/images/logo.png', import.meta.url).href },
];

// History Logic
const historyList = ref([]);
const selectedHistoryId = ref<string | number | null>(null);
const GroupId = ref(null);
const isSending = ref(false);
const lasetQuestion = ref('');
const AudioData = ref({
  data: null,
  audioSwitch: false,
  micSwitch: false
});
function getTime() {
  return dayjs().format('HH:mm:ss');
}

// Guide Options
const domains = ['临床医学', '基础医学', '护理学', '药学', '公共卫生与预防医学', '中医学', '口腔医学', '医学技术类（检验 / 影像等）'];
const stages = ['高职高专 / 专科生', '本科（含五年制 / "5+3" 一体化）', '学术型硕士 / 博士', '专业型硕士（含规培阶段）', '住院医师规范化培训学员', '进修医师'];
const types = ['PBL教学案例', '临床病例分析试题', 'CBL教学案例', '病史采集SP脚本', 'MDT病例讨论', '授课教案', '翻转课堂', '心电图判读试题', '执业医考试训练试题'];

const selectedDomain = ref('');
const selectedStage = ref('');
const selectedType = ref('');

const iszk = ref(false); // 展开
const isseek = ref(false); // 深度思考
const iszstz = ref(false); // 知识拓展

// Mode Selection
const selectedMode = ref('教案生成');
const modeOptions = [
    { label: '教案生成', value: '教案生成' },
    { label: '资源生成', value: '资源生成' },
    { label: '教案拓展', value: '教案拓展' }
];
function tohome(){
	  routerPush({ name: routeName('login') });

}
const beforeUpload = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    // Check MIME type or file extension
    const isAllowed = (data.file.type && allowedTypes.includes(data.file.type)) ||
                      /\.(pdf|doc|docx)$/i.test(data.file.name);

    if (!isAllowed) {
        message.error('只能上传 PDF 或 Word 文件');
        return false;
    }
    return true;
};
// Typing Effect
function startTypingEffect(message) {
  // Clear existing timer
  if (message.typingTimer) {
    clearInterval(message.typingTimer);
  }

  // Typing speed (ms)
  const typingSpeed = 20;

  // Start typing effect
  message.typingTimer = setInterval(() => {
    if (message.typingIndex < message.fullContent.length) {
      // Add next character
      message.content = message.fullContent.substring(0, message.typingIndex + 1);
      message.typingIndex++;
    } else {
      // Typing finished
      clearInterval(message.typingTimer);
      message.typingTimer = null;

      // Reset send button loading only if question loading is done
      if (!questionLoading.value) {
        sendBtnLoading.value = false;
      }
    }
  }, typingSpeed);
}


// Copy Message
const { copy } = useClipboard();
function copyMessage(content, index) {
  const msg = chatMessages.value[index];
  copy(content)
    .then(() => {
      msg.copied = true;
      message.success('复制成功');
      setTimeout(() => {
        msg.copied = false;
      }, 2000);
    })
    .catch(() => {
      message.error('复制失败，请手动复制');
    });
}

// Like/Dislike
async function likeMessage(index) {
  const msg = chatMessages.value[index];
  if (!msg.id) return;

  if (!msg.liked) {
    msg.liked = true;
    msg.disliked = false;
    try {
      await CommentsThumbsUpOrOff({
        id: msg.id,
        Category: 1,
        isThumbsup: true
      });
    } catch (error) {
      console.error('点赞失败:', error);
    }
  } else {
    msg.liked = false;
    try {
      await CommentsThumbsUpOrOff({
        id: msg.id,
        Category: 1,
        isThumbsup: false
      });
    } catch (error) {
      console.error('取消点赞失败:', error);
    }
  }
}

async function dislikeMessage(index) {
  const msg = chatMessages.value[index];
  if (!msg.id) return;

  if (!msg.disliked) {
    msg.disliked = true;
    msg.liked = false;
    try {
      await CommentsThumbsUpOrOff({
        id: msg.id,
        Category: 2,
        isThumbsup: true
      });
    } catch (error) {
      console.error('点踩失败:', error);
    }
  } else {
    msg.disliked = false;
    try {
      await CommentsThumbsUpOrOff({
        id: msg.id,
        Category: 2,
        isThumbsup: false
      });
    } catch (error) {
      console.error('取消点踩失败:', error);
    }
  }
}




// Knowledge Extension
function toggleZstz() {
  iszstz.value = !iszstz.value;
}

// Chat Logic - Migrated
const CourseId = ref(null);
const CourseDataId = ref(null);
const CatsId = ref(null);

const startNewChat = () => {
    chatMessages.value = [];
    aiQuestion.value = '';
    sessionId.value = null;
    GroupId.value = guid();
    isSending.value = false;
    showGuide.value = true;
    selectedHistoryId.value = null;

    if (window.abortController) {
        window.abortController.abort();
        window.abortController = null;
    }
};

const enterChat = (val) => {
	if(!val){
    showGuide.value = false;

	}else{


    showGuide.value = false;

    // Construct the guide message if options are selected
    if (selectedDomain.value ||  selectedStage.value || selectedType.value) {
        const guideMessage = `老师您好，您这次要生成是${selectedDomain.value}面对${selectedStage.value}的${selectedType.value}，请告诉我你想要什么病例的的内容`;

        chatMessages.value.push({
            content: '',
            fullContent: guideMessage,
            isUser: false,
            time: getTime(),
            typingIndex: 0
        });

        // Start typing effect for the guide message
        nextTick(() => {
            const lastMsg = chatMessages.value[chatMessages.value.length - 1];
            startTypingEffect(lastMsg);
        });
    }	}
};

async function inithistoryList() {
  const params = {
    CourseId: CourseId.value || '',
    CourseDataId: CourseDataId.value || '',
    CatsId: CatsId.value || '',
    UserId: localStg.get('userInfo')?.id || ''
  };

  try {
    const res = await StuGetChatHistorys(params);
    if (res && res.data) {
      if (Array.isArray(res.data)) {
        historyList.value = res.data.reverse();
      } else if (res.data.data && Array.isArray(res.data.data)) {
          historyList.value = res.data.data.reverse();
      }
    } else {
      historyList.value = [];
    }
  } catch (error) {
    console.error('获取历史记录失败:', error);
    historyList.value = [];
  }
}

function loadHistoryChat(historyItem) {
  if (window.abortController) {
    window.abortController.abort();
    window.abortController = null;
  }

  isSending.value = false;
  hasReceivedMessage.value = false;
  chatMessages.value = [];

  selectedHistoryId.value = historyItem.groupId || historyItem.id;

  if (historyItem.groupId) {
    GroupId.value = historyItem.groupId;
  }

  if (historyItem.sessionId) {
    sessionId.value = historyItem.sessionId;
  }

  if (historyItem.data && Array.isArray(historyItem.data)) {
    historyItem.data.forEach(dialog => {
      if (dialog.question) {
        chatMessages.value.push({
          content: dialog.question,
          isUser: true,
          time: dialog.createTime || getTime()
        });
      }
      if (dialog.answer) {
        chatMessages.value.push({
          content: dialog.answer,
          fullContent: dialog.answer,
          isUser: false,
          time: dialog.createTime || getTime()
        });
      }
    });
  } else {
    if (historyItem.question) {
      chatMessages.value.push({
        content: historyItem.question,
        isUser: true,
        time: historyItem.time || getTime()
      });
      if (historyItem.content || historyItem.answer) {
        chatMessages.value.push({
          content: historyItem.content || historyItem.answer,
          fullContent: historyItem.content || historyItem.answer,
          isUser: false,
          time: historyItem.time || getTime()
        });
      }
    }
  }

  showGuide.value = false;

  nextTick(() => {
      if (scrollRef.value) {
          scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
      }
  });
}

onMounted(() => {
    // inithistoryList();
});

// 监听聊天消息变化，自动滚动到底部
watch(
  () => chatMessages.value.length,
  () => {
    nextTick(() => {
      if (scrollRef.value) {
        scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
      }
    });
  }
);

function handleImageError(e: Event) {
	const target = e.target as HTMLImageElement;
	target.src = new URL('@/assets/images/mengoo/Avatar.svg', import.meta.url).href;
}

const userOptions = computed(() => {
	const role = authStore.userInfo?.rolename;
	if (role === 'SysAdmin' || role === 'SchoolAdmin') {
		return [
			// { label: '个人中心', key: 'per' },
			{ label: '后台管理', key: 'back' },
			{ label: '退出登录', key: 'logout' }
		];
	} else {
		return [
			// { label: '个人中心', key: 'per' },
			{ label: '退出登录', key: 'logout' }
		];
	}
});

function handleSelect(key: string) {
	if (key === 'logout') {
		window.$dialog?.info({
			title: '提示',
			content: '您确定要退出登录吗？',
			positiveText: '确定',
			negativeText: '取消',
			onPositiveClick: () => {
				authStore.resetAuthStore();
			}
		});
	} else if (key === 'back') {
		window.open('/about', '_blank');
	}
}



// Lesson Plan Sidebar Logic
const showLessonPlan = ref(false);
const lessonPlanData = ref({
  title: '临床医学教案 - 心血管系统疾病',
  domain: '临床医学',
  stage: '本科（含五年制）',
  type: 'PBL教学案例',
  sections: [
    {
      title: '一、教学基础信息',
      content: '课程名称：心血管系统疾病\n授课对象：临床医学本科生\n学时安排：2学时\n教学地点：多媒体教室'
    },
    {
      title: '二、教学目标',
      content: '1. 掌握心血管系统常见疾病的病因、病理生理机制\n2. 熟悉心血管疾病的临床表现和诊断方法\n3. 了解心血管疾病的治疗原则和预防措施\n4. 培养学生的临床思维能力和团队协作精神'
    },
    {
      title: '三、核心病例',
      content: '患者男性，65岁，主诉：胸痛3小时\n现病史：患者3小时前无明显诱因出现胸骨后压榨性疼痛，伴大汗、恶心...\n既往史：高血压病史10年，糖尿病史5年\n体格检查：血压160/95mmHg，心率98次/分...'
    },
    {
      title: '四、学习重点',
      content: '1. 急性心肌梗死的诊断标准\n2. 心电图的判读要点\n3. 心肌标志物的临床意义\n4. 急性冠脉综合征的鉴别诊断\n5. 溶栓治疗的适应症和禁忌症'
    },
    {
      title: '五、教学活动设计',
      content: '第一阶段（30分钟）：病例呈现与问题提出\n- 展示病例资料\n- 学生分组讨论\n- 提出诊断思路\n\n第二阶段（40分钟）：小组讨论与汇报\n- 各组分析病例\n- 制定诊疗方案\n- 小组代表汇报\n\n第三阶段（20分钟）：教师点评与总结\n- 点评各组方案\n- 讲解关键知识点\n- 总结学习要点'
    }
  ]
});

function openLessonPlan() {
  showLessonPlan.value = true;
}

function closeLessonPlan() {
  showLessonPlan.value = false;
}

// 发送AI问题 - 修改为使用流式响应
async function askAI() {
	    showGuide.value = false;

  if (!aiQuestion.value.trim() || isSending.value) return;

  // 设置发送状态
  isSending.value = true;
  sendBtnLoading.value = true;
  hasReceivedMessage.value = false; // 重置消息接收状态

  // 确保 chatMessages.value 是数组
  if (!Array.isArray(chatMessages.value)) {
    chatMessages.value = [];
  }

  // 保存当前问题用于可能的重新发送
  lasetQuestion.value = aiQuestion.value;

  // 检测是否包含"教案"或"生成"关键词，触发教案侧边栏
  const questionText = aiQuestion.value;
  if ((questionText.includes('教案') || questionText.includes('生成')) && !showLessonPlan.value) {
    setTimeout(() => {
      openLessonPlan();
    }, 1500);
  }

  // 添加用户消息
  chatMessages.value.push({
    content: aiQuestion.value,
    isUser: true,
    time: getTime()
  });


  // 准备请求参数
  const params = {
    inputs: null, // 允许传入 App 定义的各变量值。 inputs 参数包含了多组键值对（Key/Value pairs），
    CourseId: CourseId.value, // 课程id
    CourseDataId: CourseDataId.value, // 课程数据id
    CatsId: CatsId.value, // 章节id
    UserId: localStg.get('userInfo') ? localStg.get('userInfo').id : null, // 用户id
    SessionId: sessionId.value, // 会话Id；如果会话之间需要联系，第一次传空，第二次根据接口的conversation_id传入进去
    Content: aiQuestion.value, // 问题
    GroupId: GroupId.value
  };

  console.log(params, 'params');

  // 清空输入框
  aiQuestion.value = '';

  // 滚动到最新消息
  nextTick(() => {
    if (scrollRef.value) {
      scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
    }
  });

  try {
    // 使用fetchEventSource获取流式响应
    window.abortController = new AbortController();
    window.currentEventSource = await fetchEventSource(StuChatCompletStreamAsync(), {
      method: 'post',
      headers: {
        token,
        'Content-type': 'application/json-patch+json',
        accept: '/'
      },
      body: JSON.stringify(params),
      signal: window.abortController.signal,
      onopen(res) {
        console.log('onopen', res);
        // 检查响应状态
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      },
      onmessage(event) {
        // 标记已收到消息
        hasReceivedMessage.value = true;

        try {
          const obj = JSON.parse(event.data);
          // console.log(obj, 'obj');
          if (obj.conversation_id) {
            console.log(obj.conversation_id, 'obj.conversation_id');
            // 保存会话ID，用于后续请求
            sessionId.value = obj.conversation_id;
          }

          if (!obj.isclose) {
            if (!questionLoading.value) {
              // 如果没有开始问题，添加新的AI回复，但初始内容为空
              chatMessages.value.push({
                content: '',
                fullContent: obj.content, // 存储完整内容
                isUser: false,
                id: obj.id,
                liked: false,
                disliked: false,
                copied: false,
                typingIndex: 0, // 当前打字位置
                typingTimer: null // 打字定时器
              });

              // 开始打字效果
              const lastMsg = chatMessages.value[chatMessages.value.length - 1];
              startTypingEffect(lastMsg);

              questionLoading.value = true;
              isSending.value = false; // 隐藏加载动画
            } else {
              // 获取最后一条消息
              const lastMsg = chatMessages.value[chatMessages.value.length - 1];

              // 更新完整内容
              lastMsg.fullContent = (lastMsg.fullContent || '') + obj.content;

              // 如果正在打字，不需要做其他操作，打字效果会继续
              // 如果打字已完成，需要重新开始打字效果
              if (!lastMsg.typingTimer) {
                lastMsg.typingIndex = lastMsg.content.length; // 从当前显示的内容长度开始
                startTypingEffect(lastMsg);
              }
            }
          } else {
            // 流结束
            questionLoading.value = false;


          }
        } catch (error) {
          console.error('解析响应数据失败:', error);
          window.$message.error('解析响应数据失败，请稍后重试');
          sendBtnLoading.value = false;
          questionLoading.value = false;
          isSending.value = false;
        }
      },
      onerror(error) {
        console.log(error, 'error');
        console.error('EventSource错误:', error);
        console.log(sendBtnLoading.value, 'sendBtnLoading');
        // 防止重复触发错误处理
        if (!sendBtnLoading.value) return;

        // window.$message.error('连接服务器失败，请稍后重试');
        sendBtnLoading.value = false;
        questionLoading.value = false;
        isSending.value = false;

        // 终止当前请求
        if (window.abortController) {
          window.abortController.abort();
          window.abortController = null;
          window.currentEventSource = null; // 清除事件源引用
        }
        // 添加错误消息到聊天界面
        chatMessages.value.push({
          content: error,
          isUser: false,
          isError: true,
          time: getTime()
        });

        // 滚动到最新消息
        nextTick(() => {
          if (scrollRef.value) {
            scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
          }
        });
      },
      onclose() {
        console.log('断开了');
        // 如果连接关闭时还没有收到任何消息，说明可能出现了问题
        if (!hasReceivedMessage.value) {
          // window.$message.error('连接已关闭，请稍后重试');
          sendBtnLoading.value = false;
          questionLoading.value = false;
          isSending.value = false;
          chatMessages.value.push({
            content: `接口请求异常，请稍后重试`,
            isUser: false,
            isError: true,
            time: getTime()
          });

          // 滚动到最新消息
          nextTick(() => {
            if (scrollRef.value) {
              scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
            }
          });
        }
      }
    });
  } catch (error) {
    console.error('请求异常:', error);
    sendBtnLoading.value = false;
    questionLoading.value = false;
    isSending.value = false;

    // 添加更详细的错误处理
    const errorMessage = '请求异常，请稍后重试';

    window.$message.error(errorMessage);

    // 在聊天界面显示错误提示
    chatMessages.value.push({
      content: `抱歉，出现了一些问题：${errorMessage}`,
      isUser: false,
      isError: true,
      time: getTime()
    });

    nextTick(() => {
      if (scrollRef.value) {
        scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
      }
    });
  }
}

// 停止AI响应
function stopAIResponse() {
  // 中断请求
  if (window.abortController) {
    window.abortController.abort();
    window.abortController = null;
  }

  // 停止当前正在进行的打字效果
  if (chatMessages.value.length > 0) {
    const lastMsg = chatMessages.value[chatMessages.value.length - 1];
    if (lastMsg.typingTimer) {
      clearInterval(lastMsg.typingTimer);
      lastMsg.typingTimer = null;

      // 将当前已经接收到的内容设置为最终内容
      lastMsg.content = lastMsg.fullContent || lastMsg.content;
    }
  }

  // 重置状态
  questionLoading.value = false;
  sendBtnLoading.value = false;
  isSending.value = false;

  // 添加一个提示消息
  chatMessages.value.push({
    content: '对话已被用户终止',
    isUser: false,
    isError: true,
    time: getTime()
  });

  // 滚动到最新消息
  nextTick(() => {
    if (scrollRef.value) {
      scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
    }
  });
}












let MicInterval = null;
function toggleMic() {
  if (!AudioData.value.micSwitch) {
    initWebSocket();
    startRecording();
    AudioData.value.micSwitch = true;
    MicInterval = setTimeout(() => {
      if (AudioData.value.micSwitch) {
        AudioData.value.micSwitch = false;
        stopRecording();
      }
    }, 60000);
  } else {
    stopRecording();
    AudioData.value.micSwitch = false;
  }
}
// 语音转文字
let socketV;
let mediaRecorder; // 麦克风权限
let bufferedAudioChunks = [];
let audioChunks = [];
let isWebSocketReady = false;

let audioContext;
let scriptProcessor;
let audioInput;
let audioStream;

function stopRecording(type) {
  if (type == 1) {
    isChangePage.value = true;
  }
  if (scriptProcessor) {
    scriptProcessor.disconnect();
  }
  if (audioInput) {
    audioInput.disconnect();
  }
  if (audioStream) {
    audioStream.getTracks().forEach(track => track.stop());
  }
  if (audioContext) {
    audioContext.close();
  }
}
async function startRecording() {
  try {
    // 获取音频输入设备
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: 16000
    });
    audioInput = audioContext.createMediaStreamSource(audioStream);

    // 设置缓冲区大小为2048的脚本处理器
    scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

    scriptProcessor.onaudioprocess = function (event) {
      const inputData = event.inputBuffer.getChannelData(0);
      const inputData16 = new Int16Array(inputData.length);
      for (let i = 0; i < inputData.length; ++i) {
        inputData16[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7fff; // PCM 16-bit
      }
      if (socketV.readyState === WebSocket.OPEN) {
        console.log('send');
        socketV.send(inputData16.buffer);
      }
    };

    audioInput.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);
  } catch (e) {
    console.log(`录音失败: ${e}`);
  }
}
// currentSlide.content

const isChangePage = ref(false);

function initWebSocket() {
  // socketV = new WebSocket('ws://'+window.location.host+'/ws/voice');
  socketV = new WebSocket('wss://line.doctoru.net/ali/ws/voice');
  // socket = new WebSocket('ws://127.0.0.1:51000/ws/voice');
  socketV.binaryType = 'arraybuffer';
  socketV.onopen = () => {
    isWebSocketReady = true;
    sendBufferedAudio();
  };
  socketV.onmessage = function (event) {
    try {
      if (!isChangePage.value) {
        aiQuestion.value = event.data;
        console.log(aiQuestion.value, 'aiQuestion');
        // console.log(`JSON.stringify:::${event.data}`);
      }
    } catch (e) {
      console.error('解析服务器消息失败:', e);
    }
  };
  socketV.onerror = error => {
    console.error('WebSocket错误:', error);

    isWebSocketReady = false;
  };

  socketV.onclose = () => {
    console.log('WebSocket连接已关闭');

    isWebSocketReady = false;
  };
}
function sendBufferedAudio() {
  console.log('isWebSocketReady', isWebSocketReady);
  if (bufferedAudioChunks.length > 0 && isWebSocketReady) {
    console.log('发送缓冲中的音频数据...');
    const bufferedBlob = new Blob(bufferedAudioChunks, { type: 'audio/webm' });
    bufferedAudioChunks = [];
    sendAudioChunk(bufferedBlob);
  }
}

function sendAudioData() {
  if (audioChunks.length > 0) {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    audioChunks = [];
    sendAudioChunk(audioBlob);
  }
}

function sendAudioChunk(chunk) {
  if (socketV.readyState === WebSocket.OPEN) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(chunk);
    reader.onloadend = () => {
      const buffer = reader.result;
      console.log('buffer---------', buffer);
      socketV.send(buffer);
      // socket.close();
    };
  } else {
    console.warn('WebSocket未处于打开状态，无法发送数据');
  }
}
</script>

<style scoped>
/* Custom Scrollbar for list areas */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 3px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}




.ai-input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #dcdcdc;
}

.ai-input {

  :deep(.n-input__textarea-el) {
    padding: 8px 12px;
    resize: none;
  }
}

.ai-input-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}

.ai-input-tools {
  display: flex;
  gap: 8px;
}

.ai-tool-btn {
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;

  &:hover {
    background-color: #f0f0f0;
    color: #4080ff;
  }
}



.actionButton {
  border: 1px solid #dcdcdc;
  width: 96px;
  height: 32px;
  border-radius: 16px;
  text-align: center;
  line-height: 28px;
  color: #00000099;
  cursor: pointer;
  transition: all 0.2s linear;
	display: flex;
	align-items: center;
	justify-content: center;
  .bIcon {
    color: #0052d9;
  }
  .gIcon {
    color: #39ae00;
  }
  &:hover {
    color: #0052d9;
    border-color: #0052d9;
    background: #0052d91a;
    transition: all 0.2s linear;
    .bIcon {
      color: #0052d9;
    }
    .gIcon {
      color: #0052d9;
    }
  }
}

</style>
