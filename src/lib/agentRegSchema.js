import { z } from "zod";

// Ensure 'export' is written right here!
export const agentRegSchema = z.object({
    full_name: z.string().min(3, "Name must be at least 3 characters"),
    company: z.string().min(2, "Company name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});