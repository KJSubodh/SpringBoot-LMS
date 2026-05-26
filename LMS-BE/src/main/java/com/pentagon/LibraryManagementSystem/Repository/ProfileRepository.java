package com.pentagon.LibraryManagementSystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pentagon.LibraryManagementSystem.Entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, String>{

}