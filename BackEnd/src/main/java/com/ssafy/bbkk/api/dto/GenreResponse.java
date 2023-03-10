package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.Genre;
import lombok.ToString;

@ToString
public class GenreResponse {

    private int genreId; // 장르 id
    private String category; // 장르 카테고리

    public GenreResponse(Genre genre){
        this.genreId = genre.getId();
        this.category = genre.getCategory();
    }
}