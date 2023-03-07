package com.ssafy.bbkk.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="user")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    private int age;
    @Column(nullable = false)
    private String gender; // 어떤 식으로 나눌 것인지 고민해봐야함


}
