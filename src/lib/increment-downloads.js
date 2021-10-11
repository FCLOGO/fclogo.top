import app from 'gatsby-plugin-firebase-v9.0'
import { getDatabase, ref, runTransaction } from 'firebase/database'

const incrementViews = async postId => {
  const db = getDatabase(app)
  const viewRef = ref(db, 'views/' + postId + '/starCount')

  runTransaction(viewRef, post => {
    return post + 1
  })
}

export default incrementViews
