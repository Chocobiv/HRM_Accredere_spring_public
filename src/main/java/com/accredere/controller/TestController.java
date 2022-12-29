package com.accredere.controller;

import com.accredere.domain.entity.member.MemberRepository;
import com.accredere.domain.entity.orders.OrdersEntity;
import com.accredere.domain.entity.orders.OrdersRepository;
import com.accredere.service.MemberService;
import com.accredere.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@RestController // Restful api 사용하는 @controller + @ResponseBody
@RequestMapping("/testmap") // 공통 URL 매핑 주소
public class TestController {

    @Autowired
    Thread thread;

    @RequestMapping("/main")
    public void main() {
    thread.start();
    }
}
