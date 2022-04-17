<script setup lang="ts">
import { ref, computed } from "vue";
import { ICell } from "../models/ICell";
import Cell from "./Cell.vue";

const props = defineProps<{ pool: Array<Array<ICell>>; player: string }>();
const emit = defineEmits(["playerChange"]);

const gamePool = ref(props.pool);

function setColor(event: ICell) {
  let i = 5;
  let stoped = true;
  while (i >= 0 && stoped) {
    if (gamePool.value[i][event.x].color === "white") {
      console.log("123");
      gamePool.value[i][event.x].color = props.player;
      stoped = false;
      emit("playerChange");
    }
    i--;
  }
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
