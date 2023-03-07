package com.ssafy.bbkk.db.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@Table(name="region")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Region extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String regionBig;
    @Column(nullable = false)
    private String regionSmall;

}
