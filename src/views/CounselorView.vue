<script setup>
import { ref,onMounted } from 'vue';
import CircleChart from '../components/CircleChart.vue';
import DataTable from '../components/DataTable.vue';
import dayjs from 'dayjs';
import {gettable,getstudent } from '../api/index.js';
import {useRouter } from 'vue-router';
import { getSpecificAuth } from '../utils/auth';
const authValue = getSpecificAuth(['2','3']); 
const router = useRouter();
const selectedDate = ref(dayjs());
const chartTitle = ref('本科生');
const studentStats = ref({
  total: 0,
  inSchool: 0,
  active: 0
});
const tableData = ref([
]);
const columns = [
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
    title: '活动人数',
    dataIndex: 'active',
    key: 'active',
    width: '10%'
  },
  {
    title: '在校但无活动人数',
    dataIndex: 'inactive',
    key: 'inactive',
    width: '20%'
  }
];
const  handleCellClick = (record) => {
  console.log('record', record);
  const selectedData = tableData.value.find(item => item.key === record.key);
  if (selectedData) {
    router.push({
      path: '/detail',
      query: {
        unit: selectedData.unit,
        date: selectedDate.value.format('YYYY-MM-DD'),
        DWDM: selectedData.DWDM,
        qx: authValue
      }
    });
  }
};
// watchEffect(() => {
//   if (tableData.value && tableData.value.length > 0) {
//     studentStats.value = {
//       total: tableData.value.reduce((sum, item) => sum + Number(item.total), 0),
//       inSchool: tableData.value.reduce((sum, item) => sum + Number(item.inSchool), 0),
//       active: tableData.value.reduce((sum, item) => sum + Number(item.active), 0)
//     };
//   }
// });i
const infoStudent = async () => {
  const formattedDate = selectedDate.value.format('YYYY-MM-DD');
  if (!authValue) return;
  // const { data } = await getstudent(formattedDate, "6");

  const { data } = await getstudent(formattedDate, authValue);
  const studentType = data.DATA.BYKS ? 'BYKS' : 'YJS';
  const studentData = data.DATA[studentType];

  if (studentData) {
    studentStats.value = {
      total: studentData.ZRS,
      inSchool: studentData.ZXRS,
      active: studentData.ZXHDRS
    };
    chartTitle.value = studentData.XSLB;
  }
};
const InfoTable  =async()=>{
  const formattedDate = selectedDate.value.format('YYYY-MM-DD');
  if(authValue){
    const {data} = await gettable(formattedDate,authValue);
    // const {data} = await gettable(formattedDate,"6");

    tableData.value =data.DATA.map((item, index) => ({
        key: (index + 1).toString(),
        unit: item.DWMC,
        total: item.ZRS,
        inSchool: item.ZXRS,
        active: item.ZXHDRS,
        inactive: item.WHDRS
    }));
    console.log(data);
  }
}

const handleDateChange = (date) => {
  if (!date) {
    selectedDate.value = dayjs();
    return;
  } else {
    selectedDate.value = date;
  }
  // 这里可以添加获取数据的逻辑
  Init()
};
const Init  = ()=>{
  infoStudent()
  InfoTable();
}
onMounted(()=>{
  // InfoTable();
  Init()
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
        format="YYYY-MM-DD"
        :inputReadOnly="true"
        class="date-picker"
      />
    </div>
    
    <div class="statistics-container">
      <div class="chart-wrapper">

        <CircleChart chartId="undergraduateChart" :data="studentStats" :title="chartTitle"/>
      </div>
    </div>

    <div class="table-container">
      <DataTable :dataSource="tableData" :columns="columns"  @cell-click="handleCellClick"/>
    </div>
  </div>
</template>

<style scoped>
.view-container {
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  min-height: 100vh;

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
  background: #fafafa; 
  justify-content: center;

}

.chart-wrapper {
  flex: 1;
  max-width: calc(60% - 12px); 
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 24px;
}
.table-container{
  margin-top: 3vh;
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
  .table-container{
    margin-top: 1.2vh;
  }

}
</style>