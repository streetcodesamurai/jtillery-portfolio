'use client';

import { useEffect, useState } from 'react';

export default function BookList(){
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('/api/books')
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((err) => console.error('Failed to fetch books: ', err));
    }, []);

    console.log('Books: ', books);

    return(
        <section className="bg-gradient-to-b from-[#fff8e1] to-[#fff3c4] py-[6.854rem]">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-900">
            <h2 className="text-3xl mb-[2.618rem] text-gray-800">My Favorite Books</h2>
            <div className="grid sm:grid-cols-2 gap-8 text-left">
            {books.map((book) => (
                <div
                key={book._id}
                className="bg-white/90 backdrop-blur-sm border border-[#e0cfa9] rounded-xl shadow-lg p-6 flex gap-6 hover:shadow-2xl transition-shadow duration-300"
                >
                <img
                    src={book.cover}
                    alt={book.title}
                    className="w-24 h-36 object-cover rounded-lg border border-[#e9e3d7] shadow-inner"
                />
                <div className="flex flex-col justify-between">
                    <div>
                    <h3 className="text-2xl font-serif text-[#3e2d14] mt-1">{book.title}</h3>

                    <p className="text-sm text-[#7a6d57] mt-1 italic">{book.author}</p>

                    {book.description && (
                        <p className="mt-3 text-sm text-gray-700 line-clamp-4 leading-relaxed">
                        {book.description}
                        </p>
                    )}
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}