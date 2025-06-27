const axios = require("axios");

module.exports = {
  siteUrl: "https://www.swadiamonds.com",
  generateRobotsTxt: true,

  additionalPaths: async () => {
    const paths = [];

    // ================= Categories =================
    try {
      console.log("📦 Fetching categories...");
      const res = await axios.get("https://swaecommain.swadiamonds.com/ecom/categories/");
      const categories = res.data?.results?.data || [];

      console.log("✅ Categories fetched:", categories.length);

      categories.forEach((cat) => {
        if (cat.name) {
          const slug = cat.name.toLowerCase().replace(/\s+/g, "-");
          paths.push({
            loc: `/${slug}`,
            changefreq: "weekly",
            priority: 0.7,
            lastmod: new Date().toISOString(),
          });
        }
      });
    } catch (err) {
      console.error("❌ Category fetch error:", err.message);
    }

    // ================= Products =================
    try {
      console.log("🛍️ Fetching products...");
      const prodRes = await axios.get("https://swaecommain.swadiamonds.com/ecom/products/");
      const products = prodRes.data?.results?.data || [];

      console.log("✅ Products fetched:", products.length);

      products.forEach((prod) => {
        if (prod.alias) {
          paths.push({
            loc: `/jewellery/${prod.alias}`,
            changefreq: "weekly",
            priority: 0.8,
            lastmod: new Date().toISOString(),
          });
        }
      });
    } catch (err) {
      console.error("❌ Product fetch error:", err.message);
    }

    console.log("🔧 Total dynamic paths added:", paths.length);
    return paths;
  },
};
