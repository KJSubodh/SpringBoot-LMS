import { useEffect, useState } from 'react';
import { BookOpen, Users, UserSquare, Tag, TrendingUp, BookMarked, ArrowRight, Clock } from 'lucide-react';
import { bookService } from '../services/bookService';
import { userService } from '../services/userService';
import { authorService } from '../services/authorService';
import { categoryService } from '../services/categoryService';
import Loader from '../components/Common/Loader';

import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    books: 0,
    users: 0,
    authors: 0,
    categories: 0,
    borrowed: 0,
    available: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const books = await bookService.getAllBooks();
      const users = await userService.getAllUsers();
      const authors = await authorService.getAllAuthors();
      const categories = await categoryService.getAllCategories();
      
      const borrowed = books.filter(book => book.user !== null).length;
      const available = books.length - borrowed;
      
      setStats({
        books: books?.length || 0,
        users: users?.length || 0,
        authors: authors?.length || 0,
        categories: categories?.length || 0,
        borrowed,
        available
      });
      
      setRecentBooks(books?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const statCards = [
    { title: 'Total Books', value: stats.books, icon: BookOpen, color: 'from-purple-500 to-pink-500', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { title: 'Available Books', value: stats.available, icon: BookMarked, color: 'from-green-500 to-emerald-500', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    { title: 'Borrowed Books', value: stats.borrowed, icon: BookOpen, color: 'from-orange-500 to-red-500', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
    { title: 'Total Users', value: stats.users, icon: Users, color: 'from-blue-500 to-cyan-500', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { title: 'Total Authors', value: stats.authors, icon: UserSquare, color: 'from-indigo-500 to-purple-500', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
    { title: 'Categories', value: stats.categories, icon: Tag, color: 'from-rose-500 to-pink-500', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-white/80">Here's what's happening with your library today.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.iconBg} rounded-xl p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-gray-300" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>
      
      {/* Recent Books Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-800">Recently Added Books</h2>
          </div>
          <Link to="/books" className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="p-6">
          {recentBooks.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">No books found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBooks.map((book, idx) => (
                <div key={book.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{book.name}</p>
                      <p className="text-sm text-gray-500">By {book.author?.name || 'Unknown'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">₹{book.price}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.user ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {book.user ? 'Borrowed' : 'Available'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}