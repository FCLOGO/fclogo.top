import React from 'react'
import { useIntl } from 'react-intl'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { LocalizedLink } from 'gatsby-plugin-usei18n'
import AdSense from 'react-adsense'

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
  seasonBadge,
  packTitle,
  detailLicense,
  fileType,
  useTerms,
  termTitle,
  vectorIcon,
  detailInfo,
  infoTitle,
  infoTable,
  infoLinks,
  errNotes,
  bugIcon
} from './pack-detail-sidebar.module.styl'

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

const PackDetailSidebar = props => {
  const intl = useIntl()
  return (
    <aside className={detailSidebar}>
      <div className={googleAds}>
        <DetailAdsense />
      </div>
      <header className={detailHeader}>
        <GatsbyImage image={getImage(props.pngPath)} alt={props.name} />
        <span className={seasonBadge}>{props.season}</span>
        <h1 className={packTitle}>
          {props.name}
          {intl.formatMessage({ id: 'detail.titleVectorPack' })}
        </h1>
      </header>
      <div className={detailLicense}>
        <div className={useTerms}>
          <h6 className={termTitle}>{intl.formatMessage({ id: 'sidebar.termTitle' })}</h6>
          <p>
            {intl.formatMessage({ id: 'sidebar.termText' }, { s: <b>{props.fullName}</b> })}{' '}
            <LocalizedLink to="/support/terms-of-use">
              <b>{intl.formatMessage({ id: 'sidebar.termMore' })}</b>
            </LocalizedLink>
          </p>
        </div>
        <div className={fileType}>
          <h6>
            <VectorIcon className={vectorIcon} />
            {intl.formatMessage({ id: 'sidebar.fileType' })}
            <LocalizedLink to="/support/how-to-edit-vector-file">
              {intl.formatMessage({ id: 'sidebar.howToEdit' })}
            </LocalizedLink>
          </h6>
        </div>
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

export default PackDetailSidebar
