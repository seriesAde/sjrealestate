import { z } from "zod";

export const appointmentSchema = z.object({
  property_id: z.string().min(1, "Property ID is required"),
  user_id: z.string().min(1, "user ID is required"),
  date: z.string().min(1, "Please select a date"),
  msg: z.string().min(10, "Message must be at least 10 characters"),
  time: z.object({
    from: z.string().min(1, "Start time is required"),
    to: z.string().min(1, "End time is required"),
  }),
});