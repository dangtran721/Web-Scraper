import express from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import scraperRouter from "./scraper.routes";
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
  {
    path: "/scraper",
    route: scraperRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
