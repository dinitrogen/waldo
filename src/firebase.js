import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAziky9KTUjGuyIFvYPbfJ872giGnMnw54",
    authDomain: "waldo-db4e8.firebaseapp.com",
    projectId: "waldo-db4e8",
    storageBucket: "waldo-db4e8.appspot.com",
    messagingSenderId: "752627619097",
    appId: "1:752627619097:web:c169e81a39824d6a22e188"
  };
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export {collection, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion, Timestamp }


