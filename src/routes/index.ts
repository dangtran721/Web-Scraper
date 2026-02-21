import express from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
const router = express.Router();
const defaultRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
