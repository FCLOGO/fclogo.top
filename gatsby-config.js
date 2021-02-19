/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `FCLOGO`,
    description: `Collection of football club vector logos. All logos work with SVG and AI. No account and unlimited downloads for free.`,
    keywords: `football,football club,logo,vector,vector logo,football logo,football badge,AI,SVG`,
    author: `@fclogo`,
    siteUrl: `https://fclogo.top/`
  },
  plugins: [
    `gatsby-plugin-stylus`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /icons/
        }
      }
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Yaml`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
        name: `mainData`
      }
    },
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        // Modify the defaultLang in gatsby-node.js at the same time.
        defaultLang: `en`,
        configPath: require.resolve(`./i18n/config.json`)
      }
    },
    {
      resolve: `gatsby-theme-i18n-react-intl`,
      options: {
        defaultLocale: `./i18n/react-intl/en.json`
      }
    }
  ]
}
