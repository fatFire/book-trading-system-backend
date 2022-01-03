'use strict';
const { sanitizeEntity } = require('strapi-utils')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async myCreate(ctx) {
    
    let entity  = await strapi.services.order.create(ctx.request.body);

    let books = await strapi.services.books.sale({
      id_in: ctx.request.body.books
    })
    
      
    return sanitizeEntity(entity, { model: strapi.models.order });
  }

};
