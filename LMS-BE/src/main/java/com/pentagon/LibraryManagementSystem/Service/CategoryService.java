package com.pentagon.LibraryManagementSystem.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pentagon.LibraryManagementSystem.DAO.CategoryDAO;
import com.pentagon.LibraryManagementSystem.DTO.ResponseStructure;
import com.pentagon.LibraryManagementSystem.Entity.Category;

@Service
public class CategoryService {

    @Autowired
    private CategoryDAO categoryDAO;
    
    public ResponseEntity<ResponseStructure<Category>> addCategory(Category c) {
        Category category = categoryDAO.addCategory(c);
        
        ResponseStructure<Category> response = ResponseStructure.created("Category added successfully", category);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    public ResponseEntity<ResponseStructure<List<Category>>> getAllCategories() {
        List<Category> categories = categoryDAO.getAllCategories();
        
        ResponseStructure<List<Category>> response = ResponseStructure.success("Categories fetched successfully", categories);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    public ResponseEntity<ResponseStructure<Category>> getCategoryById(int id) {
        Category category = categoryDAO.getById(id);
        
        if (category != null) {
            ResponseStructure<Category> response = ResponseStructure.success("Category found", category);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<Category> response = ResponseStructure.notFound("Category not found with ID: " + id);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    
    public ResponseEntity<ResponseStructure<String>> deleteCategory(int id) {
        String result = categoryDAO.deleteCategory(id);
        
        if (result.contains("successfully")) {
            ResponseStructure<String> response = ResponseStructure.success(result);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<String> response = ResponseStructure.notFound(result);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}