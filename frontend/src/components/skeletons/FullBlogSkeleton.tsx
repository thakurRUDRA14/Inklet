import { motion } from "motion/react";

const FullBlogSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='grid grid-cols-12 divide-y md:divide-x md:divide-y-0 divide-slate-300 dark:divide-slate-700 w-full lg:max-w-7xl min-h-[calc(100dvh-10rem)] mx-auto gap-10 px-4 xl:px-0 animate-pulse'>
            <div className='col-span-12 md:col-span-8 p-4'>
                <div className='h-12 w-3/4 bg-slate-300 dark:bg-slate-700 rounded mb-4'></div>
                <div className='h-5 w-1/2 bg-slate-200 dark:bg-slate-600 rounded mb-6'></div>
                <div className='space-y-3'>
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className='h-4 w-full bg-slate-200 dark:bg-slate-700 rounded'></div>
                    ))}
                </div>
            </div>

            <div className='col-span-12 md:col-span-4 sticky top-[6rem] h-fit'>
                <div className='h-6 w-24 bg-slate-300 dark:bg-slate-600 rounded mb-4'></div>
                <div className='flex items-center space-x-3 py-4'>
                    <div className='w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-600'></div>
                    <div className='space-y-2'>
                        <div className='h-4 w-32 bg-slate-300 dark:bg-slate-600 rounded'></div>
                        <div className='h-3 w-20 bg-slate-200 dark:bg-slate-500 rounded'></div>
                    </div>
                </div>
                <div className='flex gap-3 mt-2'>
                    <div className='h-8 w-20 bg-slate-300 dark:bg-slate-600 rounded'></div>
                    <div className='h-8 w-20 bg-red-300 dark:bg-red-600 rounded'></div>
                </div>
            </div>
        </motion.div>
    );
};

export default FullBlogSkeleton;
