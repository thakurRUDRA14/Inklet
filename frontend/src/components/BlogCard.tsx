import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'

interface BlogCardProps {
    authorName: string
    title: string
    content: string
    publishedDate: string
    id: string
}

const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    })

    return (
        <motion.div
            ref={ref}
            className="relative overflow-hidden p-6"
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <Avatar name={authorName} />
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                            {authorName}
                        </span>
                        <Circle />
                        <span className="text-slate-500 dark:text-slate-400">
                            {publishedDate}
                        </span>
                    </div>
                </div>

                <Link to={`/blog/${id}`}>
                    <motion.h3
                        className="text-xl font-extrabold text-black dark:text-white mb-3"
                        whileHover={{ color: '#3b82f6' }}
                        transition={{ duration: 0.2 }}
                    >
                        {title}
                    </motion.h3>

                    <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                        {content}
                    </p>
                </Link>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: 'loop',
                            }}
                        />
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                            {`${Math.ceil(content.length / 200)} min(s) read`}
                        </span>
                    </div>

                    {/* <motion.button
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Read more →
                    </motion.button> */}
                </div>
            </div>
        </motion.div>
    )
}

function Circle() {
    return (
        <motion.div
            className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
        />
    )
}

export default BlogCard