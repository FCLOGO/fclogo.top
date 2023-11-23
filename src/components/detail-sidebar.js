import React from 'react'
import { Link, useTranslation, Trans } from 'gatsby-plugin-react-i18next'
import AdSense from 'react-adsense'
import UpdateDownloads from '../lib/update-downloads'
import DownloadCounter from '../components/download-counter'

import DownloadIcon from '../../static/assets/icons/download.inline.svg'
import VectorIcon from '../../static/assets/icons/vector.inline.svg'
import WebsiteIcon from '../../static/assets/icons/website.inline.svg'
import WeiboIcon from '../../static/assets/icons/weibo.inline.svg'
import XIcon from '../../static/assets/icons/x.inline.svg'
import WikiIcon from '../../static/assets/icons/wiki.inline.svg'
import AtIcon from '../../static/assets/icons/ctrb.inline.svg'
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

const DetailSidebar = props => {
  const { t } = useTranslation()
  const fullName = props.fullName
  const pushCounter = () => UpdateDownloads(props.sourceID, props.logoID)
  return (
    <aside className="pt-[160px] tablet:pt-xl w-aside tablet:w-full flex flex-col border-l border-l-gray-1 bg-white">
      <header className="w-aside p-xl flex flex-col items-start justify-center content-start tablet:w-full">
        <section className="flex flex-row justify-start items-center">
          {props.version === 0 ? (
            ''
          ) : (
            <span className="text-xs font-semibold bg-green rounded-sm text-gray px-xs py-mini mr-xs">
              {t('sidebar.logoVer')}
              <data className="font-mono">{props.version}</data>
              {props.isDoubtful ? t('sidebar.doubtful') : ''}
            </span>
          )}
          {props.isOutdated ? (
            <span className="text-xs font-semibold bg-green rounded-sm text-gray px-xs py-mini">
              {t('sidebar.outdated')}
            </span>
          ) : (
            ''
          )}
        </section>
        <div className="w-full flex flex-row items-center justify-between mt-md">
          <h1 className="text-base capitalize flex-auto font-semibold">
            {props.fullName}
            {t('detailTitleVector')}
          </h1>
          {props.status !== 'alive' && props.status ? (
            <span className="flex-none text-xs uppercase font-semibold bg-light-gray rounded-sm text-gray px-xs py-mini ml-xs">
              {t(props.status)}
            </span>
          ) : (
            ''
          )}
        </div>
      </header>
      <div className="w-aside px-xl mb-md flex flex-row items-center justify-between tablet:justify-start tablet:w-full">
        <a
          href={props.pngURL}
          download
          onClick={pushCounter}
          className="bg-green text-white rounded-md cursor-pointer text-lg uppercase w-[200px] h-[50px] flex flex-row items-center justify-between hover:bg-light-green"
        >
          <span className="flex-auto text-center font-mono">PNG</span>
          <DownloadIcon className="w-[50px] h-[50px] p-md flex-none rounded-r-md bg-light-green stroke-white border-l border-l-white border-opacity-30" />
        </a>
        <a
          href={props.svgURL}
          download
          onClick={pushCounter}
          className="bg-green text-white rounded-md cursor-pointer text-lg uppercase w-[200px] h-[50px] flex flex-row items-center justify-between hover:bg-light-green tablet:ml-xl"
        >
          <span className="flex-auto text-center font-mono">SVG</span>
          <DownloadIcon className="w-[50px] h-[50px] p-md flex-none rounded-r-md bg-light-green stroke-white border-l border-l-white border-opacity-30" />
        </a>
      </div>
      <div className="w-aside px-xl py-md flex flex-col tablet:w-full">
        <div className="block">
          <h6 className="flex flex-row items-center text-xs font-semibold">
            <VectorIcon className="w-xl h-xl mr-xs" />
            {t('sidebar.fileType')}
            <Link to="/support/how-to-edit-vector-file" className="ml-sm text-link hover:text-blue">
              {t('sidebar.howToEdit')}
            </Link>
          </h6>
        </div>
        <div className="block my-md">
          <h6 className="font-semibold my-md">{t('sidebar.termTitle')}</h6>
          <p className="text-xs leading-5">
            <Trans i18nKey="sidebar.termText">
              By downloading <b>{{ fullName }}</b> logo you agree with our terms of use.
            </Trans>
            <Link to="/support/terms-of-use" className="text-link ml-sm hover:text-blue">
              <b>{t('sidebar.termMore')}</b>
            </Link>
          </p>
        </div>
        <DownloadCounter sourceID={props.sourceID} logoID={props.logoID} />
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
              <XIcon />
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
        {props.verName ? (
          <div className="border-t border-t-gray-1 mb-md mt-2xl pt-2xl">
            <ul className="flex flex-row items-center text-xs text-light-gray">
              {props.verName.map(tag => (
                <li key={tag} className="border border-gray-1 rounded p-xs mr-xs last:mr-zero">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="w-aside px-xl py-3xl text-xs border-t border-t-gray-1 tablet:w-full">
        {props.ctrbInfo !== undefined && props.ctrbInfo !== '' && (
          <h6 className="flex flex-row items-center font-semibold mb-md">
            <AtIcon className="w-xl h-xl mr-xs" />
            {t('sidebar.contributor')}
            <a
              href={props.ctrbInfo.link}
              rel="noopener noreferrer"
              target="_blank"
              className="text-link ml-sm hover:text-blue"
            >
              @{props.ctrbInfo.name}
            </a>
          </h6>
        )}
        <h6 className="flex flex-row items-center font-semibold mb-md">
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
        <span className="text-light-gray uppercase font-mono">
          {t('sidebar.logoid')}
          {props.logoID}
        </span>
      </div>
    </aside>
  )
}

export default DetailSidebar
