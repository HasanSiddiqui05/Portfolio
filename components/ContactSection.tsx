"use client";

import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8197b4f7-cd11-4ae2-a9fc-c47a9a929315",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative max-w-7xl mx-auto py-32 px-6 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(170,66,255,0.8)_0%,transparent_70%)] blur-[60px] z-0" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.8)_0%,transparent_70%)] blur-[80px] z-0" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            {/* Left side text and info */}
            <div className="flex-1 flex flex-col items-start w-full">
                <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-[linear-gradient(0deg,rgb(127,64,255),rgb(255,255,255))] leading-tight mb-6 tracking-tight">
                    Let's Build Something Great.
                </h2>
                <p className="text-white/60 text-lg md:text-xl mb-12 max-w-md leading-relaxed">
                    I'm currently available for new opportunities. If you have any project to discuss my inbox is open.
                </p>
                
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex items-center sm:gap-6 gap-3 sm:p-6 p-3 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-purple-500/30 transition-all cursor-default w-fit group backdrop-blur-sm">
                        <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white/40 text-sm mb-1 uppercase tracking-wider font-semibold">Email Me At</span>
                            <span className="text-white md:text-lg text-sm font-medium">hasansiddiqui17098@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side form */}
            <div className="flex-1 w-full relative">
                {/* Decorative border gradient */}
                <div className="absolute -inset-[2px] bg-gradient-to-br from-purple-500/40 via-transparent to-purple-500/40 rounded-3xl opacity-50 blur-sm" />
                
                <div className="relative w-full bg-black/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl rounded-3xl p-8 md:p-10">
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 flex flex-col gap-2 group">
                                <label className="text-white/50 text-sm ml-1 group-focus-within:text-purple-400 transition-colors uppercase tracking-wider font-semibold">Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all" />
                            </div>
                            
                            <div className="flex-1 flex flex-col gap-2 group">
                                <label className="text-white/50 text-sm ml-1 group-focus-within:text-purple-400 transition-colors uppercase tracking-wider font-semibold">Email</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 group">
                            <label className="text-white/50 text-sm ml-1 group-focus-within:text-purple-400 transition-colors uppercase tracking-wider font-semibold">Subject</label>
                            <input required type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Inquiry" className="w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all" />
                        </div>

                        <div className="flex flex-col gap-2 group">
                            <label className="text-white/50 text-sm ml-1 group-focus-within:text-purple-400 transition-colors uppercase tracking-wider font-semibold">Message</label>
                            <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell me about your project..." className="w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all resize-none" />
                        </div>

                        <button type="submit" disabled={status === 'submitting'} className="mt-4 w-full bg-white text-black font-semibold text-lg rounded-2xl px-5 py-4 hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(170,66,255,0.4)] disabled:opacity-70 disabled:cursor-not-allowed">
                            {status === 'submitting' ? (
                                <span>Sending...</span>
                            ) : status === 'success' ? (
                                <span>Message Sent! ✓</span>
                            ) : status === 'error' ? (
                                <span>Error. Try Again!</span>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
}
