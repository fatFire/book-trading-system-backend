"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
  var io = require("socket.io")(strapi.server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on("connection", function (socket) {
    console.log(socket.handshake.auth.id)
    console.log("connected")
    socket.join(socket.handshake.auth.id)
    socket.on("send_message", async (message) => {
      console.log(message.from, message.to)
      console.log(socket.rooms)
      let enetity = await strapi.services.message.create(message)
      io.to(message.fromto[1]).to(message.fromto[0]).emit("send_message", enetity)
    })


    socket.on("disconnect", () => {
      console.log("disconnect")
    });
  });
  
  
};
