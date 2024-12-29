import React, { useRef, useState,useEffect } from "react";
import foto_opiniao_1 from '../assets/foto_opiniao_1.jpg';
import foto_opiniao_2 from '../assets/foto_opiniao_2.avif';
import foto_opiniao_3 from '../assets/foto_opiniao_3.jpg';
import foto_opiniao_4 from '../assets/foto_opiniao_4.jpg';
import foto_opiniao_5 from '../assets/foto_opiniao_5.jpg';
import foto_opiniao_6 from '../assets/foto_opiniao_6.avif';
import foto_opiniao_7 from '../assets/foto_opiniao_7.jpg';
import foto_opiniao_8 from '../assets/foto_opiniao_8.avif';
import foto_opiniao_9 from '../assets/foto_opiniao_9.avif';
import foto_opiniao_10 from '../assets/foto_opiniao_10.jpg';
import foto_opiniao_11 from '../assets/foto_opiniao_11.avif';
import foto_opiniao_12 from '../assets/foto_opiniao_12.avif';
import Aos from "aos"
import 'aos/dist/aos.css'


const Opinioes = () => {
 
  const opinioes = [
    {
      nome: 'Sandro Ferreira',
      cargo: 'Teacher',
      imagem:   foto_opiniao_1,
      opiniao: 'I submitted a property reference through Invictus and within a few days, a consultant reached out. The deal was closed, and I received my commission. It’s an amazing and easy way to earn money!',

    },
    {
      nome: 'Rogerio Alves',
      cargo: 'Doctor',
      imagem:   foto_opiniao_2,
      opiniao:
        'I was a bit hesitant at first, but Invictus made the process so simple! I referred a property, and a consultant made the deal happen. I’m so happy with how quick and seamless the entire process was!',

    },
    {
      nome: 'Joao Sousa',
      cargo: 'Lawyer',
      imagem:   foto_opiniao_3,
      opiniao:
        'I’ve referred multiple properties on Invictus and every time, the consultant closes the deal quickly. The commissions are real, and I’ve earned more than I expected. I’ll keep referring!',
  
    },
    {
      nome: 'Raul Santos',
      cargo: 'Engineer',
      imagem:   foto_opiniao_4,
      opiniao:
        'I submitted a reference for a property I knew was up for sale, and within a short time, I was contacted by a consultant. They closed the deal, and I received my commission. This is a fantastic platform!',
    
    },
    {
      nome: 'Joaquim Fernandes',
      cargo: 'Nurse',
      imagem:   foto_opiniao_5,
      opiniao: 'I wasn´t sure how things would work at first, but I was amazed! I referred a property, a consultant got in touch, and the deal was closed. I earned my commission without much effort. Highly recommended!',
  
    },
    {
        nome: 'Mario Silva',
        cargo: 'Accountant',
        imagem:   foto_opiniao_6,
        opiniao: 'Invictus made it so easy for me to earn money by just referring properties. A consultant reached out to me, and the deal was closed soon after. I’m thrilled with the results!',
    
      },
      {
        nome: 'Isabel Pereira',
        cargo: 'Chef',
        imagem:   foto_opiniao_7,
        opiniao: 'I referred a property on Invictus, and in no time, a consultant closed the deal. It was so easy, and the commission came through just as promised!',
      
      },
      {
        nome: 'Diogo Costa',
        cargo: 'Architect',
        imagem:   foto_opiniao_8,
        opiniao: 'Invictus is the perfect platform for anyone looking to make extra income. I referred a property, and within days, the deal was done. Great experience!',
    
      },
      {
        nome: 'Daniel Alves',
        cargo: 'Police Officer',
        imagem:   foto_opiniao_9,
        opiniao: 'What I love about Invictus is how professional and straightforward the platform is. I referred a property, and the consultant handled the rest. The commission came in, and I couldn’t be happier with how smoothly everything went!',
    
      },
      {
        nome: 'Dinis Dias',
        cargo: 'Plumber',
        imagem:   foto_opiniao_10,
        opiniao:
          'I’ve used Invictus to refer properties multiple times, and each experience has been great. The consultants are very professional, the platform is easy to use, and the commissions are always paid promptly. Definitely a trusted way to earn money!',
     
      },
      {
        nome: 'Vitor Sousa',
        cargo: 'Electrician',
        imagem:   foto_opiniao_11,
        opiniao:
          'I referred a property on Invictus, and within days, a consultant closed the deal. Fast and reliable!',
       
      },
      {
      nome: 'Antunes Guedes',
      cargo: 'Salesperson',
      imagem:   foto_opiniao_12,
      opiniao:
        'Invictus made it so easy to earn a commission by referring a property. Great platform!',
    
    },
  ]

  useEffect(() => {
    Aos.init({duration:1000})
  },[])

  return (
    <section data-aos="fade-up" id="Opinioes" className="py-40 bg-slate-900">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-12 space-y-5 md:mb-16 md:text-center">
            <div data-aos="fade-right" className="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
              Words from Our Clients
            </div>
            <h1 data-aos="fade-left" className="mb-5 text-3xl font-semibold text-white md:text-center md:text-5xl">
              It's not just us.
            </h1>
            <p data-aos="fade-right" className="text-xl text-gray-100 md:text-center md:text-2xl">
              Here's what others have to say about us.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {opinioes.map((opiniao, index) => (
            
            <div key={index} className="text-sm leading-6">

              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <section>
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className="flex items-center space-x-4">
                      <img
                        src={opiniao.imagem}
                      className="w-20 h-20 object-cover border rounded-full"
                        alt={opiniao.nome}
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{opiniao.nome}</h3>
                        <p className="text-gray-500 text-md">{opiniao.cargo}</p>
                      </div>
                    </div>
                    <p className="leading-normal text-gray-300 text-md">{opiniao.opiniao}</p>
                  </div>
                </section>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Opinioes;
