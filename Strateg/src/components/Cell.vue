<template>
  <div class="cell"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ICell } from "../models/ICell";

const props = defineProps<{ cell: ICell }>();
const color = props.cell.color;
const count = ref(0);
</script>

<style lang="scss" scoped>
@import "@/assets/css/scss.scss";
.cell {
  width: 100%;
  height: 100%;
  background-color: v-bind("color");
}
</style>
