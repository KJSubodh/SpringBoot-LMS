package com.pentagon.LibraryManagementSystem.Controller;

import com.pentagon.LibraryManagementSystem.Service.UserService;
import com.pentagon.LibraryManagementSystem.Entity.User;
import com.pentagon.LibraryManagementSystem.DTO.ResponseStructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;  // ✅ Using Service instead of DAO

    @PostMapping
    public ResponseEntity<ResponseStructure<User>> createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
    
    @PostMapping("/with-profile")
    public ResponseEntity<ResponseStructure<User>> createUserWithProfile(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping
    public ResponseEntity<ResponseStructure<List<User>>> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<User>> getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ResponseStructure<User>> updateUser(@PathVariable int id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseStructure<String>> deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<ResponseStructure<List<User>>> getByName(@PathVariable String name) {
        return userService.getUsersByName(name);
    }
}