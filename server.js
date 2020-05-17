const next = require("next");
const wooConfig = require("./wooConfig");

const port = 3000;
const WooCommerceAPI = require("woocommerce-api");
// her tjekker jeg om vi er ude af production
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const WooCommerce = new WooCommerceAPI({
  url: "http://localhost:8000",
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

    server.get("/getProducts", (req, res) => {
      WooCommerce.get("products", function (err, data, res) {
        console.log(res);
      });
    });

    //Her siger jeg at alle routes der ikke håndteres af express js skal køres i next.js
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.lister(port, (err) => {
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
