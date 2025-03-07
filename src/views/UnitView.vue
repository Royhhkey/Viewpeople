<script setup>
import { ref } from 'vue';
import { DatePicker } from 'ant-design-vue';

const selectedDate = ref(null);
const totalStudents = ref(1234);
const inSchoolStudents = ref(345);
const activeStudents = ref(456);

const handleDateChange = (date) => {
  selectedDate.value = date;
  // 这里可以添加获取数据的逻辑
};
</script>

<template>
  <div class="view-container">
    <div class="header">
      <h2>单位数据统计</h2>
      <a-date-picker
        v-model:value="selectedDate"
        @change="handleDateChange"
        placeholder="选择日期查看数据"
        class="date-picker"
      />
    </div>
    
    <div class="statistics-container">
      <div class="chart-container">
        <h3 class="unit-title" :title="'计算机科学与技术学院（人工智能学院）'">计算机科学与技术学院（人工智能学院）</h3>
        <div class="chart">
          <div class="chart-placeholder">
            <div class="data-item">
              <span class="label" :title="'总人数（含在校和非在校学生）'">总人数（含在校和非在校学生）</span>
              <span class="value">{{ totalStudents }}</span>
            </div>
            <div class="data-item">
              <span class="label" :title="'实际在校就读的学生人数'">实际在校就读的学生人数</span>
              <span class="value">{{ inSchoolStudents }}</span>
            </div>
            <div class="data-item">
              <span class="label" :title="'参与校园活动的在校学生人数'">参与校园活动的在校学生人数</span>
              <span class="value">{{ activeStudents }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-container">
        <h3>机械学院</h3>
        <div class="chart">
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
  overflow: hidden;
}

.unit-title {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  cursor: help;
}

.chart {
  margin-top: 16px;
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
  min-width: 0;
}

.label {
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: help;
  flex-shrink: 1;
  min-width: 0;
}

.value {
  font-weight: bold;
  color: #1890ff;
  flex-shrink: 0;
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
    width: 100%;
  }

  .chart-container {
    min-width: 100%;
  }
}
</style>