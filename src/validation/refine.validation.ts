import { z } from "zod";

export const password = z
  .string()
  .min(6, "password must be at least 6 characters")
  .refine((value) => /\d/.test(value) && /[a-zA-Z]/.test(value), {
    message: "password must contain at least 1 letter and 1 number",
  });
