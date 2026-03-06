import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "~/service";
import catchAsync from "~/utils/catchAsync";

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
const restoreUser = catchAsync(async (req: Request, res: Response) => {
  const userRestored = await userService.restoreUserById(
    Number(req.params.userId),
  );
  res.status(httpStatus.OK).send(userRestored);
});
const softDeleteUser = catchAsync(async (req: Request, res: Response) => {
  const userSoftDel = await userService.softDeleteUserById(
    Number(req.params.userId),
  );
  res.status(httpStatus.OK).send(userSoftDel);
});

const hardDeleteUser = catchAsync(async (req: Request, res: Response) => {
  await userService.hardDeleteUserById(Number(req.params.userId));
  res.status(httpStatus.NO_CONTENT).send();
});
export default {
  createUser,
  getUsers,
  getUpdateUser,
  restoreUser,
  softDeleteUser,
  hardDeleteUser,
};
