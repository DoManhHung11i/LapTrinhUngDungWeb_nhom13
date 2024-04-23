package com.healsoul.healsoul;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
    @Autowired
    private UserService userservice;

    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestBody User user){
        return userservice.signIn(user);
    }
}
