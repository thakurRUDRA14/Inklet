import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { motion } from "motion/react";
import { SquarePen } from "lucide-react";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/authAtoms";

const Navbar = () => {
    const user = useRecoilValue(userState);

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

            <div className='flex justify-end items-center gap-10'>
                <Link
                    to={"/new-story"}
                    className='flex items-center gap-2 text-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors'>
                    <SquarePen size={18} /> Write
                </Link>
                <Link
                    to='/u/profile'
                    className='flex items-center space-x-4'>
                    <Avatar
                        name={user?.name}
                        size='small'
                    />
                </Link>
            </div>
        </motion.div>
    );
};

export default Navbar;
