<script setup>
import { onMounted, watch, onBeforeUnmount, nextTick } from 'vue';
import * as echarts from 'echarts';

const calculateendAngle = (angle) => {
  if (angle >= 360) return 450;
  return angle > 90 ? 450 - angle : 90 - angle;
};

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
      active: 0,
      inactive: 0
    })
  },
  title: {
    type: String,
    required: false,
    default: '本科生'
  }
});
let chartInstance = null;
const initChart = (chartId, data) => {
  const chartDom = document.getElementById(chartId);
  if (!chartDom) return;

  if (chartInstance) {
    chartInstance.dispose();
  }

  chartInstance = echarts.init(chartDom);
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
       orient:'hertical',
      // orient: 'vertical',
      left:'0%',
      top:'0%',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: '#666',
        fontSize: 10
      },
      itemGap: 10,
      formatter: function(name) {
        const dataItem = option.series.find(s => s.data[0].name === name)?.data[0];
        return `${name}: ${dataItem?.value || 0}人`;
      }
    },
    grid: {
      left: '20%', // 为图例预留左侧空间
      right: '10%',
      top: '10%',
      bottom: '80%',
      containLabel: true // 包含标签
    },
    series: [
      {
        name: '总人数',
        type: 'pie',
        radius: ['65%', '70%'],
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
        radius: ['50%', '55%'],
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
        endAngle: calculateendAngle(data.inSchool / data.total * 360),
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200 + 100;
        }
      },
      {
        name: '在校活动人数',
        type: 'pie',
        radius: ['35%', '40%'],
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
        endAngle: calculateendAngle(data.active / data.total * 360),
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200 + 200;
        }
      },
      {
        name: '在校无活动人数',
        type: 'pie',
        radius: ['20%', '25%'],
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
            value: data.inactive, 
            name: '在校无活动人数', 
            itemStyle: { 
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#ff4d4f'
                }, {
                  offset: 1, color: '#ff7875'
                }]
              }
            } 
          }
        ],
        startAngle: 90,
        endAngle: calculateendAngle(data.inactive / data.total * 360),
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200 + 300;
        }
      }
    ],
  };
  chartInstance.setOption(option);
  
};

// 组件卸载前清理
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
  // 移除 resize 事件监听
  window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};


onMounted(() => {
  nextTick(() => {
    initChart(props.chartId, props.data);
    window.addEventListener('resize', handleResize);
  });
});

watch(() => props.data, (newData) => {
  nextTick(() => {
    initChart(props.chartId, newData);
  });
}, { deep: true });
</script>

<template>
  <div class="chart-container">
    <h3 v-if="title" class="chart-title">{{ title }}</h3>
    <div :id="chartId" class="chart"></div>
  </div>

</template>

<style scoped>
.chart-container {
  flex: 1;
  min-width: 180px;
  padding: 12px;
  background: #fafafa;
  border-radius: 4px;
}
.chart-title {
  margin: 0 0 8px;
  text-align: center;
  font-size: 12px;
  color: #333;
}

.chart {
  height: 250px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .chart-container {
    padding: 0px;
  }
  .chart {
    height: 280px;
  }
  :deep(.echarts-container) {
    transform: scale(0.8);
    transform-origin: center center;
  }
}
</style>