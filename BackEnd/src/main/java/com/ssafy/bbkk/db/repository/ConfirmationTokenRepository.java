package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Integer> {
    Optional<ConfirmationToken> findByUserEmailAndCode(String userEmail, String code);
}
