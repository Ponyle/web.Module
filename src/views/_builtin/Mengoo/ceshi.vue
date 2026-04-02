<template>
  <n-drawer
    v-model:show="showDialog"
    :width="isFullscreen ? '100%' : isExpanded ? 600 : 400"
    placement="left"
    :block-scroll="false"
    :height="200"
    :z-index="1000"
    :trap-focus="true"
    :auto-focus="true"
  >
    <n-drawer-content :body-style="bodclass" :footer-style="footclass" @close="toggleDialog">
      <span v-if="!isFullscreen" class="expand-btn" @click="toggleExpand">
        <!-- <svg-icon
          :icon="isExpanded ? 'solar:round-alt-arrow-right-outline' : 'solar:round-alt-arrow-left-outline'"
          class="text-20px toggle-icon"
        /> -->
        <svg
          v-if="!isExpanded"
          width="20"
          height="32"
          viewBox="0 0 20 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H14C17.3137 0 20 2.68629 20 6V26C20 29.3137 17.3137 32 14 32H0V0Z"
            fill="#E5E6EB"
            fill-opacity="0.5"
          />
          <path
            d="M14.2764 13.0005L11.2764 16.0005L14.2764 19.0006L13.3336 19.9434L9.39075 16.0005L13.3336 12.0577L14.2764 13.0005ZM9.94304 13.0005L6.94303 16.0005L9.94303 19.0006L9.00022 19.9434L5.05742 16.0005L9.00023 12.0577L9.94304 13.0005Z"
            fill="#847F7F"
          />
        </svg>

        <svg v-else width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0H14C17.3137 0 20 2.68629 20 6V26C20 29.3137 17.3137 32 14 32H0V0Z"
            fill="#E5E6EB"
            fill-opacity="0.5"
          />
          <path
            d="M5.72388 18.9995L8.72388 15.9995L5.72388 12.9994L6.66669 12.0566L10.6095 15.9995L6.66669 19.9423L5.72388 18.9995ZM10.0572 18.9995L13.0572 15.9995L10.0572 12.9994L11 12.0566L14.9428 15.9995L11 19.9423L10.0572 18.9995Z"
            fill="#847F7F"
          />
        </svg>
      </span>
      <template #header>
        <div class="drawer-header">
          <div class="drawer-title-container">
            <div class="drawer-title">AI学伴</div>
          </div>
          <div class="drawer-controls">
            <i v-if="!isFullscreen" class="icon-plus" title="新增对话" @click="newChat">+</i>
            <i v-if="!isFullscreen" class="icon-history" title="历史对话" @click="viewHistory">🕒</i>
            <i class="icon-fullscreen" :title="isFullscreen ? '取消全屏' : '全屏'" @click="toggleFullscreen">{{
              isFullscreen ? '⤢' : '⛶'
            }}</i>
            <i class="icon-close" title="关闭" @click="toggleDialog">×</i>
          </div>
        </div>
      </template>

      <div class="ai-drawer-body" :class="{ 'fullscreen-layout': isFullscreen }">
        <div v-if="isFullscreen" class="fullscreen-sidebar">
          <div class="history-header">
            <div class="ai-companion-icon">
              <img src="@/assets/images/mengoo/stuAI/ai-companion.gif" alt="AI学伴" />
            </div>
            <div class="drawer-title">AI助教</div>
          </div>
          <n-scrollbar style="height: calc(100vh - 300px)">
            <div class="history-list">
              <div
                v-for="(item, index) in historyList"
                :key="index"
                class="history-item"
                :class="{ active: selectedHistoryId === (item.groupId || item.id) }"
                @click="loadHistoryChat(item)"
              >
                <div class="history-title" :title="item.data && item.data[0] ? item.data[0].question : item.question">
                  {{ item.data && item.data[0] ? item.data[0].question : item.question }}
                </div>
                <div class="history-time" :title="item.data && item.data[0] ? item.data[0].createTime : item.time">
                  {{ item.data && item.data[0] ? item.data[0].createTime : item.time }}
                </div>
              </div>
            </div>
          </n-scrollbar>
          <div>
            <div class="new-chat-button-container">
              <n-button type="primary" color="#165dff" class="new-chat-button" @click="newChat">
                <template #icon>
                  <svg-icon icon="mdi:plus" class="text-16px" />
                </template>
                新建对话
              </n-button>
            </div>
          </div>
        </div>
        <div class="fullscreen-content" :class="{ 'with-sidebar fullscreen-content1': isFullscreen }">
          <n-scrollbar ref="scrollbarRef" style="height: calc(100vh - 210px)">
            <div v-if="chatMessages.length === 0" class="ai-robot-container">
              <img src="@/assets/images/mengoo/stuAI/ai-robot.png" alt="AI机器人" class="ai-robot-image" />
              <div class="ai-robot-greeting">
                <h3>Hello! 我是AI小梦</h3>
                <p>我可以帮你搜索、查询、回答，请把你的需求告诉我吧~</p>
              </div>
            </div>

            <div v-if="chatMessages.length === 0" class="ai-faq-list" style="max-width: 80%; margin: 0 auto">
              <div v-for="(item, index) in faqList" :key="index" class="ai-faq-item" @click="selectFaq(item)">
                <div class="ai-faq-question">{{ item }}</div>
                <div class="ai-faq-arrow">→</div>
              </div>
            </div>

            <div v-if="chatMessages.length > 0" class="ai-chat-container">
              <div ref="chatMessagesRef" class="ai-chat-messages">
                <!-- {{ chatMessages }} -->
                <!-- 消息内容 -->
                <div
                  v-for="(msg, index) in chatMessages"
                  :key="index"
                  :class="[
                    'ai-message',
                    msg.isUser ? 'ai-message-user' : 'ai-message-ai',
                    msg.isOldAnswer ? 'ai-message-old' : ''
                  ]"
                >
                  <div v-if="!msg.isUser" class="ai-message-avatar">
                    <img src="@/assets/images/mengoo/stuAI/aichat.png" alt="AI头像" class="avatar-img" />
                  </div>

                  <div class="ai-message-content" :class="{ 'error-message': msg.isError }">
                    <pre class="message-text">{{ msg.content || '暂无消息' }}</pre>
                    <!-- AI消息的操作按钮 -->
                    <div v-if="!msg.isUser && !msg.isError" class="ai-message-actions">
                      <div
                        class="ai-action-btn"
                        :class="{ copied: msg.copied }"
                        :title="msg.copied ? '已复制' : '复制'"
                        @click="copyMessage(msg.content, index)"
                      >
                        <svg-icon :icon="msg.copied ? 'mdi:check' : 'carbon:copy'" class="text-16px" />
                      </div>
                      <div class="ai-action-btn" title="重新回答" @click="regenerateAnswer(index)">
                        <svg-icon icon="mdi:refresh" class="text-16px" />
                      </div>
                      <!-- 其他按钮保持不变 -->
                      <div
                        class="ai-action-btn"
                        :class="{ active: msg.liked }"
                        title="点赞"
                        @click="likeMessage(index)"
                      >
                        <svg-icon icon="mdi:thumb-up-outline" class="text-16px" />
                      </div>
                      <div
                        class="ai-action-btn"
                        :class="{ active: msg.disliked }"
                        title="不喜欢"
                        @click="dislikeMessage(index)"
                      >
                        <svg-icon icon="mdi:thumb-down-outline" class="text-16px" />
                      </div>
                    </div>
                  </div>
                  <div v-if="msg.isUser" class="ai-message-avatar user-avatar">
                    <div style="overflow: hidden; border-radius: 50%; width: 40px">
                      <img
                        v-if="auth.$state.avaterphoto !== '' && auth.$state.avaterphoto !== null"
                        :preview-disabled="true"
                        style="width: 40px; height: 40px"
                        :src="auth.$state.avaterphoto"
                      />
                      <img
                        v-else
                        :preview-disabled="true"
                        src="@/assets/images/mengoo/Avatar.svg"
                        style="width: 40px; height: 40px"
                      />
                    </div>
                  </div>
                </div>

                <!-- AI回答加载状态 -->
                <div v-if="isSending" class="ai-message ai-message-ai">
                  <div class="ai-message-avatar">
                    <img src="@/assets/images/mengoo/stuAI/aichat.png" alt="AI头像" class="avatar-img" />
                  </div>
                  <div class="ai-message-content ai-loading-content">
                    <div class="ai-loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </n-scrollbar>
          <div v-if="isFullscreen" class="ai-drawer-footer">
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
                placeholder="给 AI小梦发送 信息"
                class="ai-input"
                style="--n-border: none; --n-border-hover: none; --n-border-focus: none"
                @keydown.enter="handleEnterKey"
              />

              <div class="ai-input-actions">
                <div style="display: flex; align-items: center">
                  <div :class="['deep-think-bar', isseek ? 'dactive' : '']" @click="toggleSeek">
                    <i class="img-icon"></i>
                    <span class="deep-think-bar-text">深度思考</span>
                  </div>
                  <div :class="['deep-think-bar', iszstz ? 'dactive' : '']" @click="toggleZstz">
                    <svg-icon
                      icon="lucide:book-marked"
                      class="text-18px"
                      :style="{
                        color: iszstz ? '#0052d9' : 'rgba(57, 174, 0, 1)',
                        marginRight: '4px'
                      }"
                    />
                    <span class="deep-think-bar-text">知识拓展</span>
                    <!-- {{ sendBtnLoading }} -->
                  </div>
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
            <div class="ai-disclaimer" style="color: #847f7f; font-size: 12px; margin-top: 4px; padding: 0 12px">
              回答由AI模型生成，仅供您参考。
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div v-if="!isFullscreen" class="ai-drawer-footer">
          <div class="ai-input-container">
            <n-input
              ref="aiInputRef1"
              v-model:value="aiQuestion"
              :autosize="{
                minRows: 1,
                maxRows: 5
              }"
              round
              type="textarea"
              placeholder="给 AI小梦发送 信息"
              class="ai-input"
              style="--n-border: none; --n-border-hover: none; --n-border-focus: none"
              @keydown.enter="handleEnterKey"
            />
            <div class="ai-input-actions">
              <div style="display: flex; align-items: center">
                <div :class="['deep-think-bar', isseek ? 'dactive' : '']" @click="toggleSeek">
                  <i class="img-icon"></i>
                  <span class="deep-think-bar-text">深度思考</span>
                </div>
                <div :class="['deep-think-bar', iszstz ? 'dactive' : '']" @click="toggleZstz">
                  <svg-icon
                    icon="lucide:book-marked"
                    class="text-18px"
                    :style="{
                      color: iszstz ? '#0052d9' : 'rgba(57, 174, 0, 1)',
                      marginRight: '4px'
                    }"
                  />
                  <span class="deep-think-bar-text">知识拓展</span>
                </div>
              </div>
              <div style="display: flex; align-items: center">
                <!-- 添加语音输入按钮 -->
                <!-- <n-button
                  circle
                  :type="micSwitch ? 'primary' : 'default'"
                  :style="{
                    backgroundColor: micSwitch ? '#0052d9' : '',
                    color: micSwitch ? '#fff' : 'rgba(57, 174, 0, 1)',
                    marginRight: '8px'
                  }"
                  title="语音输入"
                  @click="toggleMic"
                >
                  <template #icon>
                    <svg-icon v-if="!micSwitch" icon="mdi:microphone" class="text-18px" />
                    <div v-else class="sound-icon-mini">
                      <div class="line-mini"></div>
                      <div class="line-mini"></div>
                      <div class="line-mini"></div>
                    </div>
                  </template>
                </n-button> -->
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

          <div class="ai-disclaimer" style="color: #847f7f; font-size: 12px; margin-top: 4px; padding: 0 12px">
            回答由AI模型生成，仅供您参考。
          </div>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
  <!-- 添加历史记录抽屉 -->
  <n-drawer
    v-model:show="showHistoryDrawer"
    closable
    width="400"
    placement="left"
    :z-index="2000"
    :mask="true"
    :trap-focus="true"
    :auto-focus="true"
  >
    <n-drawer-content title="对话记录" @close="showHistoryDrawer = false">
      <template #header>
        <div class="drawer-header">
          <div class="drawer-title-container">
            <div class="drawer-title">对话记录</div>
          </div>
          <div class="drawer-controls">
            <i class="icon-close" @click="showHistoryDrawer = false">×</i>
          </div>
        </div>
      </template>
      <n-scrollbar style="max-height: calc(100vh - 80px)">
        <div class="history-list">
          <div
            v-for="(item, index) in historyList"
            :key="index"
            class="history-item"
            :class="{ active: selectedHistoryId === (item.groupId || item.id) }"
            @click="loadHistoryChat(item)"
          >
            <div class="history-title" :title="item.question">
              {{ item.data && item.data[0] ? item.question : item.data[0].question }}
            </div>
            <div class="history-time" :title="item.createTime">
              {{ item.data && item.data[0] ? item.createTime : item.time[0].createTime }}
            </div>
          </div>
        </div>
      </n-scrollbar>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref, nextTick, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import dayjs from 'dayjs';
import { useClipboard } from '@vueuse/core';
import { StuChatCompletStreamAsync, StuGetChatHistorys } from '@/service';
import { useAuthStore } from '@/store';
import { localStg, sessionStg, guid, bus } from '@/utils';
import Avatar from '@/assets/images/mengoo/Avatar.svg';

const route = useRoute();
const aiInputRef = ref(null);
const aiInputRef1 = ref(null);

const Bus = bus();
const auth = useAuthStore();
const CourseDataId = ref(null);
const CatsId = ref(null);
const CourseId = ref(null);
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});
const userinfo = ref(localStg.get('userInfo'));
if (!auth.$state.avaterphoto) {
  auth.$state.avaterphoto = localStg.get('userInfo')?.photo;
}
const emit = defineEmits(['update:show']);
const secondUrl = import.meta.env.VITE_TEST_URL;

const showDialog = ref(props.show);
const aiQuestion = ref('');
const chatMessages = ref([]);
const faqList = ref(['AI学伴小梦能为我做什么？', '客户端实验题怎样提交失败？', '如何完成实验报告作业？']);
const chatMessagesRef = ref(null);
const isExpanded = ref(true); // 添加展开状态变量
const isseek = ref(false);
const iszstz = ref(false);
const isSending = ref(false); // 添加发送状态变量

const sessionId = ref(null);
const token = localStg.get('token');
console.log(token, 'token');
const sendBtnLoading = ref(false);
const questionLoading = ref(false);
const hasReceivedMessage = ref(false); // 用于跟踪是否收到过消息
const GroupId = ref(null);
const lasetQuestion = ref();
const showSpin = ref(false);
const questionList = ref([]);

// 添加一个新的状态变量来控制历史记录抽屉
const showHistoryDrawer = ref(false);
const historyList = ref([]);
// 添加一个变量来保存打开历史记录抽屉前的对话状态
const previousChatState = ref(null);
// 在现有变量声明后添加
const isFullscreen = ref(false);
const selectedHistoryId = ref(null);
const bodclass = ref({
  backgroundColor: '#fff' // 默认为白色
});
const footclass = ref({
  display: 'block' // 默认为白色
});

const isVoiceRecording = ref(false);

const AudioData = ref({
  data: null,
  audioSwitch: false,
  micSwitch: false
});

// 获取当前时间
function getTime() {
  return dayjs().format('HH:mm:ss');
}

// 重置数据
function resetData() {
  questionList.value = [];
  chatMessages.value = [];
}

// 发送AI问题 - 修改为使用流式响应
async function askAI() {
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
    time: getTime()
  });

  // 准备消息历史记录
  const msgs = chatMessages.value.slice(-10).map(item => {
    return {
      role: item.isUser ? 'user' : 'assistant',
      content: item.content
    };
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
    if (scrollbarRef.value) {
      scrollbarRef.value.scrollTo({ top: 999999 });
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

            // 如果开启了知识拓展，获取建议问题
            if (iszstz.value) {
              // getSuggestionInfo();
            }
            // 如果是全屏状态，刷新历史记录
            if (isFullscreen.value) {
              // 延迟一小段时间，确保后端数据已更新
              setTimeout(() => {
                inithistoryList();
                console.log('全屏模式下，对话完成后刷新历史记录');
              }, 500);
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
          if (scrollbarRef.value) {
            scrollbarRef.value.scrollTo({ top: 999999 });
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
      if (scrollbarRef.value) {
        scrollbarRef.value.scrollTo({ top: 999999 });
      }
    });
  }
}

// 获取下一步问题建议
async function getSuggestionInfo() {
  if (chatMessages.value.length >= 2) {
    const params = {
      id: null, // 可以根据需要设置
      questions: chatMessages.value[chatMessages.value.length - 2].content
    };

    showSpin.value = true;
    try {
      const res = await GetSuggestionInfo1(params);
      if (!res.error && res.data) {
        questionList.value = res.data;

        // 在UI中显示建议问题
        // 这里可以根据需要添加显示建议问题的UI

        nextTick(() => {
          if (scrollbarRef.value) {
            scrollbarRef.value.scrollTo({ top: 999999 });
          }
        });
      }
    } catch (error) {
      console.error('获取问题建议失败:', error);
    } finally {
      showSpin.value = false;
    }
  }
}

// 重新发送问题
function regenerateAnswer(index) {
  if (sendBtnLoading.value) {
    return;
  }

  // 找到对应的用户问题
  const userMsgIndex = index - 1;
  if (userMsgIndex >= 0 && chatMessages.value[userMsgIndex].isUser) {
    // 不再删除当前AI回答，而是标记为"已重新回答"
    const currentMsg = chatMessages.value[index];

    // 如果正在打字，停止打字效果
    if (currentMsg.typingTimer) {
      clearInterval(currentMsg.typingTimer);
      currentMsg.typingTimer = null;
    }

    // 标记当前回答为旧回答
    currentMsg.isOldAnswer = true;

    // 重新发送用户问题
    aiQuestion.value = chatMessages.value[userMsgIndex].content;
    askAI();
  }
}

// 点赞/点踩消息 - 添加后端接口
async function likeMessage(index) {
  const msg = chatMessages.value[index];

  if (!msg.id) return; // 确保消息有ID

  if (!msg.liked) {
    // 设置点赞状态
    msg.liked = true;
    msg.disliked = false;

    // 调用后端接口
    const params = {
      id: msg.id,
      Category: 1, // 点赞
      isThumbsup: true
    };

    try {
      await CommentsThumbsUpOrOff(params);
    } catch (error) {
      console.error('点赞失败:', error);
    }
  } else {
    // 取消点赞
    msg.liked = false;

    const params = {
      id: msg.id,
      Category: 1,
      isThumbsup: false
    };

    try {
      await CommentsThumbsUpOrOff(params);
    } catch (error) {
      console.error('取消点赞失败:', error);
    }
  }
}

// 踩消息 - 添加后端接口
async function dislikeMessage(index) {
  const msg = chatMessages.value[index];

  if (!msg.id) return; // 确保消息有ID

  if (!msg.disliked) {
    // 设置点踩状态
    msg.disliked = true;
    msg.liked = false;

    // 调用后端接口
    const params = {
      id: msg.id,
      Category: 2, // 点踩
      isThumbsup: true
    };

    try {
      await CommentsThumbsUpOrOff(params);
    } catch (error) {
      console.error('点踩失败:', error);
    }
  } else {
    // 取消点踩
    msg.disliked = false;

    const params = {
      id: msg.id,
      Category: 2,
      isThumbsup: false
    };

    try {
      await CommentsThumbsUpOrOff(params);
    } catch (error) {
      console.error('取消点踩失败:', error);
    }
  }
}

// 修改全屏切换函数
function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value;

  // 根据全屏状态设置背景色
  bodclass.value.backgroundColor = isFullscreen.value ? '#eeeeee' : '#fff';
  footclass.value.display = isFullscreen.value ? 'none' : '';

  if (isFullscreen.value) {
    // 进入全屏模式时，获取历史记录
    inithistoryList();
    console.log('进入全屏模式，获取最新历史记录');
  } else {
    // 退出全屏模式时，可以重置选中的历史ID
    // selectedHistoryId.value = null;
  }
}

// 选择常见问题 - 修改为直接使用问题
function selectFaq(question) {
  aiQuestion.value = question;
  askAI();
}

// 切换展开状态
function toggleExpand() {
  isExpanded.value = !isExpanded.value;
}

// 监听父组件传入的show属性变化
watch(
  () => props.show,
  newVal => {
    showDialog.value = newVal;
    if (newVal && chatMessages.value.length === 0) {
      // 首次打开时添加欢迎消息
      if (!Array.isArray(chatMessages.value)) {
        chatMessages.value = [];
      }
      // chatMessages.value.push({
      //   content: '你好！我是AI学伴小梦，有什么可以帮助你的吗？',
      //   isUser: false
      // });
    }
  }
);

// 监听内部showDialog变化，通知父组件
watch(
  () => showDialog.value,
  newVal => {
    emit('update:show', newVal);

    // 当抽屉打开且处于全屏模式时，获取历史记录
    if (newVal && isFullscreen.value) {
      inithistoryList();
      console.log('抽屉打开且处于全屏模式，获取最新历史记录');
    }
  }
);

// 监听历史记录抽屉的关闭事件

// 切换对话框显示状态
function toggleDialog() {
  showDialog.value = !showDialog.value;
}

const scrollbarRef = ref(null);

// 修改查看历史记录的函数
// 修改viewHistory函数，在打开历史记录抽屉前暂停当前请求
// 修改viewHistory函数，保存当前对话状态
function viewHistory() {
  // 保存当前对话状态
  previousChatState.value = {
    messages: JSON.parse(JSON.stringify(chatMessages.value)),
    question: aiQuestion.value,
    sessionId: sessionId.value,
    groupId: GroupId.value,
    isSending: isSending.value,
    questionLoading: questionLoading.value,
    sendBtnLoading: sendBtnLoading.value
  };

  // 获取历史记录数据
  inithistoryList();

  // 显示历史记录抽屉
  showHistoryDrawer.value = true;
}

// 获取历史记录列表
async function getHistoryList() {
  try {
    // 这里应该调用后端API获取历史记录
    // 模拟数据，实际应该从API获取
    historyList.value = [
      {
        id: '1',
        title: '软件第一章通不显示实样教材了，帮我处理下吧 或者检查下哪里有问题谢谢',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '2',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      },
      {
        id: '3',
        title: '软件第一章通不显示实样教材了，帮...',
        time: '2024-07-30 15:52:44'
      }
    ];
  } catch (error) {
    console.error('获取历史记录失败:', error);
    window.$message.error('获取历史记录失败，请稍后重试');
  }
}

// 修改loadHistoryChat函数，确保在加载历史对话前中断当前请求
function loadHistoryChat(historyItem) {
  console.log(historyItem, 'historyItem');

  // 先中断当前正在进行的请求和打字效果
  if (window.abortController) {
    window.abortController.abort();
    window.abortController = null;
  }

  // 停止所有正在进行的打字效果
  chatMessages.value.forEach(msg => {
    if (msg.typingTimer) {
      clearInterval(msg.typingTimer);
      msg.typingTimer = null;
    }
  });

  // 重置状态
  questionLoading.value = false;
  sendBtnLoading.value = false;
  isSending.value = false;
  hasReceivedMessage.value = false;

  // 清空当前对话
  chatMessages.value = [];

  // 设置选中的历史ID
  selectedHistoryId.value = historyItem.groupId || historyItem.id;

  // 更新 GroupId 为历史记录的 groupId
  if (historyItem.groupId) {
    GroupId.value = historyItem.groupId;
    console.log('更新 GroupId:', GroupId.value);
  }

  // 更新 sessionId
  if (historyItem.sessionId) {
    sessionId.value = historyItem.sessionId;
    console.log('更新 sessionId:', sessionId.value);
  }

  // 处理包含多个对话的历史记录
  if (historyItem.data && Array.isArray(historyItem.data)) {
    // 遍历所有对话，按顺序添加到聊天窗口
    historyItem.data.forEach(dialog => {
      // 添加用户问题
      if (dialog.question) {
        chatMessages.value.push({
          content: dialog.question,
          isUser: true,
          time: dialog.createTime || getTime()
        });
      }

      // 添加AI回答
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
    // 处理单个对话的情况
    if (historyItem.question) {
      // 添加用户问题
      chatMessages.value.push({
        content: historyItem.question,
        isUser: true,
        time: historyItem.time || getTime()
      });

      // 添加AI回答
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

  console.log('加载历史对话:', historyItem);

  // 如果不是全屏模式，关闭历史记录抽屉
  if (!isFullscreen.value) {
    showHistoryDrawer.value = false;
    console.log(aiInputRef1.value, 'aiInputRef1');
    aiInputRef1.value?.focus();
  } else {
    aiInputRef.value?.focus();
  }

  // 滚动到最新消息
  nextTick(() => {
    if (scrollbarRef.value) {
      scrollbarRef.value.scrollTo({ top: 0 });
    }

    // 修改这里：使用延时确保DOM已更新，然后再设置焦点
    setTimeout(() => {
      if (isFullscreen.value) {
        console.log('全屏模式，设置aiInputRef焦点');
        aiInputRef.value?.focus();
      } else {
        console.log('非全屏模式，设置aiInputRef1焦点');
        aiInputRef1.value?.focus();
      }
    }, 100);
  });
}

// 打字机效果函数
function startTypingEffect(message) {
  // 清除可能存在的定时器
  if (message.typingTimer) {
    clearInterval(message.typingTimer);
  }

  // 设置打字速度（毫秒）
  const typingSpeed = 20;

  // 开始打字效果
  message.typingTimer = setInterval(() => {
    if (message.typingIndex < message.fullContent.length) {
      // 添加下一个字符
      message.content = message.fullContent.substring(0, message.typingIndex + 1);
      message.typingIndex++;
    } else {
      // 打字完成，清除定时器
      clearInterval(message.typingTimer);
      message.typingTimer = null;
      console.log('打字完成，清除定时器');
      // 只有在questionLoading为false时才重置发送按钮状态
      // 这表示服务器已经发送完所有内容
      if (!questionLoading.value) {
        sendBtnLoading.value = false;
      }
    }
  }, typingSpeed);
}
// 切换深度思考状态
function toggleSeek() {
  isseek.value = !isseek.value;
}

// 切换知识拓展状态
function toggleZstz() {
  iszstz.value = !iszstz.value;
}

// 复制消息内容
const { copy } = useClipboard();

function copyMessage(content, index) {
  const msg = chatMessages.value[index];
  copy(content)
    .then(() => {
      // 设置复制状态
      msg.copied = true;
      window.$message.success('复制成功');

      setTimeout(() => {
        msg.copied = false;
      }, 2000);
    })
    .catch(() => {
      window.$message.error('复制失败，请手动复制');
    });
}

// 处理回车键
function handleEnterKey(e) {
  // 如果按下了 shift 键，不触发发送，允许换行
  if (e.shiftKey) {
    return;
  }
  // 否则阻止默认行为并发送消息
  e.preventDefault();
  askAI();
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
    if (scrollbarRef.value) {
      scrollbarRef.value.scrollTo({ top: 999999 });
    }
  });
}

// 新增对话
function newChat() {
  // 清空当前对话
  chatMessages.value = [];
  aiQuestion.value = '';
  sessionId.value = '';
  // 重置 GroupId
  GroupId.value = guid();
  // 重置状态
  questionLoading.value = false;
  sendBtnLoading.value = false;
  isSending.value = false;
  hasReceivedMessage.value = false; // 重置消息接收状态

  // 如果有正在进行的请求，中断它
  if (window.abortController) {
    window.abortController.abort();
    window.abortController = null;
  }

  console.log('新建对话，GroupId 和 sessionId 已重置');
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
async function inithistoryList() {
  // 构建请求参数
  const params = {
    CourseId: CourseId.value || '',
    CourseDataId: CourseDataId.value || '',
    CatsId: CatsId.value || '',
    UserId: localStg.get('userInfo')?.id || ''
  };

  try {
    // 调用获取历史记录接口并传入参数
    const res = await StuGetChatHistorys(params);
    if (res && res.data) {
      // 处理返回的数据格式
      if (Array.isArray(res.data)) {
        // 如果直接返回数组格式
        historyList.value = res.data.reverse(); // 使用reverse()进行倒序排列
      } else if (res.data.data && Array.isArray(res.data.data)) {
      }
      console.log('获取历史记录成功', historyList.value);
    } else {
      console.warn('获取历史记录返回数据为空');
      historyList.value = [];
    }
  } catch (error) {
    console.error('获取历史记录失败:', error);
    window.$message.error('获取历史记录失败，请稍后重试');
    historyList.value = [];
  }
}
Bus.on('startLearning', res => {
  CourseDataId.value = res.data.slideId;
  CatsId.value = res.data.CatsId;
});
Bus.on('changeShowVH', res => {
  showVisualHuman.value = res;
});
// 组件挂载时初始化
onMounted(() => {
  if (route.query.id) {
    CourseId.value = route.query.id;
  }
  // 每次页面加载时生成新的GroupId
  GroupId.value = guid();
  bodclass.value.backgroundColor = isFullscreen.value ? '#eeeeee' : '#fff';
  footclass.value.block = isFullscreen.value ? 'none' : '';

  // 监听初始化AI抽屉的事件
  Bus.on('initAIDrawer', data => {
    console.log(data, '传过来的data');
    if (data.reset) {
      // 重置对话内容
      chatMessages.value = [];
      aiQuestion.value = '';
      sessionId.value = '';
      GroupId.value = guid();

      // 重置状态
      questionLoading.value = false;
      sendBtnLoading.value = false;
      isSending.value = false;
      hasReceivedMessage.value = false;

      // 如果有正在进行的请求，中断它
      if (window.abortController) {
        window.abortController.abort();
        window.abortController = null;
      }

      // 更新课程相关信息
      if (data.courseId) CourseId.value = data.courseId;
      if (data.courseDataId) CourseDataId.value = data.courseDataId;
      if (data.catsId) CatsId.value = data.catsId;

      // 重新获取历史记录
      inithistoryList();

      console.log('AI对话框已初始化');
    }
  });
});

// 在 onUnmounted 钩子中移除事件监听
onUnmounted(() => {
  // 清理所有消息中的打字定时器
  chatMessages.value.forEach(msg => {
    if (msg.typingTimer) {
      clearInterval(msg.typingTimer);
    }
  });

  // 移除事件监听
  Bus.off('initAIDrawer');
  Bus.off('startLearning');
  Bus.off('changeShowVH');
});
</script>

<style lang="scss" scoped>
.ai-message-ai {
  justify-content: flex-start;

  .ai-message-content {
    background-color: #e8f3ff;
    color: #333;
    border-top-left-radius: 2px;

    &.error-message {
      background-color: #fff2f0;
      border: 1px solid #ffccc7;
      color: #ff4d4f;
    }
  }
}

.img-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  font-size: 0px;
  line-height: 0;
  background-image: url('@/assets/images/mengoo/stuAI/view-in-ar.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 4px;
}

.img-icon1 {
  display: inline-block;
  width: 18px;
  height: 18px;
  font-size: 0px;
  line-height: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 4px;
}
.deep-think-bar {
  height: 32px;
  border: 1px solid #dcdcdc;
  border-radius: 16px;
  display: inline-flex;
  padding: 10px;
  align-items: center;
  color: var(--quark-style-gray-70-color, rgba(0, 0, 0, 0.6));
  transform-origin: center;
  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 10px;
  min-width: 100px;
}
.dactive {
  border: 1px solid #0052d9;
  background: rgba(0, 82, 217, 0.1);
  color: #0052d9;
}
:deep(.n-drawer-header) {
  display: block !important;
}
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.drawer-title-container {
  display: flex;
  align-items: center;
}

.expand-btn {
  cursor: pointer;
  margin-right: 10px;
  font-size: 16px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.drawer-title {
  font-size: 18px;
  font-weight: bold;
}

.drawer-controls {
  display: flex;
  align-items: center;
  gap: 10px;

  i {
    font-style: normal;
  }
}
.icon-plus,
.icon-fullscreen,
.icon-close {
  cursor: pointer;
  font-size: 22px;
  margin-right: 3px;
}

.icon-history {
  font-size: 16px;
  cursor: pointer;
  margin-right: 3px;
}

.ai-drawer-body {
  flex: 1;
  padding: 0; /* 移除内边距 */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 防止出现滚动条 */
}

.ai-chat-container {
  flex: 1;
  min-height: 200px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: visible; /* 修改为可见，让n-scrollbar处理滚动 */
  padding: 20px 10px; /* 将原来ai-drawer-body的内边距移到这里 */
  height: 100%; /* 确保高度占满 */
}

.ai-chat-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: visible; /* 修改为可见，让n-scrollbar处理滚动 */
}

/* 其他样式保持不变 */

.ai-robot-container {
  display: flex;
  align-items: center;

  flex-direction: column;
}

.ai-robot-image {
  width: 80px;
  height: 200px;
  object-fit: contain;
}

.ai-robot-greeting {
  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    color: #333;
    text-align: center;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    text-align: center;
  }
}

.ai-faq-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  max-width: 80%;
  margin: 0 auto;
}

.ai-faq-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  border: 1px solid #cbd6e7;

  &:hover {
    background: #e8f0ff;
  }
}

.ai-faq-question {
  font-size: 14px;
  color: #333;
}

.ai-faq-arrow {
  font-weight: bold;
}

.ai-chat-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%; /* 确保高度占满容器 */
}

.ai-message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  width: 100%;
}
.ai-message-actions {
  display: flex;
  margin-top: 8px;
  opacity: 1;
  transition: opacity 0.2s;
}

.ai-message:hover .ai-message-actions {
}

.ai-action-btn {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  margin-left: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #165dff;
  }

  &.active {
    color: #165dff;
  }

  &.copied {
    color: #52c41a; /* 绿色 */
  }
}

.ai-message-avatar {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar {
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.ai-message-content {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 10px;
  position: relative;
  margin: 0 10px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.ai-message-user {
  justify-content: flex-end;

  .ai-message-content {
    background-color: #4080ff;
    color: white;
    border-top-right-radius: 2px;
  }
}

.ai-drawer-footer {
  width: 100%;
  padding: 10px 15px;
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
  margin-bottom: 8px;

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

.n-input {
}

.ai-input {
  flex: 1;
  border: 1px solid transparent;
  box-shadow: none !important;

  :deep(.n-input__textarea-el) {
    padding: 6px 0;
    max-height: 125px;
    resize: none;
  }
}

.ai-send-btn {
  background: #4080ff;
  color: white;
  border: none;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #3070ee;
  }
}

.ai-tools {
  display: flex;
  justify-content: space-between;
}

.ai-tool-btn {
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;

  &:hover {
    color: #4080ff;
  }
}

.ai-loading-content {
  min-width: 60px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-loading-dots {
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #666;
    animation: dot-flashing 1s infinite alternate;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes dot-flashing {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

:deep(.n-drawer-body-content-wrapper) {
  overflow: hidden !important;
  padding: 0px 0px 24px 14px !important;
  margin-top: 10px;
}

:deep(.n-drawer-footer) {
  padding: 0px !important;
}
.message-text {
  margin: 0;
  font-family: inherit;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 14px;
  line-height: 1.5;
}

/* 添加历史记录覆盖层样式 */

.history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px 0px 0px;
}

.history-item {
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid #c9cdd4;
  flex-shrink: 0; /* 防止项目被压缩 */
  margin-bottom: 10px;

  &:hover {
    border: 1px solid #0052d9;

    .history-title {
      color: #0052d9;
    }
  }
  &.active {
    border: 1px solid #0052d9;

    .history-title {
      color: #0052d9;
    }
  }
}

.history-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-time {
  font-size: 12px;
  color: #999;
}

/* 全屏布局样式 */
.fullscreen-layout {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row; /* 确保是水平布局 */
  background: #fff;
}

.fullscreen-sidebar {
  width: 320px;
  border-right: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  padding: 16px 0px 16px 16px;
  background: #e8f3ff;
  height: 100%; /* 确保高度占满 */
  position: relative;

  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 16px;
    margin-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
    flex-direction: column;
  }
}

.fullscreen-content {
  flex: 1;
  // padding: 0 20px;
  display: flex;
  flex-direction: column;
  height: 100%; /* 确保高度占满 */

  &.with-sidebar {
    width: calc(100% - 320px);
  }
}

.fullscreen-content1 {
  flex: 1;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  height: 100%; /* 确保高度占满 */

  &.with-sidebar {
    width: calc(100% - 320px);
  }
}

:deep(.n-scrollbar) {
  height: 100%;
}

:deep(.n-scrollbar-container) {
  height: 100%;
}

.ai-companion-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: transform 0.3s;
  background: #143377;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.new-chat-button-container {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  width: 100%;
}

.new-chat-button {
  width: 80%;
  margin: 0 auto;
}

.sound-icon-mini {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  height: 100%;
}

.line-mini {
  width: 2px;
  background-color: #fff;
  height: 10px;
  animation: changeHeight 1s ease-in-out infinite alternate;
}

.line-mini:nth-child(1) {
  animation-delay: 0.5s;
}

.line-mini:nth-child(2) {
  animation-delay: 0s;
  height: 14px;
}

.line-mini:nth-child(3) {
  animation-delay: 0.8s;
}

@keyframes changeHeight {
  from {
    height: 6px;
  }
  to {
    height: 14px;
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
