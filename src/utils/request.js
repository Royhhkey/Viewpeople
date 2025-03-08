import axios from "axios";
import { message } from 'ant-design-vue';

const request = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL:import.meta.env.VITE_API_URL||'http://10.227.224.6:3301',
    timeout: 3000,
});

request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
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