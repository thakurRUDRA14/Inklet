import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axiosInstance from "../../utils/axiosInstance";

type AxiosRequestArgs = {
    url: string;
    method?: string;
    data?: any;
};

type AxiosErrorType = {
    response?: {
        status: number;
        data: any;
    };
    message: string;
};

export const axiosBaseQuery: BaseQueryFn<AxiosRequestArgs, unknown, { status?: number; data: any }> = async ({ url, method = "GET", data }) => {
    try {
        const response = await axiosInstance({ url, method, data });
        return { data: response.data };
    } catch (err) {
        const axiosError = err as AxiosErrorType;
        return {
            error: {
                status: axiosError.response?.status,
                data: axiosError.response?.data || axiosError.message,
            },
        };
    }
};
