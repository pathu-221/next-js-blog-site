import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBzz5sM-G9KBT17Hj60JQZBvWsHca88z-w",
  authDomain: "blog-site-c0079.firebaseapp.com",
  projectId: "blog-site-c0079",
  storageBucket: "blog-site-c0079.appspot.com",
  messagingSenderId: "197006575098",
  appId: "1:197006575098:web:3cea1947225d3232d15043",
  measurementId: "G-SYTR1Q8B5P"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment;
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export async function getUserWithUsername(username) {
  const userRef = firestore.collection('users');
  const query = userRef.where('username', '==', username).limit(1);

  const userDoc =  (await query.get()).docs[0];
  return userDoc;
}

export function postToJSON(doc) {
  const data = doc.data();

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}