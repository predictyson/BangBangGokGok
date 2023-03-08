package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
