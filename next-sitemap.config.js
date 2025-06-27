// next-sitemap.config.js
const axios = require("axios");

module.exports = {
  siteUrl: "https://www.swadiamonds.com",
  generateRobotsTxt: true,

  additionalPaths: async (config) => {
    const paths = [];

    try {
      // 🔹 Fetch product list from your Django backend
      const res = await axios.get("https://swaecommain.swadiamonds.com/ecom/products/");
      
      const products = res.data; // or `res.data.results` if paginated

      for (const product of products) {
        paths.push({
          loc: `/product/${product.slug}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      }

    } catch (err) {
      console.error("❌ Sitemap product fetch failed:", err.message);
    }

    return paths;
  },
};
