export default {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/scrapers/:slug",
      auth: false,
      handler: "scraper.findOne",
      config: {
        policies: [],
      },
    },
  ],
};
