import app from 'gatsby-plugin-firebase-v9.0'
import { getDatabase, ref, runTransaction } from 'firebase/database'

const IncrementDownloads = async logoId => {
  const db = getDatabase(app)
  const downloadRef = ref(db, 'downloads/' + logoId + '/downloadCount')

  runTransaction(downloadRef, snapshot => {
    return snapshot + 1
  })
}

export default IncrementDownloads
