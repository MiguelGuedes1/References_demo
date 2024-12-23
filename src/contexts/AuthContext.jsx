import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged,signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Atualiza o estado com o usuário atual ou null
      setLoading(false); // Finaliza o estado de carregamento
    });

    return () => unsubscribe(); // Limpa o observador ao desmontar o componente
  }, []);


  // fUNÇAO PARA O UTILIZADOR EFECTUAR O LOGOUT
  const handleLogout = async () => {
    try {
      await signOut(auth); // Desloga o usuário
      setUser(null); // Atualiza o estado do usuário como null
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading,handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
