<script setup>
import { ref } from 'vue';
import CircleChart from '../components/CircleChart.vue';
import DataTable from '../components/DataTable.vue';

const selectedDate = ref(null);
const totalStudents = ref(1234);
const inSchoolStudents = ref(345);
const activeStudents = ref(456);

const tableData = ref([
  {
    key: '1',
    unit: '计算机科学与技术学院（人工智能学院）',
    type: '本科生',
    total: '1234',
    inSchool: '345',
    active: '456',
    inactive: '111'
  },
  {
    key: '2',
    unit: '计算机科学与技术学院（人工智能学院）',
    type: '研究生',
    total: '567',
    inSchool: '234',
    active: '123',
    inactive: '111'
  },
  {
    key: '3',
    unit: '机械学院',
    type: '本科生',
    total: '890',
    inSchool: '456',
    active: '234',
    inactive: '222'
  },
  {
    key: '4',
    unit: '机械学院',
    type: '研究生',
    total: '345',
    inSchool: '234',
    active: '111',
    inactive: '123'
  }
]);

const columns = [
  {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '总人数',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: '在校人数',
    dataIndex: 'inSchool',
    key: 'inSchool',
  },
  {
    title: '活动人数',
    dataIndex: 'active',
    key: 'active',
  },
  {
    title: '在校但无活动人数',
    dataIndex: 'inactive',
    key: 'inactive',
  }
];

const handleDateChange = (date) => {
  selectedDate.value = date;
  // 这里可以添加获取数据的逻辑
};

const chartData = {
  total: totalStudents.value,
  inSchool: inSchoolStudents.value,
  active: activeStudents.value
};
</script>

<template>
  <div class="view-container">
    <div class="header">
      <h2>单位数据统计</h2>
      <a-date-picker
        v-model:value="selectedDate"
        @change="handleDateChange"
        placeholder="选择日期查看数据"
        class="date-picker"
      />
    </div>
    
    <div class="statistics-container">
      <div class="chart-container">
        <CircleChart chartId="undergraduateChart" :data="chartData" />
      </div>

      <div class="chart-container">
        <CircleChart chartId="graduateChart" :data="chartData" title ="研究生" />
      </div>
    </div>

    <div class="table-container">
      <DataTable :dataSource="tableData" :columns="columns" />
    </div>
  </div>
</template>

<style scoped>
.view-container {
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.statistics-container {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.chart-container {
  flex: 1;
  min-width: 300px;
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 24px;
}

/* .unit-title {
  margin: 0 0 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  cursor: help;
} */

.table-container {
  background: #fafafa;
  padding: 16px;
  border-radius: 4px;
  margin-top: 24px;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .view-container {
    padding: 16px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .date-picker {
    width: 100%;
  }

  .chart-container {
    min-width: 100%;
  }
}
</style>