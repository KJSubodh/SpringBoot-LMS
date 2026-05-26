package com.pentagon.LibraryManagementSystem.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pentagon.LibraryManagementSystem.DAO.BookDAO;
import com.pentagon.LibraryManagementSystem.DTO.ResponseStructure;
import com.pentagon.LibraryManagementSystem.Entity.Book;
import com.pentagon.LibraryManagementSystem.Entity.Category;

@Service
public class BookService {

    @Autowired
    private BookDAO bookDAO;

    public ResponseEntity<ResponseStructure<Book>> addBook(Book b) {
        Book book = bookDAO.addBook(b);

        ResponseStructure<Book> response = ResponseStructure.created("Book added successfully", book);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    public ResponseEntity<ResponseStructure<List<Book>>> getBooksByAuthor(int authorId) {
        List<Book> books = bookDAO.getBooksByAuthorId(authorId);
        ResponseStructure<List<Book>> response = ResponseStructure.success("Books fetched successfully", books);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<ResponseStructure<List<Book>>> getAllBooks() {
        List<Book> books = bookDAO.getAllBooks();

        ResponseStructure<List<Book>> response = ResponseStructure.success("Books fetched successfully", books);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<ResponseStructure<Book>> getBookById(int id) {
        Book book = bookDAO.getBookById(id);

        if (book != null) {
            ResponseStructure<Book> response = ResponseStructure.success("Book found", book);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<Book> response = ResponseStructure.notFound("Book not found with ID: " + id);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<ResponseStructure<Book>> borrowBook(int bookId, int userId) {
        Book borrowedBook = bookDAO.borrow(bookId, userId);

        if (borrowedBook != null) {
            ResponseStructure<Book> response = ResponseStructure.success("Book borrowed successfully", borrowedBook);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<Book> response = ResponseStructure
                    .badRequest("Book is already borrowed or user not found");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ResponseStructure<Book>> returnBook(int id) {
        Book returnedBook = bookDAO.returnBook(id);

        if (returnedBook != null) {
            ResponseStructure<Book> response = ResponseStructure.success("Book returned successfully", returnedBook);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<Book> response = ResponseStructure.notFound("Book not found with ID: " + id);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<ResponseStructure<Book>> updateBook(int id, Book bookDetails) {
        // Just delegate to the DAO method that already exists
        Book updatedBook = bookDAO.updateBook(id, bookDetails);

        if (updatedBook != null) {
            ResponseStructure<Book> response = ResponseStructure.success("Book updated successfully", updatedBook);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<Book> response = ResponseStructure.notFound("Book not found with ID: " + id);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<ResponseStructure<Book>> updateBookCategories(int bookId, List<Category> categories) {
        Book updatedBook = bookDAO.updateBookCategories(bookId, categories);

        if (updatedBook != null) {
            ResponseStructure<Book> response = ResponseStructure.success("Categories updated successfully",
                    updatedBook);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<Book> response = ResponseStructure.notFound("Book not found with ID: " + bookId);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}