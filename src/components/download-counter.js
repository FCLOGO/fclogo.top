import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import app from 'gatsby-plugin-firebase-v9.0'
import { getDatabase, ref, onValue } from 'firebase/database'

import CloudIcon from '../../static/assets/icons/cloud.inline.svg'
import { counterContainer } from './download-counter.module.styl'

const DownloadCounter = ({ logoId }) => {
  const intl = useIntl()
  const [downloadCount, setDownloadCount] = useState('')
  useEffect(() => {
    const db = getDatabase(app)
    const downloadCountRef = ref(db, 'downloads/' + logoId + '/downloadCount')
    onValue(downloadCountRef, snapshot => {
      const data = snapshot.val()
      setDownloadCount(data ? data : 0)
    })
  }, [logoId])
  return (
    <div className={counterContainer}>
      <CloudIcon />
      {downloadCount}
      {intl.formatMessage({ id: 'sidebar.downloads' })}
      {downloadCount > 1 ? intl.formatMessage({ id: 'sidebar.s' }) : ``}
    </div>
  )
}

export default DownloadCounter
