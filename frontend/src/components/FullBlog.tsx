import { format } from "date-fns";
import type { Blog } from "../types/blog";
import Avatar from "./Avatar";
import { motion } from "motion/react";
import DOMPurify from "dompurify";
import "./rich-text.css";

const FullBlog = ({ blog }: { blog: Blog }) => {
    const sanitizedContent = DOMPurify.sanitize(blog.content);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='grid grid-cols-12 divide-y md:divide-x md:divide-y-0 divide-slate-300 dark:divide-slate-700 max-w-7xl min-h-[calc(100dvh-10rem)] mx-auto gap-10 px-4 xl:px-0'>
            <motion.div className='col-span-12 md:col-span-8 p-4'>
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className='text-6xl md:text-4xl font-extrabold'>
                    {blog.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className='text-slate-500 dark:text-slate-400 pt-2 border-b-1 border-slate-300 dark:border-slate-700 pb-2'>
                    Published on {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className='blog-content pt-4 text-slate-800 max-w-none'
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className='col-span-12 md:col-span-4 sticky top-[6rem] h-fit'>
                <motion.p className='text-slate-600 dark:text-slate-300 text-lg font-medium'>Author</motion.p>

                <motion.div className='flex items-center space-x-2 py-4'>
                    <div className='flex-shrink-0'>
                        <Avatar
                            size='big'
                            name={blog.author.name || "Anonymous"}
                        />
                    </div>
                    <div>
                        <motion.p
                            whileHover={{ x: 2 }}
                            className='text-2xl font-bold text-slate-800 dark:text-white'>
                            {blog.author.name || "Anonymous"}
                        </motion.p>
                        <motion.div
                            whileHover={{ x: 2 }}
                            className='text-slate-500 dark:text-slate-300'>
                            Some catchy phrases
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default FullBlog;
