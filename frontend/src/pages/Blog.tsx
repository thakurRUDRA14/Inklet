import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../features/api/blogApiSlice";
import FullBlog from "../components/FullBlog";
import type { ApiError } from "../types/blog";
import { motion } from "motion/react";
import FullBlogSkeleton from "../components/skeletons/FullBlogSkeleton";

const Blog = () => {
    const { id } = useParams();
    const { isLoading, data, isError, error } = useGetBlogByIdQuery(id || "");

    if (isError) {
        return <div className='text-center text-red-500 mt-10'>Error: {(error as ApiError)?.data.message || "Failed to load blogs."}</div>;
    }

    if (isLoading || !data?.blog) {
        return (
            <div className='py-12'>
                <FullBlogSkeleton />
            </div>
        );
    }

    const blog = data?.blog;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='py-12'>
            <FullBlog blog={blog} />
        </motion.div>
    );
};

export default Blog;
