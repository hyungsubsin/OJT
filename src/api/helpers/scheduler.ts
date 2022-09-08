import { CronJob } from 'cron';
import * as schedule from 'node-schedule';
import script from './getchildcarecenterdata';

const job = schedule.scheduleJob('* * 24 * * *', function () {
  script.getChildCareCenterData();
});

export default { job };
