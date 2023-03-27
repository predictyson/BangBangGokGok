package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
    Optional<User> findByEmail(String email);
    List<User> findByEmailContainingOrNicknameContaining(String email, String nickname);
    List<User> findByEmailContaining(String email);
    List<User> findByNicknameContaining(String nickname);
    void deleteByEmail(String email);
    Optional<User> findByProviderAndProviderId(String provider, String providerId);
}
