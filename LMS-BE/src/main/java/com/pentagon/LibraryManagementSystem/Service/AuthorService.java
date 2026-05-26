package com.pentagon.LibraryManagementSystem.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pentagon.LibraryManagementSystem.DAO.AuthorDAO;
import com.pentagon.LibraryManagementSystem.DTO.ResponseStructure;
import com.pentagon.LibraryManagementSystem.Entity.Author;
import com.pentagon.LibraryManagementSystem.Entity.Book;

@Service
public class AuthorService {

    @Autowired
    private AuthorDAO authorDAO;
    
    public ResponseEntity<ResponseStructure<Author>> addAuthor(Author a) {
        Author author = authorDAO.addAuthor(a);
        
        ResponseStructure<Author> response = ResponseStructure.created("Author added successfully", author);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    public ResponseEntity<ResponseStructure<List<Author>>> getAllAuthors() {
        List<Author> authors = authorDAO.getAllAuthors();
        
        ResponseStructure<List<Author>> response = ResponseStructure.success("Authors fetched successfully", authors);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    public ResponseEntity<ResponseStructure<Author>> getAuthorById(int id) {
        Author author = authorDAO.getAuthorById(id);
        
        if (author != null) {
            ResponseStructure<Author> response = ResponseStructure.success("Author found", author);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<Author> response = ResponseStructure.notFound("Author not found with ID: " + id);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    
    public ResponseEntity<ResponseStructure<List<Book>>> getAuthorBooks(int id) {
        Author author = authorDAO.getAuthorById(id);
        
        if (author != null) {
            List<Book> books = author.getBook();
            if (books != null && !books.isEmpty()) {
                ResponseStructure<List<Book>> response = ResponseStructure.success("Books fetched successfully", books);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                ResponseStructure<List<Book>> response = ResponseStructure.success("No books found for this author", List.of());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } else {
            ResponseStructure<List<Book>> response = ResponseStructure.notFound("Author not found with ID: " + id);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}