import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Footer from '../componentes/Footer';
import Navbar from '../componentes/Navbar';
import { CheckCircle, XCircle, Clock, MapPin, MessageSquare, Phone, Info, FileText,House } from 'lucide-react';

const ReferencesSent = () => {
  const [references, setReferences] = useState([]);
  const { user, userDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

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
      <Navbar />


      {/* Information Section */}
      <section className="py-28 px-6 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Como Funciona o Processo?</h2>
          <p className="text-sm text-gray-600 mb-8">
            Nossos consultores examinarão cada referência de forma detalhada, levando em consideração todos os aspectos importantes para garantir a melhor análise possível. Acompanhe o status de suas referências diretamente aqui.
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 flex flex-col justify-center items-center">
              <h3 className="text-xl font-semibold text-indigo-600 flex items-center">
                <Info className="mr-2" /> Estados Possíveis
              </h3>
              <ul className="list-disc list-inside text-gray-600 flex flex-col justify-center items-center gap-2 text-sm">
                <p><CheckCircle className="inline mr-2 text-green-500" /><strong>Recebida:</strong> A referência foi recebida e está aguardando análise.</p>
                <p><Clock className="inline mr-2 text-yellow-500" /><strong>Em Análise:</strong> A referência está sendo revisada detalhadamente.</p>
                <p><CheckCircle className="inline mr-2 text-green-500" /><strong>Aprovada:</strong> A referência foi aprovada e está em processo de ser finalizada.</p>
                <p><XCircle className="inline mr-2 text-red-500" /><strong>Rejeitada:</strong> A referência não passou na análise e foi rejeitada.</p>
                <p><Clock className="inline mr-2 text-yellow-500" /><strong>Em Progresso:</strong> A referência está sendo trabalhada ativamente pelos consultores.</p>
                <p><CheckCircle className="inline mr-2 text-green-500" /><strong>Finalizada:</strong> A referência foi concluída com sucesso.</p>
              </ul>
            </div>
            <div className="space-y-4 ">
              <h3 className="text-xl font-semibold text-indigo-600 flex items-center justify-center">
                <FileText className="mr-2" /> Segurança e Confiança
              </h3>
              <p className="text-gray-600 text-sm">
                Trabalhamos com total confidencialidade e garantimos que todos os dados fornecidos sejam analisados com o mais alto nível de segurança. Nossos consultores são altamente qualificados e experientes para oferecer o melhor suporte.
              </p>
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
              <div key={ref.id} className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-indigo-600">{ref.nomeReferencia}</h2>
                  <span className="text-sm font-medium text-gray-500">{ref.Estado_Da_referencia}</span>
                </div>
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
                <p className="text-gray-500 text-sm mt-4 text-sm">
                  <p className='font-bold'>Enviada para o consultor: <span className='underline'> {ref.Referencia_para_Consultor} </span></p>
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Enviada em:</strong> {new Date(ref.createdAt.seconds * 1000).toLocaleDateString('pt-PT')}
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
