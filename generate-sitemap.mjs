import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  "/",
  "/fa/questions",
  "/wished/list",
  "/shoping/cart",
  "/trial/cart",
  "/new/arrivals",
  "/category_search/:id",
  "/tag_search/:id",
  "/terms/condition",
  "/return/policy",
  "/privacy/policy",
  "/cart/checkout",
  "/add/address",
  "/swa/wallet",
  "/swa/exchange",
  "/place/order",
  "/my/orders",
  "/track/orders",
  "/about/us",
  "/order/successfull",
  "/rate/review",
  "/rate&/review",
  "/products/:id/:color/:name",
  "/product/payment",
  "/my/profile",
  "/trial/athome",
  "/tryathome/form",
  "/product/outlets",
];

const baseUrl = "https://www.swa.co";
const lastmod = new Date().toISOString();

const createUrlTag = (loc) => `
  <url>
    <loc>${baseUrl}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
`;

const sitemapContent = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(createUrlTag).join("")}
  </urlset>
`;

fs.writeFileSync(
  path.join(__dirname, "public", "sitemap.xml"),
  sitemapContent.trim()
);

console.log("Sitemap generated successfully!");
