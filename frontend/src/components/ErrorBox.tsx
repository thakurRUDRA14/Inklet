import { motion } from "motion/react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorBoxProps {
    message?: string;
    refetch: () => void;
}

const ErrorBox = ({ message, refetch }: ErrorBoxProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                },
            }}
            exit={{ opacity: 0, y: -20 }}
            className='text-center space-y-4 w-full h-full m-auto'>
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    transition: { repeat: Infinity, duration: 2 },
                }}>
                <AlertCircle
                    className='h-10 w-10 text-red-500 mx-auto'
                    strokeWidth={1.5}
                />
            </motion.div>

            <div className='space-y-2'>
                <p className='text-red-600 font-medium text-lg'>{message || "Failed to load data"}</p>
                <p className='text-sm text-red-500'>Something went wrong while fetching data.</p>
            </div>

            <motion.button
                onClick={() => refetch()}
                whileHover={{
                    scale: 1.05,
                    backgroundColor: "#ef4444",
                }}
                whileTap={{ scale: 0.98 }}
                className='px-6 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-all shadow-sm flex items-center gap-2 mx-auto'>
                <RefreshCw className='h-4 w-4' />
                Try Again
            </motion.button>
        </motion.div>
    );
};

export default ErrorBox;
