import * as jamstack from "../src/scripts/scrapers/jamstack.js";

export default {
  /**
   * Cron config that gives you an opportunity
   * to run scheduled jobs.
   *
   * The cron format consists of:
   * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
   *
   * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#cron-tasks
   */
  jamstack: {
    task: () => {
      // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
      jamstack.main();
    },
    options: {
      rule: "* * * * *",
    },
  },
};
