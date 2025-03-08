<script setup>
import { ref ,onMounted} from 'vue';
import CircleChart from '../components/CircleChart.vue';
import DataTable from '../components/DataTable.vue';

import {getdata} from '../api/index.js';

const selectedDate = ref(null);
const totalStudents = ref(1234);
const inSchoolStudents = ref(345);
const activeStudents = ref(456);
const tableData = ref([
  {
    key: '1',
    unit: '电信',
    total: '1234',
    inSchool: '123',
    active: '123',
    inactive: '123'
  },
  {
    key: '2',
    unit: '文传',
    total: '12345',
    inSchool: '123',
    active: '',
    inactive: ''
  },
  {
    key: '3',
    unit: '电子信息工程学院',
    total: '12345',
    inSchool: '123',
    active: '',
    inactive: ''
  }
]);

const columns = [
  {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
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
onMounted(()=>{
  test();
})


</script>

<template>
  <div class="view-container">
    <div class="header">
      <h2>按日统计</h2>
      <a-date-picker
        v-model:value="selectedDate"
        @change="handleDateChange"
        placeholder="选择日期查看数据"
        class="date-picker"
      />
    </div>
    
    <div class="statistics-container">
      <div class="chart-wrapper">

        <CircleChart chartId="undergraduateChart" :data="chartData" />
      </div>

      <div class="chart-wrapper">

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
}

.chart-wrapper {
  flex: 1;
  min-width: 300px;
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
  margin-bottom: 24px;
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
    background: #fafafa;
    padding: 2vw;
    border-radius: 4px;
    margin-top: 2vw;
    /* margin-top: 24px; */
  }
}
</style>