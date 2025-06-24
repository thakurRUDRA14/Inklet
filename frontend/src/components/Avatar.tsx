import { motion } from "motion/react";

interface AvatarProps {
    name?: string;
    size?: "small" | "big";
}

const Avatar = ({ name = "R", size = "small" }: AvatarProps) => {
    return (
        <motion.div
            className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white ${
                size === "small" ? "w-8 h-8" : "w-12 h-12"
            } `}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}>
            <span className={`${size === "small" ? "text-xs" : "text-xl"} font-bold`}>{name[0].toUpperCase() || "ANONYMOUS"}</span>
            <motion.div
                className='absolute inset-0 border-2 border-transparent rounded-full'
                whileHover={{ borderColor: "rgba(255,255,255,0.3)" }}
            />
        </motion.div>
    );
};

export default Avatar;
