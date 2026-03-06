import { Request, Response } from "express";
import httpStatus from "http-status";
import { authService, tokenService, userService } from "~/service";
import catchAsync from "~/utils/catchAsync";
import exclude from "~/utils/exclude";

const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const user = await userService.createUser(email, password, name);
  const userWithOutPassword = exclude(user, [
    "createdAt",
    "updatedAt",
    "password",
  ]);
  res.status(httpStatus.CREATED).send(userWithOutPassword);
});
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthToken(user);
  res.send({ user, tokens });
});
const logout = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  await authService.logout(refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const tokenRefreshed = await authService.refreshAuthToken(
    req.body.refreshToken,
  );
  res.send(tokenRefreshed);
});
export default { register, login, logout, refreshToken };
