import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import type { Blog } from "../types/blog";
import Avatar from "./Avatar";
import "./rich-text.css";
import { useClickOutside } from "../hooks/useClickOutside";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/authAtoms";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteBlogMutation } from "../features/api/blogApiSlice";
import Spinner from "./Spinner";

const FullBlog = ({ blog }: { blog: Blog }) => {
    const navigate = useNavigate();
    const sanitizedContent = DOMPurify.sanitize(blog.content);
    const user = useRecoilValue(userState);
    const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const deleteModalRef = useRef<HTMLDivElement>(null);
    useClickOutside(deleteModalRef, () => setShowDeleteConfirm(false));

    const handleDelete = async () => {
        try {
            await deleteBlog(blog.id).unwrap();
            alert("Deleted successfully");
            navigate("/blogs");
        } catch (error) {
            alert("Failed to delete blog");
        } finally {
            setShowDeleteConfirm(false);
        }
    };

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
                    className='[@media(min-width:1270px)]:text-6xl sm:text-4xl text-2xl font-extrabold'>
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
                {user?.id === blog.author.id && (
                    <div className='flex mt-1'>
                        <Link
                            to={`/b/${blog.id}/edit`}
                            className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600'>
                            Edit
                        </Link>
                        <button
                            onClick={() => setShowDeleteConfirm((val) => !val)}
                            disabled={isLoading}
                            className='text-gray-900 bg-white border border-red-300 hover:bg-red-400 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:text-white'>
                            {isLoading ? "Deleting" : "Delete"}
                        </button>
                    </div>
                )}
            </motion.div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4'>
                        <motion.div
                            ref={deleteModalRef}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className='bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full'>
                            <h3 className='text-xl font-bold text-gray-800 dark:text-white mb-4'>Confirm Delete</h3>
                            <p className='text-gray-600 dark:text-gray-300 mb-6'>
                                Are you sure you want to delete this blog? This action cannot be undone.
                            </p>
                            <div className='flex justify-end space-x-3'>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowDeleteConfirm(false);
                                    }}
                                    disabled={isLoading}
                                    className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors'>
                                    Cancel
                                </button>
                                <motion.button
                                    layout
                                    onClick={handleDelete}
                                    disabled={isLoading}
                                    className='flex align-middle gap-1 px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors'>
                                    {isLoading ? (
                                        <span className='flex items-center'>
                                            <Spinner className={"h-6 w-6 text-white"} />
                                            Deleting...
                                        </span>
                                    ) : (
                                        "Delete"
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FullBlog;
