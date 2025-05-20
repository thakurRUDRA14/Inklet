import BlogCard from '../components/BlogCard'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const Blogs = () => {
    const blogPosts = [
        {
            id: "1",
            authorName: "Rudra Pratap Singh",
            title: "Mastering React Hooks in 2025",
            content: "Explore the latest React Hook patterns and best practices that will take your functional components to the next level. We'll cover everything from basic useState to advanced custom hook composition.",
            publishedDate: "18th Mar 2025",
            readTime: 4
        },
        {
            id: "2",
            authorName: "Jane Doe",
            title: "The Future of CSS: What's Coming in 2025",
            content: "With new CSS features like container queries, nesting, and color functions becoming widely supported, learn how to write more maintainable and powerful stylesheets.",
            publishedDate: "15th Mar 2025",
            readTime: 6
        },
        {
            id: "3",
            authorName: "John Smith",
            title: "Building Micro-interactions with Framer Motion",
            content: "Micro-interactions are the secret sauce of modern UX. In this guide, you'll learn how to implement delightful animations that respond to user input using Framer Motion.",
            publishedDate: "10th Mar 2025",
            readTime: 5
        },
        {
            id: "4",
            authorName: "Alex Johnson",
            title: "TypeScript Patterns for Large Scale Apps",
            content: "Discover advanced TypeScript techniques that help maintain type safety across large codebases, including utility types, discriminated unions, and type guards.",
            publishedDate: "5th Mar 2025",
            readTime: 7
        },
    ]

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen dark:bg-black/90 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className='grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-700 gap-6'

                    >
                        {blogPosts.map((post) => (
                            <BlogCard
                                key={post.id}
                                id={post.id}
                                authorName={post.authorName}
                                title={post.title}
                                content={post.content}
                                publishedDate={post.publishedDate}
                            />
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-16 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all duration-200 hover:scale-105">
                            Load more articles
                            <svg className="ml-3 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>

    )
}

export default Blogs