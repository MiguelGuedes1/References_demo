import React from 'react';

const Header = () => {
  return (
    <div>
      <header className=" pt-14 md:pt-5 bg-white shadow dark:bg-gray-800 min-h-screen flex items-center justify-center ">
        <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-5xl mb-8">
              Find amazing properties and earn commissions for your referrals!
              </h1>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
              Send properties you know to our consultants and earn a commission when the deal is closed. We’re here to help you be part of the real estate market.
              </p>
              <div className="grid gap-6 mt-8 sm:grid-cols-2">
                <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                  <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="mx-3">High-quality properties</span>
                </div>

                <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                  <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="mx-3">Expert consultants</span>
                </div>

                <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                  <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="mx-3">Guaranteed commission</span>
                </div>

                <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                  <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="mx-3">Trusted in the market</span>
                </div>

                <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                  <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="mx-3">Fast response</span>
                </div>

                <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                  <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="mx-3">Network of consultants</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img
              className="object-cover w-full h-full max-w-2xl rounded-md"
              src="https://images.unsplash.com/photo-1555181126-cf46a03827c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt="glasses photo"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
