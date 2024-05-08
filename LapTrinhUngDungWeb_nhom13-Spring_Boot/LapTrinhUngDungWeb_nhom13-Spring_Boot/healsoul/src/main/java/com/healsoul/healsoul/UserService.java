package com.healsoul.healsoul;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userrepository;

    public List<User> alluser(){
        return userrepository.findAll();
    }
    
    public ResponseEntity<String> signIn(User user){
        User exitingUser = userrepository.findbyUser(user.getUsername());
        if (exitingUser == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("user does not exist");
        }
        if (exitingUser != null && exitingUser.getPassword().equals(user.getPassword())){
            return ResponseEntity.ok("Sign in successful!");
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }
    }

    
}
