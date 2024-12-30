import React, { useRef, useState,useEffect } from "react";
import { Play, Pause } from "lucide-react";
import assets from "../assets/assets";
import Aos from "aos"
import 'aos/dist/aos.css'

const Header = () => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const toggleVideoPlayback = () => {
    if (isPlaying) {
      videoRef.current.pause(); // Pausa o vídeo
    } else {
      videoRef.current.play(); // Reproduz o vídeo
    }
    setIsPlaying(!isPlaying); // Alterna o estado
  }

    useEffect(() => {
      Aos.init({duration:1000})
    },[])


  return (
    <div className="relative min-h-screen">
      {/* Vídeo como fundo */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={assets.videoo_fundo}
        autoPlay
        loop
        muted
        playsInline // Importante para dispositivos móveis
      ></video>


      {/* Gradiente de sobreposição */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/70"></div>


      {/* Botões de controle do vídeo */}
      <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 z-20 flex space-x-2">

        <button
          onClick={toggleVideoPlayback}
          className="p-2 bg-black/50 text-white rounded-full shadow-lg hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

      </div>

      {/* Conteúdo sobreposto */}
      <header data-aos="fade-up" className="relative z-10 pt-14 md:pt-5 flex items-center justify-center min-h-screen">
        <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center text-white">
          <div className="w-full lg:w-2/3">
            <div className="lg:max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-wide lg:text-5xl mb-8">
                Find amazing properties and earn commissions for your referrals!
              </h1>
              <p className="mt-4">
                Send properties you know to our consultants and earn a commission
                when the deal is closed. We’re here to help you be part of the real
                estate market.
              </p>
              <div className="grid gap-6 mt-8 sm:grid-cols-2">
                {[
                  "High-quality properties",
                  "Expert consultants",
                  "Guaranteed commission",
                  "Trusted in the market",
                  "Fast response",
                  "Network of consultants",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center -px-3 text-white"
                  >
                    <svg
                      className="w-5 h-5 mx-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="mx-3">{item}</span>
                  </div>
                ))}
              </div>
              {/* Call to Action */}
              <div className="mt-8">


              <a
              href="#Consultores"
           
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mt-3 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Send a Reference
                </span>
              </a>


              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
