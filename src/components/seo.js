import React from 'react'
import { useSiteMetadata } from '../hooks/use-site-metadata'

const Seo = ({
  description,
  title,
  image,
  path,
  originalPath,
  type,
  locale,
  languages = [],
  children
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    author
  } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}/${path ? path.replace(/^\/+/, '') : ''}`,
    image: `${siteUrl}${image || `/assets/images/logo-share.png`}`,
    type: type || `website`,
    locale: locale || 'en',
    author
  }

  // 生成 linkTags，确保 languages 不为 undefined
  const linkTags = languages.map(language => {
    const langPath = language === 'en' ? originalPath : `/${language}${originalPath}`
    return (
      <link rel="alternate" href={`${siteUrl}${langPath}`} hreflang={language} key={language} />
    )
  })

  return (
    <>
      <title>{`${seo.title} - ${defaultTitle}`}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:title" content={seo.title} />
      <meta property="og: site_name" content={defaultTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content={seo.author} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:url" content={seo.url} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image:src" content={seo.image} />
      <link rel="canonical" href={seo.url} />
      {linkTags}
      <meta name="baidu-site-verification" content="codeva-dQrpWaqWuy" />
      {children}
    </>
  )
}

export default Seo
