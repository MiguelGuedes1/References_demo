import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db,auth } from '../firebase/firebaseConfig';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Footer from '../componentes/Footer';
import Navbar from '../componentes/Navbar';
import { CheckCircle, XCircle, Clock, MapPin, MessageSquare, Phone, Info, FileText, House, CircleUserRound, UserSearch, CalendarDays, Handshake,Mail,UserPen,LogOut  } from 'lucide-react'
import Aos from "aos"
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'

const LoginAdmin = () => {
  const [references, setReferences] = useState([]);
  const { user, userDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [editState, setEditState] = useState('');
  const [selectedReference, setSelectedReference] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchReferences = async () => {
      if (!user) return;

      try {
        const q = query(collection(db, 'references'));
        const querySnapshot = await getDocs(q);
        const fetchedReferences = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Ordenar por `createdAt` (mais recente primeiro)
        fetchedReferences.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
        
        setReferences(fetchedReferences);
        
      } catch (error) {
        console.error('Erro ao buscar referências:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferences();
  }, [user]);

  const handleStateChange = async (refId) => {
    if (!editState) return;
    
    try {
      const refDoc = doc(db, 'references', refId);
      await updateDoc(refDoc, {
        Estado_Da_referencia: editState,
      });

      // Atualizar localmente as referências após a mudança de estado
      setReferences((prevReferences) =>
        prevReferences.map((ref) =>
          ref.id === refId ? { ...ref, Estado_Da_referencia: editState } : ref
        )
      );

      setSelectedReference(null); // Fechar o formulário de edição
      setEditState('');
    } catch (error) {
      console.error('Erro ao atualizar estado:', error);
    }
  }

  const handleLogout = async () => {      // Funçao para efectuar o Logout
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };


      useEffect(() => {
        Aos.init({duration:1000})
      },[])


  return (
    <div data-aos="fade-down" className="w-full min-h-screen bg-gray-100">
      <nav className="fixed top-0 left-0 w-full z-20 bg-gradient-to-b from-black/50 via-black/30 to-transparent backdrop-blur-lg shadow-lg p-4 flex justify-between items-center text-white">
      <p data-aos="fade-down" className="text-white font-bold hidden sm:block">Invictus | References</p>
        <button data-aos="fade-down" 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-indigo-800 hover:bg-indigo-900 px-4 py-2 rounded-md text-sm"
        >
          <LogOut size={15} />
          Logout
        </button>
      </nav>


      {/* Information Section */}
      <section className="py-14 px-6 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-indigo-600 mb-4 py-10">Admin Page</h2>
         

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
        References Received
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Carregando referências...</p>
        ) : references.length === 0 ? (
          <p className="text-center text-gray-600">Nenhuma referência encontrada.</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {references.map((ref) => (
              <div key={ref.id} className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
                <p className="text-gray-600 mb-2 text-sm">
                <Mail className="inline mr-2 text-indigo-500" /><strong>User email:</strong> {ref. Email_utilizador|| 'Não disponível'}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                <UserSearch className="inline mr-2 text-indigo-500" /><strong>User name:</strong> {ref.Referencia_enviada_por|| 'Não disponível'}
                </p>
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
                  <UserPen className="inline mr-2 text-indigo-500" /><strong>Real estate consultant:</strong> {ref.Referencia_para_Consultor}
                </p>

                <p className="text-gray-600 mb-2 text-sm">
                <CalendarDays className="inline mr-2 text-indigo-500" />
                 <strong>Date sent:</strong> {new Date(ref.createdAt.seconds * 1000).toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short', hour12: false })}
                </p>

                
                <p className="text-gray-600 mb-2 text-sm flex">
                  <Handshake className="inline mr-2 text-indigo-500" /><strong>Status: </strong> 
                  <p className='pl-1 font-extrabold text-green-500'>{ref.Estado_Da_referencia}</p>
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <MessageSquare className="inline mr-2 text-indigo-500" /><strong>Message:</strong> {ref.mensagem}
                </p>

                <button
                  onClick={() => {
                    setSelectedReference(ref.id);
                    setEditState(ref.Estado_Da_referencia);
                  }}
                  className="text-indigo-600 hover:text-indigo-800 mt-4"
                >
                  Edit status
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Edit State Modal */}
      {selectedReference && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-indigo-600">Edit status</h3>
            <select
              value={editState}
              onChange={(e) => setEditState(e.target.value)}
              className="mt-4 w-full p-2 border rounded-md"
            >
              <option value="Recebida">Received</option>
              <option value="Em Análise">Under analysis</option>
              <option value="Em contato com a referência">In contact with the reference</option>
              <option value="Rejeitada">Rejected</option>
              <option value="Em Progresso">In Progress</option>
              <option value="Finalizada">Done</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedReference(null)}
                className="mr-4 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStateChange(selectedReference)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
      <Footer />
    </div>
  );
};

export default LoginAdmin;
