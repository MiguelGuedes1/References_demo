import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Footer from '../componentes/Footer';
import Navbar from '../componentes/Navbar';
import { CheckCircle, XCircle, Clock, MapPin, MessageSquare, Phone, Info, FileText,House,CircleUserRound,UserSearch,CalendarDays,Handshake,CircleArrowLeft } from 'lucide-react'
import { useNavigate,Link} from "react-router-dom"

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
  }, [user, userDetails]);



  return (
    <div className="w-full min-h-screen bg-gray-100">

      <div className='bg-white'>
        
        <div onClick={(e) => navigate("/")} className='mt-5 ml-5 cursor-pointer'>
        <CircleArrowLeft className='text-indigo-600 size-7'/> 
        </div>

      </div>



      {/* Information Section */}
      <section className="py-20 px-6 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Como Funciona o Processo?</h2>
          <p className="text-sm text-gray-600 mb-8">
            Nossos consultores examinarão cada referência de forma detalhada, levando em consideração todos os aspectos importantes para garantir a melhor análise possível. Acompanhe o status de suas referências diretamente aqui.
          </p>

          <div className="flex flex-col justify-center items-center">
            <div className="space-y-4 flex flex-col justify-center items-center">
              <h3 className="text-xl font-semibold text-indigo-600 flex items-center">
                <Info className="mr-2" /> Estados Possíveis
              </h3>
              <ul className="list-none text-gray-600 flex flex-col items-start gap-4 text-sm">
                <p><CheckCircle className="inline mr-2 text-green-500" /><strong>Recebida:</strong> A referência foi recebida e está a aguardar análise.</p>
                <p><Clock className="inline mr-2 text-yellow-500" /><strong>Em Análise:</strong> A referência está a ser revisada detalhadamente.</p>
                <p><CheckCircle className="inline mr-2 text-green-500" /><strong>Em contacto com a referencia:</strong> A referência foi aprovada e estamos em contacto.</p>
                <p><XCircle className="inline mr-2 text-red-500" /><strong>Rejeitada:</strong> Proprietario não pretende efectuar negocio.</p>
                <p><Clock className="inline mr-2 text-yellow-500" /><strong>Em Progresso:</strong> Proprietario aceitou fazer negócio e o processo esta em andamento.</p>
                <p><CheckCircle className="inline mr-2 text-green-500" /><strong>Finalizada:</strong> Negocio fechado, ira receber a comissao brevemente!.</p>
              </ul>
            </div>
       
          </div>
          
        </div>
      </section>

      {/* References List */}
      <section className="py-16 px-6 lg:px-16">
        <h2 className="text-2xl font-semibold text-indigo-600 text-center mb-12">
          Referências Enviadas
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
                  <CircleUserRound className="inline mr-2 text-indigo-500" /><strong>Nome da referência:</strong> {ref.nomeReferencia}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <House className="inline mr-2 text-indigo-500" /><strong>Tipo de Imóvel:</strong> {ref.tipoImovel}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <MapPin className="inline mr-2 text-indigo-500" /><strong>Localização:</strong> {ref.localizacao}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <Phone className="inline mr-2 text-indigo-500" /><strong>Contato:</strong> {ref.contacto}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <MessageSquare className="inline mr-2 text-indigo-500" /><strong>Mensagem:</strong> {ref.mensagem}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <UserSearch className="inline mr-2 text-indigo-500" /><strong>Consultor:</strong> {ref.Referencia_para_Consultor}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <CalendarDays className="inline mr-2 text-indigo-500" /><strong>Data de envio:</strong> {new Date(ref.createdAt.seconds * 1000).toLocaleDateString('pt-PT')}
                </p>
                <p className="text-gray-600 mb-2 text-sm flex ">
                  <Handshake className="inline mr-2 text-indigo-500" /><strong>Estado: </strong> <p className='pl-1 font-extrabold text-green-500'>{ref.Estado_Da_referencia}</p>
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
