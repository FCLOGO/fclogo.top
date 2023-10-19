import app from 'gatsby-plugin-firebase-v9.0'
import { getFirestore, runTransaction, doc } from 'firebase/firestore'

const UpdateDownloads = async (sourceID, logoID) => {
  // 初始化 Firestore
  const db = getFirestore(app)

  // 创建下载数据引用
  const docID = `${sourceID}-${logoID}`
  const downloadDocRef = doc(db, 'logoDownloads', docID)

  try {
    await runTransaction(db, async transaction => {
      // 获取数据集合文档
      const downloadDoc = await transaction.get(downloadDocRef)
      // 判断集合文档下载数据是否存在，存在则 +1，不存在则创建
      const newDownloads = downloadDoc.exists() ? downloadDoc.data().downloads + 1 : 1
      const updateData = { logoID: logoID, downloads: newDownloads }
      // 更新数据
      transaction.set(downloadDocRef, updateData, { merge: true })
    })
  } catch (error) {
    console.error('DOWNLOADS UPDATE ERROE', error)
  }
}

export default UpdateDownloads
