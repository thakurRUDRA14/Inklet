import { motion } from "motion/react";
import { BookOpen, PenSquare, ArrowRight, Twitter, Github, Linkedin, Instagram, Globe, Users, Sparkles, Heart, PenLine } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    const featuredPosts = [
        {
            id: 1,
            title: "Journey Through the Himalayas",
            author: "Sarah Wanderlust",
            excerpt: "My unforgettable trekking experience in the Nepalese mountains.",
            likes: 284,
            readTime: "8 min",
        },
        {
            id: 2,
            title: "The Future of AI Writing",
            author: "Alex Technovate",
            excerpt: "How artificial intelligence is changing the way we create content.",
            likes: 156,
            readTime: "6 min",
        },
        {
            id: 3,
            title: "Morning Rituals of Successful Writers",
            author: "James Clearwords",
            excerpt: "Start your day right with these productivity-boosting habits.",
            likes: 432,
            readTime: "5 min",
        },
    ];

    const stats = [
        { value: "10K+", label: "Active Writers", icon: <Users className='h-6 w-6' /> },
        { value: "50K+", label: "Published Stories", icon: <BookOpen className='h-6 w-6' /> },
        { value: "120+", label: "Countries", icon: <Globe className='h-6 w-6' /> },
        { value: "1M+", label: "Stories Shared", icon: <Heart className='h-6 w-6' /> },
    ];

    const socials = [
        { name: "Linkedin", url: "https://www.linkedin.com/in/thakurrudra", icon: <Linkedin className='h-4 w-4 text-gray-700' /> },
        { name: "Instagram", url: "https://www.instagram.com/thakur._.rudra", icon: <Instagram className='h-4 w-4 text-gray-700' /> },
        { name: "Github", url: "https://github.com/thakurRUDRA14", icon: <Github className='h-4 w-4 text-gray-700' /> },
        { name: "Twitter", url: "https://x.com/thakur__rudra", icon: <Twitter className='h-4 w-4 text-gray-700' /> },
    ];

    return (
        <div className='min-h-screen bg-gray-50 text-gray-900'>
            <section className='container mx-auto px-6 py-12 md:py-24'>
                <div className='flex flex-col md:flex-row items-center'>
                    <div className='md:w-1/2 mb-12 md:mb-0'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='flex items-center mb-4'>
                            <Sparkles className='h-5 w-5 text-yellow-400 mr-2' />
                            <span className='text-sm font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full'>The World's Writing Platform</span>
                        </motion.div>

                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6'>
                            <span className='bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>Write, Share,</span> <br />
                            Connect Globally
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='text-lg text-gray-600 mb-8 max-w-lg'>
                            Inklet is where your words find their audience. Publish your stories, discover amazing content from writers worldwide, and
                            join a vibrant community of creators.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
                            <Link
                                to='/new-story'
                                className='group flex items-center justify-center text-blue-500 px-6 py-3.5 rounded-lg font-medium hover:bg-blue-50 border border-blue-100 transition'>
                                Start Writing <PenLine className='group-hover:translate-x-1 h-4 w-4 ml-2 transition' />
                            </Link>
                        </motion.div>
                    </div>

                    <div className='md:w-1/2'>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className='relative'>
                            <div className='bg-white rounded-2xl p-6 shadow-xl border border-gray-100'>
                                <div className='flex items-center mb-4'>
                                    <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3'>
                                        <span className='text-blue-500 font-medium'>RS</span>
                                    </div>
                                    <div>
                                        <h4 className='font-medium'>Rudra Pratap Singh</h4>
                                        <p className='text-xs text-gray-500'>Developer</p>
                                    </div>
                                </div>
                                <h3 className='font-bold text-xl mb-3'>Building Inklet</h3>
                                <p className='text-gray-600 mb-4'>
                                    As a full-stack developer constantly writing and exploring tech ideas, I felt the need for a personal platform
                                    where I could write, share, and even host blogs written by others. Inklet wasn't just a pet project — it was a
                                    real-world implementation of the things I had learned over the past year: from authentication, API architecture,
                                    to clean UI design...
                                </p>
                                <div className='flex justify-between items-center text-sm text-gray-500'>
                                    <span>5 min read</span>
                                    <span>♥ 1407</span>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className='absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg border border-gray-100'>
                                    <BookOpen className='h-6 w-6 text-blue-500' />
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className='absolute -bottom-4 -left-4 bg-white p-2 rounded-full shadow-lg border border-gray-100'>
                                    <PenSquare className='h-6 w-6 text-purple-500' />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className='py-12 bg-white'>
                <div className='container mx-auto px-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className='bg-gray-50 p-6 rounded-xl text-center hover:shadow border-none hover:scale-105 transition'>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className='inline-block p-3 bg-blue-100 rounded-full mb-4'>
                                    {stat.icon}
                                </motion.div>
                                <h3 className='text-3xl font-bold text-gray-900 mb-2'>{stat.value}</h3>
                                <p className='text-gray-600'>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <section className='py-16'>
                <div className='container mx-auto px-6'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className='text-center mb-12'>
                        <h2 className='text-3xl font-bold mb-4'>Trending Stories</h2>
                        <p className='text-gray-600 max-w-2xl mx-auto'>Discover what the Inklet community is reading and loving right now</p>
                    </motion.div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {featuredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition border border-gray-100'>
                                <div className='h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center'>
                                    <BookOpen className='h-12 w-12 text-blue-500 opacity-80' />
                                </div>
                                <div className='p-6'>
                                    <div className='flex justify-between items-center mb-3'>
                                        <span className='text-sm font-medium text-blue-500'>{post.readTime} read</span>
                                        <span className='flex items-center text-sm text-gray-500'>♥ {post.likes}</span>
                                    </div>
                                    <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
                                    <p className='text-gray-600 mb-4'>{post.excerpt}</p>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm text-gray-500'>by {post.author}</span>
                                        <motion.a
                                            whileHover={{ x: 5 }}
                                            href='#'
                                            className='flex items-center text-blue-500 font-medium text-sm'>
                                            Read <ArrowRight className='h-4 w-4 ml-1' />
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='py-16'>
                <div className='container mx-auto px-6'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className='bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center'>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className='inline-block bg-white/20 p-3 rounded-full mb-6'>
                            <PenSquare className='h-8 w-8' />
                        </motion.div>
                        <h2 className='text-3xl font-bold mb-4'>Ready to share your story?</h2>
                        <p className='text-blue-100 max-w-2xl mx-auto mb-8'>
                            Join thousands of writers who are already expressing themselves and connecting with readers worldwide.
                        </p>
                        <Link
                            to='/new-story'
                            className='inline-block bg-white text-blue-600 px-8 py-3.5 rounded-lg font-bold hover:bg-gray-100 hover:scale-105 transition shadow-lg'>
                            Start Writing Now
                        </Link>
                    </motion.div>
                </div>
            </section>

            <footer className='bg-white border-t border-gray-200'>
                <div className='mx-auto px-15 space-y-2 divide-y divide-gray-200 py-3 sm:py-0'>
                    <div className='flex flex-row justify-center sm:justify-between items-center'>
                        <div className='items-center py-4 my-auto hidden sm:block hover:scale-105 transition'>
                            <Link
                                to='/blogs'
                                className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-center'>
                                INKLET
                            </Link>
                        </div>

                        <div className='flex space-x-4 pb-2 sm:pb-0'>
                            {socials.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='bg-gray-100 p-2.5 rounded-full hover:bg-gray-200 hover:-translate-y-1 hover:scale-105 transition-all'>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className='py-4 text-center text-gray-500'>
                        <p>© {new Date().getFullYear()} Inklet. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
