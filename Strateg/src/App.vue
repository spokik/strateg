<script setup lang="ts">
import PlayingFieldVue from "./components/PlayingField.vue";
import { ref, computed } from "vue";

//генерирует стартовое поле
function genStartPool(collom: number = 7, line: number = 6) {
  let startArr = new Array(line);
  for (let lineCell = 0; lineCell < startArr.length; lineCell++) {
    let lineArr = new Array(collom);
    for (let collomCell = 0; collomCell < collom; collomCell++) {
      lineArr[collomCell] = { x: collomCell, y: lineCell, color: "white" };
    }
    startArr[lineCell] = lineArr;
  }
  return startArr;
}
const wins = ref({ red: 0, yellow: 0 });
const pool = ref(genStartPool());
const isPlayerRed = ref<boolean>(true);
const player = ref("red");
function playerChange() {
  isPlayerRed.value = !isPlayerRed.value;
  isPlayerRed.value ? (player.value = "red") : (player.value = "yellow");
}
const endGame = (event: string) => {
  if (event === "red") {
    wins.value.red++;
  } else {
    wins.value.yellow++;
  }
  pool.value = genStartPool();
};
</script>

<template>
  <div class="wrapper">
    Победы: Красный: {{ wins.red }} Желтый: {{ wins.yellow }}
    <div>Сейчас ходит : {{ player }}</div>

    <PlayingFieldVue
      :pool="pool"
      :player="player"
      @player-change="playerChange"
      @end-game="endGame"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
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
