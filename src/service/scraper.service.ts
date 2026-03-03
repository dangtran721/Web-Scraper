import axios from "axios";
import * as cheerio from "cheerio";
import ApiError from "../utils/apiError";
import httpStatus from "http-status";
import { ScrapingType } from "@prisma/client";
import aiService from "./ai.service";

const getURL = async (url: string): Promise<string> => {
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    },
    timeout: 5000, // for 5 secs
  });
  return data;
};
const htmlValidate = async (html: string): Promise<string> => {
  const $ = cheerio.load(html);
  $("script, style, noscript, iframe, svg, path, footer, header, nav").remove();
  $("*").each((i, el) => {
    const attributes = $(el).attr();
    for (const attr in attributes) {
      if (attr !== "class" && attr !== "id") {
        $(el).removeAttr(attr);
      }
    }
  });
  const cleanHtml = $("body")
    .html()
    ?.replace(/\s+/g, " ")
    .substring(0, 5000)
    .trim();
  return cleanHtml;
};
const getScrape = async (
  url: string,
  config: {
    selector?: string;
    scrapingType: ScrapingType;
    attribute?: string;
    subSelector?: string;
  }[],
) => {
  try {
    const data = await getURL(url); //html
    const cleanHtml = await htmlValidate(data); // to input into AI
    const $ = cheerio.load(data);

    //loop:
    const finalResults = await Promise.all(
      config.map(async (conf) => {
        try {
          const aiSelector = await aiService.getSelectorByAI(
            cleanHtml,
            conf.selector || "",
          );
          console.log(aiSelector);

          const results: string[] = [];

          $(aiSelector).each((i, el) => {
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
          return {
            aiSelector: aiSelector,
            selector: conf.selector,
            data: results,
          };
        } catch (error) {
          return {
            selector: conf.selector,
            error: "Scraping failed",
          };
        }
      }),
    );
    return finalResults;
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid result ");
  }
};

export default { getScrape, getURL };
