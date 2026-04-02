<template>
  <div class="headers">
    <div class="header-container">
      <!-- Logo区域 -->
      <div class="logo-section" @click="toindex">
        <img src="@/assets/images/logo.svg" alt="logo" class="logo-img" />
      </div>

      <!-- 导航菜单 -->


      <!-- 右侧用户区域 -->
      <div class="user-section">
        <template v-if="userls.userInfo.token">
          <div v-if="!isHomePage" class="nav-link" @click="toindex">返回首页</div>
          <div class="nav-link" @click="toMyScore" v-if="!isScore">个人成绩</div>

          <n-dropdown :options="option" @select="handleSelect">
            <div class="user-info">
              <img class="user-avatar" src="@/assets/images/mengoo/Avatar.svg" @error="handleImageError" />
              <span class="username">{{ userls.userInfo?.realname || '用户' }}</span>
            </div>
          </n-dropdown>
        </template>

      </div>
    </div>

    <n-modal v-model:show="logoutmodel" preset="dialog" title="Dialog">
      <template #header>
        <div>注销</div>
      </template>
      <h1>确定要退出吗</h1>
      <template #action>
        <n-button type="info" @click="clearAuthStorage">确定</n-button>
        <n-button @click="logoutmodel = false">取消</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { useRouterPush } from '@/composables';
import { routeName } from '@/router';
import { computed, ref, onMounted, onActivated } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMessage, useNotification, NButton, NDropdown, NModal } from 'naive-ui';
import CryptoJS from 'crypto-js';
import { useAuthStore, useRouteStore } from '@/store';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const { routerPush } = useRouterPush();

// 判断是否为首页
const isHomePage = computed(() => route.path === '/');
const isScore = computed(() => route.path === '/MyScore');

const logoutmodel = ref(false);
const userls = ref(auth);
console.log(userls,'userls')
const option = ref<Array<{ label: string; key: string }>>([]);

function submit() {
  const redurl = router.currentRoute.value.fullPath;
  routerPush({ name: routeName('login'), query: { redirect: redurl } });
}

function toindex() {
  const query = route.query.id ? { id: route.query.id } : {};
  routerPush({ name: routeName('Mengoo'), query });
}

function toMyScore() {
  const query = route.query.id ? { id: route.query.id } : {};
  router.push({ path: '/MyScore', query });
}

async function clearAuthStorage() {
  auth.resetAuthStore();
}

function rolemenu() {
  if (userls.value.userInfo.rolename === 'SysAdmin' || userls.value.userInfo.rolename === 'SchoolAdmin') {
    option.value = [
      // {
      //   label: '个人中心',
      //   key: 'per'
      // },
      {
        label: '后台管理',
        key: 'back'
      },
      {
        label: '退出登录',
        key: 'logout'
      }
    ];
  } else {
    option.value = [
      // {
      //   label: '个人中心',
      //   key: 'per'
      // },
      {
        label: '退出登录',
        key: 'logout'
      }
    ];
  }
}

function handleSelect(key: string) {
  if (key === 'logout') {
    logoutmodel.value = true;
  } else if (key === 'per') {
    router.push('/MyCourse');
  } else if (key === 'back') {
    window.open('/about', '_blank');
  }
}


function handleImageError(e: Event) {
  const target = e.target as HTMLImageElement;
  // 替换为你的默认头像路径（去掉src，Vite会自动处理）
  target.src = '/assets/images/mengoo/Avatar.svg';
  // 防止默认图片也加载失败导致无限循环
  target.onerror = null;
}
onMounted(() => {
  rolemenu();
})
</script>

<style scoped lang="scss">
.headers {
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 999;
}

.header-container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 64px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  .logo-img {
    height: 40px;
    width: auto;
  }

  .logo-text {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
}

.nav-menu {
  flex: 1;
  margin: 0 40px;

  :deep(.n-menu) {
    background: transparent;
  }

  :deep(.n-menu-item) {
    height: 64px;
    line-height: 64px;
  }
}

.user-section {
  display: flex;
  align-items: center;
  gap: 16px;

  .nav-link {
    cursor: pointer;
    font-size: 14px;
    color: #333;
    padding: 8px 12px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      color: #2971dd;
      background: #f5f5f5;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background 0.3s;

    &:hover {
      background: #f5f5f5;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .username {
      font-size: 14px;
      color: #333;
    }
  }

  .login-btn {
    font-size: 14px;
    color: #666;

    &:hover {
      color: #2971dd;
    }
  }
}
</style>
