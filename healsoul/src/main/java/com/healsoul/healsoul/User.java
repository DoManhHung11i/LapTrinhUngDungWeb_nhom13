package com.healsoul.healsoul;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "User")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User{
    @Id
    private ObjectId id;
    private String username;
    private String email;
    private String password;
    @DocumentReference
    private List<Playlist> playlist;

    public User(String username, String email, String password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}