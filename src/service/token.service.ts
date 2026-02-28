import { Token, TokenType } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { prisma } from "../client";
import { AuthTokensResponse } from "../type/response";
const generateToken = (
  userId: number,
  expires: Dayjs,
  type: TokenType,
  secret = config.jwt.secret,
): string => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (
  token: string,
  userId: number,
  type: TokenType,
  expires: Dayjs,
  blacklisted = false,
): Promise<Token> => {
  return await prisma.token.create({
    data: { token, userId, type, expires: expires.toDate(), blacklisted },
  });
};
// To find out if the token is already exits in db or not
const verifyToken = async (token: string, type: TokenType): Promise<Token> => {
  const payload = await jwt.verify(token, config.jwt.secret);
  const userId = Number(payload.sub);
  const tokenVerified = await prisma.token.findFirst({
    where: { token, type, userId, blacklisted: false },
  });
  return tokenVerified;
};
const generateAuthToken = async (user: {
  id: number;
}): Promise<AuthTokensResponse> => {
  const accessExpiresToken = dayjs().add(config.jwt.accessExpirationMinutes);
  const accessToken = generateToken(
    user.id,
    accessExpiresToken,
    TokenType.ACCESS,
  );
  const refreshExpiresToken = dayjs().add(config.jwt.refreshExpirationDays);
  const refreshToken = generateToken(
    user.id,
    refreshExpiresToken,
    TokenType.REFRESH,
  );
  return {
    access: {
      token: accessToken,
      expires: accessExpiresToken.toDate(),
    },
    refresh: { token: refreshToken, expires: refreshExpiresToken.toDate() },
  };
};
