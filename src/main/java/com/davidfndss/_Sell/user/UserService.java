package com.davidfndss._Sell.user;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.davidfndss._Sell.utils.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.davidfndss._Sell.security.JwtUtil;
import com.davidfndss._Sell.utils.exceptions.ResourceNotFoundException;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    @Autowired 
    private JwtUtil jwtUtil;

//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;

    public String createUserService(User user) {
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if ( user.getUsername() == null || user.getName() == null || user.getEmail() == null || user.getPassword() == null ) {
            throw new BadRequestException("All fields need to be fulfilled to create a new user");
        }

        repository.save(user);
        return jwtUtil.generateToken(user.getId().toString());
    }

    public User findUserByIdService(UUID id) {
        User user = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found" + id));
        user.setPassword(null);
        user.setEmail(null);
        return user;
    }

    public List<User> findAllUsersService() {
        List<User> usersList = repository.findAll();
        return usersList.stream()
                        .peek(user -> {
                            user.setPassword(null);
                            user.setEmail(null);
                        })
                        .collect(Collectors.toList());
    }

    public String updateUserService(UUID id, User userDetails) throws BadRequestException {
        String name = userDetails.getName();  
        String username = userDetails.getUsername(); 
        String email = userDetails.getEmail();
        String password = userDetails.getPassword(); 
        String avatarUrl = userDetails.getAvatarUrl(); 

        if (
            name == null && 
            username == null && 
            email == null && 
            password == null &&
            avatarUrl == null
        ) {
            throw new BadRequestException("At least one field is necessary to update the user");
        }

        User foundUser = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found" + id));
        
        
            if (name != null) {
                foundUser.setName(name);
            }
                
            if (username != null) {
                foundUser.setUsername(username);
            }
                
            if (email != null) {
                foundUser.setEmail(email);
            }
                
            if (password != null) {
                // foundUser.setPassword(passwordEncoder.encode(password));
                foundUser.setPassword(password);
            }

            if (avatarUrl != null) {
                foundUser.setAvatarUrl(avatarUrl);
            }
                
        repository.save(foundUser);
        return "User updated successfully";
    }

    public void deleteUserByIdService(UUID id) {
        User user = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found " + id));

        repository.delete(user);
    }
}