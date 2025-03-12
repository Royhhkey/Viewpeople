import { useAuthStore } from '../store';

// 获取具体权限值
export const getSpecificAuth = (authArray) => {
  const authStore = useAuthStore();
  // 检查是否包含任意一个指定权限
  if (authStore.userAuth.some(auth => authArray.includes(auth))) {
    // 按照优先级返回第一个匹配的权限
    for (const auth of authArray) {
      if (authStore.userAuth.includes(auth)) {
        return auth;
      }
    }
  }
  return null;
};