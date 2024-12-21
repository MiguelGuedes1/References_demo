import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // Importar o sistema de autenticaçao da Firebase
import { getFirestore } from "firebase/firestore";       // Importar o sistema de base de dados da Firebase




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
export const auth = getAuth(app)      // Exportar o sistema de autenticaçao da Firebase para poder usar em todos os componetes da minha aplicação
export const db = getFirestore(app);      //  Exportar o sistema de base de dados da Firebase para poder usar em todos os componetes da minha aplicação

