import { displayError } from './AlertMessage';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    setDocument('users', user.uid, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    });
  } catch (err: unknown) {
    displayError((err as Error).message);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: unknown) {
    displayError((err as Error).message);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    setDocument('users', user.uid, { uid: user.uid, name, email });
  } catch (err: unknown) {
    displayError((err as Error).message);
  }
};

const logout = () => {
  signOut(auth);
};

/** FIRESTORE function starts here */
const addDocument = async (path: string, data: Object) => {
  try {
    return await addDoc(collection(db, path), data);
  } catch (err: unknown) {
    console.log(err);
    displayError((err as Error).message);
  }
};

const setDocument = async (path: string, pathId: string, data: Object) => {
  try {
    const docRef = doc(db, path, pathId);
    await setDoc(docRef, data, { merge: true });
  } catch (err: unknown) {
    displayError((err as Error).message);
  }
};

const getDocument = async (path: string, value: any) => {
  const docRef = doc(db, path, value);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : undefined;
};

const getDocuments = async (path: string, field: string, value: any) => {
  const q = query(collection(db, path), where(field, '==', value));
  return await getDocs(q);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  addDocument,
  setDocument,
  getDocument,
  getDocuments,
};
