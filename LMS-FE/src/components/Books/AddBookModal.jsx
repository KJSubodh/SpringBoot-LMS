import { useState, useEffect } from 'react';
import { X, Upload, Book, User, Tag, DollarSign } from 'lucide-react';
import { authorService } from '../../services/authorService';
import { categoryService } from '../../services/categoryService';

export default function AddBookModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    author: { id: '' },
    category: []
  });
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAuthorsAndCategories();
    }
  }, [isOpen]);

  const fetchAuthorsAndCategories = async () => {
    try {
      const [authorsRes, categoriesRes] = await Promise.all([
        authorService.getAllAuthors(),
        categoryService.getAllCategories()
      ]);
      setAuthors(authorsRes || []);
      setCategories(categoriesRes || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const bookData = {
      name: formData.name,
      price: parseFloat(formData.price),
      author: { id: parseInt(formData.author.id) },
      category: formData.category.map(id => ({ id: parseInt(id) }))
    };
    
    await onAdd(bookData);
    setLoading(false);
    onClose();
    setFormData({ name: '', price: '', author: { id: '' }, category: [] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Add New Book</h2>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Book Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Book Title</label>
            <div className="relative">
              <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                placeholder="Enter book title"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>
          
          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                required
                step="0.01"
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>
          
          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none bg-white"
                value={formData.author.id}
                onChange={(e) => setFormData({ ...formData, author: { id: e.target.value } })}
              >
                <option value="">Select Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Categories</label>
            <div className="relative">
              <Tag className="absolute left-3 top-4 w-4 h-4 text-gray-400 z-10" />
              <select
                multiple
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                value={formData.category}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData({ ...formData, category: values });
                }}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-400 mt-2">Hold Ctrl/Cmd to select multiple categories</p>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md disabled:opacity-50">
              {loading ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}