package com.pentagon.LibraryManagementSystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pentagon.LibraryManagementSystem.Entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	List<User> findByName(String name);
}