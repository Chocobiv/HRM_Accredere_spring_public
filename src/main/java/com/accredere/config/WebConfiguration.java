package com.accredere.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

//비아 - 통합 리액트 실행안되는 문제 해결을 위해 생성[12/14]
@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter {
    //WebMvcConfigurerAdapter : 스프링 MVC 설정값 변경 클래스
    //스프링 아키텍처

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        //super.addViewControllers(registry);

        registry.addViewController("/{spring:\\w+}").setViewName("forward:/");
        registry.addViewController("/**/{spring:\\w+}").setViewName("forward:/");
        registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}").setViewName("forward:/");
    }
}