package com.accredere.domain.entity.judge;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JudgeRepository extends JpaRepository< JudgeEntity , Integer> {

    @Query(value = "select * from judge where mno=:mno", nativeQuery = true)
    Optional<JudgeEntity> findByMno(@Param("mno") int mno);
}
