import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { db } from '../firebase/firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const Registo = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null); 
  const [successMsg, setSuccessMsg] = useState(null); 
  const navigate = useNavigate(); 


  // Hook de autenticação Firebase para criar um usuário com email e senha
  const [createUserWithEmailAndPassword, userCredential, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // Função para validar os dados de entrada antes de enviar
  const validateInputs = () => {
    if (!username || !email || !password || !confirmPassword) {
      return 'All fields are required.'; 
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.'; 
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.'; 
    }
    return null; 
  };




  // INICIO DA FUNÇAO PARA CRIAR UTILIZADOR NO FIREBASE E GUARDAR DADOS NO FIRESTORE

  const criarUtilizador = async (e) => {
    e.preventDefault(); 

    setErrorMsg(null); // Reseta a mensagem de erro antes de começar
    setSuccessMsg(null); // Reseta a mensagem de sucesso antes de começar

    
    // Validação dos campos de entrada
    const validationError = validateInputs();
    if (validationError) {
      setErrorMsg(validationError); // Exibe a mensagem de erro se algo estiver errado
      return;
    }

    try {
      // Criação do usuário no Firebase com email e senha
      const user = await createUserWithEmailAndPassword(email, password);

      if (user?.user) {
        // Se o usuário for criado com sucesso, salva informações adicionais no Firestore
        await setDoc(doc(db, 'users', user.user.uid), {
          username, // Nome de usuário
          email, // Email do usuário
          createdAt: serverTimestamp(), // Armazena o timestamp de criação
        });

        // Exibe a mensagem de sucesso
        setSuccessMsg('User created successfully!');
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }
    } catch (err) {
      console.error('Error creating user:', err); 
      setErrorMsg('Failed to create user. Please try again.'); 
    }
  }

    // FIM  DA FUNÇAO PARA CRIAR UTILIZADOR NO FIREBASE E GUARDAR DADOS NO FIRESTORE 





  
  useEffect(() => {
    if (error) {
      setErrorMsg(error.message || 'Failed to create user. Please try again.')
    }
  }, [error]); // Esse efeito só será acionado quando a variável `error` mudar

  
  
  const handleSubmit = (e) => {
    criarUtilizador(e); // Chama a função para criar o usuário
    // Limpa os campos após a submissão
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  // Hook de efeito para limpar as mensagens de erro e sucesso quando o componente for desmontado
  useEffect(() => {
    return () => {
      setErrorMsg(null); // Reseta a mensagem de erro
      setSuccessMsg(null); // Reseta a mensagem de sucesso
    };
  }, []); // Esse efeito será acionado apenas uma vez, quando o componente for desmontado

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex justify-center items-center">
            <p className="text-lg font-bold">Invictus | References</p>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Register</h1>

     

            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="username" className="sr-only">Username</label>
                  <input
                    id="username"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
                    type="text"
                    placeholder="Choose a Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                    {errorMsg && (
                      <div className="text-red-500 text-sm text-center mt-2 flex justify-center items-center">{errorMsg}</div>
                    )}
                    {successMsg && (
                      <div className="text-green-500 text-sm text-center mt-2 flex justify-center items-center">{successMsg}</div>
                    )}


                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    disabled={loading || successMsg}
                  >
                    <span className="ml-3">
                      {loading ? 'Creating account...' : 'Create account'}
                    </span>
                  </button>
                </form>

                <p className="mt-6 text-xs text-gray-600 text-center hover:underline">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold">
                    Go to Login Page
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Registo;
