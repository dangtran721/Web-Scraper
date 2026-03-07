import { Prisma, Role, User } from "@prisma/client";
import dayjs from "dayjs";
import httpStatus from "http-status";
import { prisma } from "~/client";
import ApiError from "~/utils/apiError";
import { encryptPassword } from "~/utils/encryption";

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
      isDeleted: false,
      role: role,
    },
  });
};
const queryUser = async (): Promise<User[]> => {
  return await prisma.user.findMany({});
};
const getUserByEmail = async (email: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { email, isDeleted: false },
  });

  if (!user) {
    throw new Error("No email matched");
  }

  return user;
};
const getUserById = async (userId: number): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id: userId, isDeleted: false },
  });
  return user;
};
const updateUserById = async (
  userId: number,
  updateData: Prisma.UserUpdateInput,
): Promise<User> => {
  return await prisma.user.update({
    where: { id: userId, isDeleted: false },
    data: updateData,
  });
};
const restoreUserById = async (userId: number): Promise<User> => {
  return await prisma.user.update({
    where: { id: userId, isDeleted: true },
    data: { isDeleted: false, deleteAt: null },
  });
};
const softDeleteUserById = async (userId: number): Promise<User> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  return await prisma.user.update({
    where: { id: userId, isDeleted: false },
    data: {
      isDeleted: true,
      deleteAt: dayjs().toDate(),
    },
  });
};

const hardDeleteUserById = async (userId: number): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  return await prisma.user.delete({ where: { id: userId } });
};

const cleanUpDeletedUsers = async (execDaysCountdown: Date) => {
  return await prisma.user.deleteMany({
    where: {
      isDeleted: true,
      deleteAt: {
        lt: execDaysCountdown,
      },
    },
  });
};
export default {
  createUser,
  queryUser,
  getUserByEmail,
  getUserById,
  updateUserById,
  restoreUserById,
  softDeleteUserById,
  hardDeleteUserById,
  cleanUpDeletedUsers,
};
