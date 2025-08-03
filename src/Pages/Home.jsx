import React from 'react'
import Navbar from '../Components/Navbar'
import Menubar from '../Components/Menubar';
import bgImage from '../assets/blur.jpg';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className='min-h-screen flex flex-col bg-black ml-2 cursor-pointer'>
      <Navbar />

      <div className="flex flex-grow mt-6 mb-3">
        <Menubar />

        
        <main
          className="flex-grow ml-4 mb-2 flex flex-col text-center mt-1"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left top',
            backgroundSize: 'cover', 
        }}
      >
          <div className="text-left text-white p-8">
            <h1 className='text-4xl font-bold mb-4'>Welcome to AdvocateGO!</h1>
            <p className='text-lg'>Your one-step solution for legal assistance.</p>
            <p className='text-lg'>Don’t know where to start with a legal issue?</p>
            <p>
                AdvocateGO helps you understand your rights and find the right lawyer easily.
            </p>
            <p>
                 Diagnose your issue in simple steps
            </p>
            <p>
                 Get help in Telugu or English or your regional language, even by voice
            </p>
            <p>
                Find local lawyers by type and availability
            </p>
            <p>
                 Check if you're eligible for free legal aid
            </p>
            <p>
                 Search for lawyers by name or location
            </p>
            <p className='mb-4'>
                 Ask legal questions anonymously — safely & privately
            </p>
            <Link to="/more" type='button' className="bg-gray-600 hover:bg-black text-white font-semibold py-2 px-4 rounded mb-2 items-center justify-center mt-4"> Learn More</Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home;