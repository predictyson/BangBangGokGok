package com.ssafy.bbkk.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="hot_theme")
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HotTheme extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hot_theme_id")
    private int id;

    @OneToOne
    @JoinColumn(name = "theme_id")
    private Theme theme;  // 수상한 테마

    public HotTheme(Theme theme){
        this.theme = theme;
    }
}
