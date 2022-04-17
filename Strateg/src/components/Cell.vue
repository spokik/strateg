<script setup lang="ts">
import { ref, computed } from "vue";
import { ICell } from "../models/ICell";
const emit = defineEmits(["activeCell"]);
const props = defineProps<{ cell: ICell }>();
const color = computed(() => props.cell.color);

function activeCell() {
  emit("activeCell", props.cell);
}
</script>

<template>
  <div class="cell" @click="activeCell">
    <!-- x - {{ cell.x }},<br />
    y - {{ cell.y }} -->
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/scss.scss";
.cell {
  width: 100%;
  height: 100%;
  background-color: v-bind("color");
}
</style>
