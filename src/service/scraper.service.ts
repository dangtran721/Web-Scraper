import axios from "axios";
import * as cheerio from "cheerio";
import ApiError from "../utils/apiError";
import httpStatus, { SEE_OTHER } from "http-status";
import { ScrapingType } from "@prisma/client";

const getScrape = async (
  url: string,
  config: {
    selector: string;
    scrapingType: ScrapingType;
    attribute?: string;
    subSelector?: string;
  }[],
) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      },
      timeout: 5000, // for 5 secs
    });
    const $ = cheerio.load(data);

    //loop:
    const finalResults = config.map((conf) => {
      try {
        const results: string[] = [];
        $(conf.selector).each((i, el) => {
          let value: string | undefined;
          const elToScrape = conf.subSelector
            ? $(el).find(conf.subSelector)
            : $(el);
          // to flexible:
          if (conf.scrapingType === ScrapingType.TEXT) {
            value = elToScrape.text().trim();
          } else {
            value = elToScrape.attr(conf.attribute);
          }
          if (value) results.push(value);
        });

        if (results.length === 0) {
          throw new Error("No data found for this selector");
        }
        // to clearly
        return { selector: conf.selector, data: results };
      } catch (error) {
        return {
          selector: conf.selector,
          error: "Scraping failed",
        };
      }
    });
    return finalResults;
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid result ");
  }
};
export default { getScrape };
