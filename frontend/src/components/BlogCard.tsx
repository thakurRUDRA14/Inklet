import { AnimatePresence, motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";
import Avatar from "./Avatar";
import { useDeleteBlogMutation } from "../features/api/blogApiSlice";
import { useState, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/authAtoms";
import Spinner from "./Spinner";

interface BlogCardProps {
    authorId: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
    onDelete: (id: string) => void;
}

const BlogCard = ({ authorId, authorName, title, content, publishedDate, id, onDelete }: BlogCardProps) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    const user = useRecoilValue(userState);
    const [deleteBlog, { isLoading }] = useDeleteBlogMutation();
    const [showOption, setShowOption] = useState(false);
    const optionsRef = useRef<HTMLDivElement>(null);
    useClickOutside(optionsRef, () => setShowOption(false));

    const handleOption = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowOption((val) => !val);
    };

    const handleDelete = async () => {
        try {
            await deleteBlog(id).unwrap();
            alert("Deleted successfully");
            onDelete(id); // remove from UI
        } catch (error) {
            alert("Failed to delete blog");
        } finally {
            setShowOption(false);
        }
    };

    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.4,
    });

    return (
        <motion.div
            ref={ref}
            className='relative overflow-hidden p-6'
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}>
            <div className='relative z-10'>
                <div className='flex justify-between items-center mb-4 gap-2.5'>
                    <div className='flex items-center gap-3'>
                        <Avatar name={authorName} />
                        <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm'>
                            <span className='font-medium text-slate-700 dark:text-slate-300'>{authorName || "Anonymous"}</span>
                            <span className='hidden sm:inline'>
                                <div className='w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full' />
                            </span>
                            <span className='text-slate-500 dark:text-slate-400'>
                                {formatDistanceToNow(new Date(publishedDate), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                    {authorId === user?.id && (
                        <div
                            className='relative'
                            ref={optionsRef}>
                            <div
                                onClick={handleOption}
                                className='flex gap-0.5 p-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full'>
                                <div className='bg-slate-900 dark:bg-slate-500 w-1 h-1 rounded-full' />
                                <div className='bg-slate-900 dark:bg-slate-500 w-1 h-1 rounded-full' />
                                <div className='bg-slate-900 dark:bg-slate-500 w-1 h-1 rounded-full' />
                            </div>
                            <AnimatePresence>
                                {showOption && (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className='absolute right-2 mt-0.5 min-w-24 flex flex-col bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 focus:outline-none rounded-md shadow-lg overflow-hidden z-20'>
                                        <Link
                                            to={`/b/${id}/edit`}
                                            className='block w-full px-4 py-2 text-left text-sm text-slate-700 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-slate-200 dark:hover:bg-slate-700 rounded-lg transition'>
                                            Edit
                                        </Link>
                                        <motion.button
                                            layout
                                            onClick={handleDelete}
                                            className='block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition'>
                                            {isLoading ? (
                                                <span className='flex items-center'>
                                                    <Spinner className={"h-4 w-4 text-red-600"} />
                                                    Deleting...
                                                </span>
                                            ) : (
                                                "Delete"
                                            )}
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
                <Link to={`/blogs/${id}`}>
                    <motion.h3
                        className='text-2xl font-extrabold text-black dark:text-white mb-3 '
                        whileHover={{ color: "#3b82f6" }}
                        transition={{ duration: 0.2 }}>
                        {title}
                    </motion.h3>

                    <div
                        className='text-slate-600 dark:text-slate-300 mb-4 line-clamp-2'
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />

                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <motion.div
                                className='w-2 h-2 rounded-full bg-blue-500'
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                }}
                            />
                            <span className='text-sm text-slate-500 dark:text-slate-400'>{`${Math.ceil(content.length / 200)} min(s) read`}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </motion.div>
    );
};

export default BlogCard;
