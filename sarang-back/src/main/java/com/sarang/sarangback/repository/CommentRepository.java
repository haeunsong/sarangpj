package com.sarang.sarangback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sarang.sarangback.entity.CommentEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

}
