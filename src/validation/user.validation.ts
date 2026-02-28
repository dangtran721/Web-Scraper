import { z } from "zod";
const updateUser = z.object({
  params: z.object({
    userId: z.string(),
  }),
  // limit what are user able to update
  body: z
    .object({
      name: z.string().optional(),
      password: z.string().optional(),
    })
    .strict(), // will throw error if got input something else
});
export default {
  updateUser,
};
