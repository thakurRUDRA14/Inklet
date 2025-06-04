import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../../utils/axiosInstance";
import type { User, authResponse } from "../../types/user";

export const userApiSlice = createApi({
    reducerPath: "userApi",
    baseQuery: async (args: { url: string; method?: string; data?: any }) => {
        try {
            const result = await axiosInstance({
                url: args.url,
                method: args.method || "GET",
                data: args.data,
            });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as any;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    },
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query<User, string>({
            query: () => ({ url: `/user/me`, method: "POST" }),
            providesTags: (result, error, id) => [{ type: "User", id }],
        }),

        signinUser: builder.mutation<authResponse, Partial<User>>({
            query: (formData) => ({
                url: "/user/signin",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: ["User"],
        }),

        signupUser: builder.mutation<authResponse, Partial<User>>({
            query: (formData) => ({
                url: "/user/signup",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useGetUserQuery, useSigninUserMutation, useSignupUserMutation } = userApiSlice;
