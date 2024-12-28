import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Footer from '../componentes/Footer';
import Navbar from '../componentes/Navbar';
import { CheckCircle, XCircle, Clock, MapPin, MessageSquare, Phone, Info, FileText, House, CircleUserRound, UserSearch, CalendarDays, Handshake } from 'lucide-react';

const LoginAdmin = () => {
  const [references, setReferences] = useState([]);
  const { user, userDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [editState, setEditState] = useState('');
  const [selectedReference, setSelectedReference] = useState(null);

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
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">

      {/* Information Section */}
      <section className="py-14 px-6 lg:px-16 bg-white">
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
                <p><CheckCircle className="inline mr-2 text-green-500" /><strong>Em contacto com a referência:</strong> A referência foi aprovada e estamos em contacto.</p>
                <p><XCircle className="inline mr-2 text-red-500" /><strong>Rejeitada:</strong> Proprietário não pretende efetuar negócio.</p>
                <p><Clock className="inline mr-2 text-yellow-500" /><strong>Em Progresso:</strong> Proprietário aceitou fazer negócio e o processo está em andamento.</p>
                <p><CheckCircle className="inline mr-2 text-green-500" /><strong>Finalizada:</strong> Negócio fechado, irá receber a comissão brevemente!</p>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* References List */}
      <section className="py-16 px-6 lg:px-16">
        <h2 className="text-2xl font-semibold text-indigo-600 text-center mb-12">
          Referências Recebidas
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
                <UserSearch className="inline mr-2 text-indigo-500" /><strong>Email Utilizador:</strong> {userDetails.uid|| 'Não disponível'}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                <UserSearch className="inline mr-2 text-indigo-500" /><strong>Username Utilizador:</strong> {userDetails.uid|| 'Não disponível'}
                </p>
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
                
                <p className="text-gray-600 mb-2 text-sm flex">
                  <Handshake className="inline mr-2 text-indigo-500" /><strong>Estado: </strong> 
                  <p className='pl-1 font-extrabold text-green-500'>{ref.Estado_Da_referencia}</p>
                </p>

                <button
                  onClick={() => {
                    setSelectedReference(ref.id);
                    setEditState(ref.Estado_Da_referencia);
                  }}
                  className="text-indigo-600 hover:text-indigo-800 mt-4"
                >
                  Editar Estado
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
            <h3 className="text-xl font-semibold text-indigo-600">Editar Estado</h3>
            <select
              value={editState}
              onChange={(e) => setEditState(e.target.value)}
              className="mt-4 w-full p-2 border rounded-md"
            >
              <option value="Recebida">Recebida</option>
              <option value="Em Análise">Em Análise</option>
              <option value="Em contato com a referência">Em contato com a referência</option>
              <option value="Rejeitada">Rejeitada</option>
              <option value="Em Progresso">Em Progresso</option>
              <option value="Finalizada">Finalizada</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedReference(null)}
                className="mr-4 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleStateChange(selectedReference)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Atualizar
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
