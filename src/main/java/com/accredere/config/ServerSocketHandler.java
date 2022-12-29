package com.accredere.config;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Map;
import java.util.Vector;

@Component
public class ServerSocketHandler extends TextWebSocketHandler {

    private static List<WebSocketSession> list = new Vector<>();  // 0. 접속자 리스트
    private static List<Integer> workList = new Vector<>();

    @Override     // 1. 접속
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println(" 입장 : " + session);
        list.add(session);
    }
    @Override     // 2. 종료
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println(" 퇴장 : " + session );
        list.remove(session);
    }

    @Override     // 3. 메세지
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        JSONParser parser = new JSONParser();
        JSONObject object =  (JSONObject) parser.parse( message.getPayload() );
        System.out.println( message );

        if( object.get("type").equals("onWork") ){
            workList.add(  Integer.parseInt( object.get("message").toString() ) );
            System.out.println("현재 접속 인원 : "+  workList.toString() );
        }
        if( object.get("type").equals("byeWork") ){
            workList.remove(  (Object) Integer.parseInt( object.get("message").toString() ) );
            System.out.println("현재 접속 인원 : "+  workList.toString() );
        }

        for( WebSocketSession s : list ){
            TextMessage textMessage = new TextMessage( workList.toString() );
            s.sendMessage( textMessage );
        }
    }
}
