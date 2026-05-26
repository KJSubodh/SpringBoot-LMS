package com.pentagon.LibraryManagementSystem.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.pentagon.LibraryManagementSystem.Entity.User;
import com.pentagon.LibraryManagementSystem.Entity.Profile;
import com.pentagon.LibraryManagementSystem.Repository.UserRepository;
import com.pentagon.LibraryManagementSystem.Repository.ProfileRepository;

@Repository
public class UserDAO {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProfileRepository profileRepository;

    public User saveUser(User u) {
        if (u.getProfile() != null) {
            u.getProfile().setUser(u);
        }
        return userRepository.save(u);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            return userOpt.get();
        } else {
            return null;
        }
    }

    @Transactional
    public User updateUser(int id, User updatedUser) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User existingUser = userOpt.get();
            
            // Update user name
            if (updatedUser.getName() != null) {
                existingUser.setName(updatedUser.getName());
            }
            
            // Handle profile update
            if (updatedUser.getProfile() != null) {
                Profile existingProfile = existingUser.getProfile();
                Profile newProfileData = updatedUser.getProfile();
                
                if (existingProfile != null) {
                    // Update existing profile
                    if (newProfileData.getEmail() != null && 
                        !newProfileData.getEmail().equals(existingProfile.getEmail())) {
                        // If email is changing, we need to create a new profile
                        // Delete old profile and create new one
                        Profile newProfile = new Profile();
                        newProfile.setEmail(newProfileData.getEmail());
                        newProfile.setPhone(newProfileData.getPhone());
                        newProfile.setUser(existingUser);
                        
                        // Save new profile first
                        profileRepository.save(newProfile);
                        
                        // Delete old profile
                        profileRepository.delete(existingProfile);
                        
                        // Update user with new profile
                        existingUser.setProfile(newProfile);
                    } else {
                        // Just update phone number
                        existingProfile.setPhone(newProfileData.getPhone());
                        profileRepository.save(existingProfile);
                    }
                } else {
                    // Create new profile if doesn't exist
                    Profile newProfile = new Profile();
                    newProfile.setEmail(newProfileData.getEmail());
                    newProfile.setPhone(newProfileData.getPhone());
                    newProfile.setUser(existingUser);
                    existingUser.setProfile(profileRepository.save(newProfile));
                }
            }
            
            return userRepository.save(existingUser);
        }
        return null;
    }

    public String deleteUser(int id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Profile will be deleted due to CascadeType.ALL
            userRepository.delete(user);
            return "User and associated profile deleted successfully";
        } else {
            return "User not found";
        }
    }

    public List<User> getByName(String name) {
        return userRepository.findByName(name);
    }
}