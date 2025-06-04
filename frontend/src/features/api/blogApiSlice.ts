import { createApi } from "@reduxjs/toolkit/query/react";
import type { Blog, BlogInput } from "../../types/blog";
import axiosInstance from "../../utils/axiosInstance";

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
        getAllBlog: builder.query<{ blogs: Blog[]; total: number; totalPages: number }, void>({
            query: () => ({ url: `/blogs` }),
            providesTags: ["Blog"],
        }),
        getBlogById: builder.query<Blog, string>({
            query: (id) => ({ url: `/blogs/${id}` }),
            providesTags: (result, error, id) => [{ type: "Blog", id }],
        }),
        createBlog: builder.mutation<Blog, BlogInput>({
            query: (newBlog) => ({
                url: "/blogs",
                method: "POST",
                data: newBlog,
            }),
            invalidatesTags: ["Blog"],
        }),
        updateBlog: builder.mutation<Blog, { id: string; data: Partial<BlogInput> }>({
            query: ({ id, data }) => ({
                url: `/blogs/${id}`,
                method: "PATCH",
                data,
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
