package com.pentagon.LibraryManagementSystem.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pentagon.LibraryManagementSystem.DAO.UserDAO;
import com.pentagon.LibraryManagementSystem.DTO.ResponseStructure;
import com.pentagon.LibraryManagementSystem.Entity.User;

@Service
public class UserService {

    @Autowired
    private UserDAO userDAO;
    
    public ResponseEntity<ResponseStructure<User>> createUser(User user) {
        if (user.getProfile() == null) {
            ResponseStructure<User> response = ResponseStructure.badRequest("Profile information is required");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        
        User savedUser = userDAO.saveUser(user);
        ResponseStructure<User> response = ResponseStructure.created("User created successfully", savedUser);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    public ResponseEntity<ResponseStructure<List<User>>> getAllUsers() {
        List<User> users = userDAO.getAllUsers();
        
        ResponseStructure<List<User>> response = ResponseStructure.success("Users fetched successfully", users);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    public ResponseEntity<ResponseStructure<User>> getUserById(int id) {
        User user = userDAO.getUserById(id);
        
        if (user != null) {
            ResponseStructure<User> response = ResponseStructure.success("User found", user);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<User> response = ResponseStructure.notFound("User not found with ID: " + id);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    
    public ResponseEntity<ResponseStructure<User>> updateUser(int id, User user) {
        User updatedUser = userDAO.updateUser(id, user);
        
        if (updatedUser != null) {
            ResponseStructure<User> response = ResponseStructure.success("User updated successfully", updatedUser);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<User> response = ResponseStructure.notFound("User not found with ID: " + id);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    
    public ResponseEntity<ResponseStructure<String>> deleteUser(int id) {
        String result = userDAO.deleteUser(id);
        
        if (result.contains("successfully")) {
            ResponseStructure<String> response = ResponseStructure.success(result);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<String> response = ResponseStructure.notFound(result);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    
    public ResponseEntity<ResponseStructure<List<User>>> getUsersByName(String name) {
        List<User> users = userDAO.getByName(name);
        
        if (users != null && !users.isEmpty()) {
            ResponseStructure<List<User>> response = ResponseStructure.success("Users found", users);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<List<User>> response = ResponseStructure.success("No users found with name: " + name, List.of());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
}