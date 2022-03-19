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
} from 'firebase/firestore';
import { displayError } from './Common/AlertMessage';

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
    await addDoc(collection(db, path), data);
  } catch (err: unknown) {
    displayError((err as Error).message);
  }
};

const setDocument = async (path: string, pathId: string, data: Object) => {
  const docRef = doc(db, path, pathId);
  await setDoc(docRef, data, { merge: true });
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
};
