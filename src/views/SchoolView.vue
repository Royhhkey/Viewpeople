<script setup>
import { ref ,onMounted } from 'vue';
import CircleChart from '../components/CircleChart.vue';
import DataTable from '../components/DataTable.vue';
import dayjs from 'dayjs';
import {gettable,getstudent} from '../api/index.js';
import { useRouter } from 'vue-router';
import {getSpecificAuth} from '../utils/auth.js';
const authValue =  ref(null);
const router = useRouter();
const disabledDate = (current) => {
  // 禁用今天之后的日期
  return current && current > dayjs().endOf('day');
};
const selectedDate = ref(dayjs());
const studentBK = ref({
  total: 0,
  inSchool: 0,
  active: 0,
  inactive: 0
});
const studentYJ = ref({
  total: 0,
  inSchool: 0,
  active: 0,
  inactive: 0
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
    width: '10%'
  }
];

const handleDateChange = (date) => {
  if (!date) {
    selectedDate.value = dayjs();
    return;
  } else {
    selectedDate.value = date;
  }
  // console.log("date",date);
  // 这里可以添加获取数据的逻辑
  Init()
};



const InfoTable  =async()=>{
  console.log("InfoTable");
  const formattedDate = selectedDate.value.format('YYYY-MM-DD');
  console.log("authValue",authValue.value);
  if(authValue.value){
    // const {data} = await gettable(formattedDate,"6");

    const {data} = await gettable(formattedDate,authValue.value);
    console.log("InfoTable",data);
    tableData.value =data.DATA.map((item, index) => ({
        key: (index + 1).toString(),
        unit: item.DWMC,
        total: item.ZRS,
        inSchool: item.ZXRS,
        active: item.ZXHDRS,
        inactive: item.WHDRS,
        DWDM : item.DWDM,
        LBDM :item.LBDM
    }));
    console.log("tableData",tableData.value);
  }
}
const InfoStudent  =async()=>{
  const formattedDate = selectedDate.value.format('YYYY-MM-DD');
  if (authValue.value) {
    const {data} = await getstudent(formattedDate,authValue.value);
    // const {data} = await getstudent(formattedDate,"6");

      // 安全访问本科生数据
    studentBK.value = {
      total: data?.DATA?.BYKS?.ZRS ?? 0,
      inSchool: data?.DATA?.BYKS?.ZXRS ?? 0,
      active: data?.DATA?.BYKS?.ZXHDRS ?? 0,
      inactive: data?.DATA?.BYKS?.WHDRS ?? 0
    };

    // 安全访问研究生数据
    studentYJ.value = {
      total: data?.DATA?.YJS?.ZRS ?? 0,
      inSchool: data?.DATA?.YJS?.ZXRS ?? 0,
      active: data?.DATA?.YJS?.ZXHDRS ?? 0,
      inactive: data?.DATA?.YJS?.WHDRS?? 0
    };
  }
}
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
        qx: authValue.value
      }
    });
  }
};

const Init =()=>{
  console.log("Init1212323");
  InfoTable();
  InfoStudent();
}
onMounted(async ()=>{
  authValue.value = await getSpecificAuth(['0', '4']);
  // console.log("authStore",authStore);
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
        class="date-picker"
         :inputReadOnly="true"
         :disabledDate="disabledDate"
      />
    </div>
    
    <div class="statistics-container">
      <div class="chart-wrapper">

        <CircleChart chartId="undergraduateChart" :data="studentBK" />
      </div>

      <div class="chart-wrapper">

        <CircleChart chartId="graduateChart" :data="studentYJ" title ="研究生" />
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
  flex-wrap: nowrap;
  margin-top: 24px;
}

.chart-wrapper {
  flex: 1;
  min-width: 150px;
  max-width: calc(50% - 12px);
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
  margin-bottom: 24px;
}

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

  .statistics-container {
    gap: 8px;
  }

  .chart-wrapper {
    padding: 5px;
    margin-bottom: 16px;
  }
}
</style>