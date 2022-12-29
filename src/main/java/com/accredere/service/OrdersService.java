package com.accredere.service;

import com.accredere.domain.dto.MemberDto;
import com.accredere.domain.dto.OrdersDto;
import com.accredere.domain.dto.PageDto;
import com.accredere.domain.entity.member.MemberEntity;
import com.accredere.domain.entity.member.MemberRepository;
import com.accredere.domain.entity.orders.OrdersEntity;
import com.accredere.domain.entity.orders.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Member;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {

    // 전역변수 선언
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private MemberRepository memberRepository;


    // 1. 발령 추가

    // 발령보낼 직원 검색[ 검색한 직원데이터 출력 ]
    @Transactional
    public PageDto orderlist( PageDto pageDto ){
        System.out.println("발령 서비스 들어옴" + pageDto );
        Page<MemberEntity> olist = null;
        Pageable pageable = PageRequest.of(pageDto.getPage()-1 , pageDto.getListsize(), Sort.by( Sort.Direction.DESC, "mno"));
        System.out.println("검색확인1: "+ olist);


        // 인사현황 직원발령 검색여부
        olist = memberRepository.ordersEntityList( pageDto.getMno(), pageDto.getKey(), pageDto.getKeyword(), pageable );

        List<MemberDto> oolist = new ArrayList<>();
        for ( MemberEntity entity : olist ){
            oolist.add( entity.toDto() );
        }
        pageDto.setList( oolist );
        pageDto.setTotalBoards( olist.getTotalElements() );
        System.out.println("발령확인 : " + pageDto.toString() );
        return  pageDto;
    }

    @Transactional
    public boolean setorders( OrdersDto ordersDto ){
        System.out.println( "발령직원정보 확인 : "+ordersDto.toString());
        // 선택한 직원번호 --> 엔티티 검색
        Optional<MemberEntity> optional = memberRepository.findById( ordersDto.getMno() );
        System.out.println("발령번호 확인 : "+ordersDto.getMno());
        if( !optional.isPresent() ){ return false; }
        MemberEntity memberEntity = optional.get();
        // dto --> entity [ INSERT ] 저장된 entity 반환
        OrdersEntity ordersEntity = ordersRepository.save( ordersDto.toEntity() );
        if( ordersEntity.getOr_auto() != 0){ //생성된 엔티티의 발령번호가 0이 아니면 성공

            // 연관관계 대입 : 발령번호 <---> 직원번호
            ordersEntity.setMemberEntity( memberEntity );   // fk 대입
            memberEntity.getOrdersEntityList().add( ordersEntity );  // 양방향 통신[ pk필드에 fk 연결 ]
            System.out.println("발령추가 엔티티 : "+ordersEntity.getOr_auto());
            return true;
        }
        else{ return false; }
    }

    // 2. 발령 목록 출력 조회
    @Transactional
    public PageDto printorders( PageDto pageDto ){
        System.out.println("발령목록 서비스 들어옴 " + pageDto);

        Page<OrdersEntity> orlist = null;
        Pageable pageable = PageRequest.of( pageDto.getPage()-1, 5, Sort.by( Sort.Direction.DESC, "or_auto"));

        // 검색여부 [ 부서, 직급, 이름 ]
        orlist = ordersRepository.ordersSearch( pageDto.getOr_auto(), pageDto.getKey(), pageDto.getKeyword(),  pageable );

        List<OrdersDto> odlist = new ArrayList<>();
        for( OrdersEntity entity : orlist ){
            odlist.add( entity.toDto() );
        }
        pageDto.setOdlist( odlist );  // 결과 리스트에 담기
        pageDto.setTotalBoards( orlist.getTotalElements() );
        System.out.println("발령목록 담음 : " + pageDto.toString() );
        return pageDto;
    }


    // 3. 발령 수정
        // 발령번호[ or_auto ] 식별해서 정보 불러오기
    @Transactional
    public OrdersDto getorder( int or_auto ){
        // 입력받은 발령번호로 엔티티 검색
        Optional<OrdersEntity> optional = ordersRepository.findById( or_auto );
        // Optional 안에 있는 내용 확인
        if( optional.isPresent() ){
            OrdersEntity ordersEntity = optional.get();
            return ordersEntity.toDto();
        }else{ return null; }
    }
    // 발령 수정처리
    @Transactional
    public boolean orderupdate( OrdersDto ordersDto ){
        // DTO에서 수정할 발령번호 pk로 이용해서 엔티티 찾기
        Optional<OrdersEntity> optional = ordersRepository.findById( ordersDto.getOr_auto() );
        //
        if( optional.isPresent() ){
            OrdersEntity ordersEntity = optional.get();
            // 인사발령 내용 수정
            ordersEntity.setC_team( ordersDto.getC_team() );            // 부서
            ordersEntity.setC_position( ordersDto.getC_position() );    // 직급
            ordersEntity.setOr_edate( ordersDto.getOr_edate() );        // 발령 예상 날짜
            return true;
        }else{ return false; }
    }

} // class end
