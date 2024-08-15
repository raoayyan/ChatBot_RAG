// app/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LandingPage from './components/Landing.js';
export default function HomePage() {
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [showContinueOptions, setShowContinueOptions] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setShowContinueOptions(true);
      } else {
        setUser(null);
        setShowContinueOptions(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleOpenSignupPopup = () => setIsSignupPopupOpen(true);
  const handleCloseSignupPopup = () => setIsSignupPopupOpen(false);

  const handleOpenLoginPopup = () => setIsLoginPopupOpen(true);
  const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);

  const handleOpenAnonymousLoginPopup = () => setIsAnonymousLoginPopupOpen(true);
  const handleCloseAnonymousLoginPopup = () => setIsAnonymousLoginPopupOpen(false);

  const handleContinue = () => {
    router.push('/Dashboard'); // Redirect to dashboard if continuing with the logged-in account
  };

  const handleUseDifferentAccount = () => {
    setShowContinueOptions(false); // Allow user to log in with a different account
    setIsLoginPopupOpen(true);
  };

  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
    //   {showContinueOptions ? (
    //     <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
    //       <h2 className="text-xl font-bold mb-4">
    //         Continue as {user.email}?
    //       </h2>
    //       <div className="flex space-x-4">
    //         <button
    //           className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition"
    //           onClick={handleContinue}
    //         >
    //           Continue
    //         </button>
    //         <button
    //           className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition"
    //           onClick={handleUseDifferentAccount}
    //         >
    //           Use a Different Account
    //         </button>
    //       </div>
    //     </div>
    //   ) : (
    //     <>
    //       <h1 className="text-4xl font-bold mb-6">
    //         Welcome to Our App
    //       </h1>
    //       <div className="flex flex-col space-y-4">
    //         <button
    //           className="px-6 py-3 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
    //           onClick={handleOpenSignupPopup}
    //         >
    //           Sign Up
    //         </button>
    //         <button
    //           className="px-6 py-3 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition"
    //           onClick={handleOpenLoginPopup}
    //         >
    //           Login
    //         </button>
    //         <button
    //           className="px-6 py-3 bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 transition"
    //           onClick={handleOpenAnonymousLoginPopup}
    //         >
    //           Login Anonymously
    //         </button>
    //       </div>
    //     </>
    //   )}
    //   <SignupPopup isOpen={isSignupPopupOpen} onClose={handleCloseSignupPopup} />
    //   <LoginPopup isOpen={isLoginPopupOpen} onClose={handleCloseLoginPopup} />
    //   <AnonymousLoginPopup isOpen={isAnonymousLoginPopupOpen} onClose={handleCloseAnonymousLoginPopup} />
    // </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#26586F] text-white p-4">
    <LandingPage />
    </div>
  );
}
