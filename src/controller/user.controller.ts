import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "../service";
const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser();
  res.status(httpStatus.CREATED).send({ user, message: "Created" });
};
export default { createUser };
