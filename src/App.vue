<script setup>
import { useRouter } from 'vue-router';
import {gettable} from './api/index.js';
import { onMounted } from 'vue';
const router = useRouter();
const menuItems = [
  { key: 'school', label: '校级', path: '/school' },
  { key: 'unit', label: '单位', path: '/unit' },
  { key: 'counselor', label: '辅导员', path: '/counselor' },
  { key: 'teacher', label: '班导师', path: '/teacher' }
];
const test  = async () => {
  const {data} = await gettable();
  router.push(menuItems[data.QX_TYPE]);
  // console.log(data);
};

onMounted(() => {
  test();
});
const handleTabChange = (key) => {
  router.push(key);
};
</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="header-content" >
        <h2 class="system-title" >学生在校人数统计</h2>
        <a-tabs
          :activeKey="$route.path.substring(1)"
          @change="handleTabChange"
          class="nav-tabs"
        >
          <a-tab-pane
            v-for="item in menuItems"
            :key="item.key"
            :tab="item.label"
          />
        </a-tabs>
      </div>
    </a-layout-header>
    <a-layout-content>
      <div class="content-container">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <!-- <a-layout-footer style="text-align: center">
      ©2024 学生数据统计系统
    </a-layout-footer> -->
  </a-layout>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.system-title {
  color: #1890ff;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.nav-tabs {
  min-width: 400px;
}

:deep(.ant-tabs) {
  color: rgba(0, 0, 0, 0.85);
}

:deep(.ant-tabs-tab) {
  color: rgba(0, 0, 0, 0.65) !important;
  font-size: 16px;
}

:deep(.ant-tabs-tab-active) {
  color: #1890ff !important;
}

:deep(.ant-tabs-ink-bar) {
  background: #1890ff !important;
}

.content-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 16px;
  }

  .system-title {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .nav-tabs {
    min-width: unset;
    width: 100%;
  }

  :deep(.ant-tabs-tab) {
    font-size: 14px;
    margin: 0 16px 0 0 !important;
  }

  .content-container {
    padding: 16px;
  }
}

:deep(.ant-layout-header) {
  background: #fff;
  padding: 0;
  line-height: 1.5;
  height: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.ant-layout-content) {
  background: #f0f2f5;
  min-height: calc(100vh - 64px - 70px);
  width: 100%;
}

:deep(.ant-layout-footer) {
  background: #f0f2f5;
  padding: 24px;
}
</style>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
