package com.pentagon.LibraryManagementSystem.Controller;

import com.pentagon.LibraryManagementSystem.Service.CategoryService;
import com.pentagon.LibraryManagementSystem.Entity.Category;
import com.pentagon.LibraryManagementSystem.DTO.ResponseStructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;  // ✅ Using Service instead of DAO

    @PostMapping
    public ResponseEntity<ResponseStructure<Category>> addCategory(@RequestBody Category c) {
        return categoryService.addCategory(c);
    }

    @GetMapping
    public ResponseEntity<ResponseStructure<List<Category>>> getAllCategories() {
        return categoryService.getAllCategories();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Category>> getCategoryById(@PathVariable int id) {
        return categoryService.getCategoryById(id);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseStructure<String>> deleteCategory(@PathVariable int id) {
        return categoryService.deleteCategory(id);
    }
}