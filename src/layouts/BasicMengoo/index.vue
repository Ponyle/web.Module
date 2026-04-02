<template>
  <div id="MengooMain">
    <!-- <div>
      <transition appear>
        <component
          :is="HeaderTop"
          id="HeaderTop"
          :style="style"
          :routerpath="routerpath"
          :cstyle="cstyle"
        />

      </transition>
    </div> -->

    <div
      :class="
        routerpath !== '/login'
          ? 'transition duration-300 ease-in-out'
          : 'relative flex-y-center justify-around wh-full'
      "
    >
      <router-view v-slot="{ Component, route }">
        <transition appear>
          <keep-alive :include="routeStore.cacheRoutes">
            <component
              :is="Component"
              :key="route.fullPath"
            />
          </keep-alive>
        </transition>
      </router-view>

      <!-- <Foot-bottom v-if="routerpath !== '/login'" :cstyle="cstyle"></Foot-bottom> -->
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import {  } from '@/service';
import { useAppStore, useRouteStore, useThemeStore, useAuthStore } from '@/store';
import { localStg, guid, sessionStg } from '@/utils';
import HeaderTop from '@/views/_builtin/Mengoo/HeaderTop/index.vue';
// import CheaderTop from '@/views/_builtin/Customize/HeaderTop/index.vue';
import FootBottom from '@/views/_builtin/Mengoo/FootBottom/index.vue';
// import { a } from '@unocss/preset-mini/dist/utilities-10273596';
const secondUrl = import.meta.env.VITE_TEST_URL;
import { Domain } from 'domain';
defineOptions({ name: 'GlobalContent' });
const TaskTipRef = ref();

const cstyle = ref();
const themeSets = ref(null);
async function iszdy() {
  cstyle.value = sessionStg.get('csstyle');

  if (!cstyle.value) {
    cstyle.value = [
      {
        HeaderConfig: {
          isModel: false,
          path: 'test',
          LogoStyle: {
            bgColor: '#fff',
            textColor: '#333',
            height: 100,
            imgheight: 60
          },
          TabStyle: {
            bgColor: '#0b6cb8',
            textColor: '#fff',
            activeColor: '#f90',
            height: 47,
            fontSize: 16,
            marginRight: 30
          }
        }
      }
    ];
  } else {
  }
}

iszdy();

// const themeSet = sessionStg.get('schoolInfo').themeSet


interface Props {
  /** 显示padding */
  showPadding?: boolean;
}

withDefaults(defineProps<Props>(), {
  showPadding: true
});

const app = useAppStore();
const theme = useThemeStore();
const routeStore = useRouteStore();
console.log(routeStore, 'routeStorerouteStore');
routeStore.cacheRoutes.push('Mengoo_CurriculumInfo');
const style = reactive({
  backgroundColor: 'rgba(255,255,255,0.5)',
  boxShadow: '',
  overflow: 'hidden'
});

// const HeaderConfig = config.HeaderConfig
// console.log(HeaderConfig,"???1111111111111")

const auth = useAuthStore();

const customize = ref('');
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  // 设置背景颜色的透明读
  if (scrollTop) {
    style.backgroundColor = `#fff`;
    style.boxShadow = `0px 4px 10px rgba(162, 162, 162, 0.25)`;
  } else if (scrollTop == 0) {
    style.backgroundColor = 'rgba(255,255,255,0.5)';
    style.boxShadow = '';
  }
};
onMounted(() => {
  routeStore.cacheRoutes.push('Mengoo_Course');
  routeStore.cacheRoutes.push('Mengoo_JcCourse');

  window.addEventListener('scroll', handleScroll);
});

const routerpath = ref();
const domainpath = ref([]);

const router = useRouter();

watch(
  () => router.currentRoute.value.path,
  toPath => {
    routerpath.value = toPath;
    console.log('顶部', routerpath.value);
  },
  { immediate: true, deep: true }
);

async function Uninfo() {
  const res = await OrgInfos();
  if (!res.error) {
    localStg.set('schoolInfo', res.data);
    auth.$state.schoolmsg = res.data;

    themeSets.value = res.data.themeSet || {};
    changeicon();
    document.title = res.data.platformName;

  } else {
    errormsg();

    // window.$message?.error("短信/扫码开关获取失败")
  }
}

// 获取自定义路由json
async function getjson() {
  const res = await axios.get('/src/assets/js/htmlrouter.json');
  console.log(res, 'res');
  for (let i = 0; i < res.data.datas.length; i++) {
    const DomainUrl = window.location.hostname;

    if (DomainUrl === res.data.datas[i].key) {
      // routeStore.setcustom(res.data.datas[i].headlogo)
      domainpath.value = [res.data.datas[i]];
    } else {
    }
  }
  console.log(domainpath.value, 'domainpathdomainpathdomainpath1');
}

function changeicon() {
  const $favicon = document.querySelector('link[rel="icon"]');
  if ($favicon !== null) {
    $favicon.href = secondUrl + auth.$state.schoolmsg.iconURL;
  }
}

function errormsg() {
  const DomainUrl = window.location.hostname;
  console.log(DomainUrl, 'DomainUrl');
  if (DomainUrl === 'zcmu.yxsypt.com' || DomainUrl === 'gmu.yxsypt.com') {
    window.open('/Maintain', '_self');
  }
}

const userInfo = localStg.get('userInfo');
async function init() {

}

onMounted(() => {
  init();
});
</script>

<style scoped>
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@media screen and (min-width: 0px) and (max-width: 1410px) {
  .n-config-provider > div {
  }
}

@media screen and (min-width: 1410px) and (max-width: 1920px) {
  .n-config-provider > div {
    overflow: hidden;
  }
}

.dark {
}
</style>
