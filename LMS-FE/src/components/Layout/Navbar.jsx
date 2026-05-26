import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, UserSquare, Tag, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Sidebar from './Sidebar';

export const navItems = [
  { path: '/', name: 'Dashboard', icon: Home },
  { path: '/books', name: 'Books', icon: BookOpen },
  { path: '/users', name: 'Users', icon: Users },
  { path: '/authors', name: 'Authors', icon: UserSquare },
  { path: '/categories', name: 'Categories', icon: Tag },
];

export default function Navbar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when route changes (mobile)
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-200 shadow-xl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
              <div className="bg-indigo-600 p-1.5 md:p-2 rounded-lg group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <span className="font-bold text-lg md:text-xl tracking-tight text-white">
                LMS <span className="text-indigo-400">Pro</span>
              </span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                      transition-all duration-200 ease-in-out
                      ${isActive 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Status Indicator */}
            <div className="hidden md:flex items-center border-l border-slate-800 ml-4 pl-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-2"></div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Online</span>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onLinkClick={handleLinkClick} />
    </>
  );
}