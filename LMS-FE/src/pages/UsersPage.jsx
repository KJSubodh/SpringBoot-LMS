import { useEffect, useState } from 'react';
import { Plus, Search, Users, UserPlus, TrendingUp, Mail, Phone, BookOpen, Calendar } from 'lucide-react';
import { userService } from '../services/userService';
import UserCard from '../components/Users/UserCard';
import AddUserModal from '../components/Users/AddUserModal';
import Loader from '../components/Common/Loader';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import toast from 'react-hot-toast';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      await userService.createUser(userData);
      toast.success('User added successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await userService.deleteUser(selectedUserId);
      toast.success('User deleted successfully!');
      fetchUsers();
      setShowDeleteDialog(false);
      setSelectedUserId(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const totalBooksBorrowed = users.reduce((sum, user) => sum + (user.book?.length || 0), 0);
  const activeUsers = users.filter(user => (user.book?.length || 0) > 0).length;

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profile?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Library Members
          </h1>
          <p className="text-gray-500 mt-1">Manage your library members and their borrowing activity</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search members by name or email..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats Summary */}
      {users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                <p className="text-sm text-gray-500">Total Members</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{activeUsers}</p>
                <p className="text-sm text-gray-500">Active Borrowers</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{totalBooksBorrowed}</p>
                <p className="text-sm text-gray-500">Books Borrowed</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Grid */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No members found</h3>
          <p className="text-gray-400">Try adjusting your search or add a new member.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onViewDetails={setSelectedUser}
              onDelete={(id) => {
                setSelectedUserId(id);
                setShowDeleteDialog(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUser}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedUserId(null);
        }}
        onConfirm={handleDeleteUser}
        title="Delete Member"
        message="Are you sure you want to delete this member? This action cannot be undone. All their borrowing records will also be removed."
      />

      {/* User Details Modal - Beautiful Design */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            {/* Header with Gradient */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 px-6 py-6">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedUser.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white">
                      Member ID: #{selectedUser.id}
                    </span>
                    <span className="px-2 py-0.5 bg-green-500/30 rounded-full text-xs text-white">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Email Address</p>
                      <p className="text-sm font-medium text-gray-700">{selectedUser.profile?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Phone Number</p>
                      <p className="text-sm font-medium text-gray-700">{selectedUser.profile?.phone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Borrowing Statistics */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Borrowing Activity</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                    <BookOpen className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{selectedUser.book?.length || 0}</p>
                    <p className="text-xs text-gray-500">Books Currently Borrowed</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 text-center">
                    <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">0</p>
                    <p className="text-xs text-gray-500">Books Returned</p>
                  </div>
                </div>
              </div>

              {/* Currently Borrowed Books */}
              {selectedUser.book && selectedUser.book.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Currently Borrowed Books</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedUser.book.map((book, idx) => (
                      <div
                        key={book.id}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-yellow-200 rounded-lg flex items-center justify-center text-xs font-bold text-yellow-700">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{book.name}</p>
                            <p className="text-xs text-gray-500">Price: ₹{book.price}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full">
                          Borrowed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Books Message */}
              {(!selectedUser.book || selectedUser.book.length === 0) && (
                <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400">No books currently borrowed</p>
                  <p className="text-xs text-gray-300 mt-1">This member hasn't borrowed any books yet</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    // Navigate to borrow page with this user pre-selected
                  }}
                  className="flex-1 px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
                >
                  Lend a Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}