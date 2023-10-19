import React, { useEffect, useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import app from 'gatsby-plugin-firebase-v9.0'
import { getFirestore, onSnapshot, doc } from 'firebase/firestore'

import CloudIcon from '../../static/assets/icons/cloud.inline.svg'

const DownloadCounter = ({ sourceID, logoID }) => {
  const { t } = useTranslation()
  const [downloadCount, setDownloadCount] = useState(0)
  useEffect(() => {
    // 初始化 Firestore
    const db = getFirestore(app)
    // 创建订阅
    const docID = `${sourceID}-${logoID}`
    const unsubscribe = onSnapshot(doc(db, 'logoDownloads', docID), async doc => {
      const downloadsData = doc.data()
      const newDownloadCount = downloadsData ? downloadsData.downloads : 0
      setDownloadCount(newDownloadCount)
    })

    // 在组件卸载时取消订阅
    return () => {
      unsubscribe()
    }
  }, [sourceID, logoID])
  return (
    <div className="flex flex-row my-md text-xs font-semibold">
      <CloudIcon className="w-xl h-xl mr-xs" />
      <data className="font-mono mr-xs">{downloadCount}</data>
      {t('sidebar.downloads')}
      {downloadCount > 1 ? t('sidebar.s') : ``}
    </div>
  )
}

export default DownloadCounter
