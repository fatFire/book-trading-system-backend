'use strict';
const { isDraft } = require('strapi-utils').contentTypes;

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async sale(params) {
    const existingEntry = await strapi.query('books').search(params);

    const data = {
      status: "sale"
    }

    existingEntry.forEach((book) => {
      console.log(book)
      strapi.query('books').update({id: book.id}, data)
    })

    const entry = await strapi.query('books').find(params)

    return entry;
  },
};
