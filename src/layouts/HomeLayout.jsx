import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>


      <main className="flex-grow">
        <Outlet/>
      </main>

      <Footer/>
    </div>


  );
};

export default HomeLayout;