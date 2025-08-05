import { apiClient } from '@/api/axios';
import type { AxiosRequestConfig } from 'axios'

export async function request<T>(path: string, config: AxiosRequestConfig = {}): Promise<T> {
  try {
    const response = await apiClient.request<T>({ url: path, ...config });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function requestBlob(path: string, config: AxiosRequestConfig = {}): Promise<Blob> {
  const response = await apiClient.get(path, {
    ...config,
    responseType: 'blob',
    }
  )
  return response.data;
}
