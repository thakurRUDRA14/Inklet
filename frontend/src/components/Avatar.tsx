import { User } from "lucide-react";
import { motion } from "motion/react";

interface AvatarProps {
    name?: string;
    size?: "small" | "medium" | "big";
}

const sizeClasses = {
    small: {
        container: "w-8 h-8",
        text: "text-xs",
    },
    medium: {
        container: "w-12 h-12",
        text: "text-base",
    },
    big: {
        container: "w-25 h-25",
        text: "text-4xl",
    },
};

const Avatar = ({ name, size = "small" }: AvatarProps) => {
    const { container, text } = sizeClasses[size];

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 10 }}
            className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white ${container}`}
            whileHover={{ scale: 1.1 }}>
            <span className={`${text} font-bold`}>
                {name?.[0].toUpperCase() || <User className={`${size == "big" ? "w-12 h-12" : "w-5 h-5"} text-white`} />}
            </span>
            <motion.div
                className='absolute inset-0 border-2 border-transparent rounded-full'
                whileHover={{ borderColor: "rgba(255,255,255,0.3)" }}
            />
        </motion.div>
    );
};

export default Avatar;
