import z from "zod";

export const signupInput = z
    .object({
        username: z.string().email("Invalid email address").trim(),
        password: z.string().min(8, "Password must be at least 8 characters").trim(),
        confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters").trim(),
        name: z.string().min(1, "Name is required").trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
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
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
