package com.sarang.sarangback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sarang.sarangback.entity.ImageEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {

}
