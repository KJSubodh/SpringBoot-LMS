package com.pentagon.LibraryManagementSystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pentagon.LibraryManagementSystem.Entity.Author;

public interface AuthorRepository extends JpaRepository<Author, Integer> {

}
