<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  dataSource: {
    type: Array,
    required: true,
    default: () => []
  },
  columns: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<template>
  <div class="table-container">
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'unit'">
          单位
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.table-container {
  /* margin-top: 24px; */
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>