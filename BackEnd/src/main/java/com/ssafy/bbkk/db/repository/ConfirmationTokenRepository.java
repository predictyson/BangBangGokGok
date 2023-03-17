package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Integer> {

}
