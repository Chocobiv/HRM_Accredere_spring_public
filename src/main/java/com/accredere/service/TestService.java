package com.accredere.service;

import com.accredere.domain.entity.orders.OrdersEntity;
import com.accredere.domain.entity.orders.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
@Service
public class TestService {

    OrdersRepository ordersRepository2 = new OrdersRepository() {
        @Override
        public List<OrdersEntity> findAll() {
            return null;
        }

        @Override
        public List<OrdersEntity> findAll(Sort sort) {
            return null;
        }

        @Override
        public Page<OrdersEntity> findAll(Pageable pageable) {
            return null;
        }

        @Override
        public List<OrdersEntity> findAllById(Iterable<Integer> integers) {
            return null;
        }

        @Override
        public long count() {
            return 0;
        }

        @Override
        public void deleteById(Integer integer) {

        }

        @Override
        public void delete(OrdersEntity entity) {

        }

        @Override
        public void deleteAllById(Iterable<? extends Integer> integers) {

        }

        @Override
        public void deleteAll(Iterable<? extends OrdersEntity> entities) {

        }

        @Override
        public void deleteAll() {

        }

        @Override
        public <S extends OrdersEntity> S save(S entity) {
            return null;
        }

        @Override
        public <S extends OrdersEntity> List<S> saveAll(Iterable<S> entities) {
            return null;
        }

        @Override
        public Optional<OrdersEntity> findById(Integer integer) {
            return Optional.empty();
        }

        @Override
        public boolean existsById(Integer integer) {
            return false;
        }

        @Override
        public void flush() {

        }

        @Override
        public <S extends OrdersEntity> S saveAndFlush(S entity) {
            return null;
        }

        @Override
        public <S extends OrdersEntity> List<S> saveAllAndFlush(Iterable<S> entities) {
            return null;
        }

        @Override
        public void deleteAllInBatch(Iterable<OrdersEntity> entities) {

        }

        @Override
        public void deleteAllByIdInBatch(Iterable<Integer> integers) {

        }

        @Override
        public void deleteAllInBatch() {

        }

        @Override
        public OrdersEntity getOne(Integer integer) {
            return null;
        }

        @Override
        public OrdersEntity getById(Integer integer) {
            return null;
        }

        @Override
        public OrdersEntity getReferenceById(Integer integer) {
            return null;
        }

        @Override
        public <S extends OrdersEntity> Optional<S> findOne(Example<S> example) {
            return Optional.empty();
        }

        @Override
        public <S extends OrdersEntity> List<S> findAll(Example<S> example) {
            return null;
        }

        @Override
        public <S extends OrdersEntity> List<S> findAll(Example<S> example, Sort sort) {
            return null;
        }

        @Override
        public <S extends OrdersEntity> Page<S> findAll(Example<S> example, Pageable pageable) {
            return null;
        }

        @Override
        public <S extends OrdersEntity> long count(Example<S> example) {
            return 0;
        }

        @Override
        public <S extends OrdersEntity> boolean exists(Example<S> example) {
            return false;
        }

        @Override
        public <S extends OrdersEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
            return null;
        }

        @Override
        public Page<OrdersEntity> ordersSearch(int or_auto, String key, String keyword, Pageable pageable) {
            return null;
        }

        @Override
        public int findedate(String strFormat1) {
            return 0;
        }
    };


    // [ 상진 ] 발령 업데이트
    @Transactional
    public synchronized boolean timeA(){
        System.out.println("♨ time Service 왔습니까? ");

        Date today = new Date();
        SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        String strFormat1 = format1.format(today);
        System.out.println("strFormat1:::"+strFormat1);
        System.out.println("ordersRepository2:::"+ordersRepository2);
        try {
            int result = ordersRepository2.findedate(strFormat1);
            System.out.println("result:::" + result);
        }
        catch ( Exception e){ System.out.println("서비스 SQL처리 오류"+e); return false;}
        return true;
    }
}
