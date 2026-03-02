import { ScrapingType } from "@prisma/client";
import { z } from "zod";
const axiosScraper = z.object({
  body: z.object({
    url: z.string().url("Invalid URL").trim(),
    selector: z.string().min(1, "Selector cannot empty").trim(),
    scrapingType: z.nativeEnum(ScrapingType),
    attribute: z.string().trim().optional(),
    subSelector: z.string().trim().optional(),
  }),
});
export default { axiosScraper };
