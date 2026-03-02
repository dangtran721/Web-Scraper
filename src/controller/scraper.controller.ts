import scraperService from "../service/scraper.service";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";

const getScrape = catchAsync(async (req, res) => {
  const { url, config } = req.body;
  const result = await scraperService.getScrape(url, config);
  res.status(httpStatus.OK).send({ data: result });
});
export default { getScrape };
