import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDjuO2RaPDe4DP6KbUh2YOKMeZXluZPif0',
  authDomain: 'bike-rental-app-e7b5f.firebaseapp.com',
  projectId: 'bike-rental-app-e7b5f',
  storageBucket: 'bike-rental-app-e7b5f.appspot.com',
  messagingSenderId: '430252138651',
  appId: '1:430252138651:web:39236b9bc901ee30cf663e',
  
}



export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
export const db = getDatabase(app)
