import axios from "axios";
import { message } from 'ant-design-vue';
// import { useAuthStore } from '../store';

const whiteList = ['/api/getqx'];
const request = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL:import.meta.env.VITE_API_URL||'http://10.227.224.6:3301',
    timeout: 3000,
});

request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // if (!whiteList.includes(config.url)) {
    // const authStore = useAuthStore();
    // if (authStore.userAuth && authStore.userAuth.length > 0) {
    //         // 将权限参数添加到请求中
    //         config.params = {
    //             ...config.params,
    //             qx: authStore.userAuth[0]  // 使用第一个权限值
    //         };
    //     }
    // }

    return config;
}, err => {
    message.error(err.message || '服务端异常');
    return Promise.reject(err);
});

request.interceptors.response.use(response => {
    return response;
}, err => {
    message.error(err.message || '服务端异常');
    return Promise.reject(err);
});

export default request;