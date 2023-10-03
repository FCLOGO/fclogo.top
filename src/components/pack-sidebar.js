import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, useTranslation, Trans } from 'gatsby-plugin-react-i18next'
import AdSense from 'react-adsense'
import VectorIcon from '../../static/assets/icons/vector.inline.svg'
import WebsiteIcon from '../../static/assets/icons/website.inline.svg'
import WeiboIcon from '../../static/assets/icons/weibo.inline.svg'
import TwitterIcon from '../../static/assets/icons/twitter.inline.svg'
import WikiIcon from '../../static/assets/icons/wiki.inline.svg'
import BugIcon from '../../static/assets/icons/bug.inline.svg'

// Google Adsense
const DetailAdsense = () => {
  return (
    <AdSense.Google
      style={{ display: 'block' }}
      format="fluid"
      layoutKey="-e0+7z-36-93+si"
      client="ca-pub-9573165480183467"
      slot="5850965230"
    />
  )
}

// 主体信息表格
const InfoTable = ({ info }) => {
  const { t } = useTranslation()
  const newInfo = {}
  Object.entries(info)
    .filter(([, value]) => value !== null)
    .forEach(([key, value]) => (newInfo[key] = value))
  const keys = Object.keys(newInfo)
  return (
    <table className="mb-md leading-normal info-table">
      <tbody>
        {keys.map((key, index) => (
          <tr key={index}>
            <th>{t(key)}</th>
            <td>{newInfo[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const PackSidebar = props => {
  const { t } = useTranslation()
  const name = props.name
  return (
    <aside className="pt-[160px] w-aside tablet:w-full flex flex-col border-l border-l-gray-1">
      <header className="w-aside p-xl flex flex-col items-start justify-center content-start tablet:w-full">
        <GatsbyImage image={getImage(props.pngPath)} alt={props.name} />
        <span className="font-mono text-xs uppercase p-mini rounded-sm bg-green text-white mb-md mt-xl w-auto">
          {props.season}
        </span>
        <h1 className="w-full capitalize font-semibold text-base">
          {props.name}
          {t('detailTitleVectorPack')}
        </h1>
      </header>
      <div className="w-aside px-xl py-md flex flex-col border-t border-t-gray-1 tablet:w-full">
        <div className="block mb-md">
          <h6 className="font-semibold my-md">{t('sidebar.termTitle')}</h6>
          <p className="text-xs">
            <Trans i18nKey="sidebar.termTextPack">
              By downloading <b>{{ name }}</b> logo you agree with our terms of use.
            </Trans>
            <Link to="/support/terms-of-use" className="text-link ml-sm hover:text-blue">
              <b>{t('sidebar.termMore')}</b>
            </Link>
          </p>
        </div>
        <div className="block my-md">
          <h6 className="flex flex-row items-center text-xs font-semibold">
            <VectorIcon className="w-xl h-xl mr-xs" />
            {t('sidebar.fileType')}
            <Link to="/support/how-to-edit-vector-file" className="ml-sm text-link hover:text-blue">
              {t('sidebar.howToEdit')}
            </Link>
          </h6>
        </div>
      </div>
      <div className="p-xl w-aside border-t border-t-gray-1 tablet:w-full">
        <DetailAdsense />
      </div>
      <div className="w-aside px-xl py-md border-t border-t-gray-1 tablet:w-full">
        <h6 className="font-semibold my-md">
          {t(props.type)}
          {t('sidebar.infoTitle')}
        </h6>
        <InfoTable info={props.tableInfo} />
        <div className="flex flex-row items-center sidebar-socail">
          {props.websiteURL ? (
            <a href={props.websiteURL} target="_blank" title={t('sidebar.website')}>
              <WebsiteIcon />
            </a>
          ) : (
            ''
          )}
          {props.weiboURL ? (
            <a href={props.weiboURL} target="_blank" title={t('sidebar.weibo')}>
              <WeiboIcon />
            </a>
          ) : (
            ''
          )}
          {props.twitterURL ? (
            <a href={props.twitterURL} target="_blank" title={t('sidebar.twitter')}>
              <TwitterIcon />
            </a>
          ) : (
            ''
          )}
          {props.wikiURL ? (
            <a href={props.wikiURL} target="_blank" title={t('sidebar.wiki')}>
              <WikiIcon />
            </a>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="w-aside px-xl py-3xl border-t border-t-gray-1 tablet:w-full">
        <h6 className="flex flex-row items-center text-xs font-semibold">
          <BugIcon className="w-xl h-xl mr-xs" />
          {t('sidebar.foundErr')}
          <a
            href="https://github.com/FCLOGO/fclogo.top/discussions"
            rel="noopener noreferrer"
            target="_blank"
            className="text-link ml-sm hover:text-blue"
          >
            {t('sidebar.tellMe')}
          </a>
        </h6>
      </div>
    </aside>
  )
}

export default PackSidebar
