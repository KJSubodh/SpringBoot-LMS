import { User, Mail, Phone, BookOpen, MoreVertical, Award, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function UserCard({ user, onViewDetails, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const borrowedCount = user.book?.length || 0;

  const gradients = [
    'from-blue-500 to-indigo-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-teal-500 to-cyan-500',
    'from-rose-500 to-pink-500',
  ];
  const gradient = gradients[(user.id || 0) % gradients.length];

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Gradient Header */}
      <div className={`relative bg-gradient-to-r ${gradient} p-5`}>
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-white/80 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg py-1 z-10 overflow-hidden">
                <button
                  onClick={() => {
                    onViewDetails(user);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <User className="w-3 h-3" />
                  View Details
                </button>
                <button
                  onClick={() => {
                    onDelete(user.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  Delete Member
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <User className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white line-clamp-1">{user.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Award className="w-3 h-3 text-white/80" />
              <span className="text-xs text-white/80">Member since 2024</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {user.profile && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
                <Mail className="w-3 h-3 text-blue-500" />
              </div>
              <span className="truncate flex-1">{user.profile.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <div className="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center">
                <Phone className="w-3 h-3 text-green-500" />
              </div>
              <span>{user.profile.phone}</span>
            </div>
          </div>
        )}
        
        {/* Borrowed Books Badge */}
        <div className={`flex items-center justify-between p-2 rounded-xl mb-3 ${borrowedCount > 0 ? 'bg-yellow-50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2">
            <BookOpen className={`w-4 h-4 ${borrowedCount > 0 ? 'text-yellow-600' : 'text-gray-400'}`} />
            <span className={`text-xs font-medium ${borrowedCount > 0 ? 'text-yellow-700' : 'text-gray-500'}`}>
              {borrowedCount} Book{borrowedCount !== 1 ? 's' : ''} Borrowed
            </span>
          </div>
          {borrowedCount > 0 && (
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
          )}
        </div>
        
        <button
          onClick={() => onViewDetails(user)}
          className="w-full py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl font-medium text-sm transition-all duration-300 hover:from-gray-100 hover:to-gray-200 group-hover:shadow-md"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}