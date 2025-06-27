const axios = require('axios');

module.exports = {
  siteUrl: "https://www.swadiamonds.com",
  generateRobotsTxt: true,

  // Dynamically add product and category URLs
  additionalPaths: async (config) => {
    const paths = [];

    try {
      // 🔹 Fetch products from Django API
      const productRes = await axios.get('https://swaecommain.swadiamonds.com/ecom/products/'); // Replace with your actual API
      const products = productRes.data;

      products.forEach((product) => {
        paths.push({
          loc: `/product/${product.slug}`, // or whatever your dynamic route is
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      });

      // 🔹 Fetch categories from Django API
      const categoryRes = await axios.get('https://api.swadiamonds.com/api/categories/');
      const categories = categoryRes.data;

      categories.forEach((category) => {
        paths.push({
          loc: `/category/${category.slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        });
      });
    } catch (error) {
      console.error("Failed to fetch slugs for sitemap:", error.message);
    }

    return paths;
  },
};
