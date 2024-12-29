import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Footer from '../componentes/Footer';
import Navbar from '../componentes/Navbar';
import { CheckCircle, XCircle, Clock, MapPin, MessageSquare, Phone, Info, FileText,House,CircleUserRound,UserSearch,CalendarDays,Handshake,CircleArrowLeft } from 'lucide-react'
import { useNavigate,Link} from "react-router-dom"
import Aos from "aos"
import 'aos/dist/aos.css'

const ReferencesSent = () => {
  const [references, setReferences] = useState([]);
  const { user, userDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchReferences = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'references'),
          where('Email_utilizador', '==', userDetails.email)
        );
        const querySnapshot = await getDocs(q);
        const fetchedReferences = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReferences(fetchedReferences);
      } catch (error) {
        console.error('Erro ao buscar referências:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferences();
  }, [user, userDetails])

    useEffect(() => {
      Aos.init({duration:1000})
    },[])



  return (
    <div data-aos="fade-down" className="w-full min-h-screen bg-gray-100">

      <div className='bg-white'>
        
        <div onClick={(e) => navigate("/")} className='mt-5 ml-5 cursor-pointer'>
        <CircleArrowLeft className='text-indigo-600 size-7'/> 
        </div>

      </div>



      {/* Information Section */}
      <section className="py-20 px-6 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">How does the process work?</h2>
          <p className="text-sm text-gray-600 mb-8">
          Our consultants will examine each reference in detail, taking into account all the important aspects to ensure the best possible analysis. Track the status of your references directly here.
          </p>

          <div className="flex flex-col justify-center items-center">
            <div className="space-y-4 flex flex-col justify-center items-center">
              <h3 className="text-xl font-semibold text-indigo-600 flex items-center">
                <Info className="mr-2" /> Possible status
              </h3>
              <ul className="list-none text-gray-600 flex flex-col items-start gap-4 text-sm">
                <p><CheckCircle className="inline mr-2 text-green-500" /><strong>Received:</strong> The reference has been received and is awaiting analysis.</p>
                <p><Clock className="inline mr-2 text-yellow-500" /><strong>Under analysis:</strong> The reference is being revised in detail.</p>
                <p><CheckCircle className="inline mr-2 text-green-500" /><strong>In contact with the reference:</strong> The reference has been approved and we are in contact.</p>
                <p><XCircle className="inline mr-2 text-red-500" /><strong>Rejected:</strong> Owner does not wish to trade.</p>
                <p><Clock className="inline mr-2 text-yellow-500" /><strong>In progress:</strong> The owner has agreed to do business and the process is underway.</p>
                <p><CheckCircle className="inline mr-2 text-green-500" /><strong>Done:</strong> The deal is done, you'll get your commission soon!</p>
              </ul>
            </div>
       
          </div>
          
        </div>
      </section>

      {/* References List */}
      <section className="py-16 px-6 lg:px-16">
        <h2 className="text-2xl font-semibold text-indigo-600 text-center mb-12">
        References Sent
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading references...</p>
        ) : references.length === 0 ? (
          <p className="text-center text-gray-600">No references found.</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {references.map((ref) => (
              <div key={ref.id} className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">

                <p className="text-gray-600 mb-2 text-sm">
                  <CircleUserRound className="inline mr-2 text-indigo-500" /><strong>Reference name:</strong> {ref.nomeReferencia}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <House className="inline mr-2 text-indigo-500" /><strong>Type of property:</strong> {ref.tipoImovel}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <MapPin className="inline mr-2 text-indigo-500" /><strong>Location:</strong> {ref.localizacao}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <Phone className="inline mr-2 text-indigo-500" /><strong>Contact:</strong> {ref.contacto}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <MessageSquare className="inline mr-2 text-indigo-500" /><strong>Message:</strong> {ref.mensagem}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <UserSearch className="inline mr-2 text-indigo-500" /><strong>Real estate consultant:</strong> {ref.Referencia_para_Consultor}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <CalendarDays className="inline mr-2 text-indigo-500" /><strong>Date sent:</strong> {new Date(ref.createdAt.seconds * 1000).toLocaleDateString('pt-PT')}
                </p>
                <p className="text-gray-600 mb-2 text-sm flex ">
                  <Handshake className="inline mr-2 text-indigo-500" /><strong>Status:</strong> <p className='pl-1 font-extrabold text-green-500'>{ref.Estado_Da_referencia}</p>
                </p>

              </div>

            ))}
          </div>
        )}
      </section>



      <ToastContainer />
      <Footer />
    </div>
  );
};

export default ReferencesSent;
