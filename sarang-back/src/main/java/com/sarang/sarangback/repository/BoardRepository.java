package com.sarang.sarangback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sarang.sarangback.entity.BoardEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

}
