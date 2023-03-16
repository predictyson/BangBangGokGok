package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    List<User> findByEmailContaining(String email);
    List<User> findByNicknameContaining(String nickname);
    void deleteByEmail(String email);
}
