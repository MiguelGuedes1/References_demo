import { useParams } from 'react-router-dom'
import assets from "../assets/assets"
import { useNavigate } from 'react-router-dom'
import Footer from '../componentes/Footer'
import React,{useEffect,useState,useContext } from 'react'
import { Phone, Mail, MapPinHouse } from 'lucide-react'
import { collection, addDoc } from "firebase/firestore" // Importa funções necessárias do Firestore
import { auth } from '../firebase/firebaseConfig'
import { db } from '../firebase/firebaseConfig'
import AuthContext from '../contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import Aos from "aos"
import 'aos/dist/aos.css'

const DetalhesConsultor = () => {

  const { id } = useParams(); // Pega o ID da URL
  const navigate=useNavigate()

  const [nomeReferencia,setNomeReferencia] = useState("")
  const [tipoImovel,setTipoImovel] = useState("")
  const [localizacao,setLocalizacao] = useState("")
  const [contacto,setContacto] = useState("")
  const [mensagem,setMensagem] = useState("")

  const { user, loading, handleLogout, userDetails } = useContext(AuthContext)

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
        toast.error("Please login to send a reference")
        return;
    }

    // Validação dos campos do formulário
    if (
        !nomeReferencia.trim() ||
        !tipoImovel.trim() ||
        !localizacao.trim() ||
        !contacto.trim() ||
        !mensagem.trim()
    ) {
        toast.error("Please fill in all fields")
        return;
    }

    const toastId = toast.loading('Sending reference...');

    try {
        // Salvar dados no Firestore
        const docRef = await addDoc(collection(db, "references"), {
            Referencia_enviada_por: userDetails.username, // Username do usuario que envia a referência
            Email_utilizador: userDetails.email,
            nomeReferencia,
            tipoImovel,
            Estado_Da_referencia:"Received",
            localizacao,
            contacto,
            mensagem,
            Referencia_para_Consultor: consultor.nome, // Nome do consultor ao qual a referência foi enviada
            createdAt: new Date(), // Data do envio
            userId: userDetails.uid,  // Aqui você salva o ID do usuário que criou a referência

        });
        console.log("Documento salvo com ID:", docRef.id);

        // Resetar formulário após envio
        setNomeReferencia("");
        setTipoImovel("");
        setLocalizacao("");
        setContacto("");
        setMensagem("");
        
        toast.update(toastId, {
        render: 'Referral sent, check your status in referral sent on your profile',
        type: 'success',
        isLoading: false,
        autoClose: 4000,
        })

    } catch (error) {
        
        alert("Error sending reference. Please try again later.");
    }
}






  const consultores = [
    {
      id: 1,
      nome: "Pedro Silva",
      funcao: "Senior Property Consultant",
      imagem: assets.consultor_1,
      descricao:
        "Pedro Silva is a seasoned Senior Property Consultant with over a decade of experience in the real estate industry. Known for his exceptional negotiation skills and deep understanding of market dynamics, Pedro has helped countless clients secure their dream homes and investment properties. With a meticulous eye for detail, he ensures that every aspect of the buying or selling process is handled smoothly. Pedro believes in building lasting relationships with his clients by providing personalized advice and insights that go beyond the transaction. His dedication to excellence and passion for real estate make him a trusted partner in achieving property goals.",
    },
    {
      id: 2,
      nome: "Ana Pereira",
      funcao: "Real Estate Investment Expert",
      imagem: assets.consultor_3,
      descricao:
        "Ana Pereira is a Real Estate Investment Expert who combines her financial acumen with a deep understanding of market trends to deliver exceptional results for her clients. Whether it's identifying lucrative investment opportunities or crafting tailored strategies for portfolio growth, Ana goes above and beyond to ensure her clients achieve maximum returns. Her consultative approach and knack for analyzing data enable her to anticipate market shifts and provide actionable insights. With Ana by your side, navigating the complexities of real estate investment becomes a seamless and rewarding experience.",
    },
    {
      id: 3,
      nome: "Maria Oliveira",
      funcao: "Residential Property Specialist",
      imagem: assets.consultor_4,
      descricao:
        "Maria Oliveira is a Residential Property Specialist renowned for her deep knowledge of local neighborhoods and housing markets. Maria thrives on connecting families with homes that perfectly align with their needs and lifestyles. Her empathetic and client-focused approach ensures that each transaction feels less like a business deal and more like a meaningful journey. Whether you’re a first-time buyer or looking for your forever home, Maria’s dedication and expertise will guide you every step of the way. Her passion for creating happy homeowners is evident in her glowing client testimonials.",
    },
    {
      id: 4,
      nome: "Ricardo Santos",
      funcao: "Commercial Real Estate Advisor",
      imagem: assets.consultor_2,
      descricao:
        "Ricardo Santos is a Commercial Real Estate Advisor with a track record of helping businesses find the ideal spaces to thrive. With an analytical mind and an eye for prime locations, Ricardo ensures his clients make informed decisions that align with their business objectives. From retail spaces to office buildings, he specializes in identifying properties that enhance operational efficiency and brand presence. Ricardo’s commitment to understanding his clients’ unique needs sets him apart as a trusted advisor in the competitive world of commercial real estate.",
    },
    {
      id: 5,
      nome: "Joana Guedes",
      funcao: "Senior Property Consultant",
      imagem: assets.consultor_5,
      descricao:
        "Joana Guedes is a Senior Property Consultant who brings a strategic mindset and unparalleled dedication to the table. Her expertise spans both residential and commercial markets, making her a versatile advisor for clients with diverse needs. Joana is known for her exceptional communication skills and her ability to turn complex transactions into straightforward and stress-free experiences. Her mission is to empower clients with the knowledge they need to make confident decisions, and her results speak for themselves. Joana is passionate about turning her clients’ property dreams into reality.",
    },
    {
      id: 6,
      nome: "João Reis",
      funcao: "Senior Property Consultant",
      imagem: assets.consultor_6,
      descricao:
        "João Reis is a Senior Property Consultant who excels in crafting bespoke solutions for clients looking to buy or sell properties. With a robust network of industry connections and an in-depth understanding of market trends, João ensures his clients always have a competitive edge. His collaborative and detail-oriented approach makes him a favorite among those seeking a seamless real estate experience. João’s passion for property is matched only by his commitment to delivering unparalleled client satisfaction, making him a go-to expert in the region.",
    },
    {
      id: 7,
      nome: "Mario Nogueira",
      funcao: "Residential Property Specialist",
      imagem: assets.consultor_7,
      descricao:
        "Mario Nogueira is a Residential Property Specialist who prides himself on understanding the emotional and financial significance of buying or selling a home. With a keen eye for value and a deep appreciation for architectural design, Mario helps clients uncover hidden gems in the housing market. His ability to simplify complex processes and offer clear, actionable guidance makes him a trusted partner in any real estate journey. Mario’s approach is rooted in building trust and delivering results, ensuring every client feels confident and supported.",
    },
    {
      id: 8,
      nome: "Beatriz Andrade",
      funcao: "Senior Property Consultant",
      imagem: assets.consultor_8,
      descricao:
        "Beatriz Andrade is a Senior Property Consultant with a specialization in luxury real estate. Her refined taste and attention to detail have earned her a reputation for matching clients with high-end properties that perfectly suit their lifestyles. Beatriz’s professionalism, discretion, and unwavering commitment to client satisfaction set her apart in the competitive luxury market. With a thorough understanding of architectural elegance and market dynamics, Beatriz transforms property aspirations into reality, offering an unparalleled level of service at every step.",
    },
  ];

  // Encontrando o consultor que corresponde ao ID
  const consultor = consultores.find((c) => c.id === parseInt(id));

  if (!consultor) {
    return <p>Consultor não encontrado.</p>;
  }


  useEffect(() => {
    // Rola até o topo da página ao carregar o componente
    window.scrollTo(0, 0);
  }, []); // O array vazio significa que isso será executado uma vez, quando o componente for montado


       useEffect(() => {
              Aos.init({duration:2000})
            },[])



  return (


    <div className="consultor-details">

        <section data-aos="fade-down"  class="bg-white dark:bg-gray-900">
            <div class="container px-6 py-10 mx-auto">
                <div class="lg:-mx-6 lg:flex lg:items-center">
                    <img class="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg md:h-[35rem] lg:h-[46rem]" src={consultor.imagem} target="blank" alt=""/>

                    <div class="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
                    

                        <h1 data-aos="fade-right" class="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
                            Invictus | References
                        </h1>

                        <p data-aos="fade-left"  class="max-w-lg mt-6 text-gray-500 dark:text-gray-400 ">
                        {consultor.descricao}
                        </p>

                        <h3 data-aos="fade-right" class="mt-6 text-lg font-medium text-blue-500">{consultor.nome}</h3>
                        <p data-aos="fade-right" class="text-gray-600 dark:text-gray-300">{consultor.funcao}</p>

                        <div class="flex items-center justify-between mt-12 lg:justify-start">
                        <button   onClick={() => navigate('/')} type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Home</button>
                        </div>
                            </div>
                        </div>
                    </div>
        </section>



                                        {/*   INFO FORMULARIO */}


        <section data-aos="zoom-in-up" data-aos-duration="2500" className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 grid-cols-1">
                    <div className="lg:mb-0 mb-10">
                        <div className="group w-full h-full">
                            <div className="relative h-full">
                                <img
                                    src={assets.escritorio}
                                    alt="Escritorio invictus"
                                    className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700 object-cover"
                                />
                                <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                                    Send a Reference
                                </h1>

                                <div className="absolute bottom-0 w-full lg:p-11 p-5">
                                    <div className="bg-white rounded-lg p-6 block shadow-xl">

                                        <p className="flex items-center mb-6">
                                        <Phone className="text-indigo-600 w-6 h-6 sm:w-6 sm:h-6" />
                                            <h5 className="text-black text-sm font-semibold leading-6 ml-5">
                                                22 319 2844
                                            </h5>
                                        </p>

                                        <p className="flex items-center mb-6">
                                        <Mail className="text-indigo-600 w-6 h-6 sm:w-6 sm:h-6"  />
                                            <h5 className="text-black text-sm font-semibold leading-6 ml-5">
                                                invictus_geral@gmail.com
                                            </h5>
                                        </p>

                                        <p className="flex items-center">
                                        <MapPinHouse className="text-indigo-600 w-6 h-6 sm:w-6 sm:h-6"  />
                                            <h5 className="text-black text-sm font-semibold leading-6 ml-5">
                                            R. da Boavista 865, 4050-111 Porto
                                            </h5>
                                        </p>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                            {/*   FIM INFO FORMULARIO */}

                            {/*   INICIO FORMULARIO */}

                    <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl shadow-xl">
                        <h2 className="text-indigo-600 font-manrope text-2xl font-semibold leading-10 mb-11">
                            Send a reference for {consultor.nome}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="text-gray-700 text-sm font-medium mb-2 block" htmlFor="name">
                                    Reference Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full h-8 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4"
                                    placeholder="Reference Name"
                                    value={nomeReferencia}
                                    onChange={(e) => setNomeReferencia(e.target.value)}
                                />
                            </div>


                            <div className="mb-6">
                                <label className="text-gray-700 text-sm font-medium mb-2 block" htmlFor="property-type">
                                    Property Type (T0,T1,T2 ...)
                                </label>
                                <input
                                    id="property-type"
                                    type="text"
                                    className="w-full h-8 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4"
                                    placeholder="Property Type"
                                    value={tipoImovel}
                                    onChange={(e) => setTipoImovel(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="text-gray-700 text-sm font-medium mb-2 block" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    className="w-full h-8 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4"
                                    placeholder="Property Location"
                                    value={localizacao}
                                    onChange={(e) => setLocalizacao(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="text-gray-700 text-sm font-medium mb-2 block" htmlFor="contact">
                                    Contact of Buyer/Seller
                                </label>
                                <input
                                    id="contact"
                                    type="text"
                                    className="w-full h-8 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4"
                                    placeholder="Contact of Buyer/Seller"
                                    value={contacto}
                                    onChange={(e) => setContacto(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="text-gray-700 text-sm font-medium mb-2 block" htmlFor="message">
                                    
                                    Any details of the property or reference
                                </label>
                                <textarea
                                    id="message"
                                    className="w-full h-32 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm font-normal leading-7 rounded-xl border border-gray-200 focus:outline-none pl-4 pt-3"
                                    placeholder="Write your message here"
                                    value={mensagem}
                                    onChange={(e) => setMensagem(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full h-10 text-white text-sm font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-indigo-800 bg-indigo-600 shadow-sm"
                            >
                                Send Reference
                            </button>
                        </form>

                    </div>

                      {/*   FIM  FORMULARIO */}


                </div>
            </div>
        </section>

        <ToastContainer />


        <Footer/>



        
    </div>
  );
};

export default DetalhesConsultor;
