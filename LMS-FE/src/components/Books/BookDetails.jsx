import { X, User, Tag, DollarSign, BookOpen, Calendar, CheckCircle, XCircle, Mail, Phone } from 'lucide-react';

export default function BookDetails({ book, onClose }) {
  const isBorrowed = book.user !== null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
        {/* Header with Gradient */}
        <div className="relative h-32 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="p-6 -mt-12">
          {/* Book Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4 border-4 border-white">
            <BookOpen className="w-10 h-10 text-purple-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.name}</h2>
          
          {/* Status Badge */}
          <div className="mb-6">
            {isBorrowed ? (
              <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                <XCircle className="w-4 h-4" />
                Currently Borrowed
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Available for Borrowing
              </span>
            )}
          </div>
          
          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Price</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">₹{book.price}</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <User className="w-4 h-4" />
                <span>Author</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{book.author?.name || 'Unknown'}</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Tag className="w-4 h-4" />
                <span>Categories</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {book.category?.map((cat, idx) => (
                  <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Borrower Info (if borrowed) */}
          {isBorrowed && book.user && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Borrower Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{book.user.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{book.user.profile?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{book.user.profile?.phone}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
            >
              Close
            </button>
            {isBorrowed ? (
              <button className="flex-1 px-6 py-3 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md">
                Return Book
              </button>
            ) : (
              <button className="flex-1 px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md">
                Borrow Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}