import { motion } from "motion/react";
import React from "react";
import { Link } from "react-router-dom";

interface AuthFormProps {
    type: "signup" | "signin";
    formData: {
        name?: string;
        username: string;
        password: string;
        confirmPassword?: string;
    };
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading?: boolean;
}

const AuthForm = ({ type, formData, onInputChange, onSubmit, isLoading }: AuthFormProps) => {
    return (
        <motion.div
            layout
            className='h-full flex justify-center flex-col bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='flex justify-center'>
                <motion.div
                    layoutId='auth-card'
                    className='w-full max-w-md bg-white rounded-xl shadow-lg p-8'>
                    <form onSubmit={onSubmit}>
                        <motion.div
                            layout
                            className='px-4'>
                            <motion.h1
                                layoutId='auth-title'
                                className='text-3xl text-center font-extrabold text-gray-900'>
                                {type === "signup" ? "Create an account" : "Welcome Back!"}
                            </motion.h1>
                            <motion.p
                                layoutId='auth-subtitle'
                                className='text-slate-500 text-center mt-2'>
                                {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                                <Link
                                    to={type === "signup" ? "/signin" : "/signup"}
                                    className='pl-2 underline hover:text-blue-600 transition-colors duration-200'>
                                    {type === "signup" ? "Signin" : "Signup"}
                                </Link>
                            </motion.p>
                        </motion.div>

                        <motion.div
                            layout
                            className='mt-6 space-y-4'>
                            {type === "signup" && (
                                <motion.div
                                    layoutId='name-field'
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <LabelledInput
                                        id='name'
                                        name='name'
                                        label='Name'
                                        placeholder='Enter your name'
                                        value={formData.name || ""}
                                        onChange={onInputChange}
                                    />
                                </motion.div>
                            )}

                            <motion.div layoutId='email-field'>
                                <LabelledInput
                                    id='email'
                                    name='username'
                                    label='Email'
                                    placeholder='Enter your email'
                                    value={formData.username}
                                    onChange={onInputChange}
                                />
                            </motion.div>

                            <motion.div layoutId='password-field'>
                                <LabelledInput
                                    id='password'
                                    name='password'
                                    label='Password'
                                    type='password'
                                    placeholder='Enter your password'
                                    value={formData.password}
                                    onChange={onInputChange}
                                />
                            </motion.div>

                            {type === "signup" && (
                                <motion.div
                                    layoutId='confirm-password-field'
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <LabelledInput
                                        id='confirmPassword'
                                        name='confirmPassword'
                                        label='Confirm Password'
                                        type='password'
                                        placeholder='Confirm your password'
                                        value={formData.confirmPassword || ""}
                                        onChange={onInputChange}
                                    />
                                </motion.div>
                            )}

                            <motion.div
                                layoutId='auth-button-container'
                                className='pt-2'>
                                <motion.button
                                    layoutId='auth-button'
                                    type='submit'
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full mt-4 text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200 ${
                                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                                    }`}>
                                    {isLoading ? "Processing..." : type === "signup" ? "Sign Up" : "Sign In"}
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

interface LabelledInputProps {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ id, name, label, placeholder, type, value, onChange }: LabelledInputProps) {
    return (
        <motion.div layout>
            <motion.label
                layout
                htmlFor={id}
                className='block text-sm font-medium text-gray-700 mb-1'>
                {label}
            </motion.label>
            <motion.input
                layout
                name={name}
                value={value}
                whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                }}
                onChange={onChange}
                type={type || "text"}
                id={id}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                placeholder={placeholder}
                required
            />
        </motion.div>
    );
}

export default AuthForm;
