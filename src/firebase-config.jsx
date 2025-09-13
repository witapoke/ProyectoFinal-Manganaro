import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCDhvDemOKKzsAvvcgIRtfw8ruHyopvvn4',
  authDomain: 'nacho-ecommerce.firebaseapp.com',
  projectId: 'nacho-ecommerce',
  storageBucket: 'nacho-ecommerce.firebasestorage.app',
  messagingSenderId: '127162831861',
  appId: '1:127162831861:web:644d0d859faa892a5486bc',
  measurementId: 'G-QBXJHMZ4DX',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
