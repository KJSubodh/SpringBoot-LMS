import api from './api';

export const authorService = {
  getAllAuthors: async () => {
    return await api.get('/authors');
  },

  getAuthorById: async (id) => {
    return await api.get(`/authors/${id}`);
  },

  addAuthor: async (authorData) => {
    return await api.post('/authors', authorData);
  },

  getAuthorBooks: async (id) => {
    return await api.get(`/books/author/${id}`);
  },
};