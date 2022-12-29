package com.accredere.domain.dto;

import com.accredere.domain.entity.member.MemberEntity;
import lombok.*;

import java.util.Map;

// 비아 - Oauth 로그인을 위한 DTO 생성 및 구현
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class OauthDto {
    private String memail;                  //아이디[이메일]
    private String mname;                   //이름[닉네임]
    private String registrationId;          //auth 회사명
    private Map<String,Object> attributes;  //인증 결과
    private String oauth2UserInfo;          //회원정보

    //auth 회사에 따른 객체 생성 1.oauth회사명[registrationId]  2.회원정보[oauth2UserInfo]  3.인증결과[attributes]
    public static OauthDto of( String registrationId, String oauth2UserInfo, Map<String,Object> attributes){ //인증된 토큰
        if(registrationId.equals("google")){
            return ofGoogle(registrationId, oauth2UserInfo, attributes);
        }else{return null;}
    }


    //1. 구글 객체 생성 메소드
    public static OauthDto ofGoogle(String registrationId, String oauth2UserInfo, Map<String,Object> attributes){
        System.out.println("google attributes) "+attributes);

        return OauthDto.builder()
                .memail((String) attributes.get("email"))
                .mname((String) attributes.get("name"))
                .registrationId(registrationId)
                .attributes(attributes)
                .build();
    }

    //2. DTO -> Entity
    public MemberEntity toEntity() {
        return MemberEntity.builder()
                .memail(this.memail)
                .mrol(this.registrationId)
                .build();
    }
}