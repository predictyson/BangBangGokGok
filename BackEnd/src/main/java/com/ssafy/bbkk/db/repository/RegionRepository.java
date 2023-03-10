package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegionRepository extends JpaRepository<Region, Integer> {

    Optional<Region> findByRegionBigAndRegionSmall(String regionBig, String regionSmall);
    List<String> findRegionBigDistinctBy();
    List<String> findAllRegionSmallByRegionBig(String regionBig);
}
