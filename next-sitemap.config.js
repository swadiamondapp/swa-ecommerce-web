const axios = require("axios");

module.exports = {
  siteUrl: "https://www.swadiamonds.com",
  generateRobotsTxt: true,

  additionalPaths: async () => {
    const paths = [];

    try {
      console.log("📦 Fetching categories...");
      const res = await axios.get("https://swaecommain.swadiamonds.com/ecom/categories/");
      console.log("🌐 Raw category API response:", JSON.stringify(res.data));

      const categories = Array.isArray(res.data) 
        ? res.data 
        : res.data.results;

      console.log("✅ Categories fetched:", categories?.length);

      if (Array.isArray(categories)) {
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
      } else {
        console.error("❌ Unexpected response format for categories");
      }

    } catch (err) {
      console.error("❌ Category fetch error:", err.message);
    }

    return paths;
  },
};
