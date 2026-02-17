import { Role, User } from "@prisma/client";
import { prisma } from "../client";

const createUser = async (): Promise<User> => {
  return await prisma.user.create({
    data: {
      email: "test@gmail.com",
      name: "test",
      password: "123456",
      role: Role.USER,
    },
  });
};
export default { createUser };
