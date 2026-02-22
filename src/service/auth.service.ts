import { User } from "@prisma/client";
import exclude from "../utils/exclude";
import userService from "./user.service";
import { isPasswordMatch } from "../utils/encryption";
const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<Omit<User, "password">> => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await isPasswordMatch(password, user.password as string))) {
    throw new Error("loginUserWithEmailAndPassword");
  }
  return exclude(user, ["password"]);
};

export default { loginUserWithEmailAndPassword };
