package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer> {

}
