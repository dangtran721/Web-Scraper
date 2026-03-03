import { Prisma, Role, User } from "@prisma/client";
import { prisma } from "../client";
import { encryptPassword } from "../utils/encryption";

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
      password: await encryptPassword(password),
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
const updateUserById = async (
  userId: number,
  updateData: Prisma.UserUpdateInput,
) => {
  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
};
export default { createUser, queryUser, getUserByEmail, updateUserById };
