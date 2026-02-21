import { Role, User } from "@prisma/client";
import { prisma } from "../client";

const createUser = async (
  email: string,
  password: string,
  name?: string,
  role: Role = Role.USER,
): Promise<User> => {
  return await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: password,
      role: role,
    },
  });
};
const queryUser = async (): Promise<User[]> => {
  return await prisma.user.findMany({});
};
const getUserByEmail = async (email: string): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("No email matched");
  }

  return user;
};
export default { createUser, queryUser, getUserByEmail };
