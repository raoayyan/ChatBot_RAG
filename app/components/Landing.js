// Remove the duplicate import statement for Link
import React from "react";

import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect,useState } from "react";
import ProfileMenu from "./ProfileMenu";
const LandingPage = () => {
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const [user, setUser] = useState(null);

  
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleOpenSignupPopup = () => setIsSignupPopupOpen(true);
  const handleCloseSignupPopup = () => setIsSignupPopupOpen(false);

  const handleOpenLoginPopup = () => setIsLoginPopupOpen(true);
  const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);

  return (
    <div className="min-h-screen w-full m-0 p-0 bg-[#26586F] text-white overflow-hidden">
    {/* Header */}
    <div className="flex flex-row-reverse"><ProfileMenu /></div>
    
    {/* Main Section */}
    <main className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left p-12">
      {/* Text Section */}
      <div className="lg:max-w-lg mb-12 lg:mb-0 animate-slide-in-left">
        <h2 className="text-4xl font-bold mb-6">Chatbot Service Concept</h2>
        <p className="text-lg mb-8">
          Experience the future of conversation with our advanced chatbot
          platform. Engage in dynamic dialogue with our general AI assistant
          or dive deep into video content through our innovative YouTube video
          chatbot.
        </p>
        <div className="flex flex-col gap-4 p-2 mb-2">
          <div className="flex items-center">
            {/* Replace with OpenAI Model logo */}
            <img src="/open.svg" alt="OpenAI Model" className="w-8 h-8" />
            <h3 className="font-bold ml-2">Chat with OpenAI Model</h3>
          </div>
          <div className="flex items-center">
            {/* Replace with YouTube logo */}
            <img src="/yt.svg" alt="YouTube" className="w-8 h-8" />
            <h3 className="font-bold ml-2">Chat with YouTube Video</h3>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-lg mb-2">To continue chat, please:</p>
          <button className="px-4 py-2 bg-[#00D1E2] rounded-lg shadow-lg hover:bg-[#309aa4] transition mb-2" onClick={handleOpenLoginPopup}>
            Login
          </button>
          <button className="px-4 py-2 bg-[#00D1E2] rounded-lg shadow-lg hover:bg-[#309aa4] transition" onClick={handleOpenSignupPopup}>
            Sign Up
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-shrink-0 animate-slide-in-right">
        <img
          src="bot.jpg" // Replace with the actual path to your chatbot image
          alt="Chatbot Service"
          className="max-w-xl h-2/3"
        />
      </div>
    </main>
    
    <SignupPopup
      isOpen={isSignupPopupOpen}
      onClose={handleCloseSignupPopup}
    />
    <LoginPopup isOpen={isLoginPopupOpen} onClose={handleCloseLoginPopup} />
  </div>
  );
};

export default LandingPage;
