require("babel-register");

const router = require("./router").default;
const Sitemap = require("../").default;

new Sitemap(router)
  .build("https://swaecom-seo.vercel.app/")
  .save("./sitemap.xml");
