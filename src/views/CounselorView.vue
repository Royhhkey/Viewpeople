<script setup>
import { ref,onMounted ,watchEffect} from 'vue';
import CircleChart from '../components/CircleChart.vue';
import DataTable from '../components/DataTable.vue';
import dayjs from 'dayjs';
import {gettable} from '../api/index.js';
import {useRouter } from 'vue-router';
const router = useRouter();
const selectedDate = ref(dayjs());
const studentStats = ref({
  total: 1234,
  inSchool: 345,
  active: 456
});
const tableData = ref([
  // {
  //   key: '1',
  //   unit: '电信qwewqeqwewqeeqwew',
  //   total: '12340000000',
  //   inSchool: '12300000000',
  //   active: '1230000000',
  //   inactive: '1230000000'
  // },
  // {
  //   key: '2',
  //   unit: '联通qweXXXXXXXXXXXXXXXXXXXXXXXX',
  //   total: '456000',
  //   inSchool: '45',
  //   active: '45',
  //   inactive: '45'
  // },
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
  router.push({ 
    path: '/detail' ,
    query: { 
      unit: record.unit,
      date: selectedDate.value.format('YYYY-MM-DD')
     }
  });
};
// watchEffect(tableData,() => {

// });
watchEffect(() => {
  if (tableData.value && tableData.value.length > 0) {
    studentStats.value = {
      total: tableData.value.reduce((sum, item) => sum + Number(item.total), 0),
      inSchool: tableData.value.reduce((sum, item) => sum + Number(item.inSchool), 0),
      active: tableData.value.reduce((sum, item) => sum + Number(item.active), 0)
    };
  }
});
const InfoTable  =async()=>{
  const formattedDate = selectedDate.value.format('YYYY-MM-DD');
  const {data} = await gettable(formattedDate);
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
  if (!date) {
    selectedDate.value = dayjs();
    return;
  } else {
    selectedDate.value = date;
  }
  // 这里可以添加获取数据的逻辑
  InfoTable();

};
onMounted(()=>{
  InfoTable();
})
</script>

<template>
  <div class="view-container">
    <div class="header">
      <h2>单位数据统计</h2>
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

        <CircleChart chartId="undergraduateChart" :data="studentStats" />
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
}

.chart-wrapper {
  flex: 1;
  min-width: 300px;
  padding: 16px;
  /* #fafafa */
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

}
</style>