import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { motion } from "motion/react";
import { SquarePen } from "lucide-react";
import BlogCard from "../components/BlogCard";
import { useGetMyBlogsQuery } from "../features/api/blogApiSlice";
import BlogCardSkeleton from "../components/skeletons/BlogCardSkeleton";
import { userState } from "../recoil/authAtoms";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Blog } from "../types/blog";
import { formatDistanceToNow } from "date-fns";
import Avatar from "../components/Avatar";
import MyBlogProfileSkeleton from "../components/skeletons/MyBlogProfileSkeleton";
import ErrorBox from "../components/ErrorBox";

export default function MyBlogs() {
    const user = useRecoilValue(userState);
    const [page, setPage] = useState(1);
    const limit = 5;
    const { data, isLoading, isFetching, isError, refetch } = useGetMyBlogsQuery({ page, limit });
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

    return (
        <div className='w-full mx-auto px-5 md:px-15 py-5'>
            <div className='sticky top-14 h-15 flex items-center justify-between mb-6 bg-white/80 backdrop-blur-sm z-20'>
                <h1 className='text-3xl font-bold'>My Blogs</h1>
                <motion.span layoutId='write'>
                    <Link
                        to={"/new-story"}
                        className='flex items-center gap-2 text-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors'>
                        <SquarePen size={20} /> <span className='hidden sm:block'>Write</span>
                    </Link>
                </motion.span>
            </div>
            <div className='flex flex-col lg:flex-row lg:divide-x divide-slate-200 dark:divide-slate-700 gap-8 mt-10'>
                <div className='lg:w-2/3'>
                    {isError ? (
                        <ErrorBox
                            message='Failed to load blogs'
                            refetch={refetch}
                        />
                    ) : isLoading ? (
                        <div className='max-w-5xl mx-auto grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-700 gap-6'>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <BlogCardSkeleton key={`loading-${index}`} />
                            ))}
                        </div>
                    ) : blogs?.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='text-center text-gray-500 mt-10'>
                            <p>No blogs yet. Start writing your first post!</p>
                        </motion.div>
                    ) : (
                        <div className='max-w-5xl mx-auto overflow-x-hidden'>
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
                                endMessage={
                                    blogs.length > 3 && <p className='text-center py-4 text-gray-500'>You've reached the end of the blog posts.</p>
                                }>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className='grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-700 gap-6'>
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
                    )}
                </div>
                <div className='hidden lg:block lg:w-1/3 lg:sticky lg:top-44 lg:h-[calc(100vh-15rem)] lg:overflow-y-auto'>
                    {isLoading ? (
                        <MyBlogProfileSkeleton />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className='lg:pl-6'>
                            <div className='m-6 flex items-center justify-center'>
                                <Avatar
                                    size='big'
                                    name={user?.name}
                                />
                            </div>

                            <div className='text-center space-y-2'>
                                <h2 className='text-4xl font-semibold text-gray-900 dark:text-white'>{user?.name}</h2>
                                <p className='text-xl text-gray-600 dark:text-gray-300'>{user?.username}</p>
                                <p className='text-gray-500 dark:text-gray-400'>
                                    Joined {formatDistanceToNow(new Date(user?.createdAt || new Date()), { addSuffix: true })}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
