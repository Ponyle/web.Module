<template>
  <div class="relative flex-y-center justify-around wh-full">
    <transition
      >
      <component :is="onefooter"  />
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { router } from '@/router';
import { useRouteStore } from '@/store';
import {  onefooter } from './component/index';
import { twoindex } from './components/two/index';
const routeStore = useRouteStore();
const hostname = window.location.hostname;
const props = defineProps({
  cstyle: {
    type: Array
  },
  themeSet: Object
});
console.log(props.themeSet, 'themeSetsthemeSetsthemeSets');
console.log(props.cstyle, props.themeSet, 'headercss的值');

const schoolmsg = ref({});

// const themenum = routeStore.$state.themenum

const bg = ref('323232');

async function init() {
  // if(routertab.params.module == 'yzm-login'){
  // 	setmsg()
  // }
  // 	async function Uninfo(){
  // }
}

onMounted(() => {
  init();
});
</script>

<style scoped lang=""></style>
