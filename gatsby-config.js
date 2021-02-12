/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `FCLOGO`,
    description: ``,
    keywords: ``,
    author: `@fclogo`,
    siteUrl: `https://fclogo.top/`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Yaml`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
        name: `mainData`,
      },
    },
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        // Modify the defaultLang in gatsby-node.js at the same time.
        defaultLang: `en`,
        configPath: require.resolve(`./i18n/config.json`),
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-intl`,
      options: {
        defaultLocale: `./i18n/react-intl/en.json`,
      },
    },
  ],
}
