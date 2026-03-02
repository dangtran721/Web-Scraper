import scraperService from "../service/scraper.service";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";

const getScrape = catchAsync(async (req, res) => {
  const { url, selector, scrapingType, subSelector, attribute } = req.body;
  const result = await scraperService.getScrape(
    url,
    selector,
    scrapingType,
    attribute,
    subSelector,
  );
  res.status(httpStatus.OK).send({ result });
});
export default { getScrape };
