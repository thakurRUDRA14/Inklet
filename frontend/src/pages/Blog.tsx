import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../features/api/blogApiSlice";
import FullBlog from "../components/FullBlog";
import type { ApiError } from "../types/blog";
import { motion } from "motion/react";

const Blog = () => {
    const { id } = useParams();
    const { isLoading, data, isError, error } = useGetBlogByIdQuery(id || "");

    if (isError) {
        return <div className='text-center text-red-500 mt-10'>Error: {(error as ApiError)?.data.message || "Failed to load blogs."}</div>;
    }

    if (isLoading || !data?.blog) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center text-lg font-medium mt-10'>
                <div className='flex justify-center'>
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "linear",
                        }}
                        className='w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4'
                    />
                </div>
                Loading blog...
            </motion.div>
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
