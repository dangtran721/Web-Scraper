import { TokenType, User } from "@prisma/client";
import exclude from "../utils/exclude";
import userService from "./user.service";
import { isPasswordMatch } from "../utils/encryption";
import { prisma } from "../client";
import ApiError from "../utils/apiError";
import httpStatus from "http-status";
import tokenService from "./token.service";
import { number } from "zod";
import { AuthTokensResponse } from "../type/response";
const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<Omit<User, "password">> => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await isPasswordMatch(password, user.password as string))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return exclude(user, ["password"]);
};
const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenQueried = await prisma.token.findFirst({
    where: {
      token: refreshToken,
      type: TokenType.REFRESH,
      blacklisted: false,
    },
  });
  if (!refreshTokenQueried) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await prisma.token.delete({ where: { id: refreshTokenQueried.id } });
};
const refreshAuthToken = async (
  refreshToken: string,
): Promise<AuthTokensResponse> => {
  try {
    const refreshTokenData = await tokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH,
    );
    const { userId } = refreshTokenData;
    await prisma.token.delete({ where: { id: refreshTokenData.id } });
    return tokenService.generateAuthToken({ id: userId });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Need authenticate");
  }
};
export default { loginUserWithEmailAndPassword, logout, refreshAuthToken };
