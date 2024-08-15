import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center max-w-4xl w-full">
        <h1 className="text-white text-center font-bold text-2xl mb-8 px-4">
          Effortless Customer Service with AI
        </h1>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full">
          <div className="flex flex-col items-center flex-1">
            <Image 
              src="/gen.jpg" 
              alt="General Chat image" 
              width={370} 
              height={370} 
              className="mb-8 rounded-lg shadow-lg w-full h-auto max-w-[370px]"
            />
            <Link href="/Dashboard/general" className="w-full max-w-[370px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl text-center">
              General Chat
            </Link>
          </div>

          <div className="hidden md:block w-px bg-gray-700 self-stretch"></div>

          <div className="flex flex-col items-center flex-1">
            <Image 
              src="/per.jpg" 
              alt="Personalize Chat image" 
              width={370} 
              height={370} 
              className="mb-8 rounded-lg shadow-lg w-full h-auto max-w-[370px]"
            />
            <Link href="/Dashboard/personalize" className="w-full max-w-[370px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl text-center">
              Personalize Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}