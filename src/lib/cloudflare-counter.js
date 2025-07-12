// 💡 部署的 Worker URL
const WORKER_URL = process.env.GATSBY_DO_WORKER_URL

/**
 * 为单个 logo 的特定计数器增加计数值。
 * @param {string} logoID - 徽标的 ID。
 * @param {'downloads' | 'views' | 'likes'} type - 要增加的计数器类型。
 * @returns {Promise<number>} - 返回增加后的新计数值。
 */
export const incrementCount = async (logoID, type = 'downloads') => {
  // 将操作类型（如 "downloads"）也放入路径中，让 DO 更灵活
  let path = '/increment'

  try {
    const response = await fetch(`${WORKER_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logoID })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const newCount = await response.text()
    return parseInt(newCount, 10)
  } catch (error) {
    console.error(`Failed to increment ${type} count for ${logoID}:`, error)
    return null // 或者返回一个错误状态
  }
}

/**
 * 批量获取多个 logo 的下载次数。
 * @param {string[]} logoIDs - 一个包含多个 logoID 的数组。
 * @returns {Promise<{[logoID: string]: number}>} - 返回一个 logoID 到计数值的映射对象。
 */
export const getBatchCounts = async logoIDs => {
  if (!logoIDs || logoIDs.length === 0) {
    return {}
  }
  try {
    const response = await fetch(`${WORKER_URL}/batch-get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logoIDs })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Worker 将返回一个 JSON 对象，如: { "101": 5, "102": 12 }
    return await response.json()
  } catch (error) {
    console.error('Failed to get batch counts:', error)
    return {}
  }
}
