<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="px-12px" :inverted="theme.header.inverted">
      <icon-local-avatar class="text-32px" />
      <span class="pl-8px text-16px font-medium">{{ auth.userInfo.realname }}</span>
    </hover-container>
  </n-dropdown>
  <n-modal v-model:show="showModal" :style="{ width: '500px' }" transform-origin="center" preset="card" :title="title"
    @after-leave="closeModal" :mask-closable="false">
    <n-form :model="formData" :rules="rules" ref="formRef" label-placement="left" label-width="auto"
      :label-style="{ width: '100px' }" require-mark-placement="left">
      <n-form-item label="用户名" path="realname">
        <n-input size="large" disabled v-model:value="formData.realname" placeholder="请输入省市名称" />
      </n-form-item>
      <n-form-item label="旧密码" v-if="!isFirstLogin" path="oldPassword">
        <n-input size="large" v-model:value="formData.oldPassword" placeholder="请输入旧密码" />
      </n-form-item>
      <n-form-item label="新密码" path="newPassword">
        <n-input size="large" v-model:value="formData.newPassword" placeholder="请输入新密码" />
      </n-form-item>
      <n-form-item label="确认新密码" path="confirmPassword">
        <n-input size="large" v-model:value="formData.confirmPassword" placeholder="请再次输入新密码" />
      </n-form-item>
    </n-form>
    <template #footer>
      <n-flex class="pb-12px" justify="end">
        <n-button type="primary" @click="submit">
          确认
        </n-button>
        <n-button @click="closeModal">
          取消
        </n-button>
      </n-flex>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { DropdownOption } from 'naive-ui';
import { useAuthStore, useThemeStore } from '@/store';
import { useIconRender } from '@/composables';
import { formRules } from '@/utils';
import { useMessage } from 'naive-ui'
import { postCrmUserResetPassByUser, postCrmUserJudgeUserFirstLogin } from '@/service'
import CryptoJS from 'crypto-js'
import { t } from '@/locales';
import {  REGEXP_PWD } from '@/config';
defineOptions({ name: 'UserAvatar' });
const showModal = ref(false);
const title=ref('修改密码')
const message = useMessage()
const isFirstLogin = ref(false)
const rules={
  oldPassword: { required: isFirstLogin.value ? false : true, message: '请输入旧密码',trigger:'blur' },
  // newPassword: formRules.pwd,
	newPassword:{ required: true , pattern: REGEXP_PWD, message: t('page.system.user.require_enter_pwd'), trigger: ['target', 'blur'] },
  confirmPassword: { required: true ,validator(rule,value){
		if (value!=formData.value.newPassword) {
			return new Error('两次密码不一致')
		} else {
			return true
		}
	},trigger:'blur'},
}
const auth = useAuthStore();
const initFormData = () => {
  return {
    userName: auth.userInfo.username,
    realname: auth.userInfo.realname,
    oldPassword: '',
    newPassword:'',
    confirmPassword:''
  };
};
const formData = ref(initFormData());
const theme = useThemeStore();
const { iconRender } = useIconRender();
const formRef=ref()
const options: DropdownOption[] = [
  {
    label: t('global.ChangePassword'),
    key: 'changePassword',
    icon: iconRender({ icon: 'carbon:user-avatar' })
  },
  {
    type: 'divider',
    key: 'divider'
  },
  {
    label:  t('global.Logout'),
    key: 'logout',
    icon: iconRender({ icon: 'carbon:logout' })
  }
];

type DropdownKey = 'user-center' | 'logout';

async function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  if (key === 'logout') {
    window.$dialog?.info({
      title: t('global.deletePrompt.title'),
      content: t('global.Areyousureyouwanttologout'),
      positiveText: t('global.confirm'),
      negativeText: t('global.cancel'),
      onPositiveClick: () => {
        auth.resetAuthStore();
      }
    });
  }
  if(key==='changePassword'){
    const params = { userName: auth.userInfo.username }
    let res = await postCrmUserJudgeUserFirstLogin(params)
    if(!res.error){
      isFirstLogin.value = res.data
    }
    showModal.value=true
    console.log('userInfo',auth.userInfo);

  }
}
function EncodePwd(pwd) {
	const md5=CryptoJS.MD5(pwd).toString().toLowerCase()
	return md5
}
const submit = () => {
    formRef.value?.validate(async (errors) => {
        let params={...formData.value}
        if (!isFirstLogin.value){
          params.oldPassword = EncodePwd(params.oldPassword)
        }else{
          delete params.oldPassword
        }
        params.newPassword=EncodePwd(params.newPassword)
        params.confirmPassword=EncodePwd(params.confirmPassword)
        let res=await postCrmUserResetPassByUser(params)
        if (!errors) {
            if (!res.error) {
                message.success('密码修改成功，请重新登录')
                closeModal()
                auth.resetAuthStore();
            }
        } else {
            console.log(errors)
        }
    })
    // console.log('formData提交', localDatatoAsyncData());
}
// 取消
const closeModal = () => {
    formData.value = initFormData()
    // formData.value.id=null
    showModal.value = false
}
</script>

<style scoped></style>
