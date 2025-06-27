const axios = require("axios");

const fetchAll = async (url) => {
  let all = [];
  while (url) {
    const res = await axios.get(url);
    const data = res.data;
    all.push(...(data.results || data));
    url = data.next; // support for paginated APIs
  }
  return all;
};

module.exports = {
  siteUrl: "https://www.swadiamonds.com",
  generateRobotsTxt: true,

  additionalPaths: async () => {
    const paths = [];

    try {
      // ✅ Products: /product/slug
      const products = await fetchAll("https://swaecommain.swadiamonds.com/ecom/products/");
      products.forEach((product) => {
        if (product.slug) {
          paths.push({
            loc: `/product/${product.slug}`,
            changefreq: "weekly",
            priority: 0.8,
            lastmod: new Date().toISOString(),
          });
        }
      });

      // ✅ Categories: /rings, /earrings, etc.
      const categories = await fetchAll("https://swaecommain.swadiamonds.com/ecom/categories/");
      categories.forEach((cat) => {
        if (cat.slug) {
          paths.push({
            loc: `/${cat.slug}`, // e.g., /rings
            changefreq: "weekly",
            priority: 0.7,
            lastmod: new Date().toISOString(),
          });
        }
      });

    } catch (error) {
      console.error("❌ Sitemap error:", error.message);
    }

    return paths;
  },
};
