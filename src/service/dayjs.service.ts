import dayjs from "dayjs";
import cron from "node-cron";
import httpStatus from "http-status";
import config from "~/config/config";
import ApiError from "~/utils/apiError";
import userService from "./user.service";

const hardCleanUpUsers = async () => {
  cron.schedule(config.cron.cleanupTime, async () => {
    const execDaysCountdown = dayjs()
      .subtract(config.user.hardDeleteDays, "days")
      .toDate();
    try {
      await userService.cleanUpDeletedUsers(execDaysCountdown);
    } catch (error) {
      throw new ApiError(httpStatus.CONFLICT, error);
    }
  });
};
export default { hardCleanUpUsers };
