import z from "zod";
export declare const signupInput: z.ZodEffects<z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
}, {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
}>, {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
}, {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
}>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const updateProfile: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    name: string;
}, {
    username: string;
    name: string;
}>;
export declare const updatePassword: z.ZodEffects<z.ZodObject<{
    newPassword: z.ZodString;
    confirmNewPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newPassword: string;
    confirmNewPassword: string;
}, {
    newPassword: string;
    confirmNewPassword: string;
}>, {
    newPassword: string;
    confirmNewPassword: string;
}, {
    newPassword: string;
    confirmNewPassword: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type UpdateProfile = z.infer<typeof updateProfile>;
export type UpdatePassword = z.infer<typeof updatePassword>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
