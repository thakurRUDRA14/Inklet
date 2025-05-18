import z from "zod";

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    name: z.string().min(1).optional(),
});

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(8),
});

export const createBlogInput = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
});

export const updateBlogInput = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    id: z.string().min(1),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;