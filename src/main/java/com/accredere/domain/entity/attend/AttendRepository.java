package com.accredere.domain.entity.attend;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface AttendRepository extends JpaRepository<AttendEntity , Integer> {

    @Query(value = "SELECT member.t_name ,  member.mname , member.po_name , date_format(attend.cdate, '%Y-%m-%d %H:%i:%s') cdate , date_format(attend.gohome, '%Y-%m-%d %H:%i:%s') gohome FROM attend , member  where attend.mno = member.mno  and member.t_name is not null " , nativeQuery = true)
    Page<Map<Object,Object>> findByAttendAll( Pageable pageable );

    // 태섭 - 출근하기 [12/19]
    @Query( value = "insert into attend( mno ) value( :mno ) " , nativeQuery = true )
    Optional<AttendEntity> attendhi(int mno);

    @Query( value = "select * from attend where mno = :mno and gohome is null ORDER BY a_auto desc limit 1;" , nativeQuery = true)
    Optional<AttendEntity> attendbye(int mno);

    //비아 - 날짜별 출근자 수, 지각자 수 조회 [12/20]
    @Query( value = "select date_format(a.cdate, '%Y-%m-%d') as wdate, " +
            "sum( date_format(a.cdate, '%H') < 9 ) as work, " +
            "sum( date_format(a.cdate, '%H') >= 9 ) as tardy  " +
            "from attend a " +
            "group by date_format(a.cdate, '%Y-%m-%d') having wdate is not null order by wdate;",nativeQuery = true )
    List< Map<Object,Object> > findByCdate();

    // 태섭 - 출근하기 [12/19]
    @Query( value = "select * from attend where mno = :mno and gohome is null limit 1;" , nativeQuery = true )
    Optional<AttendEntity> findByMno( int mno );


}
