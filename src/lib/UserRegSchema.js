import { z } from "zod";

// Ensure 'export' is written right here!
export const userRegSchema = z.object({
    first_name: z.string().min(3, "Name must be at least 3 characters"),
     last_name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});