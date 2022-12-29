package com.accredere.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket // * 웹 소켓
public class WebSocketConfiguration implements WebSocketConfigurer {

    @Autowired
    private ServerSocketHandler serverSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler( serverSocketHandler ,"/attend" , "/attend/attendlist").setAllowedOriginPatterns("*");
    }

}
