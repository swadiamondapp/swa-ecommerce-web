const axios = require("axios");

module.exports = {
  siteUrl: "https://www.swadiamonds.com",
  generateRobotsTxt: true,

  additionalPaths: async () => {
    const paths = [];

    try {
      console.log("📦 Fetching products...");
      const res = await axios.get("https://swaecommain.swadiamonds.com/ecom/products/");
      const products = res.data.results || res.data;

      console.log("✅ Products fetched:", products.length);

      products.forEach((item) => {
        if (item.slug) {
          paths.push({
            loc: `/product/${item.slug}`,
            changefreq: "weekly",
            priority: 0.8,
            lastmod: new Date().toISOString(),
          });
        }
      });

    } catch (err) {
      console.error("❌ Product fetch error:", err.message);
    }

    try {
      console.log("📦 Fetching categories...");
      const res = await axios.get("https://swaecommain.swadiamonds.com/ecom/categories/");
      const categories = res.data.results || res.data;

      console.log("✅ Categories fetched:", categories.length);

      categories.forEach((cat) => {
        if (cat.slug) {
          paths.push({
            loc: `/${cat.slug}`,
            changefreq: "weekly",
            priority: 0.7,
            lastmod: new Date().toISOString(),
          });
        }
      });

    } catch (err) {
      console.error("❌ Category fetch error:", err.message);
    }

    console.log("🔧 Total dynamic paths added:", paths.length);
    return paths;
  },
};
