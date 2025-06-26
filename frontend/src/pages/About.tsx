import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Rocket, Zap, Code, PenTool, User, Mail } from "lucide-react";

const About = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
            },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const cardHover = {
        hover: {
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
    };

    const techStack = [
        {
            title: "Frontend",
            items: ["React", "Vite", "TailwindCSS", "TypeScript", "Recoil", "RTK Query"],
            icon: (
                <Code
                    className='text-blue-500'
                    size={18}
                />
            ),
        },
        {
            title: "Backend",
            items: ["Hono (Cloudflare Workers)"],
            icon: (
                <Code
                    className='text-purple-500'
                    size={18}
                />
            ),
        },
        {
            title: "Database",
            items: ["PostgreSQL via Prisma ORM"],
            icon: (
                <Code
                    className='text-emerald-500'
                    size={18}
                />
            ),
        },
        {
            title: "Authentication",
            items: ["JWT", "Recoil selectors"],
            icon: (
                <User
                    className='text-amber-500'
                    size={18}
                />
            ),
        },
        {
            title: "DevOps",
            items: ["Vercel", "Render"],
            icon: (
                <Rocket
                    className='text-red-500'
                    size={18}
                />
            ),
        },
        {
            title: "Others",
            items: ["Zod", "React Router", "Lucide Icons", "Motion"],
            icon: (
                <Zap
                    className='text-indigo-500'
                    size={18}
                />
            ),
        },
    ];

    const features = [
        {
            text: "Blog creation and editing with rich text support",
            icon: (
                <PenTool
                    className='text-emerald-500'
                    size={16}
                />
            ),
        },
        {
            text: "Secure authentication system with JWT",
            icon: (
                <User
                    className='text-blue-500'
                    size={16}
                />
            ),
        },
        {
            text: "Modular and maintainable code structure",
            icon: (
                <Code
                    className='text-purple-500'
                    size={16}
                />
            ),
        },
        {
            text: "Fully responsive UI across all devices",
            icon: (
                <PenTool
                    className='text-amber-500'
                    size={16}
                />
            ),
        },
        {
            text: "Smooth animations with Motion",
            icon: (
                <Zap
                    className='text-indigo-500'
                    size={16}
                />
            ),
        },
        {
            text: "Optimized performance with code splitting",
            icon: (
                <Rocket
                    className='text-red-500'
                    size={16}
                />
            ),
        },
        {
            text: "Type-safe development with TypeScript",
            icon: (
                <Code
                    className='text-blue-500'
                    size={16}
                />
            ),
        },
        {
            text: "Form validation with Zod",
            icon: (
                <Code
                    className='text-emerald-500'
                    size={16}
                />
            ),
        },
    ];

    const socials = [
        {
            name: "Github",
            url: "https://github.com/thakurRUDRA14",
            icon: <Github size={18} />,
            classname: "bg-gray-900 hover:bg-gray-800",
        },
        {
            name: "Linkedin",
            url: "https://www.linkedin.com/in/thakurrudra",
            icon: <Linkedin size={18} />,
            classname: "bg-blue-600 hover:bg-blue-700",
        },
        {
            name: "Twitter",
            url: "https://x.com/thakur__rudra",
            icon: <Twitter size={18} />,
            classname: "bg-emerald-600 hover:bg-emerald-700",
        },
    ];

    return (
        <motion.div
            initial='hidden'
            animate='visible'
            className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
            <motion.div
                initial='hidden'
                animate='visible'
                variants={staggerContainer}
                className='text-center mb-20'>
                <motion.h1
                    variants={fadeUp}
                    className='text-5xl md:text-6xl font-bold dark:text-white mb-4 bg-gradient-to-r from-indigo-600 to-purple-600  bg-clip-text text-transparent'>
                    About Inklet
                </motion.h1>
                <motion.p
                    variants={fadeUp}
                    className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
                    The modern blogging platform built for performance and user experience
                </motion.p>
            </motion.div>

            <motion.section
                initial='hidden'
                animate='visible'
                variants={staggerContainer}
                className='mb-20'>
                <motion.div
                    variants={fadeUp}
                    className='flex items-center mb-6'>
                    <div className='p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 mr-4'>
                        <User
                            className='text-blue-600 dark:text-blue-400'
                            size={24}
                        />
                    </div>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>About Me</h2>
                </motion.div>

                <div className='space-y-4'>
                    <motion.p
                        variants={fadeUp}
                        className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                        I'm Rudra Pratap Singh, a passionate full-stack developer and B.Tech CSE student at KIET Group of Institutions. With expertise
                        in modern web technologies, I specialize in building performant, scalable applications with great UX.
                    </motion.p>
                    <motion.p
                        variants={fadeUp}
                        className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                        Inklet is my personal project — a Medium-inspired blogging platform designed to showcase my skills in full-stack development,
                        system architecture, and attention to detail. The project reflects my commitment to clean code, best practices, and modern web
                        standards.
                    </motion.p>
                </div>
            </motion.section>

            <motion.section
                initial='hidden'
                animate='visible'
                variants={staggerContainer}
                className='mb-20'>
                <motion.div
                    variants={fadeUp}
                    className='flex items-center mb-6'>
                    <div className='p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mr-4'>
                        <Rocket
                            className='text-emerald-600 dark:text-emerald-400'
                            size={24}
                        />
                    </div>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>What is Inklet?</h2>
                </motion.div>

                <div className='space-y-4'>
                    <motion.p
                        variants={fadeUp}
                        className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                        Inklet is a modern blogging platform that combines the best features of Medium with a tech stack optimized for performance. It
                        provides writers with a clean, distraction-free writing experience and readers with fast-loading, beautifully presented
                        content.
                    </motion.p>
                    <motion.p
                        variants={fadeUp}
                        className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                        The platform includes a rich text editor, user profiles and publishing tools — all built with scalability in mind. My goal was
                        to create something that demonstrates my ability to architect and deliver production-ready applications.
                    </motion.p>
                </div>
            </motion.section>

            <motion.section
                initial='hidden'
                animate='visible'
                variants={staggerContainer}
                className='mb-20'>
                <motion.div
                    variants={fadeUp}
                    className='flex items-center mb-8'>
                    <div className='p-2 rounded-full bg-purple-100 dark:bg-purple-900/50 mr-4'>
                        <Code
                            className='text-purple-600 dark:text-purple-400'
                            size={24}
                        />
                    </div>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Tech Stack</h2>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {techStack.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={cardHover}
                            whileHover='hover'
                            className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all'>
                            <div className='flex items-center mb-4'>
                                {category.icon}
                                <h3 className='font-semibold text-lg text-gray-900 dark:text-white ml-2'>{category.title}</h3>
                            </div>
                            <ul className='space-y-2'>
                                {category.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className='text-gray-700 dark:text-gray-300 flex items-start'>
                                        <span className='text-gray-400 dark:text-gray-500 mr-2'>•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial='hidden'
                animate='visible'
                variants={staggerContainer}
                className='mb-20'>
                <motion.div
                    variants={fadeUp}
                    className='flex items-center mb-8'>
                    <div className='p-2 rounded-full bg-amber-100 dark:bg-amber-900/50 mr-4'>
                        <Zap
                            className='text-amber-600 dark:text-amber-400'
                            size={24}
                        />
                    </div>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Key Features</h2>
                </motion.div>

                <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {features.map((feature, index) => (
                        <motion.li
                            key={index}
                            variants={fadeUp}
                            whileHover={{ scale: 1.02 }}
                            className='flex items-start bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-all'>
                            <div className='mr-3 mt-0.5'>{feature.icon}</div>
                            <span className='text-gray-700 dark:text-gray-300'>{feature.text}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.section>

            <motion.section
                initial='hidden'
                animate='visible'
                variants={staggerContainer}
                className='mb-16'>
                <motion.div
                    variants={fadeUp}
                    className='flex items-center mb-8'>
                    <div className='p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mr-4'>
                        <Mail
                            className='text-indigo-600 dark:text-indigo-400'
                            size={24}
                        />
                    </div>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Connect With Me</h2>
                </motion.div>

                <div className='flex flex-wrap gap-4'>
                    {socials.map((social, index) => (
                        <motion.a
                            key={index}
                            variants={fadeUp}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            href={social.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={`${social.classname} flex items-center px-6 py-3 text-white rounded-lg transition-all shadow-md hover:shadow-lg`}>
                            <span className='mr-2'>{social.icon}</span>
                            {social.name}
                        </motion.a>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial='hidden'
                animate='visible'
                variants={staggerContainer}
                className='mt-16 pt-12 border-t border-gray-200 dark:border-gray-700'>
                <motion.div
                    variants={fadeUp}
                    className='flex items-center mb-6'>
                    <div className='p-2 rounded-full bg-red-100 dark:bg-red-900/50 mr-4'>
                        <Zap
                            className='text-red-600 dark:text-red-400'
                            size={24}
                        />
                    </div>
                    <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Why This Project Matters</h2>
                </motion.div>

                <motion.p
                    variants={fadeUp}
                    className='text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
                    Inklet isn't just another blogging platform — it's a demonstration of my ability to:
                </motion.p>

                <ul className='grid md:grid-cols-2 gap-4 mb-8'>
                    {[
                        "Architect and implement a complete full-stack application from scratch",
                        "Make thoughtful technology choices based on project requirements",
                        "Write clean, maintainable, and well-documented code",
                        "Implement modern UI/UX principles and accessibility best practices",
                        "Optimize performance at both frontend and backend levels",
                        "Solve complex problems with elegant solutions",
                    ].map((item, index) => (
                        <motion.li
                            key={index}
                            variants={fadeUp}
                            whileHover={{ scale: 1.02 }}
                            className='flex items-start bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700'>
                            <span className='text-emerald-500 mr-3'>✓</span>
                            <span className='text-gray-700 dark:text-gray-300'>{item}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.section>
        </motion.div>
    );
};

export default About;
