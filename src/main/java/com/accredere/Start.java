package com.accredere;

import com.accredere.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Calendar;

@SpringBootApplication
@EnableJpaAuditing
public class Start {
    public static void main(String[] args) {
        SpringApplication.run(Start.class);

    }
}


