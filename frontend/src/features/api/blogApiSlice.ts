import { createApi } from "@reduxjs/toolkit/query/react";
import type { Blog } from "../../types/blog";
import type { CreateBlogInput, UpdateBlogInput } from "@thakurrudra/inklet-common";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const blogApiSlice = createApi({
    reducerPath: "blogApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["Blog", "MyBlog"],
    endpoints: (builder) => ({
        getAllBlogs: builder.query<{ blogs: Blog[]; total: number; totalPages: number }, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `/blogs?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) =>
                result?.blogs ? [...result.blogs.map((blog) => ({ type: "Blog" as const, id: blog.id })), { type: "Blog" }] : [{ type: "Blog" }],
        }),

        getMyBlogs: builder.query<{ blogs: Blog[]; total: number; totalPages: number }, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `/blogs/my-blogs?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) =>
                result?.blogs
                    ? [...result.blogs.map((blog) => ({ type: "MyBlog" as const, id: blog.id })), { type: "MyBlog" }]
                    : [{ type: "MyBlog" }],
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
            invalidatesTags: ["Blog", "MyBlog"],
        }),

        updateBlog: builder.mutation<Blog, { updatedBlog: UpdateBlogInput; id: string }>({
            query: ({ updatedBlog, id }) => ({
                url: `/blogs/${id}`,
                method: "PATCH",
                data: updatedBlog,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Blog", id },
                { type: "MyBlog", id },
            ],
        }),

        deleteBlog: builder.mutation<void, string>({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Blog", id },
                { type: "MyBlog", id },
            ],
        }),
    }),
});

export const { useGetAllBlogsQuery, useGetMyBlogsQuery, useGetBlogByIdQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } =
    blogApiSlice;
