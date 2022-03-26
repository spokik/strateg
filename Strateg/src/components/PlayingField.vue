<template>
  <div class="field">
    <div v-for="(line, indexLine) in pool" :key="indexLine" class="field__line">
      <Cell
        v-for="(cell, indexCell) in line"
        :key="indexCell"
        class="field__circle"
        :cell="cell"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ICell } from "../models/ICell";
import Cell from "./Cell.vue";

defineProps<{ pool: Array<Array<ICell>> }>();

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
