import dotenv from "dotenv";
import { z } from "zod";
import path from "path";
import cron from "node-cron";
// Connect to .env:
dotenv.config({ path: path.join(process.cwd(), ".env") });
// validate whole stuff:
const envSchema = z.object({
  PORT: z.string().transform(Number).default("3000"),
  JWT_SECRET: z.string().min(1),
  JWT_ACCESS_EXPIRATION_MINUTES: z.coerce.number().default(30),
  JWT_REFRESH_EXPIRATION_DAYS: z.coerce.number().default(30),
  AI_API_KEY: z.string(),
  USER_HARD_DELETE_DAYS: z.coerce.number().default(30),
  CRON_TIME_TO_HARD_DELETE: z
    .string()
    .default("0 0 * * *")
    .refine((val) => cron.validate(val), {
      message: "Syntax incorrect! Must be 'minute hour day month day'",
    }),
});
// validate and turn data into usable
const envVars = envSchema.parse(process.env);

const config = {
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  } as const, // prevent to overwrite
  ai: {
    apiKey: envVars.AI_API_KEY,
  },
  user: {
    hardDeleteDays: envVars.USER_HARD_DELETE_DAYS,
  },
  cron: {
    cleanupTime: envVars.CRON_TIME_TO_HARD_DELETE,
  },
};
// export for comfy
export type Config = typeof config;
export default config;
