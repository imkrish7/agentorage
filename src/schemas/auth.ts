import { z } from "zod";

export const loginSchema = z.object({
	username: z.email(),
	password: z.string().min(8),
});

export const signupSchema = z.object({
	name: z.string().min(4),
	email: z.email(),
	password: z.string().min(8),
});
