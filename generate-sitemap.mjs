import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  "/",
  "/faq",
  "/wish_list",
  "/cart",
  "/trialcart",
  "/new_arrivel",
  "/category_search/:id",
  "/tag_search/:id",
  "/terms_condition",
  "/Return_policy_page",
  "/privacy_policy",
  "/checkout",
  "/addaddress",
  "/swaWallet",
  "/swaExchange",
  "/place_order",
  "/my_orders",
  "/track_order",
  "/about_us",
  "/order_successful",
  "/rate_review",
  "/rate&review",
  "/products/:id/:color/:name",
  "/payment",
  "/profile",
  "/tryathome",
  "/tryathomeform",
  "/outlet",
];

const baseUrl = "https://swa.co";
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
