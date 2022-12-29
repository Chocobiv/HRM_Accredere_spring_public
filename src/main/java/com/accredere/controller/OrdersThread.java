package com.accredere.controller;

import com.accredere.domain.entity.orders.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Component
public class OrdersThread extends Thread{
    @Autowired
    OrdersRepository ordersRepository;

    @Override
    public void run(){ mmm(); }
    public void mmm(){
        Calendar c = Calendar.getInstance();
        int minute = c.get(Calendar.MINUTE);
        int second = c.get(Calendar.SECOND);
        int milliSecond = c.get(Calendar.MILLISECOND);
        Date today = new Date();
        SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        String strFormat1 = format1.format(today);
        System.out.println("오늘 날짜:::"+strFormat1);
        try {
            while(true){
                    Thread.sleep(1000);
                    int result = ordersRepository.findedate(strFormat1);
                    System.out.println("발령 업데이스 수:::" + result);
            }
        } catch (Exception e) { System.out.println("스레드 오류 1 ::: " + e.toString()); }
        System.out.println("쓰레드 종료 : ");
    }
}
