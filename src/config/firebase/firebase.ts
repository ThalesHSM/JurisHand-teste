import {initializeApp} from 'firebase/app';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth();
auth.useDeviceLanguage();

export const actualUser = auth.currentUser;

export async function GoogleLogin() {
  const provider = new GoogleAuthProvider();
  let result = await signInWithPopup(auth, provider);

  return result;
}
