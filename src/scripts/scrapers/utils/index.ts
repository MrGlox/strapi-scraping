import parser from "cron-parser";
import chalk from "chalk";

const getAllSG = async (scraper) => {
  const existingSG = await strapi
    .query("api::site-generator.site-generator")
    .findMany({
      select: ["name"],
      data: {
        _limit: 1000,
        scraper: scraper.id,
      },
    });

  const allSG = existingSG.map((x) => x.name);
  console.log(`Site generators in database: \t${chalk.blue(allSG.length)}`);

  return allSG;
};

const getDate = async () => {
  const today = new Date();

  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return date + " " + time;
};

const getReport = async (newSG) => {
  return { newSG: newSG, date: await getDate() };
};

const scraperCanRun = async (scraper) => {
  const frequency = parser.parseExpression(scraper.frequency);
  const current_date = parseInt((new Date().getTime() / 1000).toString());

  let next_execution_at = -1;

  if (scraper.next_execution_at) {
    next_execution_at = scraper.next_execution_at;
  } else {
    next_execution_at = frequency.next().getTime() / 1000;

    await strapi.query("api::scraper.scraper").update({
      where: { id: scraper.id },
      data: { next_execution_at },
    });
  }

  if (next_execution_at <= current_date) {
    await strapi.query("api::scraper.scraper").update({
      where: { id: scraper.id },
      data: { next_execution_at },
    });

    return true;
  }

  return false;
};

export { getAllSG, getDate, getReport, scraperCanRun };
