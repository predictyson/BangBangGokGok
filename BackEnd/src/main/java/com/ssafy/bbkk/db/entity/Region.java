package com.ssafy.bbkk.db.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@Table(name="region")
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Region extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "region_id")
    private int id;
    @Column(nullable = false)
    private String regionBig; // 지역(대분류)
    @Column(nullable = false)
    private String regionSmall; // 지역(소분류)
}
