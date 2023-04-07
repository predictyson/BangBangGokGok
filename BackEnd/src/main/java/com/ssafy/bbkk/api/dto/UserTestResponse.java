package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.User;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

@ToString
@Getter
public class UserTestResponse {

    private int userId;
    private String email;
    private List<String> userGenres;

    public UserTestResponse(User user){
        this.userId = user.getId();
        this.email = user.getEmail();
        this.userGenres = user.getPreferredGenreOfUsers()
                .stream()
                .map(x->x.getGenre().getCategory())
                .collect(Collectors.toList());
    }

}
