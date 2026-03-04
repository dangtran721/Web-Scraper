import { ScrapingType } from "@prisma/client";
import { z } from "zod";

const BLACKLIST_KEYWORDS = ["hack", "crack", "admin", "password"];

const axiosScraper = z.object({
  body: z.object({
    url: z.string().url("Invalid URL").trim(),
    config: z
      .array(
        z.object({
          selector: z
            .string()
            .min(2, "Selector cannot be empty")
            .trim()
            .refine(
              (val) => {
                // Check for special input (??, !!,..)
                const hasLetterOrNum = /[a-zA-Z0-9]/.test(val);
                // Blacklist check
                const isBlacklisted = BLACKLIST_KEYWORDS.some((word) =>
                  val.toLowerCase().includes(word),
                );
                return hasLetterOrNum && !isBlacklisted;
              },
              {
                message: "The request is invalid or contains banned words",
              },
            ),
          scrapingType: z.nativeEnum(ScrapingType),
          attribute: z.string().trim().optional(),
          subSelector: z.string().trim().optional(),
        }),
      )
      .min(1, "Input at least one element")
      .refine(
        (items) => {
          return items.every(
            (item) =>
              item.scrapingType !== ScrapingType.ATTR ||
              (item.attribute && item.attribute.length > 0),
          );
        },
        {
          message: "Need to enter the attribute name (Ex: src, href,...)",
        },
      ),
  }),
});
export default { axiosScraper };
