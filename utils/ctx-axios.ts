/*
 * @Date: 2024-05-14 15:41:13
 * @LastEditors: CZH
 * @LastEditTime: 2024-05-22 14:21:56
 * @FilePath: /DB-GPT-Web/utils/ctx-axios.ts
 */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

api.defaults.timeout = 10000;

api.interceptors.response.use(
  (response) => response.data,
  (err) => Promise.reject(err),
);

export default api;
