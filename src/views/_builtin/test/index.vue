<template>
  <div class="container">
    <!-- 固定位置的元素 -->
    <div id="boxA" class="box">框A</div>
    <div id="boxB" class="box">框B</div>
    <div id="boxC" class="box">框C</div>

    <!-- 连接线 -->
    <d3Path
      sourceId="boxA"
      targetId="boxB"
      :lineConfig="{ color: '#42b983', type: 'solid' }"
    />
    <d3Path
      sourceId="boxC"
      targetId="boxB"
      :lineConfig="{ color: '#e53e3e', type: 'solid' }"
    />
  </div>
</template>

<script setup lang="ts">
import d3Path from './components/d3Path.vue';
</script>

<style scoped lang="scss">
.container {
  position: relative;
  width: 1000px;
  height: 600px;
  margin: 20px auto;
  background: #f5f5f5;
  border: 1px solid #eaeaea;
  border-radius: 4px;
}

.box {
  position: absolute;
  width: 120px;
  height: 60px;
  padding: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

#boxA { top: 100px; left: 150px; }
#boxB { top: 250px; left: 400px; }
#boxC { top: 400px; left: 150px; }
</style>
