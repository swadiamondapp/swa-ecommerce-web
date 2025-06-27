module.exports = {
  siteUrl: "https://www.swadiamonds.com",
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    // Example: fetch from API or hardcode
    const products = ['gold-ring', 'diamond-pendant'];
    return products.map((slug) => ({
      loc: `/product/${slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
