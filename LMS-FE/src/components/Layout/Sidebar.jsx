import { Link, useLocation } from 'react-router-dom';
import { X, BookOpen, Home, Users, UserSquare, Tag } from 'lucide-react';

const navItems = [
  { path: '/', name: 'Dashboard', icon: Home },
  { path: '/books', name: 'Books', icon: BookOpen },
  { path: '/users', name: 'Users', icon: Users },
  { path: '/authors', name: 'Authors', icon: UserSquare },
  { path: '/categories', name: 'Categories', icon: Tag },
];

export default function Sidebar({ isOpen, setIsOpen, onLinkClick }) {
  const location = useLocation();

  const handleLinkClick = () => {
    if (onLinkClick) onLinkClick();
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={handleLinkClick}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 bottom-0 z-[70] w-72 bg-slate-900 border-r border-slate-800 
        transform transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-1.5 rounded-md">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">LMS Pro</span>
            </div>
            <button 
              onClick={handleLinkClick} 
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-base
                    transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}