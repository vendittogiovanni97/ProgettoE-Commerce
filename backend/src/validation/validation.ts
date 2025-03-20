import { z } from "zod";
import { isAdmin } from "../middleware/isAdmin";

export const LoginSchemaZod = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Must be 6 or more characters long" })
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[!@#$%^&*(),.?":{}|<>]/),
  isAdmin: z.boolean().optional(),
});

export const RegisterSchemaZod = z.object({
  email: z.string().email({ message: "Invalid email address" }).max(49),
  password: z
    .string()
    .min(6, { message: "Must be 6 or more characters long" })
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[!@#$%^&*(),.?":{}|<>]/),
  name: z.string().max(49).min(5),
  isAdmin: z.boolean().optional().default(false),
});
