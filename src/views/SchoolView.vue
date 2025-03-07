<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

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

const initChart = (chartId, data) => {
  const chartDom = document.getElementById(chartId);
  const myChart = echarts.init(chartDom);
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 人',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#eee',
      borderWidth: 1,
      textStyle: {
        color: '#666'
      }
    },
    legend: {
      orient: 'horizontal',
      left: '0%',
      top: '0%',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#666',
        fontSize: 12
      },
      itemGap: 16
    },
    series: [
      {
        name: '总人数',
        type: 'pie',
        radius: ['75%', '80%'],
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          scale: true,
          scaleSize: 5,
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            formatter: '{b}\n{c} 人'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { 
            value: data.total, 
            name: '总人数', 
            itemStyle: { 
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#1890ff'
                }, {
                  offset: 1, color: '#36cfc9'
                }]
              }
            } 
          }
        ],
        startAngle: 90,
        endAngle: 450,
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      },
      {
        name: '在校人数',
        type: 'pie',
        radius: ['60%', '65%'],
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          scale: true,
          scaleSize: 5,
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            formatter: '{b}\n{c} 人'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { 
            value: data.inSchool, 
            name: '在校人数', 
            itemStyle: { 
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#52c41a'
                }, {
                  offset: 1, color: '#95de64'
                }]
              }
            } 
          }
        ],
        startAngle: 90,
        endAngle: 90 + (data.inSchool / data.total * 360),
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200 + 100;
        }
      },
      {
        name: '在校活动人数',
        type: 'pie',
        radius: ['45%', '50%'],
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          scale: true,
          scaleSize: 5,
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            formatter: '{b}\n{c} 人'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { 
            value: data.active, 
            name: '在校活动人数', 
            itemStyle: { 
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#fac858'
                }, {
                  offset: 1, color: '#ffe58f'
                }]
              }
            } 
          }
        ],
        startAngle: 90,
        endAngle: 90 + (data.active / data.total * 360),
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200 + 200;
        }
      }
    ]
  };
  myChart.setOption(option);
  
  // 添加窗口大小变化的监听
  window.addEventListener('resize', () => {
    myChart.resize();
  });
};

onMounted(() => {
  // 初始化本科生图表
  initChart('undergraduateChart', {
    total: totalStudents.value,
    inSchool: inSchoolStudents.value,
    active: activeStudents.value
  });
  
  // 初始化研究生图表
  initChart('graduateChart', {
    total: totalStudents.value,
    inSchool: inSchoolStudents.value,
    active: activeStudents.value
  });
});
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
      <div class="chart-container">
        <h3>本科生</h3>
        <div class="chart">
          <div id="undergraduateChart" style="width: 100%; height: 100%;"></div>
          <div class="chart-placeholder">
            <div class="data-item">
              <span class="label">总人数</span>
              <span class="value">{{ totalStudents }}</span>
            </div>
            <div class="data-item">
              <span class="label">在校人数</span>
              <span class="value">{{ inSchoolStudents }}</span>
            </div>
            <div class="data-item">
              <span class="label">在校活动人数</span>
              <span class="value">{{ activeStudents }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-container">
        <h3>研究生</h3>
        <div class="chart">
          <div id="graduateChart" style="width: 100%; height: 100%;"></div>
          <div class="chart-placeholder">
            <div class="data-item">
              <span class="label">总人数</span>
              <span class="value">{{ totalStudents }}</span>
            </div>
            <div class="data-item">
              <span class="label">在校人数</span>
              <span class="value">{{ inSchoolStudents }}</span>
            </div>
            <div class="data-item">
              <span class="label">在校活动人数</span>
              <span class="value">{{ activeStudents }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-container">
      <a-table :dataSource="tableData" :columns="columns" :pagination="false">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'unit'">
            单位
          </template>
        </template>
      </a-table>
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
}

.chart {
  margin-top: 16px;
  height: 250px;
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
  /* min-width: 100px; */
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
    padding: 16px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .date-picker {
    width: 20vw;
    min-width:150px ;
    /* width: 100%; */
  }

  .chart-container {
    min-width: 100%;
  }

  .table-container {
    margin-top: 24px;
  }
}
</style>