import React, { useEffect, useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import app from 'gatsby-plugin-firebase-v9.0'
import { getDatabase, ref, onValue } from 'firebase/database'

import CloudIcon from '../../static/assets/icons/cloud.inline.svg'

const DownloadCounter = ({ logoId }) => {
  const { t } = useTranslation()
  const [downloadCount, setDownloadCount] = useState('')
  useEffect(() => {
    const db = getDatabase(app)
    const downloadCountRef = ref(db, 'downloads/' + logoId + '/downloadCount')
    onValue(downloadCountRef, snapshot => {
      const data = snapshot.val()
      setDownloadCount(data)
    })
  }, [logoId])
  return (
    <div className="flex flex-row my-md text-xs font-semibold">
      <CloudIcon className="w-xl h-xl mr-xs" />
      {downloadCount ? (
        <data className="font-mono mr-xs">{downloadCount}</data>
      ) : (
        <data className="font-mono mr-xs">0</data>
      )}
      {t('sidebar.downloads')}
      {downloadCount > 1 ? t('sidebar.s') : ``}
    </div>
  )
}

export default DownloadCounter
