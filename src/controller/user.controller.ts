import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "../service";
import catchAsync from "../utils/catchAsync";
import { number } from "zod";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;
  const user = await userService.createUser(email, password, name, role);
  res.status(httpStatus.CREATED).send({ user, message: "Created" });
});
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.queryUser();
  res.send(user);
});
const getUpdateUser = catchAsync(async (req: Request, res: Response) => {
  const userUpdated = await userService.updateUserById(
    Number(req.params.userId),
    req.body,
  );
  res.send(userUpdated);
});
export default { createUser, getUsers, getUpdateUser };
