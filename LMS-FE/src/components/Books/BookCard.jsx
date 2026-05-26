import { BookOpen, User, Tag, Calendar, Star, Heart } from 'lucide-react';
import { useState } from 'react';

export default function BookCard({ book, onBorrow, onReturn, onViewDetails }) {
  const isBorrowed = book.user !== null;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Header */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
      
      {/* Book Cover Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <BookOpen className="w-16 h-16 text-white/20 group-hover:text-white/30 transition-all duration-300" />
        {isBorrowed && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            BORROWED
          </div>
        )}
        {!isBorrowed && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            AVAILABLE
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{book.name}</h3>
        
        {/* Price */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-purple-600">₹{book.price}</span>
          <span className="text-gray-400 text-sm ml-1">INR</span>
        </div>
        
        {/* Author */}
        {book.author && (
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <User className="w-4 h-4 text-purple-500" />
            <span className="truncate">{book.author.name}</span>
          </div>
        )}
        
        {/* Categories */}
        {book.category && book.category.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {book.category.slice(0, 2).map((cat, idx) => (
              <span key={idx} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                {cat.name}
              </span>
            ))}
            {book.category.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{book.category.length - 2}
              </span>
            )}
          </div>
        )}
        
        {/* Borrowed Info */}
        {isBorrowed && book.user && (
          <div className="bg-yellow-50 rounded-lg p-2 mb-4">
            <p className="text-xs text-yellow-700 truncate">
              <span className="font-semibold">Borrowed by:</span> {book.user.name}
            </p>
          </div>
        )}
        
        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onViewDetails(book)}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200"
          >
            Details
          </button>
          {isBorrowed ? (
            <button
              onClick={() => onReturn(book.id)}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Return
            </button>
          ) : (
            <button
              onClick={() => onBorrow(book.id)}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Borrow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}