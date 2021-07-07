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
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    {
      resolve: `gatsby-plugin-usei18n`,
      options: {
        defaultLang: `en`,
        configPath: require.resolve(`./i18n/config.json`),
        redirect: true,
        prefixDefault: false
      }
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Logo`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
        name: `mainData`
      }
    }
  ]
}
