package com.sarang.sarangback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sarang.sarangback.entity.SearchLogEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> {

}
