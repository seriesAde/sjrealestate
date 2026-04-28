import { z } from "zod";

export const registerSchema = z.object({
    full_name: z.string().min(2, "Full Name must be at least 2 characters"),
    phone: z.string().min(10, "Phone Number must be at least 10 digits"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});