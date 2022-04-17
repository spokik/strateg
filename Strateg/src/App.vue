<script setup lang="ts">
import PlayingFieldVue from "./components/PlayingField.vue";
import { ref, computed } from "vue";
import { Pool } from "./models/ICell";
//генерирует стартовое поле
function genStartPool(collom: number = 7, line: number = 6): Pool {
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
const gameCounter = ref(0);
let pool = ref(genStartPool());
let clearPool = ref(false);
const isPlayerRed = ref<boolean>(true);
const player = ref("red");
function playerChange() {
  isPlayerRed.value = !isPlayerRed.value;
  isPlayerRed.value ? (player.value = "red") : (player.value = "yellow");
}
const endGame = (event: [string, string, Array<Array<number>>]) => {
  if (event[0] === "red") {
    wins.value.red++;
    console.log(`победил ${event[0]} по ${event[1]}`);
    isPlayerRed.value = false;
    playerChange();
  } else {
    wins.value.yellow++;
    console.log(`победил ${event[0]} по ${event[1]}`);
    isPlayerRed.value = true;
    playerChange();
  }
  gameCounter.value++;
  clearPool.value = !clearPool;
  pool.value = genStartPool();
};
</script>

<template>
  <div class="wrapper">
    Победы: Красный: {{ wins.red }} Желтый: {{ wins.yellow }}
    <div>Сейчас ходит : {{ player }}</div>
    <button @click="">Сбрость игру</button>
    <PlayingFieldVue
      :pool="pool"
      :player="player"
      :clear-pool="gameCounter"
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
