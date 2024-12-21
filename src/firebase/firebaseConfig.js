import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAs67wFZEmUBR_t6i2tp-6d15UrQB2qvLA",
  authDomain: "invictusreferences.firebaseapp.com",
  projectId: "invictusreferences",
  storageBucket: "invictusreferences.firebasestorage.app",
  messagingSenderId: "715086348838",
  appId: "1:715086348838:web:a4a6fec3501970a4939ce7"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

