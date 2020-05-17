const next = require("next");
const express = require("express");
const wooConfig = require("./wooConfig");
const WooCommerceAPI = require("woocommerce-api");

const port = 3000;
// her tjekker jeg om vi er ude af production
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const WooCommerce = new WooCommerceAPI({
  url: wooConfig.siteURL,
  consumerKey: wooConfig.consumerKey,
  consumerSecret: wooConfig.consumerSecret,
  wpAPI: true,
  version: "wc/v1",
});

// her opsætter vi en next.js handler der tager over hvis der er routes der ikke er defineret af express
const handle = app.getRequestHandler();

//Her laver jeg en instans af en express application
app
  .prepare()
  .then(() => {
    const server = express();

    //Her definerer jeg mit endpoint
    server.get("/getproducts", (req, response) => {
      WooCommerce.get("products", function (err, data, res) {
        response.json(JSON.parse(res));
      });
    });

    //Her siger jeg at alle routes der ikke er defineret af express js skal køres i next.js
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`Ready on ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
