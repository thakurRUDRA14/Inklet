"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.updatePassword = exports.updateProfile = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default
    .object({
    username: zod_1.default.string().email("Invalid email address").trim(),
    password: zod_1.default.string().min(8, "Password must be at least 8 characters").trim(),
    confirmPassword: zod_1.default.string().min(8, "Confirm Password must be at least 8 characters").trim(),
    name: zod_1.default.string().min(1, "Name is required").trim(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
exports.signinInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
exports.updateProfile = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required").trim(),
    username: zod_1.default.string().email(),
});
exports.updatePassword = zod_1.default
    .object({
    newPassword: zod_1.default.string().min(8, "New password must be at least 8 characters long").trim(),
    confirmNewPassword: zod_1.default.string().min(8, "Confirm new password must be at least 8 characters long").trim(),
})
    .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string().min(1),
    content: zod_1.default.string().min(1),
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string().min(1),
    content: zod_1.default.string().min(1),
});
