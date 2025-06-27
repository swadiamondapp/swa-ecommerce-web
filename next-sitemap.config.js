const axios = require("axios");

module.exports = {
  siteUrl: "https://www.swadiamonds.com",
  generateRobotsTxt: true,

  additionalPaths: async () => {
    const paths = [];

    try {
      console.log("📦 Fetching categories...");
      const res = await axios.get("https://swaecommain.swadiamonds.com/ecom/categories/");

      const categories = res.data?.results?.data || [];

      console.log("✅ Categories fetched:", categories.length);

      categories.forEach((cat) => {
        if (cat.name) {
          const slug = cat.name.toLowerCase().replace(/\s+/g, "-");
          paths.push({
            loc: `/${slug}`, // e.g., /rings
            changefreq: "weekly",
            priority: 0.7,
            lastmod: new Date().toISOString(),
          });
        }
      });
    } catch (err) {
      console.error("❌ Category fetch error:", err.message);
    }

    return paths;
  },
};
