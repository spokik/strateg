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

<script setup lang="ts">
import { ref, computed } from "vue";
import { ICell } from "../models/ICell";
import Cell from "./Cell.vue";

const props = defineProps<{ pool: Array<Array<ICell>> }>();

const gamePool = ref(props.pool);

function setColor(event: ICell) {
  console.log(`на меня нажали x-${event.x}, y-${event.y}`);
  gamePool.value[event.y][event.x].color = "red";
}

const count = ref(0);
</script>

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
