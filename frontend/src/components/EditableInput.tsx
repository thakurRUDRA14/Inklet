import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Edit3, Check, X } from "lucide-react";
interface EditableInputProps {
    field: string;
    preValue: string;
    icon: React.ReactNode;
    label: string;
    handleSave: (editingField: string, tempValue: string) => Promise<void>;
    isLoading: boolean;
}
const EditableInput = ({ field, preValue, icon, label, handleSave, isLoading }: EditableInputProps) => {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [tempValue, setTempValue] = useState("");

    const handleEditClick = (field: string) => {
        setEditingField(field);
        setTempValue(preValue);
    };
    const handleCancel = () => {
        setEditingField(null);
        setTempValue("");
    };

    const isEditing = editingField === field;

    return (
        <motion.div
            layout
            className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 bg-gray-100 rounded-lg text-gray-600'>{icon}</div>
                    <h3 className='font-semibold text-gray-800'>{label}</h3>
                </div>

                {!isEditing && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEditClick(field)}
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
                        <div className='relative'>
                            <input
                                type='text'
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                placeholder={`Enter your ${field}`}
                                autoFocus
                            />
                        </div>
                        <div className='flex gap-2'>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={async () => {
                                    await handleSave(field, tempValue);
                                    setEditingField(null);
                                }}
                                disabled={isLoading || !tempValue.trim() || preValue === tempValue}
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
                                onClick={handleCancel}
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
                        <span className='text-gray-900 overflow-x-auto font-medium'>{preValue}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default EditableInput;
