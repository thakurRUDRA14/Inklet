import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { User, Mail } from "lucide-react";
import EditableInput from "../components/EditableInput";
import type { UpdateProfile } from "@thakurrudra/inklet-common";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/authAtoms";
import { useUpdateUserMutation } from "../features/api/userApiSlice";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import type { ApiError } from "../types/user";

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<UpdateProfile>({
        name: "",
        username: "",
    });

    const [user, setUser] = useRecoilState(userState);
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        if (user && (user.name !== profile.name || user.username !== profile.username)) {
            setProfile({
                name: user.name,
                username: user.username,
            });
        }
    }, [user]);

    const handleSave = async (editingField: string, tempValue: string) => {
        try {
            const updatedUser = await updateUser({
                ...profile,
                [editingField]: tempValue,
            }).unwrap();
            setUser(updatedUser);
            alert(`${editingField.charAt(0).toUpperCase() + editingField.slice(1)} updated successfully`);
        } catch (err) {
            const error = err as ApiError;
            const errMsg =
                error?.data?.message ||
                (typeof error === "string" ? error : `Failed to update ${editingField.charAt(0).toUpperCase() + editingField.slice(1)}`);
            alert(errMsg);
            console.error("Update profile error:", err);
        }
    };

    const getFieldIcon = (field: keyof UpdateProfile) => {
        switch (field) {
            case "name":
                return <User className='w-5 h-5' />;
            case "username":
                return <Mail className='w-5 h-5' />;
            default:
                return null;
        }
    };

    const getFieldLabel = (field: keyof UpdateProfile) => {
        switch (field) {
            case "name":
                return "Full Name";
            case "username":
                return "Email Address";
            default:
                return field;
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='max-w-2xl mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}>
                    <div className='text-center mb-8'>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className='w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
                            <User className='w-12 h-12 text-white' />
                        </motion.div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Profile Settings</h1>
                        <p className='text-gray-600'>Manage your account information</p>
                    </div>

                    <div className='space-y-6'>
                        {(Object.keys(profile) as Array<keyof UpdateProfile>).map((field, index) => (
                            <motion.div
                                key={field}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}>
                                <EditableInput
                                    field={field}
                                    icon={getFieldIcon(field)}
                                    label={getFieldLabel(field)}
                                    preValue={profile[field]}
                                    handleSave={handleSave}
                                    isLoading={isLoading}
                                />
                            </motion.div>
                        ))}

                        <motion.div
                            key='password'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}>
                            <UpdatePasswordForm />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
