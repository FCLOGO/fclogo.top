import app from 'gatsby-plugin-firebase-v9.0'
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

const FetchDownloadData = async () => {
  // 初始化 Firestore
  const db = getFirestore(app)

  // 获取下载数最多的 10 个文档
  const q = query(collection(db, 'logoDownloads'), orderBy('downloads', 'desc'), limit(10))

  const querySnapshot = await getDocs(q)

  // 创建一个包含项目 ID 和下载数的数组
  const downloadData = querySnapshot.docs.map(doc => {
    const data = doc.data()
    return {
      logoID: data.logoID,
      downloads: data.downloads
    }
  })

  return downloadData
}

export default FetchDownloadData
