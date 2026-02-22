import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { Sparkles, Video } from 'lucide-react';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenuHandler = () => {
    setIsOpen(true);
  };

  const closeMenuHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className="flex flex-col items-center text-sm bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat">

        {/* Top banner */}
        <div className="w-full py-2.5 font-medium text-sm text-white text-center bg-gradient-to-r from-[#4F39F6] to-[#FDFEFF]">
          <p>
            <span className="px-3 py-1 rounded-md text-indigo-600 bg-white mr-2">
              Launch offer
            </span>
            Try arthAI today and get $50 free credits
          </p>
        </div>

        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-slate-800 text-sm">
          
          {/* Logo */}
          <a href="#">
            <img src="/logo.png" alt="logo" className="h-5 w-auto"/>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 transition duration-500">
            <a href="/" className="font-medium text-gray-500 hover:text-black transition-all">Home</a>
            <a href="#features" className="font-medium text-gray-500 hover:text-black transition-all">Features</a>
            <a href="#hiw" className="font-medium text-gray-500 hover:text-black transition-all">How to use</a>
            <a href="#testimonials" className="font-medium text-gray-500 hover:text-black transition-all">Testimonials</a>
            <a href="#cta" className="font-medium text-gray-500 hover:text-black transition-all">Contact</a>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:block space-x-3">
            <Link 
              to='/login'
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md"
            >
              Get started
            </Link>
            <Link 
              to='/login'
              className="hover:bg-slate-100 transition px-6 py-2 border border-indigo-600 rounded-md"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={openMenuHandler}
            className="md:hidden active:scale-90 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 5h16"/>
              <path d="M4 12h16"/>
              <path d="M4 19h16"/>
            </svg>
          </button>

        </nav>

        {/* Mobile nav */}
        <div
          className={`fixed inset-0 z-[100] bg-white/60 text-slate-800 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <a href="/">Home</a>
          <a href="#features">Features</a>
          <a href="#testinomials">Testimonials</a>
          <a href="#cta">Contact</a>

          <button
            onClick={closeMenuHandler}
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
          >
            ✕
          </button>
        </div>

        {/* Hero */}
        <main className="flex flex-col items-center max-md:px-2">

          <a href="#" className="mt-28 flex items-center gap-2 border border-indigo-200 rounded-full p-1 pr-3 text-sm font-medium text-indigo-500 bg-indigo-200/20">
            <span className="flex justify-center items-center gap-1 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
              NEW
              <Sparkles className="size-3"/>
            </span>
            AI-Powered Invoice Platform
          </a>

          <h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[80px] font-semibold max-w-4xl text-slate-900">
            Your invoices, built and analyzed by AI — so you get paid faster.
          </h1>

          <p className="text-center text-base text-slate-600 max-w-xl mt-2">
            ArthAI turns your project notes into professional invoices in seconds, then keeps working — tracking payments, spotting patterns, and telling you exactly what to do next to protect your cash flow.
          </p>

          <div className="flex items-center gap-4 mt-8">
            <Link to='/login' className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 rounded-lg px-7 h-11 cursor-pointer">
              Get started
            </Link>

            <button className="flex items-center justify-center gap-2 border border-slate-600 active:scale-95 hover:bg-white/10 transition text-slate-600 rounded-lg px-8 h-11 cursor-pointer">
              <Video className="size-5"/>
              Watch Demo
            </button>
          </div>

          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/dashboard-image-1.png"
            className="w-full rounded-[15px] max-w-4xl mt-16"
            alt="hero section showcase"
          />

        </main>

      </section>
    </>
  );
}