<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import PlayingFieldVue from "./components/PlayingField.vue";

function genStartPool(collom: number = 7, line: number = 6) {
  // let startArr: Array<Array<Object>> = [[{}]];
  let startArr = new Array(line);

  for (let lineCell = 0; lineCell < startArr.length; lineCell++) {
    let lineArr = new Array(collom);
    for (let collomCell = 0; collomCell < collom; collomCell++) {
      // startArr[lineCell][collomCell] = { x: collomCell, y: lineCell };
      lineArr[collomCell] = { x: collomCell, y: lineCell, color: "white" };
    }
    startArr[lineCell] = lineArr;
  }
  return startArr;
}
const pool = genStartPool();
pool[5][0].color = "red";
</script>

<template>
  <div class="wrapper">
    <PlayingFieldVue :pool="pool" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
