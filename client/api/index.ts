import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

export type ResponseType<T = any> = {
  data: T;
  err_code: string | null;
  err_msg: string | null;
  success: boolean;
};

export type ApiResponse<T = any, D = any> = AxiosResponse<ResponseType<T>, D>;

export type SuccessTuple<T = any, D = any> = [null, T, ResponseType<T>, ApiResponse<T, D>];

export type FailedTuple = [Error | AxiosError, null, null, null];

const ins = axios.create({
  baseURL: process.env.API_BASE_URL ?? '',
  timeout: 10000,
});

export const GET = <Params = any, Response = any, D = any>(url: string, params?: Params, config?: AxiosRequestConfig<D>) => {
  return ins.get<Params, ApiResponse<Response>>(url, { params, ...config });
};

export const POST = <Data = any, Response = any, D = any>(url: string, data?: Data, config?: AxiosRequestConfig<D>) => {
  return ins.post<Data, ApiResponse<Response>>(url, data, config);
};

export const PATCH = <Data = any, Response = any, D = any>(url: string, data?: Data, config?: AxiosRequestConfig<D>) => {
  return ins.patch<Data, ApiResponse<Response>>(url, data, config);
};

export const PUT = <Data = any, Response = any, D = any>(url: string, data?: Data, config?: AxiosRequestConfig<D>) => {
  return ins.put<Data, ApiResponse<Response>>(url, data, config);
};

export const DELETE = <Params = any, Response = any, D = any>(url: string, params?: Params, config?: AxiosRequestConfig<D>) => {
  return ins.delete<Params, ApiResponse<Response>>(url, { params, ...config });
};

export * from './tools';
export * from './request';
