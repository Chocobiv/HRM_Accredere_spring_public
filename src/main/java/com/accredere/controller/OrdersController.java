package com.accredere.controller;

import com.accredere.domain.dto.OrdersDto;
import com.accredere.domain.dto.PageDto;
import com.accredere.service.MemberService;
import com.accredere.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:3000") // 리액트와 연결하기 위한 리액트 포트번호 [12/08] 비아 - 스프링부트&리액트 통합->주석
@RestController // Restful api 사용하는 @controller + @ResponseBody
@RequestMapping("/order") // 공통 URL 매핑 주소
public class OrdersController {

    @Autowired
    private OrdersService orderService;

    // ------------------ 지혜 - 인사현황 ------------------ //
    //1. 발령목록 R [전체,검색(부서명/직급/이름 별 검색)]
    @PostMapping("/printorders")
    public PageDto printorders( @RequestBody PageDto pageDto ){ return orderService.printorders( pageDto ); }


    //2. 발령추가 C
    @PostMapping("/setorders")  // 직원 정보 출력
    public boolean setorders( @RequestBody OrdersDto ordersDto ){ return orderService.setorders( ordersDto ); }

    // 발령추가 - 직원검색 값 출력
    @PostMapping("/orderlist")
    public PageDto orderlist( @RequestBody PageDto pageDto ){ return orderService.orderlist(pageDto); }


    //3. 발령수정 U [승인날짜는 변경되지 않아도 됨]
    //인수 : OrderDto
    @GetMapping("/getorder")    // 발령번호[ or_auto ] 식별해서 정보 불러오기
    public OrdersDto getorder( @RequestParam("or_auto") int or_auto ){
        return orderService.getorder( or_auto );
    }

    @PutMapping("/orderupdate")    // 발령번호[ or_auto ] 식별해서 정보 불러오기
    public boolean orderupdate( @RequestBody OrdersDto ordersDto ){
        return orderService.orderupdate( ordersDto );
    }
    /////////////////////////////////////////////////////////
} // end
