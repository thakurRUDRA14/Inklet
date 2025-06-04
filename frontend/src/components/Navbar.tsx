import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { motion } from "motion/react";

const Navbar = () => {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className='border-b border-slate-200 flex justify-between items-center px-7 py-3 dark:border-slate-700 bg-white/80 backdrop-blur-sm sticky top-0 z-50'>
            <div className='flex items-center space-x-8'>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link
                        to='/blogs'
                        className='flex flex-col justify-center font-extrabold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                        INKLET
                    </Link>
                </motion.div>
            </div>

            <div className='flex items-center space-x-4'>
                <Avatar
                    name='Rudra'
                    size='big'
                />
            </div>
        </motion.div>
    );
};

export default Navbar;
