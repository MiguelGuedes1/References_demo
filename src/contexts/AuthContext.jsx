import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importando o método correto de Firebase

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Armazena o usuário logado

  useEffect(() => {
    const auth = getAuth(); // Obtém a instância de autenticação do Firebase
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser); // Observa as mudanças no estado de autenticação
    return () => unsubscribe(); // Limpeza ao desmontar o componente
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children} {/* Fornece o contexto para os componentes filhos */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
