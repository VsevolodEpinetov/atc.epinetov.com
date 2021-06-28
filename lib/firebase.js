import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA_qAOMpzs9Pd7lZSEAnQPloQI_BXCXBw8",
  authDomain: "white-proxy-313620.firebaseapp.com",
  projectId: "white-proxy-313620",
  storageBucket: "white-proxy-313620.appspot.com",
  messagingSenderId: "883007742482",
  appId: "1:883007742482:web:ef1361f1107bb14560eecb"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;


/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername (username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON (doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis()
  }
}