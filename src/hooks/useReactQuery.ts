import {
    AxiosError,
    AxiosResponse
} from "axios";
import {
    useMutation,
    useQuery,
    useQueryClient,
    UseQueryOptions
} from "react-query";

import {
    api,
    fetcher,
    QueryKeyT
} from "@/utils/apiHandler";


export const usePrefetch = <T>(url: string, params?: object) => {
    const queryClient = useQueryClient();

    return () => {
        if (!url) {
            return;
        }

        queryClient.prefetchQuery<T, Error, T, QueryKeyT>(
            [url, params],
            ({ queryKey }) => fetcher({ queryKey })
        );
    };
};

export const useFetch = <T>(url: string, params?: object,
    config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
    const context = useQuery<T, Error, T, QueryKeyT>(
        [url, params],
        ({ queryKey }) => fetcher({ queryKey }),
        {
            enabled: Boolean(url),
            ...config
        });

    return context;
};

const useGenericMutation = <T, S>(func: (data: T | S) => Promise<AxiosResponse<S>>, url: string,
    params?: object,
    updater?: ((oldData: T, newData: S) => T) | undefined
) => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, AxiosError, T | S>(func, {
        onMutate: async (data) => {
            await queryClient.cancelQueries([url, params]);

            const previousData = queryClient.getQueryData([url, params]);

            queryClient.setQueryData<T>([url, params], oldData => updater ? updater(oldData!, data as S) : data as T);

            return previousData;
        },
        onError: (err, _, context) => {
            queryClient.setQueryData([url, params], context);
        },
        onSettled: () => {
            queryClient.invalidateQueries([url, params]);
        }
    });
};

export const useDelete = <T>(url: string, params?: object,
    updater?: (oldData: T, id: string) => T
) => {
    return useGenericMutation<T, string>(
        (id) => api.delete(`${url}/${id}`),
        url,
        params,
        updater);
};

export const usePost = <T, S>(url: string, params?: object,
    updater?: (oldData: T, newData: S) => T
) => {
    return useGenericMutation<T, S>(
        (data) => api.post<S>(url, data),
        url,
        params,
        updater);
};

export const useUpdate = <T, S>(url: string, params?: object,
    updater?: (oldData: T, newData: S) => T
) => {
    return useGenericMutation<T, S>(
        (data) => api.patch<S>(url, data),
        url,
        params,
        updater);
};
