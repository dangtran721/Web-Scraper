import axios from "axios";
import * as cheerio from "cheerio";
import ApiError from "../utils/apiError";
import httpStatus, { SEE_OTHER } from "http-status";
import { ScrapingType } from "@prisma/client";

const getScrape = async (
  url: string,
  selector: string,
  scrapingType: ScrapingType,
  attribute?: string,
  subSelector?: string,
) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      },
    });
    const $ = cheerio.load(data);

    const results: string[] = [];

    $(selector).each((i, el) => {
      let value: string | undefined;
      const elToScrape = subSelector ? $(el).find(subSelector) : $(el);
      // to flexible:
      if (scrapingType === ScrapingType.TEXT) {
        value = elToScrape.text().trim();
      } else {
        value = elToScrape.attr(attribute);
      }

      if (value) results.push(value);
    });
    if (results.length === 0) {
      throw new Error();
    }

    return results;
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid result");
  }
};
export default { getScrape };
