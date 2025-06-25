const EditBlogSkeleton = () => {
    return (
        <div className='w-full lg:w-5xl mx-auto p-6 space-y-6 animate-pulse'>
            <div className='h-12 bg-gray-200 rounded w-1/3 mx-auto'></div>

            <div className='h-12 bg-gray-200 rounded'></div>

            <div className='space-y-1'>
                <div className='h-5 bg-gray-200 rounded w-1/4'></div>
                <div className='h-[30rem] bg-gray-200 rounded'></div>
                <div className='h-5 bg-gray-200 rounded w-1/6'></div>
            </div>

            <div className='flex justify-center gap-4 pt-4'>
                <div className='h-10 bg-gray-200 rounded-lg w-24'></div>
                <div className='h-10 bg-gray-200 rounded-lg w-36'></div>
            </div>
        </div>
    );
};

export default EditBlogSkeleton;
