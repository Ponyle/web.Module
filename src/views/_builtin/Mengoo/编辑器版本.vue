<template>
  <div class="flex h-screen w-full bg-[#f6f9fc] ">
    <!-- Left Sidebar -->
    <div
		style="border-radius: 0 20px 20px 0;
border: 1px solid var(---line-2, #E5E6EB);
background: #E9F1FA;"
      class="flex flex-col bg-white border-r border-gray-100 transition-all duration-300"
      :class="collapsed ? 'w-16 justify-center' : 'w-[240px]'"
    >
      <!-- Logo Area -->
      <div class="h-16 flex items-center px-1 border-b border-gray-100">
        <img src="@/assets/images/tlogo.svg" alt="Logo" class="h-8 object-contain cursor-pointer" :class="collapsed ? 'mx-auto' : ''" @click="tohome"  v-if="!collapsed"/>
        <div class="ml-auto cursor-pointer text-gray-400 hover:text-blue-600 flex" @click="toggleCollapse">
          <n-icon size="20">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.3175 3.7688C15.8801 3.27625 15.2859 3 14.6674 3H5.3326C4.71411 3 4.11991 3.27625 3.68255 3.7688C3.24519 4.26135 3 4.92852 3 5.62435V14.3757C3 15.0715 3.24519 15.7386 3.68255 16.2312C4.11991 16.7238 4.71411 17 5.3326 17H14.6674C15.2859 17 15.8801 16.7238 16.3175 16.2312C16.7548 15.7386 17 15.0715 17 14.3757V5.62695C17 4.93112 16.7548 4.26135 16.3175 3.7688ZM7.6674 15.2539H5.3326C5.12717 15.2539 4.92837 15.1627 4.78258 14.9985C4.63679 14.8343 4.55506 14.6128 4.55506 14.3809V5.62695C4.55506 5.39501 4.63679 5.17349 4.78258 5.00931C4.92837 4.84512 5.12717 4.75391 5.3326 4.75391H7.66519V15.2539H7.6674ZM15.4449 14.3783C15.4449 14.6102 15.3632 14.8317 15.2174 14.9959C15.0716 15.1601 14.8728 15.2513 14.6674 15.2513H9.22247V4.7487H14.6674C14.8728 4.7487 15.0716 4.83991 15.2174 5.0041C15.3632 5.16828 15.4449 5.3898 15.4449 5.62174V14.3783Z" fill="#4E5969"/>
</svg>

          </n-icon>
					<span v-if="collapsed">展开</span>

        </div>
      </div>

      <!-- New Chat Button -->
      <div class="p-4" v-if="!collapsed">
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
        <div class="px-2 mb-2 text-xs text-gray-400" v-if="historyList?.length>0">历史记录</div>
        <!-- <n-input placeholder="搜索"  class="mb-4">
            <template #prefix>
                <n-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"/></svg></n-icon>
            </template>
        </n-input> -->
        <div v-for="history in historyList" :key="history.id"

             class="px-3 py-2 mb-1 rounded-md cursor-pointer text-sm transition-all flex justify-between items-center border border-transparent outline-none group relative"
             :style="selectedHistoryId === (history.groupId || history.id) ? 'border-radius: 6px; border-color: var(---primary-2, #BEDAFF); background: #DFEBFB;' : ''"
             :class="selectedHistoryId === (history.groupId || history.id) ? 'text-#165DFF' : 'text-gray-600 hover:red'"
             @click="loadHistoryChat(history)">

                <span class="truncate font-medium flex-1" :title="history.name">{{ history.name }}</span>

                <div class="hidden group-hover:block ml-2 flex-shrink-0" @click.stop>
                     <n-dropdown trigger="click" :options="historyOptions" @select="(key) => handleHistoryAction(key, history)">
                        <div class=" hover:bg-gray-200 rounded transition-colors text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"/></svg>
                        </div>
                     </n-dropdown>
                </div>

            <!-- <span v-if="selectedHistoryId === (history.groupId || history.id)" class="!text-#fff bg-#165DFF py-0.5 rounded w14 color-#fff text-center text-12px">进行中</span> -->
        </div>
      </div>

      <!-- User Info (Bottom) -->
      <div class="p-4 border-2 border-gray-100"  v-if="!collapsed">
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
        <div class="flex-1 overflow-y-auto p-6" ref="scrollRef" @scroll="handleScroll">

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
                <!-- Skeleton Loading -->
                <div v-if="isHistoryLoading" class="flex flex-col gap-6 px-4">
                     <div v-for="i in 2" :key="i" class="flex flex-col gap-6">
                         <!-- User Message Skeleton -->
                         <div class="flex justify-end">
                            <n-skeleton height="40px" width="30%" class="!rounded-2xl !rounded-br-none" />
                         </div>
                         <!-- AI Message Skeleton -->
                         <div class="flex justify-start">
                            <n-skeleton height="80px" width="60%" class="!rounded-2xl" />
                         </div>
                    </div>
                </div>

                <div v-else-if="chatMessages.length === 0" class="flex flex-col items-center justify-center mt-20">
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Hello! 我是医境工坊</h3>
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
                        <div class="flex flex-col max-w-[100%]" :class="msg.isUser ? 'items-end' : 'items-start'">
                             <!-- Markdown Card -->


                             <!-- File Attachment -->
                             <div v-if="msg.attachment"
                                  class="mb-2 p-3 bg-white border border-gray-200 rounded-xl max-w-sm flex items-center gap-3 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors group"
                                  @click="handleFilePreview(msg.attachment)"
                                  title="点击预览或下载">
                                 <!-- Icon based on type -->
                                 <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-red-50 text-red-500 flex-shrink-0"
                                      v-if="msg.attachment.extenName === '.pdf'">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg>
                                 </div>
                                 <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-500 flex-shrink-0"
                                      v-else>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
                                 </div>

                                 <div class="flex-1 min-w-0">
                                   <div class="font-medium text-gray-900 truncate text-sm" :title="msg.attachment.fileName">{{ msg.attachment.fileName }}</div>
                                   <div class="text-xs text-gray-500">{{ (parseInt(msg.attachment.fileSize) / 1024).toFixed(2) }}KB</div>
                                 </div>
                             </div>

                             <!-- Regular Message - 只在没有 markdown 或加载完成后显示 -->
                             <div v-if="!msg.hasMarkdown || !msg.isLoading" class="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                                  :class="[
                                    msg.isUser ? 'bg-#DCE8F6 rounded-br-none' : ' text-gray-800',
                                    msg.isError ? 'bg-red-50 border-red-200 text-red-600' : ''
                                  ]">
                                  <template v-if="msg.isError || msg.isUser">
                                    {{ msg.content || '...' }}
                                  </template>
                                  <template v-else>
                                    <MarkdownRenderer :content="msg.content || '' "/>
                                  </template>
                             </div>


                             <!-- AI Actions -->
                             <!-- <div v-if="!msg.isUser && !msg.isError && msg.content" class="flex items-center gap-2 mt-2 ml-1" style="opacity: 1;">
                                  <div class="cursor-pointer p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                                       :class="{ 'text-green-600': msg.copied }"
                                       @click="copyMessage(msg.content, index)" title="复制">
                                      <svg-icon :icon="msg.copied ? 'mdi:check' : 'carbon:copy'" class="text-16px" />
                                  </div>
                             </div> -->
														     <div v-if="msg.hasMarkdown"
                                  class="mb-2 mt-4 p-4 rounded-lg border border-blue-200 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors"
                                  @click="handleCardClick(msg)">
                               <div class="flex items-start gap-3">
                                 <div class="text-blue-500 text-2xl flex-shrink-0">
                                   <span v-if="msg.isLoading" class="inline-block animate-spin">⏳</span>
                                   <span v-else>📄</span>
                                 </div>
                                 <div class="flex-1 min-w-0">
                                   <div class="font-semibold text-blue-900 text-sm">
                                     {{ msg.isLoading ? '教案生成中...' : extractTitleFromMarkdown(msg.fullContent) }}
                                   </div>
                                   <div class="text-xs text-blue-700 mt-1">
                                     {{ msg.isLoading ? '请稍等...' : msg.time }}
                                   </div>
                                 </div>
                                 <div v-if="!msg.isLoading" class="text-blue-400 flex-shrink-0">→</div>
                               </div>
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
                             <!-- <img src="@/assets/images/mengoo/stuAI/aichat.png" class="w-10 h-10 rounded-full bg-blue-100 p-1" /> -->
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

        <!-- Scroll to Bottom Button -->
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-4"
        >
          <div
            v-if="showScrollBottomBtn"
            class="absolute bottom-[150px] left-1/2 -translate-x-1/2 z-50 cursor-pointer shadow-lg bg-white rounded-full w-9 h-9 flex items-center justify-center border border-gray-100 hover:bg-gray-50 text-gray-500 hover:text-blue-600 transition-all"
            @click="smoothScrollToBottom"
          >
             <svg v-if="isSending || questionLoading" class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"/></svg>
          </div>
        </Transition>

        <!-- Input Area (Only in Chat Mode) -->
        <div  class="p-6 backdrop-blur border-t border-gray-100">
            <div class="max-w-4xl mx-auto ">
                     <div class="ai-input-container">
              <div v-if="uploadedFile" class="px-4 pt-2 pb-1">
                  <div class="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg max-w-[200px] relative group shadow-sm">
                    <!-- Icon based on type -->
                    <div class="w-8 h-8 flex items-center justify-center rounded bg-red-50 text-red-500 flex-shrink-0"
                         v-if="uploadedFile.extenName === '.pdf'">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5"><path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg>
                    </div>
                    <div class="w-8 h-8 flex items-center justify-center rounded bg-blue-50 text-blue-500 flex-shrink-0"
                         v-else>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
                    </div>

                    <div class="flex-1 min-w-0">
                      <div class="font-medium text-gray-900 truncate text-xs" :title="uploadedFile.fileName">{{ uploadedFile.fileName }}</div>
                      <div class="text-[10px] text-gray-500">{{ (parseInt(uploadedFile.fileSize) / 1024).toFixed(2) }}KB</div>
                    </div>

                    <div class="absolute -top-1.5 -right-1.5 bg-gray-200 rounded-full p-0.5 cursor-pointer hover:bg-gray-300 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" @click="clearUploadedFile">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-3 h-3 text-gray-600"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                    </div>
                  </div>
              </div>
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
                style="--n-border: none; --n-border-hover: none; --n-border-focus: none;height:60px"
                @keydown.enter="handleEnterKey"
              />

              <!-- Uploaded file preview moved above input -->
              <div class="ai-input-actions">
                <div style="display: flex; align-items: center">
                  <n-upload
                    v-model:file-list="fileList"
                    :action="uploadUrl"
                    :headers="{ token ,										'Authorization': localStg.get('token') ? ('Bearer' + ' ' + localStg.get('token')) : ''
}"
                    :show-file-list="false"
                    @finish="handleUploadFinish"
                    @before-upload="beforeUpload"
                    @error="handleUploadError"
										name="file"
                    :max="1"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    style="width:30px;height:30px;margin-right:20px"
                  >
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <n-button circle>
                          <template #icon>
                            <svg-icon icon="mdi:paperclip" class="text-20px" />
                          </template>
                        </n-button>
                      </template>
                      仅支持word/pdf格式 大小最多不超过10M
                    </n-tooltip>
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
                    :type="sendBtnLoading ? 'error' : (aiQuestion.trim() && !isUploading) ? 'primary' : 'default'"
                    :disabled="(isUploading || (!aiQuestion.trim() && !sendBtnLoading))"
                    :style="{
                      backgroundColor: sendBtnLoading ? '#F76560' : (aiQuestion.trim() && !isUploading) ? '#165DFF' : '#C9CDD4',
                      color: (aiQuestion.trim() && !isUploading) || sendBtnLoading ? '#fff' : ''
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
        <Transition
          name="slide-in-right"
          @enter="onEnter"
          @leave="onLeave"
        >
          <div v-if="showLessonPlan" class="w-[40%] border-l border-gray-200 bg-white flex flex-col h-full overflow-hidden">
            <!-- Toolbar Header -->
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
                <!-- Left Toolbar Icons -->
                <div class="flex items-center gap-0.5">

                </div>

                <!-- Right Actions -->
                <div class="flex items-center gap-2">
                    <!-- Download Button -->
                    <n-button size="small" type="primary" ghost class="!px-3 !py-1 text-xs" @click="exportToWord">
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
                <div class="h-full">
                   <Editor v-model:valueHtml="editorContent" />
                </div>
            </div>
          </div>
        </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onUnmounted, computed, Transition } from 'vue';

import { UploadFileByAI, GetLessHistory, GetChatHistory, type ChatRequest, StartLessonionPlan, type StartLessonPlanRequest, GetLessonPlanName, type GetLessonPlanNameRequest,DelLessInfo } from '@/service';
import { UploadFileInfo, useMessage } from 'naive-ui';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import dayjs from 'dayjs';
import { useClipboard } from '@vueuse/core';
import { guid, localStg } from '@/utils';
import { useAuthStore } from '@/store';
import { useRouterPush } from '@/composables';
import MarkdownRenderer from '@/components/custom/markdown-renderer.vue';
import Editor from '@/components/business/Editor.vue';
import { marked } from 'marked';

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
const token = 'Bearer' + ' ' +localStg.get('token');
console.log(token, 'token');
const sendBtnLoading = ref(false);
const questionLoading = ref(false);
const hasReceivedMessage = ref(false); // 用于跟踪是否收到过消息
const isHistoryLoading = ref(false); // 历史记录加载状态
const isUploading = ref(false); // 上传状态
const showScrollBottomBtn = ref(false); // 是否显示滚动到底部按钮

const toggleCollapse = () => {
    collapsed.value = !collapsed.value;
};
const fileList = ref<UploadFileInfo[]>([]);
const fileid = ref(''); // 上传文件的 ID
const uploadedFile = ref<{
    fileId: string;
    fileName: string;
    extenName: string;
    fileSize: string;
    filePath: string;
} | null>(null);

const clearUploadedFile = () => {
    uploadedFile.value = null;
    fileid.value = '';
    fileList.value = [];
};

const uploadUrl = UploadFileByAI();
const { routerPush } = useRouterPush();
import { routeName } from '@/router';
const handleUploadFinish = ({ file, event }: { file: UploadFileInfo, event?: ProgressEvent }) => {
    isUploading.value = false;
    try {
        const res = JSON.parse((event?.target as XMLHttpRequest).response);
				console.log(res,'res')
        if (res.success && res.status === 200) {
           fileid.value = res.response.fileId;
           uploadedFile.value = res.response;
            message.success('上传成功');
            fileList.value = []; // Clear file list as we use custom UI
        } else {
            message.error('上传失败');
            fileList.value = [];
        }
    } catch (e) {
        message.error('上传失败');
        fileList.value = [];
    }
    return file;
};

const handleUploadError = () => {
    isUploading.value = false;
    message.error('上传失败');
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

const handleFilePreview = (file: any) => {
    if (!file || !file.filePath) return;
    let url = file.filePath;
    if (url.startsWith('/')) {
         const baseURL = import.meta.env.VITE_BASE_API;
         url = baseURL + url;
    }
    window.open(url, '_blank');
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
    isUploading.value = true;
    // 限制文件大小为 10MB
    const maxSize = 10 * 1024 * 1024;
    if (data.file.file?.size && data.file.file.size > maxSize) {
        message.error('文件大小不能超过 10MB');
        return false;
    }

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
  // 如果是 markdown 消息，不显示打字效果
  if (message.hasMarkdown) {
    message.content = '';
    return;
  }

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




// 初始化教案
async function initializeLessonPlan(): Promise<number> {
  try {
    const startParams: StartLessonPlanRequest = {
      professField: selectedDomain.value ? domains.indexOf(selectedDomain.value) : undefined,
      cultivatStage: selectedStage.value ? stages.indexOf(selectedStage.value) : undefined,
      lessonType: selectedType.value ? types.indexOf(selectedType.value) : undefined
    };

    const res = await StartLessonionPlan(startParams);
    console.log('StartLessonionPlan called successfully', startParams);
		console.log(res,'res')
    if (!res.error ) {
      // 假设返回的数据中包含 lessId 或 id
      const lessonId = res.data || 0
      lessId.value = lessonId;
      return lessonId;
    }

    return 0;
  } catch (error) {
    console.error('Failed to call StartLessonionPlan:', error);
    return 0;
  }
}



// 对话结束时调用GetLessonPlanName并刷新历史记录
async function handleConversationEnd(lastAnswer: string) {
  try {
    const lessonParams: GetLessonPlanNameRequest = {
      professField: selectedDomain.value ? domains.indexOf(selectedDomain.value) : undefined,
      cultivatStage: selectedStage.value ? stages.indexOf(selectedStage.value) : undefined,
      lessonType: selectedType.value ? types.indexOf(selectedType.value) : undefined,
      question: lasetQuestion.value,
      answer: lastAnswer,
      opening: '',
      lessId: lessId.value
    };

    if (!selectedHistoryId.value) {
      const result = await GetLessonPlanName(lessonParams);
      console.log('GetLessonPlanName called successfully', result);
    }

    await inithistoryList();

    // 刷新当前对话详情，展示后台返回的数据
    let targetId = selectedHistoryId.value;

    // 如果是新对话（没有选中的历史ID），尝试从列表中查找
    if (!targetId && historyList.value.length > 0) {
        // 尝试匹配 sessionId 或 lessId
        const match = historyList.value.find(h =>
            (sessionId.value && h.sessionId === sessionId.value) ||
            (lessId.value && h.lessId === lessId.value)
        );
        if (match) {
            targetId = match.groupId || match.id;
        } else {
             // 默认取第一个（通常是最新的）
             targetId = historyList.value[0].groupId || historyList.value[0].id;
        }
    }

    if (targetId) {
        selectedHistoryId.value = targetId;
        const res = await GetChatHistory({ id: targetId });
        if (!res.error && res.data && Array.isArray(res.data)) {
            chatMessages.value = []; // 清空当前消息
            processHistoryData(res.data); // 使用后台数据重新渲染

            scrollToBottom();
        }
    }

  } catch (error) {
    console.error('Failed to call GetLessonPlanName or refresh history:', error);
  }
}

// Chat Logic - Migrated
const CourseId = ref(null);
const CourseDataId = ref(null);
const CatsId = ref(null);
const lessId = ref(0);

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

const enterChat = async (val) => {
  if (!val) {
    showGuide.value = false;
    // Call StartLessonionPlan API and get lesson ID
    await initializeLessonPlan();
  } else {
    showGuide.value = false;

    // Call StartLessonionPlan API and get lesson ID
    await initializeLessonPlan();

    // Construct the guide message if options are selected
    if (selectedDomain.value || selectedStage.value || selectedType.value) {
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
    }
  }
};

async function inithistoryList() {
  const params = {
    // CourseId: CourseId.value || '',
    // CourseDataId: CourseDataId.value || '',
    // CatsId: CatsId.value || '',
    // UserId: localStg.get('userInfo')?.id || ''
  };

  try {
    const res = await GetLessHistory(params);
		console.log(res,'res')
    if (!res.error) {
      if (Array.isArray(res.data)) {
        historyList.value = res.data.reverse();
      }
    } else {
      historyList.value = [];
    }
  } catch (error) {
    console.error('获取历史记录失败:', error);
    historyList.value = [];
  }
}

function processHistoryData(historyDataList: any[]) {
	console.log(historyDataList,'historyDataList')
  historyDataList.forEach((item) => {
    // 添加用户消息
    if (item.question) {
      chatMessages.value.push({
        content: item.question,
        isUser: !item.isOpen,
        time: item.createTime || getTime(),
        copied: false,
        attachment: (item.file && item.file.filePath ) ? {
          fileId: item.file.fileId,
          fileName: item.file.fileName,
          extenName: item.file.extenName,
          fileSize: item.file.fileSize,
          filePath: item.file.filePath
        } : null
      });
    }

    // 添加 AI 回复
    if (item.answer) {
      // 检测并处理 markdown 代码块
      const processed = handleLessonPlanContent(item.answer);

      chatMessages.value.push({
        content: processed.displayText,
        fullContent: item.answer,
        isUser: false,
        time: item.createTime || getTime(),
        copied: false,
        id: item.id,
        hasMarkdown: processed.hasMarkdown,
        markdownContent: processed.markdownContent,
        lessonPlanData: processed.lessonPlanData,
        isLoading: false, // 历史记录已完成，不需要加载动画
        loadedSections: processed.lessonPlanData?.sections?.length || 0
      });
    }

    // 设置 sessionId 和 lessId（取最后一条记录的值）
    if (item.sessionId) {
      sessionId.value = item.sessionId;
    }
    if (item.lessId) {
      lessId.value = item.lessId;
    }
  });
}

const scrollToBottom = () => {
  nextTick(() => {
    if (scrollRef.value) {
      scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
    }
    // 二次滚动，防止图片等资源未加载完成导致高度计算不准确
    setTimeout(() => {
      if (scrollRef.value) {
        scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
      }
    }, 100);
  });
};

const handleScroll = () => {
  if (!scrollRef.value) return;
  const { scrollTop, scrollHeight, clientHeight } = scrollRef.value;
  // 距离底部超过 100px 且有对话内容时显示按钮
  const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
  showScrollBottomBtn.value = !isAtBottom && chatMessages.value.length > 0;
};

const smoothScrollToBottom = () => {
  if (scrollRef.value) {
    scrollRef.value.scrollTo({
      top: scrollRef.value.scrollHeight,
      behavior: 'smooth'
    });
  }
};

const historyOptions = [
  {
    label: '删除',
    key: 'delete',
    props: {
      style: {
        color: 'red'
      }
    }
  }
];

const handleHistoryAction = async (key: string, history: any) => {
  if (key === 'delete') {
    try {
      await DelLessInfo({ id: history.id });
      message.success('删除成功');

        await inithistoryList();


      if (selectedHistoryId.value === (history.groupId || history.id)) {
        startNewChat();
      }
    } catch (error) {
      console.error(error);
      message.error('删除失败');
    }
  }
};

async function loadHistoryChat(historyItem) {
  if (window.abortController) {
    window.abortController.abort();
    window.abortController = null;
  }

  isSending.value = false;
  hasReceivedMessage.value = false;
  chatMessages.value = [];

  // 更新选中的历史记录 ID，并显示加载状态
  selectedHistoryId.value = historyItem.groupId || historyItem.id;
  isHistoryLoading.value = true;
  showGuide.value = false;
  showLessonPlan.value = false; // 关闭教案面板

  try {
    const res = await GetChatHistory({ id: historyItem.id });

    if (!res.error && res.data && Array.isArray(res.data)) {
      processHistoryData(res.data);
    }
  } catch (error) {
    console.error('获取历史对话失败:', error);
    message.error('加载历史记录失败');
  } finally {
    isHistoryLoading.value = false;
    scrollToBottom();
  }
}



onMounted(() => {
    inithistoryList();

});

// 监听聊天消息变化，自动滚动到底部
watch(
  () => chatMessages.value.length,
  () => {
    scrollToBottom();
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

});
const editorContent = ref('');

// 处理卡片点击 - 根据消息的 fullContent 重新提取教案
async function handleCardClick(msg: any) {
  if (!msg.fullContent) return;

  const extracted = extractMarkdownContent(msg.fullContent);
				console.log(extracted,'extracted')

  if (extracted.hasMarkdown) {
    try {
       const html = await marked.parse(extracted.markdownContent);
       editorContent.value = html;
    } catch (e) {
       console.error('Error parsing markdown:', e);
    }
    try {
      let lessonData = JSON.parse(extracted.markdownContent);
      // 过滤教案内容中的 markdown 代码块
      if (lessonData.sections && Array.isArray(lessonData.sections)) {
        lessonData.sections = lessonData.sections.map((section: any) => ({
          ...section,
          content: section.content ? section.content.replace(/```(?:[Mm]arkdown)?\n?[\s\S]*?\n?```/g, '').trim() : ''
        }));
      }
      lessonPlanData.value = lessonData;
			console.log(lessonPlanData,'lessonPlanData')
    } catch (error) {
      const sections = parseMarkdownToSections(extracted.markdownContent);

      // 过滤每个章节的内容
      const filteredSections = sections.map((section: any) => ({
        ...section,
        content: section.content ? section.content.replace(/```(?:[Mm]arkdown)?\n?[\s\S]*?\n?```/g, '').trim() : ''
      }));
      lessonPlanData.value = {
        title: extractTitleFromMarkdown(msg.fullContent),
        sections: filteredSections
      };
    }
    openLessonPlan();
  }
}

// 从 markdown 内容中提取标题
function extractTitleFromMarkdown(markdownContent: string): string {

  if (!markdownContent) return '';

  // 尝试从 JSON 中获取 title
  try {
    const data = JSON.parse(markdownContent);
    if (data.title) return data.title;
  } catch (error) {
    // 不是 JSON，继续处理 markdown
  }

  // 尝试从部分 JSON 字符串中提取 title (用于流式传输时)
  const jsonTitleMatch = markdownContent.match(/"title"\s*:\s*"(.+?)"/);
  if (jsonTitleMatch && jsonTitleMatch[1]) {
    return jsonTitleMatch[1];
  }

  // 从 markdown 中提取第一个单个 # 标题
  const titleMatch = markdownContent.match(/^#\s+(.+?)$/m);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim();
  }

  return '教案已生成';
}

function openLessonPlan() {
  showLessonPlan.value = true;
}

async function exportToWord() {
      const title = lessonPlanData.value.title || '教案';
      const bodyContent = editorContent.value;

      const fullHtml = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>100</w:Zoom>
              <w:DoNotOptimizeForBrowser/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            @page {
              size: 21cm 29.7cm;
              margin: 2.54cm;
              mso-page-orientation: portrait;
            }
            body {
              font-family: 'SimSun', '宋体', serif;
            }
            h1 { text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 20px; mso-list: none; }
            h2 { font-size: 18px; font-weight: bold; margin-top: 15px; margin-bottom: 20px; padding: 5px; mso-list: none; }
            h3, h4, h5, h6 { font-weight: bold; margin-top: 10px; margin-bottom: 20px; mso-list: none; }
            p, div { font-size: 14px; line-height: 2; margin-bottom: 10px; }
            ul, ol { margin-bottom: 10px; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 10px; }
            th, td { border: 1px solid #000; padding: 5px; }
            li p { display: inline; margin: 0; }
            li { margin-bottom: 5px; }
          </style>
        </head>
        <body>
          ${bodyContent}
        </body>
        </html>
      `;

      // Create Blob and Download
      const blob = new Blob([fullHtml], { type: 'application/msword;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
}

function closeLessonPlan() {
  showLessonPlan.value = false;
}

// 动画钩子函数
function onEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.overflow = 'hidden'
}

function onLeave(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.overflow = 'hidden'
}


// 发送AI问题 - 修改为使用流式响应
// 提取 markdown 代码块内容（支持大小写）
function extractMarkdownContent(text: string) {
  // 匹配完整的 markdown 代码块：```markdown ... ``` 或 ``` ... ```
  // 注意：这里使用 [\s\S]*? 非贪婪匹配，但如果后面还有文本，需要捕获
  const completeRegex = /```(?:[Mm]arkdown)?\n?([\s\S]*?)\n?```/;
  const completeMatch = text.match(completeRegex);

  if (completeMatch && completeMatch[1]) {
    // 如果匹配到了完整块，我们需要移除它，并保留前后的文本
    const textWithoutMarkdown = text.replace(completeRegex, '').trim();

    return {
      hasMarkdown: true,
      markdownContent: completeMatch[1].trim(),
      textWithoutMarkdown: textWithoutMarkdown
    };
  }

  // 匹配未闭合的 markdown 代码块 (流式传输中)
  const partialRegex = /```(?:[Mm]arkdown)?\n?([\s\S]*)$/;
  const partialMatch = text.match(partialRegex);

  if (partialMatch) {
    return {
      hasMarkdown: true,
      markdownContent: partialMatch[1] || '',
      // 返回代码块之前的内容
      textWithoutMarkdown: text.substring(0, partialMatch.index).trim()
    };
  }

  return {
    hasMarkdown: false,
    markdownContent: '',
    textWithoutMarkdown: text
  };
}

// 处理教案内容 - 支持纯 markdown 文本
function handleLessonPlanContent(content: string) {
  const extracted = extractMarkdownContent(content);
  if (extracted.hasMarkdown) {
    let lessonData = null;
    // 尝试解析为 JSON
    try {
      lessonData = JSON.parse(extracted.markdownContent);
      lessonPlanData.value = lessonData;
    } catch (error) {
      // 如果不是 JSON，则作为纯 markdown 文本处理
      // 将 markdown 内容转换为教案格式
      const sections = parseMarkdownToSections(extracted.markdownContent);
      lessonData = {
        title: extractTitleFromMarkdown(extracted.textWithoutMarkdown),
        sections: sections
      };
      lessonPlanData.value = lessonData;
    }
    return {
      hasMarkdown: true,
      displayText: extracted.textWithoutMarkdown || '',
      markdownContent: extracted.markdownContent,
      lessonPlanData: lessonData,
      isLoading: true,
      loadedSections: 0
    };
  }
  return {
    hasMarkdown: false,
    displayText: content,
    markdownContent: '',
    lessonPlanData: null,
    isLoading: false,
    loadedSections: 0
  };
}

// 逐个展示教案章节
async function animateLessonPlanSections(msgIndex: number) {
  const msg = chatMessages.value[msgIndex];
  if (!msg || !msg.hasMarkdown || !msg.lessonPlanData) return;

  const sections = msg.lessonPlanData.sections || [];
  const totalSections = sections.length;

  // 逐个添加章节，每个延迟 500ms
  for (let i = 0; i < totalSections; i++) {
    await new Promise(resolve => setTimeout(resolve, 500));
    msg.loadedSections = i + 1;
  }

  // 完成后关闭加载状态
  msg.isLoading = false;
}

// 将 markdown 文本解析为教案章节
function parseMarkdownToSections(markdown: string) {
  const sections = [];
  const lines = markdown.split('\n');
  let currentSection = null;
  let currentContent = [];

  lines.forEach((line) => {
    // 只用 ### 作为章节分隔符
    if (line.startsWith('### ')) {
      // 保存前一个章节（如果有内容或标题）
      if (currentSection !== null || currentContent.length > 0) {
        sections.push({
          title: currentSection || '',
          content: currentContent.join('\n').trim()
        });
      }
      // 开始新章节
      currentSection = line.replace('### ', '').trim();
      currentContent = [];
    } else {
      // 保留所有内容，包括 # 和 ##，以及首个章节前的内容
      currentContent.push(line);
    }
  });

  // 保存最后一个章节
  if (currentSection !== null || currentContent.length > 0) {
    sections.push({
      title: currentSection || '',
      content: currentContent.join('\n').trim()
    });
  }

  return sections;
}

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



  // 添加用户消息
  chatMessages.value.push({
    content: aiQuestion.value,
    isUser: true,
    time: getTime(),
    attachment: uploadedFile.value ? { ...uploadedFile.value } : null
  });


  // 准备请求参数 - 使用新的API参数结构
  const params: ChatRequest = {
    professField: selectedDomain.value ? domains.indexOf(selectedDomain.value) : undefined,
    cultivatStage: selectedStage.value ? stages.indexOf(selectedStage.value) : undefined,
    lessonType: selectedType.value ? types.indexOf(selectedType.value) : undefined,
    sessionId: uploadedFile.value ? '' : (sessionId.value || ''),
    question: aiQuestion.value,
    opening: (!sessionId.value && chatMessages.value.length > 0 && !chatMessages.value[0].isUser) ? (chatMessages.value[0].fullContent || chatMessages.value[0].content) : '', // 仅在新对话且有开场白(非用户消息)时发送
    fileid: fileid.value || '', // 使用上传返回的文件 ID
    lessId: lessId.value, // 教案ID
    file: uploadedFile.value ? {
        fileName: uploadedFile.value.fileName,
        extenName: uploadedFile.value.extenName,
        fileSize: Number(uploadedFile.value.fileSize),
        filePath: uploadedFile.value.filePath,
        fileId: uploadedFile.value.fileId
    } : {

    }
  };

  console.log(params, 'params');
  // 清空输入框
  aiQuestion.value = '';
  clearUploadedFile();

  // 滚动到最新消息
  nextTick(() => {
    if (scrollRef.value) {
      scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
    }
  });

  try {
    // 使用fetchEventSource获取流式响应
    const baseURL = import.meta.env.VITE_BASE_API;
    const streamUrl = `${baseURL}/api/Chat/ChatCompletStreamAsync`;

    window.abortController = new AbortController();
    window.currentEventSource = await fetchEventSource(streamUrl, {
      method: 'post',
      headers: {
        token,
        'Content-type': 'application/json-patch+json',
        accept: '/',

										'Authorization': localStg.get('token') ? ('Bearer' + ' ' + localStg.get('token')) : ''

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
      async onmessage(event) {
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
              // 如果没有开始问题，添加新的AI回复
              const newMsg = {
                content: '',
                fullContent: obj.content, // 存储完整内容
                isUser: false,
                id: obj.id,
                liked: false,
                disliked: false,
                copied: false,
                typingIndex: 0, // 当前打字位置
                typingTimer: null, // 打字定时器
                hasMarkdown: false,
                isLoading: false,
                loadedSections: 0,
                lessonPlanData: null
              };

              // 检测是否包含 markdown
              const extracted = extractMarkdownContent(obj.content);
              if (extracted.hasMarkdown) {
                newMsg.hasMarkdown = true;
                newMsg.isLoading = true;
                newMsg.content = extracted.textWithoutMarkdown; // 实时迁移内容：只显示非 Markdown 部分

                // 初始化教案数据
                lessonPlanData.value = {
                  title: '生成的教案',
                  sections: []
                };
                openLessonPlan();

                // 尝试解析初始内容
                try {
                   // Streaming logic: Convert markdown content directly to HTML for Editor
                   const markdown = extracted.markdownContent;
                   const html = await marked.parse(markdown);
                   editorContent.value = html;

                   // Also try to keep lessonPlanData updated for title if possible (optional)
                   lessonPlanData.value.title = extractTitleFromMarkdown(markdown) || '生成的教案';

                } catch (error) {
                   console.error('Error parsing markdown stream:', error);
                }
              }

              chatMessages.value.push(newMsg);

              // 只有在没有 markdown 的情况下才开始打字效果
              if (!newMsg.hasMarkdown) {
                startTypingEffect(newMsg);
              }

              questionLoading.value = true;
              isSending.value = false; // 隐藏加载动画
            } else {
              // 获取最后一条消息
              const lastMsg = chatMessages.value[chatMessages.value.length - 1];

              // 更新完整内容
              lastMsg.fullContent = (lastMsg.fullContent || '') + obj.content;

              // 实时提取 Markdown
              const extracted = extractMarkdownContent(lastMsg.fullContent);

              if (extracted.hasMarkdown) {
                 if (!lastMsg.hasMarkdown) {
                    // 首次检测到 Markdown，切换状态
                    lastMsg.hasMarkdown = true;
                    lastMsg.isLoading = true;

                    // 停止打字效果
                    if (lastMsg.typingTimer) {
                       clearInterval(lastMsg.typingTimer);
                       lastMsg.typingTimer = null;
                    }

                    // 初始化教案
                    lessonPlanData.value = {
                      title: '生成的教案',
                      sections: []
                    };
                    openLessonPlan();
                 }

                 // 更新消息显示内容 (去除 Markdown 部分，实现"迁移"效果)
                 lastMsg.content = extracted.textWithoutMarkdown;

                 // Update Editor Content Real-time
                 try {
                     const html = await marked.parse(extracted.markdownContent);
                     editorContent.value = html;
                 } catch (e) {
                     console.error('Error parsing markdown stream:', e);
                 }

                 // 实时更新教案数据
                 try {
                    let lessonData = JSON.parse(extracted.markdownContent);
                    if (lessonData.sections && Array.isArray(lessonData.sections)) {
                      lessonData.sections = lessonData.sections.map((section: any) => ({
                        ...section,
                        content: section.content ? section.content.replace(/```(?:[Mm]arkdown)?\n?[\s\S]*?\n?```/g, '').trim() : ''
                      }));
                    }
                    lessonPlanData.value = lessonData;
                    lastMsg.lessonPlanData = lessonData;
                 } catch (error) {
                    const sections = parseMarkdownToSections(extracted.markdownContent);
                    const lessonData = {
                      title: extractTitleFromMarkdown(extracted.markdownContent) || '生成的教案',
                      sections: sections
                    };
                    lessonPlanData.value = lessonData;
                    lastMsg.lessonPlanData = lessonData;
                 }
              } else {
                 // 如果不是 Markdown，确保打字效果在运行
                 if (!lastMsg.typingTimer) {
                    lastMsg.typingIndex = lastMsg.content.length;
                    startTypingEffect(lastMsg);
                 }
              }
            }
          } else {
            // 流结束
            questionLoading.value = false;
            sendBtnLoading.value = false;

            // 获取最后一条AI消息的完整内容
            if (chatMessages.value.length > 0) {
              const lastMsg = chatMessages.value[chatMessages.value.length - 1];
							console.log(lastMsg,'lastMsg')
              if (!lastMsg.isUser && lastMsg.fullContent) {
                // 检测并处理 markdown 代码块
                const processed = handleLessonPlanContent(lastMsg.fullContent);

                // 更新消息内容和标记
                lastMsg.content = processed.displayText;
                lastMsg.hasMarkdown = processed.hasMarkdown;
                lastMsg.markdownContent = processed.markdownContent;
                lastMsg.lessonPlanData = processed.lessonPlanData;
                lastMsg.isLoading = processed.isLoading;
                lastMsg.loadedSections = processed.loadedSections;

                // 如果有 markdown 内容，启动动画展示并打开教案面板
                if (lastMsg.hasMarkdown && lastMsg.isLoading) {
                  const msgIndex = chatMessages.value.length - 1;
                  animateLessonPlanSections(msgIndex);
                  openLessonPlan(); // 教案生成完成时打开
                }

                // 调用GetLessonPlanName并刷新历史记录
                await handleConversationEnd(lastMsg.fullContent);
              }
            }
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

        // 立即停止当前请求
        if (window.abortController) {
          window.abortController.abort();
          window.abortController = null;
        }
        if (window.currentEventSource) {
          window.currentEventSource = null;
        }

        // 重置所有加载状态
        sendBtnLoading.value = false;
        questionLoading.value = false;
        isSending.value = false;

        // 显示错误提示
        message.error('连接已断开，请检查网络后重试');
      },
      onclose() {
        console.log('断开了');

        // 立即停止当前请求
        if (window.abortController) {
          window.abortController.abort();
          window.abortController = null;
        }
        if (window.currentEventSource) {
          window.currentEventSource = null;
        }

        // 重置所有加载状态
        sendBtnLoading.value = false;
        questionLoading.value = false;
        isSending.value = false;
				console.log(hasReceivedMessage.value,'hasReceivedMessage')
        // 如果连接关闭时还没有收到任何消息，说明可能出现了问题
        if (!hasReceivedMessage.value) {
          chatMessages.value.push({
            content: `连接已断开`,
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

    // 如果教案正在生成，也强制停止
    if (lastMsg.isLoading) {
      lastMsg.isLoading = false;
      // 显示目前已解析到的所有章节
      if (lastMsg.lessonPlanData && lastMsg.lessonPlanData.sections) {
        lastMsg.loadedSections = lastMsg.lessonPlanData.sections.length;
      }
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

/* Slide in from right animation */
.slide-in-right-enter-active {
  animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-right-leave-active {
  animation: slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
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
