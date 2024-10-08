import { Product, ProductDetails, User } from '@expert/common';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
  readFileSync(__dirname + '/serviceAccountKey.json', 'utf8')
);

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const firestore = getFirestore(firebase);

export const db = {
  products: firestore.collection('products').withConverter({
    toFirestore: (data: ProductDetails) => data,
    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
      snap.data() as ProductDetails,
  }),
  users: firestore.collection('users').withConverter({
    toFirestore: (data: Omit<User, keyof Pick<User, 'id' | 'isAdmin'>>) => data,
    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
      snap.data() as User,
  }),
  auth: admin.app().auth(),
};
