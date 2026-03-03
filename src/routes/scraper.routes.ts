import express from "express";
import { scraperController } from "../controller";
import validate from "../middleware/validate";
import { scraperValidation } from "../validation";

const router = express.Router();

router.get(
  "/",
  validate(scraperValidation.axiosScraper),
  scraperController.getScrape,
);
export default router;
