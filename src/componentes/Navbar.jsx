import { useState,useContext } from "react";
import { Menu, X } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate()

  const { user, loading,handleLogout,userDetails } = useContext(AuthContext);

  const navegar_para_login = () => {
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-gradient-to-b from-black/50 via-black/30 to-transparent backdrop-blur-lg shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
         
          {/* Título "Invictus | References" */}
          <div className="flex items-center">
            <p className="text-white font-bold hidden sm:block">Invictus | References</p>
          </div>



          {/* Seção central para os links de navegação */}
          <div className="flex-grow flex justify-center">
            <div className="flex space-x-4 hidden sm:flex">
              {/* Navigation Links */}
              <a
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                aria-current="page"
              >
                Home
              </a>
              <a
                href="#About"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                About
              </a>
              <a
                href="#Consultores"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Our Brokers
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Calendar
              </a>
            </div>
          </div>



              {user ? (
                // Se o usuário estiver logado, mostra o menu de perfil
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <div className="relative ml-3">
                    <div>
                      <button
                        type="button"
                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded={userMenuOpen ? "true" : "false"}
                        aria-haspopup="true"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                      >
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="size-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="User Profile"
                        />
                      </button>
                    </div>

                    {/* Dropdown menu */}
                    {userMenuOpen && (
                      <div
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                      >
                        <span className="block px-4 py-2 text-sm text-gray-700 font-extrabold">{userDetails.username || 'Usuário'}</span>

                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-1"
                        >
                          References sent
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-2"
                          onClick={handleLogout}
                        >
                          Sign out
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Se o usuário não estiver logado, mostra o botão de login
  <button
    onClick={navegar_para_login}
    className="relative inline-flex items-center justify-center p-0.5 mb-2 mt-3 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
  >
    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Register / Login
    </span>
  </button>
)}

          

         

          {/* Botão de abrir o menu mobile */}
          <div className="sm:hidden absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen ? "true" : "false"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <Menu className="w-6 h-6 text-gray-400" />
              ) : (
                <X className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 text-center">
            {/* Título "Invictus | References" no meio quando o menu está aberto */}
            <p className="text-white font-bold mb-8 mt-4">Invictus | References</p>
            {/* Navigation Links */}
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
              aria-current="page"
            >
              Home
            </a>
            <a
              href="#About"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              About
            </a>
            <a
              href="#Consultores"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Our Brokers
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Calendar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
