package com.accredere.domain.entity.member;

import com.accredere.domain.dto.MemberDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity , Integer> {
    // 비아 - 이메일 이용한 엔티티 검색 메소드
    Optional<MemberEntity> findByMemail(String memail);

    // 지혜 - 급여관리 직급, 이름 검색처리
    @Query( value = "select * from member " +
            " where " +
            " IF( :mno = 0, mno like '%%', mno = :mno ) and " +
            " IF( :key = '' , true , IF( :key = 'mname' , mname like %:keyword% , po_name like %:keyword%  ) )"
            , nativeQuery = true )
    Page<MemberEntity> findBySearch( int mno, String key, String keyword, Pageable pageable );

    // 지혜 - 인사현황 발령 전 직원검색
    @Query( value = "select * from member " +
            " where " +
            " IF( :mno = 0, mno like '%%', mno = :mno ) and " +
            " IF( :key = '' , true , " +
            "IF( :key = 'mname' , mname like %:keyword% , IF( :key = 'po_name' ,po_name like %:keyword%, t_name like %:keyword%)  ) )"
            , nativeQuery = true )
    Page<MemberEntity> ordersEntityList( int mno, String key, String keyword, Pageable pageable );


    // 상진 - 멤버 list
    @Query( value = "select * from member " +
            " where " +
            " IF( :mname = '', true, mname = :mname ) and " +
            " IF( :t_name = '', true, t_name = :t_name ) and " +
            " IF( :po_name = '', true, po_name = :po_name ) ORDER BY mno desc"
            , nativeQuery = true )
    Page<MemberEntity> findByMember(String mname, String t_name, String po_name , Pageable pageable );

    // 상진 - 멤버 추가시 중복검사
    @Query(value = "select * from member where mphone = :mphone", nativeQuery = true)
    Optional<MemberEntity> findByMphone( String mphone );

    // 상진 - 평균 근무 시간 (분)
    @Query(value = "select round(avg(TIMESTAMPDIFF(MINUTE , cdate , gohome ))/60,1) from attend where gohome is not null", nativeQuery = true)
    float findTimeAvg();

    // 상진 - 평균 야근 시간 (분)
    @Query(value = "select GREATEST(round(avg(TIMESTAMPDIFF(MINUTE , DATE_FORMAT(gohome,'%Y-%m-%d 18:00:00.000000') , gohome )),1),0) from attend where gohome is not null and TIMESTAMPDIFF(MINUTE , DATE_FORMAT(gohome,'%Y-%m-%d 18:00:00.000000') , gohome ) >= 0;", nativeQuery = true)
    float findTimeAvg2();

}
