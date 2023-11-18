import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBp96g2H7YYm0LJEpPxSOIqAlhCQazWMFI',
  authDomain: 'tspract-89b0b.firebaseapp.com',
  projectId: 'tspract-89b0b',
  storageBucket: 'tspract-89b0b.appspot.com',
  messagingSenderId: '740654345556',
  appId: '1:740654345556:web:d8c71f1273e6298d00acc1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const taskCollection = collection(db, 'tasks')
