import { User } from "@prisma/client";
import { prisma } from "../client";
import exclude from "../utils/exclude";
import userService from "./user.service";
const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<Omit<User, "password">> => {
  const user = await userService.getUserByEmail(email);

  return exclude(user, ["password"]);
};

export default { loginUserWithEmailAndPassword };
