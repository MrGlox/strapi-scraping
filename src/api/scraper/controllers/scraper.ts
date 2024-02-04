/**
 * scraper controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::scraper.scraper",
  ({ strapi }) => ({
    /**
     * Retrieve a record.
     *
     * @return {Object}
     */

    async findOne(ctx) {
      // validateQuery throws an error if any of the query params used are inaccessible to ctx.user
      // That is, trying to access private fields, fields they don't have permission for, wrong data type, etc
      await this.validateQuery(ctx);

      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const { results } = await strapi
        .service("api::restaurant.restaurant")
        .findOne(sanitizedQueryParams);

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults);
    },
  })
);
