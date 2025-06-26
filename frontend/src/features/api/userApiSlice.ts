import { createApi } from "@reduxjs/toolkit/query/react";
import type { UpdatePassword, User, authResponse } from "../../types/user";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const userApiSlice = createApi({
    reducerPath: "userApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => ({ url: "/user/me", method: "GET" }),
            providesTags: (result) => (result ? ["User"] : []),
        }),

        signinUser: builder.mutation<authResponse, Partial<User>>({
            query: (formData) => ({
                url: "/user/signin",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (_result, error) => (error ? [] : ["User"]),
        }),

        signupUser: builder.mutation<authResponse, Partial<User>>({
            query: (formData) => ({
                url: "/user/signup",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (_result, error) => (error ? [] : ["User"]),
        }),

        updateUser: builder.mutation<User, Partial<User>>({
            query: (formData) => ({
                url: "/user/update",
                method: "PATCH",
                data: formData,
            }),
            invalidatesTags: (_result, error) => (error ? [] : ["User"]),
        }),

        updatePassword: builder.mutation<User, UpdatePassword>({
            query: (formData) => ({
                url: "/user/update-password",
                method: "PATCH",
                data: formData,
            }),
            invalidatesTags: (_result, error) => (error ? [] : ["User"]),
        }),
    }),
});

export const { useGetUserQuery, useSigninUserMutation, useSignupUserMutation, useUpdateUserMutation, useUpdatePasswordMutation } = userApiSlice;
