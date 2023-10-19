import React from 'react'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'

import AlgoliaSearch from './_algolia'

const IndexHero = ({ totalCount, locale, allLogo }) => {
  const { t } = useTranslation()
  return (
    <div className="text-center bg-blue text-gray w-full">
      <div className="max-w-5xl mx-auto my-0 px-[100px] pt-[120px] pb-[80px] tablet:pb-[40px] tablet:px-[40px]">
        <h1 className="text-3xl capitalize tablet:text-2xl font-medium">
          <Trans i18nKey="hero.title">
            Access<span className="desktop:text-6xl desktop:font-thin">{{ totalCount }}</span>
            VectorLogos
          </Trans>
        </h1>
        <p className="desktop:text-base my-md">{t(`hero.subtitle`)}</p>
        <section className="flex-auto relative z-20">
          <AlgoliaSearch locale={locale} allLogo={allLogo} />
          <p className="my-md tablet:text-xs">{t(`search.tips`)}</p>
        </section>
      </div>
    </div>
  )
}

export default IndexHero
