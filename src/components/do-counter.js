import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import CloudIcon from '../../static/assets/icons/cloud.inline.svg'

// 这是一个只接收 count 并显示的简单组件
const DownloadCounter = ({ count }) => {
  const { t } = useTranslation()

  // 在 count 还未加载时显示占位符
  const displayCount = count === null || count === undefined ? '-' : count

  return (
    <div className="flex flex-row my-md text-xs font-semibold">
      <CloudIcon className="w-xl h-xl mr-xs" />
      <data className="font-mono mr-xs">{displayCount}</data>
      {t('sidebar.downloads')}
      {displayCount > 1 ? t('sidebar.s') : ``}
    </div>
  )
}

export default DownloadCounter
