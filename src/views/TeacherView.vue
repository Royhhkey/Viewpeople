<script setup>
import { ref,onMounted } from 'vue';
import CircleChart from '../components/CircleChart.vue';
import DataTable from '../components/DataTable.vue';
import dayjs from 'dayjs';
import {gettable  ,getstudent} from '../api/index.js';
import {useRouter } from 'vue-router';
import  {getSpecificAuth } from '../utils/auth.js';
const authValue = getSpecificAuth(['5']); 
const router = useRouter();
const selectedDate = ref(dayjs());
const studentStats = ref({
  total: 1234,
  inSchool: 345,
  active: 456
});
const  chartTitle  = ref('本科生');
const tableData = ref([
]);
const columns = [
  {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
    width: '20vw'
  },
  {
    title: '总人数',
    dataIndex: 'total',
    key: 'total',
    width: '10vw'
  },
  {
    title: '在校人数',
    dataIndex: 'inSchool',
    key: 'inSchool',
    width: '10vw'
  },
  {
    title: '活动人数',
    dataIndex: 'active',
    key: 'active',
    width: '10vw'
  },
  {
    title: '在校但无活动人数',
    dataIndex: 'inactive',
    key: 'inactive',
    width: '20vw'
  }
];
// watchEffect(() => {
//   if (tableData.value && tableData.value.length > 0) {
//     studentStats.value = {
//       total: tableData.value.reduce((sum, item) => sum + Number(item.total), 0),
//       inSchool: tableData.value.reduce((sum, item) => sum + Number(item.inSchool), 0),
//       active: tableData.value.reduce((sum, item) => sum + Number(item.active), 0)
//     };
//     console.log("studentStats.value",studentStats.value);
//   }
// });
const InfoStudent = async () => {
  const formattedDate = selectedDate.value.format('YYYY-MM-DD');
  if (!authValue) return;

  const { data } = await getstudent(formattedDate, authValue);
  const studentType = data.DATA.BKS ? 'BKS' : 'YJS';
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
  if (authValue) {
    console.log("authValue",authValue);
    // const { data } = await gettable(formattedDate, authValue);
    const {data} = await gettable(formattedDate,"6");
    tableData.value = data.DATA.map((item, index) => ({
      key: (index + 1).toString(),
      unit: item.DWMC,
      total: item.ZRS,
      inSchool: item.ZXRS,
      active: item.ZXHDRS,
      inactive: item.WHDRS
    }));
  }
}

const Init  = ()=>{
  InfoTable()
  InfoStudent()

}

const handleDateChange = (date) => {
  if (!date) {
    selectedDate.value = dayjs();
    return;
  } else {
    selectedDate.value = date;
  }
  // 这里可以添加获取数据的逻辑
  Init();
};
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
onMounted(()=>{
  Init();
})
</script>

<template>
  <div class="view-container">
    <div class="header">
      <h2>班导师数据统计</h2>
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
      <div class="chart-container">
        <CircleChart chartId="class1Chart" :data="studentStats" :title="chartTitle"/>
      </div>

    </div>
    <div class="table-container">
      <DataTable :dataSource="tableData" :columns="columns" @cell-click="handleCellClick" />
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
}

.chart-container {
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
}
</style>