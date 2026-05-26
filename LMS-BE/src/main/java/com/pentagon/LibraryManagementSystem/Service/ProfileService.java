package com.pentagon.LibraryManagementSystem.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pentagon.LibraryManagementSystem.DAO.ProfileDAO;
import com.pentagon.LibraryManagementSystem.DTO.ResponseStructure;
import com.pentagon.LibraryManagementSystem.Entity.Profile;

@Service
public class ProfileService {

    @Autowired
    private ProfileDAO profileDAO;
    
    public ResponseEntity<ResponseStructure<Profile>> saveProfile(Profile profile) {
        Profile savedProfile = profileDAO.saveProfile(profile);
        
        ResponseStructure<Profile> response = ResponseStructure.created("Profile saved successfully", savedProfile);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    public ResponseEntity<ResponseStructure<List<Profile>>> getAllProfiles() {
        List<Profile> profiles = profileDAO.getAllProfiles();
        
        ResponseStructure<List<Profile>> response = ResponseStructure.success("Profiles fetched successfully", profiles);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    public ResponseEntity<ResponseStructure<Profile>> getProfileByEmail(String email) {
        Profile profile = profileDAO.getByEmail(email);
        
        if (profile != null) {
            ResponseStructure<Profile> response = ResponseStructure.success("Profile found", profile);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ResponseStructure<Profile> response = ResponseStructure.notFound("Profile not found with email: " + email);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}