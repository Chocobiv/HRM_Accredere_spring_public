package com.accredere.domain.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PageDto {

    private int mno;        // 회원번호
    private int page;       // 현제 페이지
    private String key;     // 검색한 필드
    private String keyword; // 검색 단어
    private int listsize;   // 급여관리 목록 갯수 처리
    private int or_auto;        // 발령 번호

    @Builder.Default // 빌더 사용시 현재 객체가 기본적으로 할당
    private List<MemberDto> list = new ArrayList<>();   // 검색된 결과 게시물 리스트
    private List<OrdersDto> odlist = new ArrayList<>();   // 검색된 결과 게시물 리스트
    private Long totalBoards;   // 총 게시물 수

} // end
