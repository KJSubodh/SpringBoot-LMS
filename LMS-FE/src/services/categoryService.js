import api from './api';

export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    const categories = await api.get('/categories');
    return categories;
  },

  // Get category by ID
  getCategoryById: async (id) => {
    const category = await api.get(`/categories/${id}`);
    return category;
  },

  // Create category
  addCategory: async (categoryData) => {
    const newCategory = await api.post('/categories', categoryData);
    return newCategory;
  },

  // Delete category
  deleteCategory: async (id) => {
    const result = await api.delete(`/categories/${id}`);
    return result;
  },
};