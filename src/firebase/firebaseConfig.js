import { initializeApp } from "firebase/app"; // Inicializar o app Firebase
import { getAuth,onAuthStateChanged  } from "firebase/auth"; // Importar o sistema de autenticação do Firebase
import { getFirestore } from "firebase/firestore"; // Importar o sistema de banco de dados Firestore do Firebase




const firebaseConfig = {
  apiKey: "AIzaSyAs67wFZEmUBR_t6i2tp-6d15UrQB2qvLA",
  authDomain: "invictusreferences.firebaseapp.com",
  projectId: "invictusreferences",
  storageBucket: "invictusreferences.firebasestorage.app",
  messagingSenderId: "715086348838",
  appId: "1:715086348838:web:a4a6fec3501970a4939ce7"
};





// Inicializar o Firebase com as configurações fornecidas
const app = initializeApp(firebaseConfig);

// Exportar o sistema de autenticação para uso em todos os componentes da aplicação
export const auth = getAuth(app); 

// Exportar o sistema de banco de dados Firestore para armazenar e manipular dados diretamente na Firebase
export const db = getFirestore(app);


// Exportar a função onAuthStateChanged
export { onAuthStateChanged };