package com.healsoul.healsoul;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//import java.util.List;

@Document(collection="Playlist")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Playlist {
    @Id
    private ObjectId id;
    private String playlistname;
    @DocumentReference
    private User owner;

    public Playlist(String playlistname){
        this.playlistname = playlistname;
    }
}
