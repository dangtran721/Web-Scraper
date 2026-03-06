import dayjs from "dayjs";
import config from "~/config/config";
import userService from "./user.service";
const hardCleanUpUsers = async () => {
  const daysCounting = dayjs()
    .subtract(config.user.hardDeleteDays, "days")
    .toDate();
  await userService.cleanUpDeletedUsers(daysCounting);
};
export default { hardCleanUpUsers };
