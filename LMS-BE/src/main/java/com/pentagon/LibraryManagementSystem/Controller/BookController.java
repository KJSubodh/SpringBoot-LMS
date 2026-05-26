package com.pentagon.LibraryManagementSystem.Controller;

import com.pentagon.LibraryManagementSystem.Service.BookService;
import com.pentagon.LibraryManagementSystem.Entity.Book;
import com.pentagon.LibraryManagementSystem.Entity.Category;
import com.pentagon.LibraryManagementSystem.DTO.ResponseStructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    private BookService bookService; // ✅ Using Service instead of DAO

    @PostMapping
    public ResponseEntity<ResponseStructure<Book>> addBook(@RequestBody Book b) {
        return bookService.addBook(b);
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<ResponseStructure<List<Book>>> getBooksByAuthor(@PathVariable int authorId) {
        return bookService.getBooksByAuthor(authorId);
    }

    @GetMapping
    public ResponseEntity<ResponseStructure<List<Book>>> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Book>> getBookById(@PathVariable int id) {
        return bookService.getBookById(id);
    }

    @PutMapping("/{id}/borrow/{userId}")
    public ResponseEntity<ResponseStructure<Book>> borrowBook(@PathVariable int id, @PathVariable int userId) {
        return bookService.borrowBook(id, userId);
    }

    @PutMapping("/{id}/return")
    public ResponseEntity<ResponseStructure<Book>> returnBook(@PathVariable int id) {
        return bookService.returnBook(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseStructure<Book>> updateBook(@PathVariable int id, @RequestBody Book b) {
        return bookService.updateBook(id, b);
    }

    @PutMapping("/{id}/categories")
    public ResponseEntity<ResponseStructure<Book>> updateCategories(@PathVariable int id,
            @RequestBody List<Category> categories) {
        return bookService.updateBookCategories(id, categories);
    }
}