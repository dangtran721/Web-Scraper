import express from "express";
import "dotenv/config";
import router from "./routes";
const app = express();
const PORT = process.env.PORT || 3000;

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
export default app;
