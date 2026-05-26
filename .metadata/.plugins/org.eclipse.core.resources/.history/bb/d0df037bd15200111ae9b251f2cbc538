package com.pentagon.LibraryManagementSystem.DTO;

import org.springframework.http.HttpStatus;

public class ResponseStructure<T> {
    
    private int statusCode;
    private String message;
    private T data;
    private long timestamp;
    
    // Constructors
    public ResponseStructure() {
        this.timestamp = System.currentTimeMillis();
    }
    
    public ResponseStructure(int statusCode, String message, T data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.timestamp = System.currentTimeMillis();
    }
    
    // Static factory methods for easy creation
    public static <T> ResponseStructure<T> success(T data) {
        return new ResponseStructure<>(HttpStatus.OK.value(), "Success", data);
    }
    
    public static <T> ResponseStructure<T> success(String message, T data) {
        return new ResponseStructure<>(HttpStatus.OK.value(), message, data);
    }
    
    public static <T> ResponseStructure<T> created(T data) {
        return new ResponseStructure<>(HttpStatus.CREATED.value(), "Created successfully", data);
    }
    
    public static <T> ResponseStructure<T> created(String message, T data) {
        return new ResponseStructure<>(HttpStatus.CREATED.value(), message, data);
    }
    
    public static <T> ResponseStructure<T> error(int statusCode, String message) {
        return new ResponseStructure<>(statusCode, message, null);
    }
    
    public static <T> ResponseStructure<T> notFound(String message) {
        return new ResponseStructure<>(HttpStatus.NOT_FOUND.value(), message, null);
    }
    
    public static <T> ResponseStructure<T> badRequest(String message) {
        return new ResponseStructure<>(HttpStatus.BAD_REQUEST.value(), message, null);
    }
    
    // Getters and Setters
    public int getStatusCode() {
        return statusCode;
    }
    
    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public T getData() {
        return data;
    }
    
    public void setData(T data) {
        this.data = data;
    }
    
    public long getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}