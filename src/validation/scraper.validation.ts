import { ScrapingType } from "@prisma/client";

import { z } from "zod";
const axiosScraper = z.object({
  body: z.object({
    url: z.string().url("Invalid URL").trim(),
    config: z
      .array(
        z.object({
          selector: z.string().min(1, "Selector cannot be empty").trim(),
          scrapingType: z.nativeEnum(ScrapingType),
          attribute: z.string().trim().optional(),
          subSelector: z.string().trim().optional(),
        }),
      )
      .min(1, "Input at least one element"),
  }),
});
export default { axiosScraper };
