import axios from 'axios';
import JSONbig from 'json-bigint';

const axiosInstance = axios.create({
    transformResponse: [data => {
        try {
            // 使用 json-bigint 解析大整数为 BigInt 类型
            return JSONbig.parse(data);
        } catch (e) {
            return data;
        }
    }]
});

axiosInstance.defaults.baseURL = 'http://localhost:8090';
// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 由于 set-cookie，浏览器会自动带上 cookie，无需手动设置
        config.withCredentials = true;  // 统一配置带上 credentials
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;