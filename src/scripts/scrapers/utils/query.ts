import chalk from "chalk";

const createSiteGenerators = async (
  name,
  stars,
  forks,
  issues,
  description,
  language,
  template,
  license,
  deployLink,
  scraper
) => {
  try {
    const entry = await strapi
      .query("api::site-generator.site-generator")
      .create({
        data: {
          name,
          stars,
          forks,
          issues,
          description,
          language,
          template,
          license,
          deploy_to_netlify_link: deployLink,
          scraper: scraper.id,
        },
      });
  } catch (e) {
    console.log(e);
  }
};

const updateScraper = async (scraper, report, errors) => {
  await strapi.query("api::scraper.scraper").update({
    where: { id: scraper.id },
    data: {
      report: report,
      error: errors,
    },
  });

  console.log(`Job done for: ${chalk.green(scraper.name)}`);
};

export { createSiteGenerators, updateScraper };
