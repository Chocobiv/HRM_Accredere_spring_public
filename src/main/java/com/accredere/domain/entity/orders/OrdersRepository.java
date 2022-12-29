package com.accredere.domain.entity.orders;

import com.accredere.domain.entity.member.MemberEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface OrdersRepository extends JpaRepository<OrdersEntity, Integer> {

    // 지혜 - 인사현황 목록 :  이름, 직급, 부서명 검색처리
    @Query( value = "select * from orders " +
            " where " +
            " IF( :or_auto = 0, or_auto like '%%', or_auto = :or_auto ) and " +
            " IF( :key = '' , true , " +
            " IF( :key = 'mname' , mname like %:keyword% , IF( :key = 'c_position' ,c_position like %:keyword%, c_team like %:keyword%) ))"
            , nativeQuery = true )
    Page<OrdersEntity> ordersSearch( int or_auto, String key, String keyword, Pageable pageable );

    // 상진 - 오늘 날짜의 발령 리스트 업데이트
    @Transactional
    @Modifying
    @Query(value = " update member  m , orders o set m.t_name= o.c_team , o.or_state=1 , m.po_name = o.c_position where o.or_edate = :strFormat1 and (o.or_state = 0  and m.mno = o.mno  ); "
            , nativeQuery = true ) // nativeQuery: 실제 해당 SQL 질의어 사용 뜻
    int findedate(String strFormat1 );

} // end
