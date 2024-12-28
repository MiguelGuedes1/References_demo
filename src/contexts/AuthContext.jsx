import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [userDetails, setUserDetails] = useState({ uid: '', username: '', email: '' }); // Para armazenar o uid, username e email

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Atualiza o estado com o usuário atual
        // Busca o usuário no Firestore usando o UID
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserDetails({
              uid: currentUser.uid, // Armazena o uid do usuário
              username: userData.username,
              email: userData.email,
            });
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      } else {
        setUser(null); // Se não houver usuário, reseta os dados
        setUserDetails({ uid: '', username: '', email: '' }); // Limpa as informações do usuário
      }
      setLoading(false); // Finaliza o estado de carregamento
    });

    return () => unsubscribe(); // Limpa o observador ao desmontar o componente
  }, []);

  // Função para lidar com o LogOut
  const handleLogout = async () => {
    try {
      await signOut(auth); // Desloga o usuário
      setUser(null); // Atualiza o estado do usuário como null
      setUserDetails({ uid: '', username: '', email: '' }); // Limpa as informações do usuário
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
