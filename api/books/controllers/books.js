"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Get JSON or CSV file and create entries in strapi.
   */
  async creates(ctx) {
    const books = ctx.request.body; //getting the file.

    const ids = [
      "618d3abdff6ad4c0b4bc062a",
      "618de0cbff6ad4c0b4bc0633",
      "618de276ff6ad4c0b4bc0635",
      "618e52658fffc53f7c51d459",
      "618ea4fe1e5f3491e4901e70",
      "61a1256c96497a1fb8c0bb69",
    ];
    const condition = ["New", "Good", "Fair", "Poor"];
    // now, as we have all data parsed as an Array,
    // we can apply a foreach on it and create entities one by one
    const res = [];
    const getInt = (num) => {
      return Math.floor(Math.random() * num);
    };
    books.forEach(async (entity) => {
      entity["users_permissions_user"] = ids[getInt(6)];
      entity["condition"] = condition[getInt(4)]
      const b = await strapi.services.books.create(entity);
      res.push(b);
    });
    return res;
  },
};
