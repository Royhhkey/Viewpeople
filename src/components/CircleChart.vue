<script setup>
import { onMounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  chartId: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true,
    default: () => ({
      total: 0,
      inSchool: 0,
      active: 0
    })
  },
  title: {
    type: String,
    required: false,
    default: '本科生'
  }
});

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
  
  window.addEventListener('resize', () => {
    myChart.resize();
  });
};

onMounted(() => {
  initChart(props.chartId, props.data);
});

watch(() => props.data, (newData) => {
  initChart(props.chartId, newData);
}, { deep: true });
</script>

<template>
  <div class="chart-container">
    <h3 v-if="title" class="chart-title">{{ title }}</h3>
    <div :id="chartId" class="chart"></div>
    <div class="data-stats">
      <div class="data-item">
        <span class="label">总人数</span>
        <div class="value-wrapper">
          <span class="value">{{ data.total }}</span>
          <span class="unit">人</span>
        </div>
      </div>
      <div class="data-item">
        <span class="label">在校人数</span>
        <div class="value-wrapper">
          <span class="value">{{ data.inSchool }}</span>
          <span class="unit">人</span>
        </div>
      </div>
      <div class="data-item">
        <span class="label">在校活动人数</span>
        <div class="value-wrapper">
          <span class="value">{{ data.active }}</span>
          <span class="unit">人</span>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-title {
  margin: 0 0 16px;
  text-align: center;
  font-size: 16px;
  color: #333;
}

.chart {
  flex: 1;
  min-height: 300px;
}
</style>
<style scoped>
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

.data-stats {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.data-item:hover {
  background: rgba(24, 144, 255, 0.05);
}

.label {
  font-size: 14px;
  color: #666;
}

.value-wrapper {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.value {
  font-size: 20px;
  font-weight: 600;
  color: #1890ff;
}

.unit {
  font-size: 12px;
  color: #999;
}
.value {
  font-weight: bold;
  color: #1890ff;
}
</style>