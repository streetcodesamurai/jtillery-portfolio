'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Head>
        <title>Your Name — Web Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <main className="font-mono bg-gray-50 text-gray-900">
        <header className="bg-black text-white py-20 text-center">
          <div className="flex flex-col items-center">
            <img src="/jtillery-logo.svg" alt="Logo" className="w48 h-48 mb-4" />
            <p className="text-xl tracking-tight opacity-90 mb-4">Full-stack solutions, zero-stack drama — just good code and great vibes.
</p>
            <a href="/path-to-resume.pdf" download className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 font-semibold font-mono inline-block">
              <i className="fas fa-download mr-2"></i>Download Resume
            </a>
          </div>
        </header>

        <section className="py-24 bg-white text-center">
          <h2 className="text-3xl mb-10">Skills & Technologies</h2>
          <div id="skillsGrid" className="flex flex-wrap justify-center gap-4 text-sm font-mono opacity-0">
            {["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Node.js", "MongoDB", "Git", "WordPress", "Shopify", "Squarespace", "NextJS", "Bootstrap"].map((skill) => (
              <span key={skill} className="bg-gray-100 px-4 py-2 rounded shadow">{skill}</span>
            ))}
          </div>
        </section>

        <section className="py-24 bg-white text-center">
          <h2 className="text-3xl mb-12">What People Say</h2>
          <div className="relative h-48 overflow-hidden">
            <div className="relative w-full h-full">
              {["A brilliant developer with exceptional attention to detail.",
                "Delivered a polished product under a tight deadline. Highly recommended.",
                "One of the most reliable and innovative devs we’ve worked with."].map((quote, i) => (
                <div key={i} className="absolute inset-0 opacity-0 testimonial font-mono text-lg">
                  <blockquote>“{quote}”</blockquote>
                  <p className="mt-4 font-semibold">— {['Jamie L.', 'Casey N.', 'Pat R.'][i]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl mb-8 text-center">My Favorite Books</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-left text-base font-mono">
              {["Clean Code — Robert C. Martin", "Deep Work — Cal Newport", "The Lean Startup — Eric Ries", "Atomic Habits — James Clear"].map((book, i) => (
                <div key={i} className="bg-white p-4 border rounded-lg shadow">{book}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl mb-12">Selected Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-100 rounded-lg p-4 shadow hover:shadow-xl transition">
                <img src="https://via.placeholder.com/400x200" alt="Project" className="mb-4 rounded" />
                <h3 className="text-xl font-bold mb-2">Project Name</h3>
                <p className="text-sm font-mono text-gray-700">A custom web platform for [client or purpose].</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50 text-center">
          <h2 className="text-3xl mb-10">Currently Listening To</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[{ title: "Midnight Marauders", artist: "A Tribe Called Quest" },
              { title: "To Pimp a Butterfly", artist: "Kendrick Lamar" }].map((track, i) => (
              <div key={i} className="bg-white p-4 border rounded-lg shadow font-mono">
                <p className="font-semibold">{track.title}</p>
                <p className="text-sm text-gray-500">{track.artist}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="py-12 bg-black text-white text-center">
          <div className="flex justify-center space-x-6 text-2xl mb-4">
            {["linkedin", "instagram", "spotify", "github"].map((icon, i) => (
              <a key={i} href="#" className={`hover:text-${icon === 'github' ? 'gray' : icon}-400`}><i className={`fab fa-${icon}`}></i></a>
            ))}
          </div>
          <button onClick={() => setShowModal(true)} className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 font-semibold font-mono">
            <i className="fas fa-envelope mr-2"></i> Contact Me
          </button>
        </footer>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
              <h2 className="text-2xl mb-4">Contact Me</h2>
              <form className="space-y-4 font-mono">
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
