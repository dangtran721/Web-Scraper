import express from "express";
import "dotenv/config";
import userRoutes from "./routes/user.routes";
import router from "./routes";
const app = express();
const PORT = process.env.PORT || 3000;

console.log(`Running on ${PORT}`);
app.use("/", router);
export default app;
