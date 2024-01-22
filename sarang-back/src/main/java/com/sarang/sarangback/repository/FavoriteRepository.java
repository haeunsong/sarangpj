package com.sarang.sarangback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sarang.sarangback.entity.FavoriteEntity;
import com.sarang.sarangback.entity.primaryKey.FavoritePk;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {

}
