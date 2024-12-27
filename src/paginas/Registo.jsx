import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { db } from '../firebase/firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import assets from "../assets/assets";
import { Building, Handshake, Euro } from 'lucide-react';

const Registo = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, userCredential, loading, error] = useCreateUserWithEmailAndPassword(auth);

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

  const criarUtilizador = async (e) => {
    e.preventDefault();

    const validationError = validateInputs();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const toastId = toast.loading('Creating user...');

    try {
      const user = await createUserWithEmailAndPassword(email, password);

      if (user?.user) {
        await setDoc(doc(db, 'users', user.user.uid), {
          username,
          email,
          createdAt: serverTimestamp(),
        });

        toast.update(toastId, {
          render: 'User created successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Error creating user:', err);
      toast.update(toastId, {
        render: 'Failed to create user. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const handleSubmit = (e) => {
    criarUtilizador(e);
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (


    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center px-4 sm:px-0">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 flex-col sm:flex-row">

        {/* Info Section  */}
        <div className="w-full sm:w-1/2 text-center flex flex-col justify-center items-center p-8 sm:p-12">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">Welcome to Invictus | References</h1>
          <p className="text-sm md:text-sm text-gray-800 mb-4">
            Experience a professional way to connect properties for sale with top-tier consultants. Hundreds of users have already joined, submitted property references, and started earning commissions by closing successful deals.
          </p>
          <div className="flex flex-col items-center space-y-4 mt-5">
            <div className="flex items-center space-x-2">
              <Building className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-gray-700 font-medium text-sm sm:text-base">Property Portfolio</p>
            </div>
            <div className="flex items-center space-x-2">
              <Handshake className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-gray-700 font-medium text-sm sm:text-base">Trusted Consultants</p>
            </div>
            <div className="flex items-center space-x-2">
              <Euro className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-gray-700 font-medium text-sm sm:text-base">Earn Attractive Commissions</p>
            </div>
          </div>
        </div>


        {/* Form Section (abaixo no mobile) */}
        <div className="w-full sm:w-1/2 xl:w-5/12 p-8 sm:p-12 flex flex-col justify-center">
          <div className="flex justify-center items-center ">
          <img className='w-[6.5rem] hidden md:flex'  src={assets.logo_invictus_semfundo_1} alt="logo_invictus" />
          </div>

          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-3xl xl:text-4xl font-extrabold text-indigo-700">Register</h1>

            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit}>
                  <input
                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-[13px] focus:outline-none focus:border-indigo-500 focus:bg-white mb-4"
                    type="text"
                    placeholder="Choose a Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-[13px] focus:outline-none focus:border-indigo-500 focus:bg-white mb-4"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-[13px] focus:outline-none focus:border-indigo-500 focus:bg-white mb-4"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-[13px] focus:outline-none focus:border-indigo-500 focus:bg-white mb-4"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full text-sm py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    disabled={loading}
                  >
                    <span className="ml-3">
                      Create Account
                    </span>
                  </button>
                </form>

                <p className="mt-6 text-xs text-gray-600 text-center hover:underline">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-indigo-600">
                    Go to Login Page
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registo;
