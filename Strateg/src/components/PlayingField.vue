<script setup lang="ts">
import { ref, watch } from "vue";
import { ICell, Pool } from "../models/ICell";
import Cell from "./Cell.vue";

const props = defineProps<{ pool: Pool; player: string; clearPool: number }>();
const emit = defineEmits(["playerChange", "endGame"]);

const isAllSameColor = (el0: string, el1: string, el2: string, el3: string) => {
  if ([el0, el1, el2, el3].includes("white")) {
    return false;
  } else {
    if ([el0, el1, el2, el3].every((el) => el === "red")) {
      return el0;
    } else if ([el0, el1, el2, el3].every((el) => el === "yellow")) {
      return el0;
    }
  }
};
let gamePool = ref(props.pool);

watch(
  () => props.clearPool,
  () => {
    resetGamePool();
  }
);

const resetGamePool = () => {
  gamePool.value = props.pool;
};

const horizontal = (gamePool: Pool) => {
  for (let y = 0; y <= 5; y++) {
    for (let x = 0; x < 4; x++) {
      let result = isAllSameColor(
        gamePool[y][x].color,
        gamePool[y][x + 1].color,
        gamePool[y][x + 2].color,
        gamePool[y][x + 3].color
      );
      if (result) {
        return result;
      }
    }
  }
};
const vertical = (gamePool: Pool) => {
  for (let x = 0; x <= 6; x++) {
    for (let y = 0; y < 3; y++) {
      let result = isAllSameColor(
        gamePool[y][x].color,
        gamePool[y + 1][x].color,
        gamePool[y + 2][x].color,
        gamePool[y + 3][x].color
      );
      if (result) {
        return result;
      }
    }
  }
};
const diagonallyX = (gamePool: Pool) => {
  for (let x = 3; x <= 6; x++) {
    for (let y = 0; y < 3; y++) {
      let result = isAllSameColor(
        gamePool[y][x].color,
        gamePool[y + 1][x - 1].color,
        gamePool[y + 2][x - 2].color,
        gamePool[y + 3][x - 3].color
      );
      if (result) {
        return result;
      }
    }
  }
};
const diagonallyY = (gamePool: Pool) => {
  for (let x = 0; x <= 3; x++) {
    for (let y = 0; y < 3; y++) {
      let result = isAllSameColor(
        gamePool[y][x].color,
        gamePool[y + 1][x + 1].color,
        gamePool[y + 2][x + 2].color,
        gamePool[y + 3][x + 3].color
      );
      if (result) {
        return result;
      }
    }
  }
};
const checkPool = (gamePool: Pool) => {
  if (horizontal(gamePool)) {
    console.log(`победил ${horizontal(gamePool)} horizontal`);
    emit("endGame", horizontal(gamePool));
  } else if (vertical(gamePool)) {
    console.log(`победил ${vertical(gamePool)} по vertical`);
    emit("endGame", vertical(gamePool));
  } else if (diagonallyX(gamePool)) {
    console.log(`победил ${diagonallyX(gamePool)} по diagonallyX`);
    emit("endGame", diagonallyX(gamePool));
  } else if (diagonallyY(gamePool)) {
    console.log(`победил ${diagonallyY(gamePool)} по diagonallyY`);
    emit("endGame", diagonallyY(gamePool));
  }
};

function setColor(event: ICell) {
  let i = 5;
  let stoped = true;

  //Ставим шарик в нюжнюю ячейку
  while (i >= 0 && stoped) {
    if (gamePool.value[i][event.x].color === "white") {
      gamePool.value[i][event.x].color = props.player;
      stoped = false;
      emit("playerChange");
    }
    i--;
  }
  //Проерка поля на наличие выигрешных комбинаций
  checkPool(gamePool.value);
}

const count = ref(0);
</script>

<template>
  <div class="field">
    <div
      v-for="(line, indexLine) in gamePool"
      :key="indexLine"
      class="field__line"
    >
      <Cell
        v-for="(cell, indexCell) in line"
        :key="indexCell"
        class="field__circle"
        :cell="cell"
        @active-cell="setColor"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/scss.scss";

.field {
  padding: rem(20px);
  width: rem(800px);
  height: rem(500px);
  background-color: rgb(30, 88, 214);
  &__line {
    display: flex;
    justify-content: center;
  }
  &__circle {
    margin: rem(5px);
    display: block;
    width: rem(50px);
    height: rem(50px);

    border-radius: 50%;
  }
}
</style>
