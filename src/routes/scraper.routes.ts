import express from "express";
import { scraperController } from "../controller";

const router = express.Router();

router.get("/", scraperController.getScrape);
export default router;
