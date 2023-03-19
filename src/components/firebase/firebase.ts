import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCX2DGswh0pNlplhnYOGo8Z5272GoQ7DhI",
    authDomain: "chat-app-556b6.firebaseapp.com",
    projectId: "chat-app-556b6",
    storageBucket: "chat-app-556b6.appspot.com",
    messagingSenderId: "228866735208",
    appId: "1:228866735208:web:70f4598575286855f88fdd",
    measurementId: "G-25T82DK3D3"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore()
export const provider = new GoogleAuthProvider()