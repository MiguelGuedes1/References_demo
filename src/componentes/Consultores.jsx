import React, { useRef, useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import assets from "../assets/assets"
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import Aos from "aos"
import 'aos/dist/aos.css'

const Consultores = () => {
  const consultores = [
    {
      id: 1,
      nome: "Pedro Silva",
      funcao: "Senior Property Consultant",
      imagem: assets.consultor_1,
    },
    {
      id: 2,
      nome: "Ana Pereira",
      funcao: "Real Estate Investment Expert",
      imagem: assets.consultor_3,
    },
    {
      id: 3,
      nome: "Maria Oliveira",
      funcao: "Residential Property Specialist",
      imagem: assets.consultor_4,
    },
    {
      id: 4,
      nome: "Ricardo Santos",
      funcao: "Commercial Real Estate Advisor",
      imagem: assets.consultor_2,
    },
    {
      id: 5,
      nome: "Joana Guedes",
      funcao: "Senior Property Consultant",
      imagem: assets.consultor_5,
    },
    {
      id: 6,
      nome: "João Reis",
      funcao: "Senior Property Consultant",
      imagem: assets.consultor_6,
    },
    {
      id: 7,
      nome: "Mario Nogueira",
      funcao: "Residential Property Specialist",
      imagem: assets.consultor_7,
    },
    {
      id: 8,
      nome: "Beatriz Andrade",
      funcao: "Senior Property Consultant",
      imagem: assets.consultor_8,
    },
  ];

    useEffect(() => {
      Aos.init({duration:1000})
    },[])

  return (
    <section data-aos="fade-up"  id="Consultores" className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          Meet Our Expert Real Estate Consultants
        </h1>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {consultores.map((consultor) => (
            <div
              key={consultor.id}
              className="flex flex-col items-center justify-center p-8 transition-colors duration-300 transform cursor-pointer group hover:bg-blue-600 rounded-xl"
            >
              <Link to={`/detalhesConsultor/${consultor.id}`} className="flex flex-col items-center">
                <img
                  className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
                  src={consultor.imagem}
                  alt={`Consultor ${consultor.id}`}
                />
                <h1 className="mt-4 text-2xl font-semibold text-center text-gray-700 capitalize dark:text-white group-hover:text-white">
                  {consultor.nome}
                </h1>
                <p className="mt-2 text-center text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
                  {consultor.funcao}
                </p>
              </Link>
              <div className="flex mt-4 space-x-4 text-gray-500 group-hover:text-white">
                <a href="#" className="hover:text-blue-400 text-white">
                  <Instagram size={20} />
                </a>
                <a href="#" className="hover:text-blue-600 text-white">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:text-blue-700 text-white">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Consultores;
