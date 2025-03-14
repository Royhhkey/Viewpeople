<template>
    <div class="detail-container">
      <h1 class="page-title">无活动记录在校学生</h1>
      <div class="sub-header">
        <div class="date">{{ selectedDate }} 数据</div>
        <div class="unit">{{ unit }}</div>
      </div>
      <div class="table-container">

       <DataTable :dataSource="tableData" :columns="columns" />

      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import DataTable from '../components/DataTable.vue';
  import { getinactivestudent } from '../api/index';
  
  const route = useRoute();
  const unit = ref(route.query.unit || '');
  const selectedDate = ref(route.query.date || '');
  const DWDM = ref(route.query.DWDM || '');
  const LBDM = ref(route.query.LBDM || '');
  const authValue  =ref(route.query.qx || '')
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '25%'
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      width: '25%'
    },
    {
      title: '学生类别',
      dataIndex: 'LBDM',
      key: 'LBDM',
      width: '25%'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: '25%'
    }
  ];
  
  const tableData = ref([

  ]);
  const getdata  = async () => {
    const {data} = await getinactivestudent(selectedDate.value,6,DWDM.value,LBDM.value);
    // const {data} = await getinactivestudent(selectedDate.value,authValue.value,DWDM.value,LBDM.value);
    console.log(data);
    tableData.value =data.DATA.map((item, index) => ({
      key: item.ROWNUM,
      name: item.XM ,
      studentId: item.SFRZH,
      gender: item.XBDM == '1' ? '男' : '女',
      LBDM: item.LBDM == '03'? '本预科生' : '研究生'
  }));

  }
  
  onMounted(() => {
    // 这里可以添加获取详细数据的逻辑
    console.log(unit.value);
    console.log("selectedDate.value",selectedDate.value);
    console.log("DWDM.value",DWDM.value);
    console.log("LBDM.value",LBDM.value);
    console.log("authValue.value",authValue.value);
    getdata();
  });
  </script>
  
  <style scoped>
  .detail-container {
    padding: 24px;
    background: #fff;
    min-height: 100vh;
  }
  
  .page-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .sub-header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .date, .unit {
    font-size: 16px;
    margin: 8px 0;
    color: #666;
  }
  
  .table-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
  }
  
  :deep(.ant-table-thead > tr > th) {
    background: #fafafa;
    text-align: center;
  }
  
  :deep(.ant-table-tbody > tr > td) {
    text-align: center;
  }
  
  /* 移动端适配 */
  @media screen and (max-width: 768px) {
    .detail-container {
      padding: 0px;
    }
  
    .page-title {
      font-size: 20px;
    }
  
    .date, .unit {
      font-size: 14px;
    }
    .table-container {
    padding: 0px;
    /* margin-top: 3vw; */
    overflow-x: auto;
    white-space: nowrap;
  }
  }
  </style>