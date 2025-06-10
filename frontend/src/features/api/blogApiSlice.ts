import { createApi } from "@reduxjs/toolkit/query/react";
import type { Blog } from "../../types/blog";
import axiosInstance from "../../utils/axiosInstance";
import type { CreateBlogInput, UpdateBlogInput } from "@thakurrudra/inklet-common";

export const blogApiSlice = createApi({
    reducerPath: "blogApi",
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
    tagTypes: ["Blog"],
    endpoints: (builder) => ({
        getAllBlog: builder.query<{ blogs: Blog[]; total: number; totalPages: number }, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `/blogs?page=${page}&limit=${limit}`,
            }),
            providesTags: ["Blog"],
        }),
        getBlogById: builder.query<{ blog: Blog }, string>({
            query: (id) => ({ url: `/blogs/${id}` }),
            providesTags: (result, error, id) => [{ type: "Blog", id }],
        }),
        createBlog: builder.mutation<Blog, CreateBlogInput>({
            query: (newBlog) => ({
                url: "/blogs",
                method: "POST",
                data: newBlog,
            }),
            invalidatesTags: ["Blog"],
        }),
        updateBlog: builder.mutation<Blog, { updatedBlog: UpdateBlogInput; id: string }>({
            query: ({ updatedBlog, id }) => ({
                url: `/blogs/${id}`,
                method: "PATCH",
                data: updatedBlog,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Blog", id }],
        }),
        deleteBlog: builder.mutation<void, string>({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blog"],
        }),
    }),
});

export const { useGetAllBlogQuery, useGetBlogByIdQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogApiSlice;
