package com.ssafy.bbkk.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="genre")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Genre extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String category;

}
