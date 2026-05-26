import { useEffect, useState } from 'react';
import { Plus, Search, X, BookOpen, Users } from 'lucide-react';
import { bookService } from '../services/bookService';
import { userService } from '../services/userService';
import BookList from '../components/Books/BookList';
import AddBookModal from '../components/Books/AddBookModal';
import Loader from '../components/Common/Loader';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import toast from 'react-hot-toast';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [borrowUserId, setBorrowUserId] = useState(null);
  const [showBorrowDialog, setShowBorrowDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const booksData = await bookService.getAllBooks();
      const usersData = await userService.getAllUsers();
      setBooks(booksData || []);
      setUsers(usersData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (bookData) => {
    try {
      await bookService.addBook(bookData);
      toast.success('Book added successfully!');
      fetchData();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('Failed to add book');
    }
  };

  const handleBorrow = (bookId) => {
    setSelectedBookId(bookId);
    setShowBorrowDialog(true);
  };

  const handleConfirmBorrow = async () => {
    if (!borrowUserId) {
      toast.error('Please select a user');
      return;
    }
    try {
      await bookService.borrowBook(selectedBookId, borrowUserId);
      toast.success('Book borrowed successfully!');
      fetchData();
      setShowBorrowDialog(false);
      setSelectedBookId(null);
      setBorrowUserId(null);
    } catch (error) {
      console.error('Error borrowing book:', error);
      toast.error('Failed to borrow book');
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await bookService.returnBook(bookId);
      toast.success('Book returned successfully!');
      fetchData();
    } catch (error) {
      console.error('Error returning book:', error);
      toast.error('Failed to return book');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'available') {
      return matchesSearch && book.user === null;
    }
    if (filterStatus === 'borrowed') {
      return matchesSearch && book.user !== null;
    }
    return matchesSearch;
  });

  const stats = {
    total: books.length,
    available: books.filter(b => b.user === null).length,
    borrowed: books.filter(b => b.user !== null).length,
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Book Collection
          </h1>
          <p className="text-gray-500 mt-1">Manage your library's book inventory</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Book</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search books by title or author..."
          className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Books</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.available}</p>
              <p className="text-sm text-gray-500">Available</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">{stats.borrowed}</p>
              <p className="text-sm text-gray-500">Borrowed</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            filterStatus === 'all'
              ? 'bg-purple-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Books
        </button>
        <button
          onClick={() => setFilterStatus('available')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            filterStatus === 'available'
              ? 'bg-green-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Available
        </button>
        <button
          onClick={() => setFilterStatus('borrowed')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            filterStatus === 'borrowed'
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Borrowed
        </button>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Showing {filteredBooks.length} of {books.length} books
        </p>
        {searchTerm && (
          <p className="text-sm text-purple-600">
            Searching for: "{searchTerm}"
          </p>
        )}
      </div>

      {/* Book List */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
          <p className="text-gray-400">
            {searchTerm
              ? `No results matching "${searchTerm}"`
              : 'Try adjusting your search or add a new book.'}
          </p>
        </div>
      ) : (
        <BookList
          books={filteredBooks}
          onBorrow={handleBorrow}
          onReturn={handleReturn}
        />
      )}

      {/* Add Book Modal */}
      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBook}
      />

      {/* Borrow Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showBorrowDialog}
        onClose={() => {
          setShowBorrowDialog(false);
          setSelectedBookId(null);
          setBorrowUserId(null);
        }}
        onConfirm={handleConfirmBorrow}
        title="Borrow Book"
        message={
          <div className="space-y-3">
            <p className="text-gray-600">Select a member to borrow this book:</p>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
              value={borrowUserId || ''}
              onChange={(e) => setBorrowUserId(parseInt(e.target.value))}
            >
              <option value="">Select a member...</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.profile?.email}
                </option>
              ))}
            </select>
          </div>
        }
      />
    </div>
  );
}