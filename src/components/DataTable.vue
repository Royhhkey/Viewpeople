<script setup>
import { defineProps ,defineEmits} from 'vue';

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

const emit = defineEmits(['cellClick']);

const handleCellClick = (record, column) => {
  console.log('clicked', record, column);
  if (column.key === 'inactive') {
    // 处理点击事件
    // emit('cellClick');
    emit('cellClick', record);
  }
};

</script>

<template>
  <div class="table-container">
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'unit'">
          单位
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'inactive'">
          <span 
            class="clickable-cell"
            @click="handleCellClick(record, column)"
          >
            {{ record.inactive }}
          </span>
        </template>
      </template>

    </a-table>
  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}
.clickable-cell {
  cursor: pointer;
  /* color: #1890ff; */
}

:deep(.ant-table) {
  background: #fff;
}

:deep(.ant-table-container) {
  border-radius: 4px;
  overflow: hidden;
}

:deep(.ant-table-content) {
  overflow-x: auto;
}
</style>