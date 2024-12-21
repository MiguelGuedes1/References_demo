import { useParams } from 'react-router-dom';
import assets from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import Footer from '../componentes/Footer';
import React,{useEffect} from 'react';

const DetalhesConsultor = () => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate=useNavigate()
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


  return (
    <div className="consultor-details">

<section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mx-auto">
        <div class="lg:-mx-6 lg:flex lg:items-center">
            <img class="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg md:h-[35rem] lg:h-[46rem]" src={consultor.imagem} target="blank" alt=""/>

            <div class="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
             

                <h1 class="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
                    Invictus | References
                </h1>

                <p class="max-w-lg mt-6 text-gray-500 dark:text-gray-400 ">
                 {consultor.descricao}
                </p>

                <h3 class="mt-6 text-lg font-medium text-blue-500">{consultor.nome}</h3>
                <p class="text-gray-600 dark:text-gray-300">{consultor.funcao}</p>

                <div class="flex items-center justify-between mt-12 lg:justify-start">
                <button   onClick={() => navigate('/')} type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Home</button>
                </div>
                    </div>
                </div>
            </div>
         </section>



                                   {/*   Formulario para enviar referencia  */}


                                   <section className="py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
            <div className="lg:mb-0 mb-10">
                <div className="group w-full h-full">
                    <div className="relative h-full">
                        <img
                            src="https://pagedone.io/asset/uploads/1696488602.png"
                            alt="ContactUs tailwind section"
                            className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700 object-cover"
                        />
                        <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                            Send a Reference
                        </h1>
                        <div className="absolute bottom-0 w-full lg:p-11 p-5">
                            <div className="bg-white rounded-lg p-6 block shadow-xl">
                                <a href="javascript:;" className="flex items-center mb-6">
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z"
                                            stroke="#4F46E5"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <h5 className="text-black text-base font-normal leading-6 ml-5">
                                        227538978
                                    </h5>
                                </a>
                                <a href="javascript:;" className="flex items-center mb-6">
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z"
                                            stroke="#4F46E5"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <h5 className="text-black text-base font-normal leading-6 ml-5">
                                        invictus_geral@gmail.com
                                    </h5>
                                </a>
                                <a href="javascript:;" className="flex items-center">
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M25 12.9169C25 17.716 21.1939 21.5832 18.2779 24.9828C16.8385 26.6609 16.1188 27.5 15 27.5C13.8812 27.5 13.1615 26.6609 11.7221 24.9828C8.80612 21.5832 5 17.716 5 12.9169C5 10.1542 6.05357 7.5046 7.92893 5.55105C9.8043 3.59749 12.3478 2.5 15 2.5C17.6522 2.5 20.1957 3.59749 22.0711 5.55105C23.9464 7.5046 25 10.1542 25 12.9169Z"
                                            stroke="#4F46E5"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M17.5 11.6148C17.5 13.0531 16.3807 14.219 15 14.219C13.6193 14.219 12.5 13.0531 12.5 11.6148C12.5 10.1765 13.6193 9.01058 15 9.01058C16.3807 9.01058 17.5 10.1765 17.5 11.6148Z"
                                            stroke="#4F46E5"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                    <h5 className="text-black text-base font-normal leading-6 ml-5">
                                        654 Sycamore Avenue, Meadowville, WA 76543
                                    </h5>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl shadow-xl">
                <h2 className="text-indigo-600 font-manrope text-2xl font-semibold leading-10 mb-11">
                    Send a reference for {consultor.nome}
                </h2>
                <form>
                    <div className="mb-6">
                        <label className="text-gray-700 text-sm font-medium mb-2 block" htmlFor="name">
                            Your Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="w-full h-8 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4"
                            placeholder="Full Name"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="text-gray-700 text-sm font-medium mb-2 block" htmlFor="email">
                            Your Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full h-8 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4"
                            placeholder="Email Address"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="text-gray-700 text-sm font-medium mb-2 block" htmlFor="phone">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            className="w-full h-8 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4"
                            placeholder="Phone Number"
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
                        />
                    </div>

                    <div className="mb-6">
                        <label className="text-gray-700 text-sm font-medium mb-2 block" htmlFor="contact">
                            Contact for Buyer/Seller
                        </label>
                        <input
                            id="contact"
                            type="text"
                            className="w-full h-8 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4"
                            placeholder="Contact of Buyer/Seller"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="text-gray-700 text-sm font-medium mb-2 block" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            className="w-full h-32 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm font-normal leading-7 rounded-xl border border-gray-200 focus:outline-none pl-4 pt-3"
                            placeholder="Write your message here"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-indigo-800 bg-indigo-600 shadow-sm"
                    >
                        Send Reference
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>


<Footer/>



        
    </div>
  );
};

export default DetalhesConsultor;
