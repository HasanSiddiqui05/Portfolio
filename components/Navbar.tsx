"use client";

import { useState } from "react";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  return (
    <div className="fixed top-8 left-0 right-0 w-fit mx-auto z-50 flex flex-col items-center">
    

      <div className="w-fit hidden sm:flex justify-center items-center gap-8 border rounded-4xl border-white/20 bg-black/50 backdrop-blur-md px-10 py-5 text-xl font-medium text-white shadow-lg">
        <button onClick={() => { document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-purple-400 transition-colors"> Hasan Shahab </button>

        <button onClick={() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-purple-400 transition-colors hidden sm:flex"> Projects </button>

        <button onClick={() => { document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-purple-400 transition-colors hidden sm:flex">About </button>

        <button onClick={() => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-purple-400 transition-colors hidden sm:flex"> Tech Stack </button>

        <button onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-purple-400 transition-colors hidden sm:flex"> Contact </button>
      </div>

      
      <div className= "sm:hidden font-medium text-xl flex justify-around w-87.5 border border-white/20 bg-black/70 backdrop-blur-md p-5 text-white shadow-lg rounded-4xl">
        <div className="flex flex-col gap-3">
            <button onClick={() => { document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); setNav(false); }} className="hover:text-purple-400 transition-colors">Hasan Shahab</button>
            <span className={`flex-col items-start gap-3 ${nav ? "flex" : "hidden"}`}>
                <button onClick={() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setNav(false); }} className="hover:text-purple-400 transition-colors">Projects</button>
                <button onClick={() => { document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); setNav(false); }} className="hover:text-purple-400 transition-colors">About</button>
                <button onClick={() => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); setNav(false); }} className="hover:text-purple-400 transition-colors">Tech Stack</button>
                <button onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setNav(false); }} className="hover:text-purple-400 transition-colors">Contact</button>
            </span>
        </div>
        <button className="flex sm:hidden " onClick={() => setNav(!nav)}>
          {nav ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-7 h-7" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-7 h-7" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}