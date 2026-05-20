import { z } from 'zod';

const passwordRules = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");


export const registerSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email format"),
        password: passwordRules,
        passwordConfirmation: z.string(),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ["passwordConfirmation"]     ,
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(1, "Password is required"),
    }),
});