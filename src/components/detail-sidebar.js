import React from 'react'
import { useIntl } from 'react-intl'
import { LocalizedLink } from 'gatsby-plugin-usei18n'
import AdSense from 'react-adsense'
import IncrementDownloads from '../lib/increment-downloads'
import DownloadCounter from '../components/download-counter'

import DownloadIcon from '../../static/assets/icons/download.inline.svg'
import VectorIcon from '../../static/assets/icons/vector.inline.svg'
import WebsiteIcon from '../../static/assets/icons/website.inline.svg'
import WeiboIcon from '../../static/assets/icons/weibo.inline.svg'
import TwitterIcon from '../../static/assets/icons/twitter.inline.svg'
import WikiIcon from '../../static/assets/icons/wiki.inline.svg'
import BugIcon from '../../static/assets/icons/bug.inline.svg'

import {
  detailSidebar,
  googleAds,
  detailHeader,
  logoBadges,
  versionNumber,
  detailTitle,
  detailDownload,
  pngButton,
  svgButton,
  detailLicense,
  fileType,
  useTerms,
  termTitle,
  vectorIcon,
  detailInfo,
  infoTitle,
  infoTable,
  infoLinks,
  logoTags,
  errNotes,
  bugIcon
} from './detail-sidebar.module.styl'

const DetailAdsense = () => {
  return (
    <AdSense.Google
      client="ca-pub-9573165480183467"
      slot="1355874422"
      style={{ display: 'block' }}
      format="auto"
      responsive="true"
    />
  )
}

const InfoTable = ({ info }) => {
  const intl = useIntl()
  const newInfo = {}
  Object.entries(info)
    .filter(([, value]) => value !== null)
    .forEach(([key, value]) => (newInfo[key] = value))
  const keys = Object.keys(newInfo)
  return (
    <table className={infoTable}>
      <tbody>
        {keys.map((key, index) => (
          <tr key={index}>
            <th>{intl.formatMessage({ id: key })}</th>
            <td>{newInfo[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const DetailSidebar = props => {
  const intl = useIntl()
  const pushCounter = () => IncrementDownloads(props.slug)
  return (
    <aside className={detailSidebar}>
      <div className={googleAds}>
        <DetailAdsense />
      </div>
      <header className={detailHeader}>
        <section className={logoBadges}>
          {props.version === 0 ? (
            ''
          ) : (
            <span>
              {intl.formatMessage({ id: 'sidebar.logoVer' })}
              <data className={versionNumber}>{props.version}</data>
              {props.isDoubtful ? intl.formatMessage({ id: 'sidebar.doubtful' }) : ''}
            </span>
          )}

          {props.isOutdated ? <span>{intl.formatMessage({ id: 'sidebar.outdated' })}</span> : ''}
        </section>
        <div className={detailTitle}>
          <h1>
            {props.fullName}
            {intl.formatMessage({ id: 'detail.titleVector' })}
          </h1>
          {props.status !== 'alive' ? <span>{intl.formatMessage({ id: props.status })}</span> : ''}
        </div>
      </header>
      <div className={detailDownload}>
        <a href={props.pngURL} download className={pngButton} onClick={pushCounter}>
          <span>PNG</span>
          <DownloadIcon />
        </a>
        <a href={props.svgURL} download className={svgButton} onClick={pushCounter}>
          <span>SVG</span>
          <DownloadIcon />
        </a>
      </div>
      <div className={detailLicense}>
        <div className={fileType}>
          <h6>
            <VectorIcon className={vectorIcon} />
            {intl.formatMessage({ id: 'sidebar.fileType' })}
            <LocalizedLink to="/support/how-to-edit-vector-file">
              {intl.formatMessage({ id: 'sidebar.howToEdit' })}
            </LocalizedLink>
          </h6>
        </div>
        <div className={useTerms}>
          <h6 className={termTitle}>{intl.formatMessage({ id: 'sidebar.termTitle' })}</h6>
          <p>
            {intl.formatMessage({ id: 'sidebar.termText' }, { s: <b>{props.fullName}</b> })}{' '}
            <LocalizedLink to="/support/terms-of-use">
              <b>{intl.formatMessage({ id: 'sidebar.termMore' })}</b>
            </LocalizedLink>
          </p>
        </div>
        <DownloadCounter logoId={props.slug} />
      </div>
      <div className={detailInfo}>
        <h6 className={infoTitle}>
          {intl.formatMessage({ id: props.type })}
          {intl.formatMessage({ id: 'sidebar.infoTitle' })}
        </h6>
        <InfoTable info={props.tableInfo} />
        <div className={infoLinks}>
          {props.websiteURL ? (
            <a
              href={props.websiteURL}
              target="_blank"
              title={intl.formatMessage({ id: 'sidebar.website' })}
            >
              <WebsiteIcon />
            </a>
          ) : (
            ''
          )}
          {props.weiboURL ? (
            <a
              href={props.weiboURL}
              target="_blank"
              title={intl.formatMessage({ id: 'sidebar.weibo' })}
            >
              <WeiboIcon />
            </a>
          ) : (
            ''
          )}
          {props.twitterURL ? (
            <a
              href={props.twitterURL}
              target="_blank"
              title={intl.formatMessage({ id: 'sidebar.twitter' })}
            >
              <TwitterIcon />
            </a>
          ) : (
            ''
          )}
          {props.wikiURL ? (
            <a
              href={props.wikiURL}
              target="_blank"
              title={intl.formatMessage({ id: 'sidebar.wiki' })}
            >
              <WikiIcon />
            </a>
          ) : (
            ''
          )}
        </div>
        <div className={logoTags}>
          <ul>
            {props.verName.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={errNotes}>
        <h6>
          <BugIcon className={bugIcon} />
          {intl.formatMessage({ id: 'sidebar.foundErr' })}
          <LocalizedLink to="/contact">
            {intl.formatMessage({ id: 'sidebar.tellMe' })}
          </LocalizedLink>
        </h6>
      </div>
    </aside>
  )
}

export default DetailSidebar
