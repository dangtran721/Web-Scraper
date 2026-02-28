import { z } from "zod";
import { password } from "./refine.validation";

const register = z.object({
  body: z.object({
    email: z.string().trim().email("Invalid email format"),
    password: password,
  }),
});

const login = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  }),
});
const logout = z.object({
  body: z.object({ refreshToken: z.string() }),
});
const refreshToken = z.object({
  body: z.object({ refreshToken: z.string() }),
});
export default {
  register,
  login,
  logout,
  refreshToken,
};
