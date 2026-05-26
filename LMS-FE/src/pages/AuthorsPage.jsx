import { useEffect, useState } from 'react';
import { Plus, Search, UserSquare, BookOpen, X, Mail, Calendar, Award, TrendingUp } from 'lucide-react';
import { authorService } from '../services/authorService';
import Loader from '../components/Common/Loader';
import toast from 'react-hot-toast';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await authorService.getAllAuthors();
      setAuthors(response || []);
    } catch (error) {
      console.error('Error fetching authors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAuthor = async () => {
    if (!newAuthorName.trim()) {
      toast.error('Please enter author name');
      return;
    }
    try {
      await authorService.addAuthor({ name: newAuthorName });
      toast.success('Author added successfully!');
      fetchAuthors();
      setIsAddModalOpen(false);
      setNewAuthorName('');
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  const handleViewBooks = async (author) => {
    try {
      const response = await authorService.getAuthorBooks(author.id);
      setAuthorBooks(response || []);
      setSelectedAuthor(author);
    } catch (error) {
      console.error('Error fetching author books:', error);
    }
  };

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Authors
          </h1>
          <p className="text-gray-500 mt-1">Manage your library's authors and their works</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Author</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search authors by name..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats Summary */}
      {authors.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <UserSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{authors.length}</p>
                <p className="text-sm text-gray-500">Total Authors</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {authors.reduce((sum, author) => sum + (author.book?.length || 0), 0)}
                </p>
                <p className="text-sm text-gray-500">Total Books</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Authors Grid */}
      {filteredAuthors.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <UserSquare className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No authors found</h3>
          <p className="text-gray-400">Try adjusting your search or add a new author.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAuthors.map((author, index) => {
            const bookCount = author.book?.length || 0;
            const gradients = [
              'from-indigo-500 to-purple-500',
              'from-pink-500 to-rose-500',
              'from-green-500 to-emerald-500',
              'from-blue-500 to-cyan-500',
              'from-orange-500 to-red-500',
              'from-teal-500 to-green-500',
            ];
            const gradient = gradients[index % gradients.length];
            
            return (
              <div
                key={author.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Gradient Header */}
                <div className={`relative bg-gradient-to-r ${gradient} p-5`}>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <UserSquare className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white line-clamp-1">{author.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <BookOpen className="w-3 h-3 text-white/80" />
                        <span className="text-xs text-white/80">{bookCount} book{bookCount !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Award className="w-4 h-4" />
                    <span>Author ID: #{author.id}</span>
                  </div>
                  
                  <button
                    onClick={() => handleViewBooks(author)}
                    className="w-full py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:from-gray-100 hover:to-gray-200 group-hover:shadow-md"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>View {bookCount} Book{bookCount !== 1 ? 's' : ''}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Author Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <UserSquare className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Add New Author</h2>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Author Name</label>
                <div className="relative">
                  <UserSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter author name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    value={newAuthorName}
                    onChange={(e) => setNewAuthorName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAuthor()}
                    autoFocus
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAuthor}
                  className="flex-1 px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md"
                >
                  Add Author
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Author Books Modal */}
      {selectedAuthor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Books by {selectedAuthor.name}</h2>
                  <p className="text-white/80 text-sm mt-1">{authorBooks.length} books found</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedAuthor(null);
                    setAuthorBooks([]);
                  }}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 max-h-[500px] overflow-y-auto">
              {authorBooks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No books found for this author</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {authorBooks.map((book, idx) => (
                    <div
                      key={book.id}
                      className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{book.name}</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {book.category?.slice(0, 2).map((cat, i) => (
                              <span key={i} className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                                {cat.name}
                              </span>
                            ))}
                            {book.category?.length > 2 && (
                              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                +{book.category.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-purple-600">₹{book.price}</p>
                        <p className={`text-xs ${book.user ? 'text-yellow-600' : 'text-green-600'}`}>
                          {book.user ? 'Borrowed' : 'Available'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>Total {authorBooks.length} book{authorBooks.length !== 1 ? 's' : ''}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedAuthor(null);
                    setAuthorBooks([]);
                  }}
                  className="px-6 py-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}