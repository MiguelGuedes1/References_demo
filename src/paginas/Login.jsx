import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import { User, Home, DollarSign } from 'lucide-react'; // Importando os ícones do Lucide Icons
import assets from "../assets/assets";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');
  
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }
  
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    if (!isEmailValid) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
  
    try {
      const signInResult = await signInWithEmailAndPassword(email, password);
      if (signInResult.user) {
        navigate('/');
      }
    } catch (erro) {
      console.error(erro);
      setErrorMessage('Email or Password are incorrect, please try again');
    }
  };

  // Display loading message while the request is being processed
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    
    <div className="min-h-screen bg-white text-gray-900 flex justify-center items-center px-4 sm:px-0">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-lg sm:rounded-lg flex justify-center flex-1 flex-col sm:flex-row">
        {/* Info Section */}
        <div className="w-full sm:w-1/2 text-center flex flex-col justify-center items-center p-8 sm:p-12 ">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">Welcome to Invictus | References</h1>
          <p className="text-sm md:text-sm text-gray-800 mb-4">
            Connect with trusted real estate consultants and earn commissions by sharing property references that lead to successful deals.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <Home className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-gray-700 font-medium text-sm sm:text-base">Property Listings</p>
            </div>
            <div className="flex items-center space-x-2">
              <User className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-gray-700 font-medium text-sm sm:text-base">Trusted Consultants</p>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-gray-700 font-medium text-sm sm:text-base">Earn Commissions</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full sm:w-1/2 xl:w-5/12 p-8 sm:p-12 flex flex-col justify-center order-1 sm:order-2">
          <div className="flex justify-center items-center mb-8">
            <img className='w-[6.5rem] hidden md:flex'  src={assets.logo_invictus_semfundo_1} alt="logo_invictus" />
          </div>

          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-3xl xl:text-4xl font-extrabold text-black">Login</h1>

            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSignIn}>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white mb-4"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white mb-4"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2 flex justify-center items-center">
                    {errorMessage}
                  </p>
                )}

                <button
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-white w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
    </div>
  );
};

export default Login;
