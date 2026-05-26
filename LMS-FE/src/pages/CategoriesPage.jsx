import { useEffect, useState } from 'react';
import { Plus, Search, Tag, Trash2, X, Layers, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { categoryService } from '../services/categoryService';
import Loader from '../components/Common/Loader';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('Please enter category name');
      return;
    }
    try {
      await categoryService.addCategory({ name: newCategoryName });
      toast.success('Category added successfully!');
      fetchCategories();
      setIsAddModalOpen(false);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await categoryService.deleteCategory(deleteId);
      toast.success('Category deleted successfully!');
      fetchCategories();
      setShowDeleteDialog(false);
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Colorful gradient themes for category cards
  const cardGradients = [
    { from: 'from-purple-500', to: 'to-pink-500', bg: 'from-purple-50 to-pink-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { from: 'from-blue-500', to: 'to-cyan-500', bg: 'from-blue-50 to-cyan-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { from: 'from-green-500', to: 'to-emerald-500', bg: 'from-green-50 to-emerald-50', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    { from: 'from-orange-500', to: 'to-red-500', bg: 'from-orange-50 to-red-50', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
    { from: 'from-indigo-500', to: 'to-purple-500', bg: 'from-indigo-50 to-purple-50', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
    { from: 'from-rose-500', to: 'to-pink-500', bg: 'from-rose-50 to-pink-50', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
    { from: 'from-teal-500', to: 'to-green-500', bg: 'from-teal-50 to-green-50', iconBg: 'bg-teal-100', iconColor: 'text-teal-600' },
    { from: 'from-yellow-500', to: 'to-orange-500', bg: 'from-yellow-50 to-orange-50', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  ];

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Categories
          </h1>
          <p className="text-gray-500 mt-1">Organize your library with custom categories and genres</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>New Category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search categories by name..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats Summary */}
      {categories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
                <p className="text-sm text-gray-500">Total Categories</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {categories.reduce((sum, cat) => sum + (cat.book?.length || 0), 0)}
                </p>
                <p className="text-sm text-gray-500">Total Books</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {categories.length > 0 ? Math.round(categories.reduce((sum, cat) => sum + (cat.book?.length || 0), 0) / categories.length) : 0}
                </p>
                <p className="text-sm text-gray-500">Avg Books/Category</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <Tag className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No categories found</h3>
          <p className="text-gray-400">Try adjusting your search or add a new category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category, index) => {
            const gradient = cardGradients[index % cardGradients.length];
            const bookCount = category.book?.length || 0;
            
            return (
              <div
                key={category.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Gradient Header */}
                <div className={`relative bg-gradient-to-r ${gradient.from} ${gradient.to} p-5`}>
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => {
                        setDeleteId(category.id);
                        setShowDeleteDialog(true);
                      }}
                      className="text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Tag className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white line-clamp-1">{category.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <BookOpen className="w-3 h-3 text-white/80" />
                        <span className="text-xs text-white/80">{bookCount} book{bookCount !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className={`${gradient.bg} rounded-xl p-3 mb-4 bg-gradient-to-r`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 ${gradient.iconBg} rounded-lg flex items-center justify-center`}>
                          <Tag className={`w-3 h-3 ${gradient.iconColor}`} />
                        </div>
                        <span className="text-xs text-gray-500">Category ID</span>
                      </div>
                      <span className="text-sm font-mono font-semibold text-gray-700">#{category.id}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-400">Active</span>
                    </div>
                    <button
                      onClick={() => {
                        setDeleteId(category.id);
                        setShowDeleteDialog(true);
                      }}
                      className="text-xs text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Category Modal - Beautiful Design */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 px-6 py-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Tag className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Add New Category</h2>
                    <p className="text-white/70 text-xs mt-0.5">Create a new genre or category</p>
                  </div>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Form */}
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
                <div className="relative group">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="e.g., Fiction, Science, History..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Choose a descriptive name for your category
                </p>
              </div>
              
              {/* Preview Section */}
              {newCategoryName.trim() && (
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-2">Preview</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Tag className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-800">{newCategoryName}</span>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="flex-1 px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setDeleteId(null);
        }}
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone. Books in this category will lose this category association."
      />
    </div>
  );
}