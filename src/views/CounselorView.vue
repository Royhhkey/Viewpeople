<script setup>
import { ref } from 'vue';
import CircleChart from '../components/CircleChart.vue';
import DataTable from '../components/DataTable.vue';

const selectedDate = ref(null);
const class1Stats = ref({
  total: 1234,
  inSchool: 345,
  active: 456
});

const class2Stats = ref({
  total: 890,
  inSchool: 234,
  active: 123
});

const tableData = ref([
  {
    key: '1',
    class: '计算机学院一班',
    total: class1Stats.value.total,
    inSchool: class1Stats.value.inSchool,
    active: class1Stats.value.active,
    inactive: class1Stats.value.inSchool - class1Stats.value.active
  },
  {
    key: '2',
    class: '计算机学院二班',
    total: class2Stats.value.total,
    inSchool: class2Stats.value.inSchool,
    active: class2Stats.value.active,
    inactive: class2Stats.value.inSchool - class2Stats.value.active
  }
]);

const columns = [
  {
    title: '班级',
    dataIndex: 'class',
    key: 'class',
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
</script>

<template>
  <div class="view-container">
    <div class="header">
      <h2>辅导员数据统计</h2>
      <a-date-picker
        v-model:value="selectedDate"
        @change="handleDateChange"
        placeholder="选择日期查看数据"
        class="date-picker"
      />
    </div>
    
    <div class="statistics-container">
      <div class="chart-container">
        <div class="chart">
          <CircleChart chartId="counselorChart1" :data="class1Stats" />
        </div>
      </div>

      <div class="chart-container">
        <div class="chart">
          <CircleChart chartId="counselorChart2" :data="class2Stats" />
        </div>
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
  margin-bottom: 24px;
}

.chart {
  margin-top: 16px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-container {
  background: #fafafa;
  padding: 16px;
  border-radius: 4px;
  margin-top: 24px;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .view-container {
    padding: 3vw;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 2vw;
  }

  .date-picker {
    width: 100%;
  }

  .chart-container {
    min-width: 100%;
    padding: 2vw;
    margin-bottom: 3vw;
  }

  .table-container {
    margin-top: 2vw;
    padding: 2vw;
    overflow-x: auto;
  }
}
</style>