import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Home,Euro } from 'lucide-react';
import assets from "../assets/assets";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'
import Aos from "aos"
import 'aos/dist/aos.css'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    // Validar entrada do usuário
    if (!email || !password) {
      toast.error('Email and password are required.');
      return;
    }
  
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    if (!isEmailValid) {
      toast.error('Please enter a valid email address.');
      return;
    }
  
    // Tentativa de login
    try {
      const signInResult = await signInWithEmailAndPassword(email, password);
      if (signInResult.user) {
        const toastId = toast.loading('Checking your credentials ...');
  
        setTimeout(() => {
          toast.update(toastId, {
            render: 'Login successful, enjoy!',
            type: 'success',
            isLoading: false,
            autoClose: 2000,
          });
        }, 1000); // Delay para criar um efeito mais fluido
  
        setTimeout(async () => {
          // Verifique a role do usuário no Firestore após o login
          const userDocRef = doc(db, 'users', signInResult.user.uid);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User Data:', userData); // Log para verificar os dados do usuário
  
            // Verificar se a role existe. Se não, atribui 'user' como padrão
            const userRole = userData.role || 'user'; // Se não existir, atribui 'user' como padrão
            
            // Se o usuário for um administrador, redireciona para a página Login_Admin
            if (userRole === 'admin') {
              console.log('User is Admin, redirecting to Login_Admin...');
              navigate('/Login_Admin'); // Página do administrador
            } else {
              console.log('User is a regular user, redirecting to Home...');
              navigate('/'); // Página padrão para usuários comuns
            }
          } else {
            toast.error('User data not found in the database.');
          }
        }, 3500); // 3 segundos para o toast desaparecer completamente
      }
    } catch (err) {
      toast.error('Email or Password are incorrect, please try again');
      setPassword('');
    }
  }

       useEffect(() => {
            Aos.init({duration:1000})
          },[])
  



  return (


    <div data-aos="fade-up"  className="min-h-screen bg-white text-gray-900 flex justify-center items-center px-4 sm:px-0">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-lg sm:rounded-lg flex justify-center flex-1 flex-col sm:flex-row">
        {/* Info Section */}
        <div className="w-full sm:w-1/2 text-center flex flex-col justify-center items-center p-8 sm:p-12 ">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">Welcome to Invictus | References</h1>
          <p className="text-sm md:text-sm text-gray-800 mb-4">
            Connect with trusted real estate consultants and earn commissions by sharing property references that lead to successful deals.
          </p>
          <div className="flex flex-col items-center space-y-4 mt-5">
            <div className="flex items-center space-x-2">
              <Home className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-gray-700 font-medium text-sm sm:text-base">Property Listings</p>
            </div>
            <div className="flex items-center space-x-2">
              <User className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-gray-700 font-medium text-sm sm:text-base">Trusted Consultants</p>
            </div>
            <div className="flex items-center space-x-2">
              <Euro className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-gray-700 font-medium text-sm sm:text-base">Earn Commissions</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full sm:w-1/2 xl:w-5/12 p-8 sm:p-12 flex flex-col justify-center order-1 sm:order-2">
          <div className="flex justify-center items-center mb-8">
            <img className='w-[6.5rem] hidden md:flex' src={assets.logo_invictus_semfundo_1} alt="logo_invictus" />
          </div>

          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-3xl xl:text-4xl font-extrabold text-indigo-700 ">Login</h1>

            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSignIn}>
                <input
                  className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-[13px] focus:outline-none focus:border-indigo-500 focus:bg-white mb-4"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-[13px] focus:outline-none focus:border-indigo-500 focus:bg-white mb-4"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full text-sm py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="submit"
                >
                  <span className="ml-3">{loading ? 'Loading...' : 'Sign In'}</span>
                </button>
              </form>

              <p className="mt-6 text-xs text-gray-600 text-center hover:underline">
                Don't have an account?{' '}
                <Link to="/Registo" className="font-bold text-indigo-600">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
