import * as jamstack from "../src/scripts/scrapers/jamstack";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    // Your custom bootstrap code here
    console.log("Strapi server has been bootstrapped!");

    // Example: You can perform database operations, set up default data, etc.
    // const userService = strapi.plugin('users-permissions').service('user');
    // Check for default user, create if not exist, etc.
    // jamstack.main();
  },
};
