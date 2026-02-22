import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import userService from "../service/user.service";
import authService from "../service/auth.service";
import exclude from "../utils/exclude";
const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const user = await userService.createUser(email, password, name);
  const userWithOutPassword = await exclude(user, [
    "createAt",
    "updateAt",
    "password",
  ]);
  res.status(httpStatus.CREATED).send(userWithOutPassword);
});
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  res.send(user);
});
// const logout = catchAsync(async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const user = await authService.loginUserWithEmailAndPassword(email, password);
//   res.send(user);
// });

export default { register, login };
