import api from './api';

export const bookService = {
  // Get all books - returns array directly
  getAllBooks: async () => {
    const books = await api.get('/books');
    return books; // Already the array, not { data: books }
  },

  // Get book by ID
  getBookById: async (id) => {
    const book = await api.get(`/books/${id}`);
    return book;
  },

  // Add new book - FIXED: changed from GET to POST
  addBook: async (bookData) => {
    const newBook = await api.post('/books', bookData);
    return newBook;
  },

  // Update book
  updateBook: async (id, bookData) => {
    const updatedBook = await api.put(`/books/${id}`, bookData);
    return updatedBook;
  },

  // Borrow book
  borrowBook: async (bookId, userId) => {
    const borrowedBook = await api.put(`/books/${bookId}/borrow/${userId}`);
    return borrowedBook;
  },

  // Return book
  returnBook: async (bookId) => {
    const returnedBook = await api.put(`/books/${bookId}/return`);
    return returnedBook;
  },

  // Update book categories
  updateCategories: async (bookId, categories) => {
    const updatedBook = await api.put(`/books/${bookId}/categories`, categories);
    return updatedBook;
  },
};