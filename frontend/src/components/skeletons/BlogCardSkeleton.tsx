const BlogCardSkeleton = () => {
    return (
        <div className='p-6 animate-pulse space-y-4'>
            <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700' />
                <div className='flex flex-col md:flex-row gap-1'>
                    <div className='w-15 h-3 bg-slate-300 dark:bg-slate-700 rounded' />
                    <div className='w-30 h-3 bg-slate-300 dark:bg-slate-700 rounded' />
                </div>
            </div>
            <div className='h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4' />
            <div className='h-4 bg-slate-300 dark:bg-slate-700 rounded w-full' />
            <div className='h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6' />
            <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-blue-400 rounded-full' />
                <div className='h-3 w-24 bg-slate-300 dark:bg-slate-700 rounded' />
            </div>
        </div>
    );
};

export default BlogCardSkeleton;
