<script setup lang="ts">
import { ref, computed } from "vue";
import { ICell } from "../models/ICell";
import Cell from "./Cell.vue";

const props = defineProps<{ pool: Array<Array<ICell>>; player: string }>();
const emit = defineEmits(["playerChange"]);

const isAllSameColor = (el0, el1, el2, el3) => {
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

const gamePool = ref(props.pool);

const horizontal = (gamePool) => {
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
const vertical = (gamePool) => {
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
const diagonallyX = (gamePool) => {
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
const diagonallyY = (gamePool) => {
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
const checkPool = (gamePool) => {
  if (horizontal(gamePool)) {
    alert(`победил ${horizontal(gamePool)} horizontal`);
  } else if (vertical(gamePool)) {
    alert(`победил ${vertical(gamePool)} по vertical`);
  } else if (diagonallyX(gamePool)) {
    alert(`победил ${diagonallyX(gamePool)} по diagonallyX`);
  } else if (diagonallyY(gamePool)) {
    alert(`победил ${diagonallyY(gamePool)} по diagonallyY`);
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
