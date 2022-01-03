"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async findorcreate(ctx) {
    const { book, users } = ctx.request.body;

    // let conversations = await strapi.services.conversation.find({
    //   _where: {
    //     _or: [{user1: user1}, {user2: user1}]
    //   }
    // });

    // console.log(conversations)

    let entity = await strapi.services.conversation.findOne({
      book: book,
      users: users,
    });

    if (!entity) {
      entity = await strapi.services.conversation.create({
        book,
        users
      });
    }

    return sanitizeEntity(entity, { model: strapi.models.conversation });
  },

  async findall(ctx) {
    const { user } = ctx.request.body;

    let entity = await strapi.services.conversation.find({
      users_in: user,
    });

    // let entity2 = await strapi.services.conversation.find({
    //   user2: user,
    // });

    // let entity
    // if(entity1 && entity2) {
    //   entity = entity1.concat(entity2)
    // } else {
    //   entity = entity1 || entity2
    // }

    return sanitizeEntity(entity, { model: strapi.models.conversation });
  },
};
