import { motion } from "motion/react";

const EditableInputSkeleton = () => {
    return (
        <motion.div
            layout
            className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-pulse'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 bg-gray-100 rounded-lg text-gray-600 w-8 h-8' />
                    <div className='h-4 w-32 bg-gray-200 rounded' />
                </div>
                <div className='w-6 h-6 bg-gray-200 rounded' />
            </div>

            <div className='h-4 w-full bg-gray-200 rounded' />
        </motion.div>
    );
};

export default EditableInputSkeleton;
