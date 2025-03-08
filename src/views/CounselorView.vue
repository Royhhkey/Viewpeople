<script setup>
import { ref,onMounted } from 'vue';
import CircleChart from '../components/CircleChart.vue';
import DataTable from '../components/DataTable.vue';

import {getdata} from '../api/index.js';

const selectedDate = ref(null);
const studentStats = ref({
  total: 1234,
  inSchool: 345,
  active: 456
});
const tableData = ref([]);
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width: '10%'
  },
  {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
    width: '20%'
  },
  {
    title: '总人数',
    dataIndex: 'total',
    key: 'total',
    width: '10%'
  },
  {
    title: '在校人数',
    dataIndex: 'inSchool',
    key: 'inSchool',
    width: '10%'
  },
  {
    title: '活跃人数',
    dataIndex: 'active',
    key: 'active',
    width: '10%'
  },
  {
    title: '非活跃人数',
    dataIndex: 'inactive',
    key: 'inactive',
    width: '10%'
  }
];

const test  =async()=>{
  const {data} = await getdata('2023-06-01');
  tableData.value =data.DATA.map((item, index) => ({
      key: (index + 1).toString(),
      unit: item.STU_TYPE,
      total: item.STU_TOTAL,
      inSchool: item.STU_SCHOOL,
      active: item.STU_ACTIVE,
      inactive: item.STU_NEGATIVE
  }));
  console.log(data);
}

const handleDateChange = (date) => {
  selectedDate.value = date;
  // 这里可以添加获取数据的逻辑
};
onMounted(()=>{
  test();
})
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
        <CircleChart chartId="class1Chart" :data="studentStats" />
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
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.data-item {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.label {
  color: #666;
}

.value {
  font-weight: bold;
  color: #1890ff;
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
    overflow-x: auto;
}
}
</style>