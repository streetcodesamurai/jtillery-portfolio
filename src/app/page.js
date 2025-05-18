'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/data/testimonials.json')
      .then(res => res.json())
      .then(data => {
        const flat = data.flat();
        setReviews(flat.slice(0, 100)); // Limit or filter if needed
      });
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return; // Wait until reviews are loaded
  
    gsap.registerPlugin(ScrollTrigger);
  
    const testimonials = document.querySelectorAll('.testimonial');
    let current = 0;
  
    const showTestimonial = (index) => {
      testimonials.forEach((el, i) => {
        if (i === index) {
          gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
          el.style.zIndex = 1;
        } else {
          gsap.to(el, { opacity: 0, y: -20, duration: 0.8 });
          el.style.zIndex = 0;
        }
      });
    };
  
    showTestimonial(current);
    const interval = setInterval(() => {
      current = (current + 1) % testimonials.length;
      showTestimonial(current);
    }, 5000);
  
    gsap.fromTo("#skillsGrid", { opacity: 0, y: 50 }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#skillsGrid",
        start: "top 80%"
      }
    });
  
    return () => clearInterval(interval);
  }, [reviews]); // 👈 re-run this effect only when reviews are available

  return (
    <>
      <Head>
        <title>Your Name — Web Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <main className="font-mono bg-gray-50 text-gray-900">
  {/* Header */}
  <header className="bg-black text-white pt-[4.236rem] pb-[2.618rem] text-center">
    <div className="flex flex-col items-center">
      <img src="/jtillery-logo.svg" alt="Logo" className="w-40 h-40 mb-[1.618rem]" />
      <p className="text-xl tracking-tight opacity-90 mb-[1rem] max-w-screen-sm">
        Full-stack solutions, zero-stack drama — just good code and great vibes.
      </p>
    </div>
  </header>

  {/* Skills Section */}
  <section className="bg-[#f5f5f5] text-center py-[6.854rem]">
    <div className="max-w-screen-md mx-auto px-4">
      <h2 className="text-3xl mb-[2.618rem] text-gray-800">Skills & Technologies</h2>
      <div id="skillsGrid" className="flex flex-wrap justify-center gap-4 text-sm font-mono opacity-0">
        {[
          "HTML", "CSS", "JavaScript", "React", "Tailwind CSS",
          "Node.js", "MongoDB", "Git", "WordPress",
          "Shopify", "Squarespace", "NextJS", "Bootstrap"
        ].map((skill) => (
          <span key={skill} className="bg-white text-black px-4 py-2 rounded shadow">{skill}</span>
        ))}
      </div>
    </div>
  </section>

  {/* Testimonials */}
  <section className="bg-[#e0f7fa] py-[6.854rem] text-center text-gray-800">
    <h2 className="text-3xl mb-[2.618rem]">My Past Clients Love Me</h2>
    <div className="relative overflow-hidden h-48">
      <div className="relative w-full h-full max-w-xl mx-auto">
        {reviews.map((review, i) => (
          <div key={i} className="absolute inset-0 opacity-0 testimonial font-mono text-lg px-4">
            <blockquote className="text-xl leading-relaxed">“{review.comment}”</blockquote>
            <p className="mt-4 font-semibold">— {review.reviewer.full_name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Favorite Books */}
  <section className="bg-[#fff8e1] py-[6.854rem]">
    <div className="max-w-4xl mx-auto px-6 text-gray-900">
      <h2 className="text-3xl mb-[2.618rem] text-center">My Favorite Books</h2>
      <div className="grid sm:grid-cols-2 gap-[2.618rem] text-left text-base font-mono">
        {[
          "Clean Code — Robert C. Martin",
          "Deep Work — Cal Newport",
          "The Lean Startup — Eric Ries",
          "Atomic Habits — James Clear"
        ].map((book, i) => (
          <div key={i} className="bg-white p-6 border rounded-lg shadow">{book}</div>
        ))}
      </div>
    </div>
  </section>

  {/* Listening To */}
  <section className="bg-[#ede7f6] py-[6.854rem] text-center text-gray-800">
    <h2 className="text-3xl mb-[2.618rem]">Currently Listening To</h2>
    <div className="grid sm:grid-cols-2 gap-[2.618rem] max-w-4xl mx-auto">
      {[{ title: "Midnight Marauders", artist: "A Tribe Called Quest" },
        { title: "To Pimp a Butterfly", artist: "Kendrick Lamar" }].map((track, i) => (
        <div key={i} className="bg-white p-6 border rounded-lg shadow font-mono">
          <p className="font-semibold">{track.title}</p>
          <p className="text-sm text-gray-500">{track.artist}</p>
        </div>
      ))}
    </div>
  </section>

  {/* Footer */}
  <footer className="py-[4.236rem] bg-black text-white text-center">
    <div className="flex justify-center space-x-[2.618rem] text-2xl mb-[1.618rem]">
      {["linkedin", "github"].map((icon, i) => (
        <a key={i} href="#" className="hover:text-[#90caf9]"><i className={`fab fa-${icon}`}></i></a>
      ))}
    </div>
    <button
      onClick={() => setShowModal(true)}
      className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 font-semibold font-mono"
    >
      <i className="fas fa-envelope mr-2"></i> Contact Me
    </button>
  </footer>

  {/* Modal */}
  {showModal && (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative scale-95 transition-transform duration-300 ease-out">
        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black" aria-label="Close modal">&times;</button>
        <h2 id="contact-title" className="text-2xl mb-4">Contact Me</h2>
        <form className="space-y-[1.618rem] font-mono">
          <input type="text" placeholder="Your Name" className="w-full border p-2 rounded" />
          <input type="email" placeholder="Your Email" className="w-full border p-2 rounded" />
          <textarea placeholder="Your Message" className="w-full border p-2 rounded h-24"></textarea>
          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Send</button>
        </form>
      </div>
    </div>
  )}
</main>
    </>
  );
}
