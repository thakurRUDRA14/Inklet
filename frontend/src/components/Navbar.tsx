import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { AnimatePresence, motion } from "motion/react";
import { SquarePen } from "lucide-react";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/authAtoms";
import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const pathname = location.pathname;

    const user = useRecoilValue(userState);
    const [showUserActions, setShowUserActions] = useState(false);
    const userActionsMenu = useRef<HTMLDivElement>(null);
    const userActions = [
        {
            to: "/u/profile",
            title: "Profile",
        },
        {
            to: "/blogs",
            title: "Blogs",
        },
        {
            to: "/my-blogs",
            title: "My Blogs",
        },
    ];

    useClickOutside(userActionsMenu, () => setShowUserActions(false));

    const logout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        setShowUserActions(false);
        navigate("/");
        toast("User logged out");
    };

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className='border-b border-slate-200 flex justify-between items-center px-5 md:px-15 py-3 dark:border-slate-700 bg-white/80 backdrop-blur-sm sticky top-0 z-50'>
            <div className='flex items-center space-x-8'>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link
                        to={pathname === "/blogs" ? "/" : "/blogs"}
                        className='flex flex-col justify-center font-extrabold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                        INKLET
                    </Link>
                </motion.div>
            </div>

            <div className='flex justify-end items-center gap-4 sm:gap-5 md:gap-10'>
                {(pathname === "/signin" || pathname === "/signup" || pathname === "/about") && (
                    <Link
                        to='/'
                        className='text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition'>
                        Home
                    </Link>
                )}
                {(pathname === "/signin" || pathname === "/signup" || pathname === "/") && (
                    <Link
                        to='/about'
                        className='text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition'>
                        About
                    </Link>
                )}
                {pathname != "/new-story" && pathname != "/my-blogs" && user && (
                    <motion.span layoutId='write'>
                        <Link
                            to={"/new-story"}
                            className='flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition'>
                            <SquarePen size={18} /> <span className='hidden sm:block'>Write</span>
                        </Link>
                    </motion.span>
                )}
                {user ? (
                    <div
                        ref={userActionsMenu}
                        className='relative'>
                        <button
                            onClick={() => setShowUserActions(!showUserActions)}
                            className='cursor-pointer focus:outline-none'
                            aria-label='User menu'>
                            <Avatar
                                name={user?.name}
                                size='small'
                            />
                        </button>
                        <AnimatePresence>
                            {showUserActions && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className='absolute right-5 mt-1 w-44 origin-top-right rounded-xl bg-white dark:bg-slate-800 shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 focus:outline-none z-50'>
                                    {userActions.map(
                                        (action) =>
                                            pathname != action.to && (
                                                <Link
                                                    to={action.to}
                                                    className='block w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition'>
                                                    {action.title}
                                                </Link>
                                            )
                                    )}
                                    <button
                                        onClick={logout}
                                        className='block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition'>
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <Link
                        to='/signin'
                        className='relative'>
                        <Avatar size='small' />
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

export default Navbar;
