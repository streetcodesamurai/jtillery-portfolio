'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion, AnimatePresence } from "framer-motion";
import BookList from '@/components/BookList';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formMessage, setFormMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [album, setAlbum] = useState(null);

useEffect(() => {
  const albumId = "4yv17Q486G8QoqM001kFKO"; // Change to any Spotify album ID
  fetch(`/api/spotify-album/${albumId}`)
    .then(res => res.json())
    .then(setAlbum);
}, []);

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
        <title>Jay Tillery — Helping brands grow with Shopify, Squarespace & WordPress — Full-Stack Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
  <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="font-mono bg-gray-50 text-gray-900">
  {/* Header */}
  <header className="bg-black text-white pt-[4.236rem] pb-[2.618rem] text-center">
    <div className="flex flex-col items-center">
      <img src="/jtillery-logo.svg" alt="Logo" className="h-40 mb-[1.618rem]" />
      <h1 className="text-xl tracking-tight opacity-90 mb-[1rem] max-w-screen-sm" aria-label="Jay Tillery — Full-stack Developer">
        Full-stack solutions, zero-stack drama — just good code and great vibes.
      </h1>
      <button
    onClick={() => setShowModal(true)}
    className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 font-semibold font-mono transition-colors duration-200"
    aria-label="Open contact form"
    >
      <i className="fas fa-envelope mr-2"></i> Contact Me
    </button>
    </div>
  </header>

  {/* Bio Section */}
  <section className="bg-[#e3f2fd] py-[6.854rem] text-gray-900 text-center font-mono">
    <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
    <div className="relative w-32 h-32 mb-6 perspective">
      <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180">
        <img
          src="/tillzsquare.jpg"
          alt="Jay Tillery"
          className="absolute w-full h-full rounded-full object-cover shadow-lg border-4 border-white backface-hidden"
        />
        <div className="absolute w-full h-full rounded-full bg-[#1a237e] text-white flex items-center justify-center text-sm font-semibold rotate-y-180 backface-hidden">
          <span>Hello 👋</span>
        </div>
      </div>
    </div>
      <h2 className="text-3xl mb-[1.618rem] text-[#4b3b1f]">A Little About Me</h2>
      <p className="text-lg leading-relaxed text-[#3e2d14]">
        I'm Jay Tillery — a full-stack developer blending modern tech with old-school craftsmanship. From Shopify storefronts to custom WordPress builds, I help brands build fast, beautiful, and functional digital experiences. I believe in clean code, clean design, and creating tools that make people's lives easier (and cooler).
      </p>
      <p className="mt-6 text-base text-[#5f5441] italic">
        When I'm not coding, you'll find me spinning records, curating books, or mastering the art of Brazilian Jiu-jitsu.
      </p>
    </div>
  </section>

  {/* Skills Section */}
  <section className="bg-[#f5f5f5] text-center py-[6.854rem]">
    <div className="max-w-screen-md mx-auto px-4">
      <h2 className="text-3xl mb-[2.618rem] text-gray-800">Skills & Technologies</h2>
      <div id="skillsGrid" className="flex flex-wrap justify-center gap-4 text-sm font-mono opacity-0">
        {[
          "HTML", "CSS", "JavaScript", "React", "Tailwind CSS",
          "Node.js", "MongoDB", "Git", "WordPress",
          "Shopify", "Squarespace", "NextJS", "Bootstrap", "PHP", "mySQL", "Agile"
        ].map((skill) => (
          <span key={skill} className="bg-white text-black px-4 py-2 rounded shadow">{skill}</span>
        ))}
      </div>
    </div>
  </section>

  {/* Testimonials */}
  <section className="bg-[#e0f7fa] py-[6.854rem] text-center text-gray-800">
    <h2 className="text-3xl mb-[2.618rem]">The Word on the Street is...</h2>
    <div className="relative h-48">
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
  <BookList />

  {/* Listening To */}
  <section className="bg-[#ede7f6] py-[6.854rem] text-center text-gray-800">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl mb-[2.618rem]">Currently Listening To</h2>
    {album ? (
      <a
        href={album.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transform transition duration-500 hover:scale-105"
      >
        <div className="bg-white p-6 border rounded-lg shadow font-mono inline-block max-w-xs mx-auto">
          <img
            src={album.image}
            alt={album.title}
            className="w-48 h-48 mx-auto mb-4 rounded shadow-md animate-pulse"
          />
          <p className="font-semibold">{album.title}</p>
          <p className="text-sm text-gray-500">{album.artists}</p>
          <span className="text-xs text-purple-500 underline inline-block mt-2">
            Listen on Spotify
          </span>
        </div>
      </a>
    ) : (
      <p className="text-base text-gray-600">Loading album…</p>
    )}
  </div>
</section>

  {/* Footer */}
  <footer className="py-[4.236rem] bg-black text-white text-center">
  {/* Social Icons */}
  <div className="flex justify-center items-center space-x-[2.618rem] text-2xl mb-[1.618rem]">
    {[
      {
        name: "LinkedIn",
        icon: "linkedin",
        url: "https://www.linkedin.com/in/jaytillery"
      },
      {
        name: "GitHub",
        icon: "github",
        url: "https://github.com/streetcodesamurai"
      },
      {
        name: "Dribbble",
        icon: "dribbble",
        url: "https://dribbble.com/tillz"
      },
      {
        name: "YouTube",
        icon: "youtube",
        url: "https://www.youtube.com/@jay-tillery"
      }
    ].map((item, i) => (
      <a
        key={i}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.name}
        className="hover:text-[#90caf9] transition-colors duration-200"
      >
        <i className={`fab fa-${item.icon}`}></i>
      </a>
    ))}
  </div>

  {/* Contact Button */}
  <button
    onClick={() => setShowModal(true)}
    className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 font-semibold font-mono transition-colors duration-200"
    aria-label="Open contact form"
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
        <form
  className="space-y-[1.618rem] font-mono"
  onSubmit={async (e) => {
    e.preventDefault();
  
    const honeypot = e.target.botcheck?.value;
    if (honeypot !== "") return;
  
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };
  
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
  
    if (res.ok) {
      setMessageType("success");
      setFormMessage("Thanks! Your message was sent. I'll get back to you shortly.");
      e.target.reset();
    } else {
      setMessageType("error");
      setFormMessage("Oops! Something went wrong. Please try again.");
    }
  
    setTimeout(() => {
      setFormMessage(null);
      setMessageType(null);
    }, 4000);
  }}
>
<input
  type="text"
  name="botcheck"
  className="hidden"
  autoComplete="off"
  tabIndex="-1"
/>
  <input name="name" type="text" placeholder="Your Name" required className="w-full border p-2 rounded" />
  <input name="email" type="email" placeholder="Your Email" required className="w-full border p-2 rounded" />
  <textarea name="message" placeholder="Your Message" required className="w-full border p-2 rounded h-24"></textarea>
  <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Send</button>
  <AnimatePresence mode="wait">
  {formMessage && (
    <motion.div
      key={messageType}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium shadow-sm
        ${messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
      `}
    >
      <i className={`fas ${messageType === "success" ? "fa-check-circle" : "fa-exclamation-circle"}`}></i>
      <span>{formMessage}</span>
    </motion.div>
  )}
</AnimatePresence>
</form>
      </div>
    </div>
  )}
</main>
    </>
  );
}
