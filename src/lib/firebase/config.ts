/**
 * Firebase client SDK configuration.
 *
 * All values are read from environment variables.  Copy `.env.example` to
 * `.env.local` and fill in your Firebase project credentials before running
 * the development server.
 *
 * NEVER commit real credentials to source control.
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY            ?? '',
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN        ?? '',
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID         ?? '',
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET     ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID              ?? '',
};

// Prevent duplicate app initialization in Next.js hot-reload
const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth: Auth              = getAuth(app);
const db: Firestore           = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };
