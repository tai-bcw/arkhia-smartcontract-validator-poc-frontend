import axios from "axios";

import appConfig from "@/config/appConfig";

export type QueryKeyT = [string, object | undefined];

export const api = {
    get: async <T>(url: string, params?: object) =>
        axios.get<T>(url, { ...params }),
    post: <T>(url: string, data: any) =>
        axios.post<T>(url, data),
    patch: <T>(url: string, data: any) =>
        axios.patch<T>(url, data),
    delete: <T>(url: string) =>
        axios.delete<T>(url),
};

export const fetcher = async <T>({ queryKey, pageParam }:{ queryKey: QueryKeyT; pageParam?: number; }): Promise<T> => {
    const [url, params] = queryKey;
    const res = await api.get<T>(url, {
        params: {
            ...params,
            pageParam
        }
    });
    
    return res.data;
};

export const pathToBackendService = (path: string) => `${appConfig.services.getBackendServiceUrl()}${path}`;

export const pathToMirrorNode = (path: string) => `${appConfig.services.getMirrorNodeUrl()}${path}`;
