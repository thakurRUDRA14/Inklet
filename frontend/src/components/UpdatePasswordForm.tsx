import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Edit3, Check, X, EyeOff, Eye, Lock } from "lucide-react";
import { useUpdatePasswordMutation } from "../features/api/userApiSlice";
import type { ApiError, UpdatePassword } from "../types/user";

const UpdatePasswordForm = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [password, setPassword] = useState<UpdatePassword>({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

    const handleChange = (field: keyof UpdatePassword) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSave = async () => {
        const { newPassword, confirmNewPassword } = password;

        if (newPassword !== confirmNewPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        try {
            await updatePassword(password).unwrap();
            setIsEditing(false);
            alert("Password updated successfully!");
            setPassword({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
        } catch (err) {
            const error = err as ApiError;
            const errMsg = error?.data?.message || "Failed to update password";
            alert(errMsg);
            console.error("Update password error:", err);
        }
    };

    return (
        <motion.div
            layout
            className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 bg-gray-100 rounded-lg text-gray-600'>
                        <Lock className='w-5 h-5' />
                    </div>
                    <h3 className='font-semibold text-gray-800'>Password</h3>
                </div>

                {!isEditing && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(true)}
                        className='p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'>
                        <Edit3 className='w-4 h-4' />
                    </motion.button>
                )}
            </div>

            <AnimatePresence mode='wait'>
                {isEditing ? (
                    <motion.div
                        key='editing'
                        className='space-y-4'>
                        <div>
                            <h5 className='text-gray-800'>Old Password</h5>
                            <div className='relative'>
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    value={password.oldPassword}
                                    onChange={handleChange("oldPassword")}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                    placeholder='Enter your old password'
                                    autoFocus
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                                    {showOldPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <h5 className='text-gray-800'>New Password</h5>
                            <div className='relative'>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={password.newPassword}
                                    onChange={handleChange("newPassword")}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                    placeholder='Enter your new password'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                                    {showNewPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <h5 className='text-gray-800'>Confirm Password</h5>
                            <div className='relative'>
                                <input
                                    type={showConfirmNewPassword ? "text" : "password"}
                                    value={password.confirmNewPassword}
                                    onChange={handleChange("confirmNewPassword")}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                    placeholder='Confirm your new password'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                                    {showConfirmNewPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                                </button>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSave}
                                disabled={
                                    isLoading ||
                                    !password.oldPassword.trim() ||
                                    !password.newPassword.trim() ||
                                    password.newPassword.length < 8 ||
                                    password.oldPassword === password.newPassword ||
                                    password.newPassword !== password.confirmNewPassword
                                }
                                className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'>
                                {isLoading ? (
                                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                                ) : (
                                    <Check className='w-4 h-4' />
                                )}
                                Save
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setIsEditing(false);
                                    setPassword({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
                                }}
                                disabled={isLoading}
                                className='flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors'>
                                <X className='w-4 h-4' />
                                Cancel
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key='display'
                        className='flex items-center justify-between'>
                        <span className='text-gray-900 font-medium'>{"*".repeat(12)}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default UpdatePasswordForm;
