import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogCard from "../components/BlogCard";
import { motion } from "motion/react";
import { useGetAllBlogQuery } from "../features/api/blogApiSlice";
import type { ApiError } from "../types/user";
import type { Blog } from "../types/blog";
import BlogCardSkeleton from "../components/skeletons/BlogCardSkeleton";

const Blogs = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data, isLoading, isError, error, isFetching } = useGetAllBlogQuery({ page, limit });
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [hasMore, setHasMore] = useState(true);

    // Merge new blogs with existing ones
    useEffect(() => {
        if (data?.blogs) {
            setBlogs((prev) => {
                const newBlogs = data.blogs.filter((newBlog) => !prev.some((blog) => blog.id === newBlog.id));
                return [...prev, ...newBlogs];
            });

            // pagination check
            setHasMore(data.blogs.length === limit && page <= (data.totalPages || Infinity));
        }
    }, [data, page]);

    const fetchMoreData = () => {
        if (!isFetching && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    // Reset state when component unmounts or filters change
    useEffect(() => {
        return () => {
            setPage(1);
            setBlogs([]);
            setHasMore(true);
        };
    }, []);

    if (isError) {
        return <div className='text-center text-red-500 mt-10'>Error: {(error as ApiError)?.data.message || "Failed to load blogs."}</div>;
    }

    if (isLoading && blogs.length === 0) {
        return (
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full'>
                <div className='grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-700 gap-6 w-full'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <BlogCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full overflow-x-hidden'>
            <InfiniteScroll
                dataLength={blogs.length}
                next={fetchMoreData}
                hasMore={hasMore}
                style={{ overflowX: "hidden" }}
                loader={
                    <div className='grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-700 gap-6 w-full px-4'>
                        {Array.from({ length: 2 }).map((_, index) => (
                            <BlogCardSkeleton key={`more-${index}`} />
                        ))}
                    </div>
                }
                endMessage={<p className='text-center py-4 text-gray-500'>You've reached the end of the blog posts.</p>}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className='grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-700 gap-6 w-full'>
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorId={blog.author.id}
                            authorName={blog.author.name}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.updatedAt}
                            onDelete={(id) => setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))}
                        />
                    ))}
                </motion.div>
            </InfiniteScroll>
        </div>
    );
};

export default Blogs;
